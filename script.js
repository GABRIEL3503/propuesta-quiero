 var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


document.querySelectorAll('.pricing-card').forEach(card => {
  const basePrice = parseInt(card.dataset.basePrice);
  let totalPrice = basePrice;

  const priceDisplay = card.querySelector('.price');
  const addons = card.querySelectorAll('.addon');
  const btnFull = card.querySelector('#btn-add');

  // Mostrar precio base al inicio
  priceDisplay.textContent = `$${totalPrice.toLocaleString('es-AR')}`;

  addons.forEach(addon => {
    if (addon.id !== 'btn-add') {
      // Estos no tienen precio, son visuales
      addon.dataset.price = "0";
    }

    addon.addEventListener('click', () => {
      const price = parseInt(addon.dataset.price);

      // Si es el botón "Elegir plan Full"
      if (addon === btnFull) {
        const isActivating = !addon.classList.contains('active');

        // Activar/desactivar todos los anteriores
        addons.forEach(a => {
          if (a !== btnFull) {
            a.classList.toggle('active', isActivating);
          }
        });

        addon.classList.toggle('active', isActivating);
        totalPrice = isActivating ? basePrice + price : basePrice;

      } else {
        // Por si hacés click en los addons individuales (aunque no afecten el precio)
        addon.classList.toggle('active');
      }

      priceDisplay.textContent = `$${totalPrice.toLocaleString('es-AR')}`;
    });
  });
});

