
/*Menu responsivo*/
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/*Detalle del Producto*/
document.getElementById("productDetails").addEventListener("onclick",(e) =>{
    console.log(e)
})

var MainImg = document.getElementById("MainImg");
var smalling = document.getElementsByClassName("small-img");

smallimg[0].onclick = function(){
    MainImg.src = smallimg[0].src;
}
smallimg[1].onclick = function(){
    MainImg.src = smallimg[1].src;
}
smallimg[2].onclick = function(){
    MainImg.src = smallimg[2].src;
}
smallimg[3].onclick = function(){
    MainImg.src = smallimg[3].src;
}




//FORMULARIO DE CREACION  Y CARGA DE PRODUCTO
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