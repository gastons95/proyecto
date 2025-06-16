document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  const editForm = document.getElementById('edit-form');
  const messageDiv = document.getElementById('message');

  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(createForm);
      try {
        const res = await fetch('/api/productos', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        messageDiv.textContent = data.message;
        messageDiv.style.color = 'green';
        createForm.reset();
      } catch (err) {
        messageDiv.textContent = 'Error al guardar el producto';
        messageDiv.style.color = 'red';
      }
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(editForm);
      const id = formData.get('id');

      try {
        const res = await fetch(`/api/productos/${id}`, {
          method: 'PUT',
          body: formData
        });
        const data = await res.json();
        messageDiv.textContent = data.message;
        messageDiv.style.color = 'green';
      } catch (err) {
        messageDiv.textContent = 'Error al actualizar el producto';
        messageDiv.style.color = 'red';
      }
    });
  }
});