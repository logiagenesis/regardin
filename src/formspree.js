import { trackEvent } from './tracking.js';

export function initialiseFormspree(form) {
  const endpoint = form.dataset.formspree;
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint || '')) return false;
  const status = document.querySelector('#form-status');
  const submit = document.querySelector('#submit-enquiry');
  let pending = false;
  let accepted = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || accepted || !form.reportValidity()) return;
    pending = true;
    submit.disabled = true;
    status.textContent = 'Sending your enquiry…';
    const source = new FormData(form);
    const body = new FormData();
    for (const field of ['name', 'phone', 'email', 'suburb', 'service', 'brief', 'timing']) {
      body.set(field, source.get(field) || '');
    }
    body.set('_gotcha', source.get('_gotcha') || source.get('website') || '');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        const message = result.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(' ');
        throw new Error(message || 'The form service could not confirm acceptance.');
      }
      accepted = true;
      trackEvent('generate_lead', { service: String(source.get('service') || '') });
      status.textContent =
        'Your enquiry has been accepted by the form service. Thank you. This is not a confirmed booking.';
      submit.textContent = 'Enquiry sent';
    } catch (error) {
      status.textContent =
        error.name === 'AbortError'
          ? 'The form service did not respond in time. We cannot confirm delivery. Your details are still here; call or email Regardin before sending again.'
          : error.message +
            ' Your entered details are still here. You can also call or email Regardin.';
    } finally {
      clearTimeout(timeout);
      pending = false;
      submit.disabled = accepted;
    }
  });
  return true;
}
