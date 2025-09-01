// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (AJAX -> PHP mail)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('formStatus');
    if (statusEl) statusEl.textContent = 'Sending...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.subject || !data.message) {
      if (statusEl) statusEl.textContent = 'Please fill all required fields.';
      return;
    }

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new URLSearchParams(data)
      });
      const result = await res.json();
      if (result.ok) {
        if (statusEl) statusEl.textContent = 'Message sent successfully. Thank you!';
        form.reset();
      } else {
        if (statusEl) statusEl.textContent = result.error || 'Could not send message. Please try again later.';
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Network error. Please try again.';
    }
  });
}
