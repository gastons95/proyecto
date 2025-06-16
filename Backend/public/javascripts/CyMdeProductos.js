const productName = document.querySelector('input[name="productName"]');

form.addEventListener('submit', (e) => {
  let errors = [];

  if (!productName || productName.value.trim().length < 5) {
    errors.push('El nombre del producto debe tener al menos 5 caracteres');
    if (productName) productName.classList.add('input-error');
  } else if (productName) {
    productName.classList.remove('input-error');
  }

  

  if (errors.length > 0) {
    e.preventDefault();
    // Mostrar errores en pantalla...
  }
});