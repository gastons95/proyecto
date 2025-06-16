document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');

  form?.addEventListener('submit', function (e) {
    let errors = [];

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      errors.push('El email es obligatorio');
      email.classList.add('input-error');
    } else if (!emailRegex.test(email.value.trim())) {
      errors.push('El email no tiene un formato válido');
      email.classList.add('input-error');
    } else {
      email.classList.remove('input-error');
    }

    // Validación de contraseña
    if (!password.value.trim()) {
      errors.push('La contraseña es obligatoria');
      password.classList.add('input-error');
    } else {
      password.classList.remove('input-error');
    }

    // Mostrar errores
    if (errors.length > 0) {
      e.preventDefault();

      let errorContainer = document.getElementById('loginErrors');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'loginErrors';
        errorContainer.classList.add('error');
        form.prepend(errorContainer);
      }

      errorContainer.innerHTML = '';
      errors.forEach(error => {
        const errorItem = document.createElement('p');
        errorItem.textContent = error;
        errorContainer.appendChild(errorItem);
      });
    }
  });

  // Menu responsivo
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');
  const nav = document.getElementById('navbar');

  if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }
});