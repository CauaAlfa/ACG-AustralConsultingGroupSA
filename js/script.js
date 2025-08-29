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

// Contact form (basic client-side validation + demo submit)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';

    const data = Object.fromEntries(new FormData(form).entries());

    // Simple checks
    if (!data.name || !data.email || !data.subject || !data.message) {
      statusEl.textContent = 'Please fill all required fields.';
      return;
    }

    // DEMO behavior: opens mail client. Replace with real endpoint later.
    const body =
      `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone || '-'}%0D%0A` +
      `Subject: ${data.subject}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(data.message)}`;

    window.location.href = `mailto:muagacaua@gmail.com?subject=${encodeURIComponent('[ACG Website] ' + data.subject)}&body=${body}`;

    statusEl.textContent = 'Opening your email app...';
  });
}
