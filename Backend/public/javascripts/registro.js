document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const firstName = document.querySelector('input[name="firstName"]');
  const lastName = document.querySelector('input[name="lastName"]');
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');
  const avatar = document.querySelector('input[name="avatar"]'); // Selección del input imagen

  // Validación del formulario de registro
  form?.addEventListener('submit', function (e) {
    let errors = [];

    // Validación de nombre
    if (firstName && firstName.value.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
      firstName.classList.add('input-error');
    } else if (firstName) {
      firstName.classList.remove('input-error');
    }

    // Validación de apellido
    if (lastName && lastName.value.trim().length < 2) {
      errors.push('El apellido debe tener al menos 2 caracteres');
      lastName.classList.add('input-error');
    } else if (lastName) {
      lastName.classList.remove('input-error');
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
      if (email.value.trim() === '') {
        errors.push('El email es obligatorio');
        email.classList.add('input-error');
      } else if (!emailRegex.test(email.value.trim())) {
        errors.push('El email no tiene un formato válido');
        email.classList.add('input-error');
      } else {
        email.classList.remove('input-error');
      }
    }

    // Validación de contraseña
    if (password && password.value.trim().length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
      password.classList.add('input-error');
    } else if (password) {
      password.classList.remove('input-error');
    }

    //  Validación de imagen
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (avatar && avatar.value) {
      if (!allowedExtensions.test(avatar.value)) {
        errors.push('La imagen debe ser un archivo JPG, JPEG, PNG o GIF');
        avatar.classList.add('input-error');
      } else {
        avatar.classList.remove('input-error');
      }
    }

    // Mostrar errores si hay
    if (errors.length > 0) {
      e.preventDefault();

      let errorContainer = document.getElementById('frontErrors');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'frontErrors';
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