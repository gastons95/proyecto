 document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    // Abrir menú
    if (bar && nav) {
      bar.addEventListener('click', () => {
        nav.classList.add('active');
      });
    }

    // Cerrar menú con la "X"
    if (close && nav) {
      close.addEventListener('click', (e) => {
        e.preventDefault(); // evita salto por el href="#"
        nav.classList.remove('active');
      });
    }

    // Cerrar menú al hacer clic en cualquier enlace del navbar
    if (nav) {
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
        });
      });
    }

    // Detalle del producto (evento en contenedor general si existe)
    const productDetails = document.getElementById("productDetails");
    if (productDetails) {
      productDetails.addEventListener("click", (e) => {
        console.log(e);
      });
    }

    // Cambio de imagen principal desde miniaturas
    const MainImg = document.getElementById("MainImg");
    const smallimg = document.getElementsByClassName("small-img");

    if (MainImg && smallimg.length > 0) {
      Array.from(smallimg).forEach(img => {
        img.addEventListener('click', () => {
          MainImg.src = img.src;
        });
      });
    }
  });