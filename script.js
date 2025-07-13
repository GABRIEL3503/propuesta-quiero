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

  // Inicializar precio base + addons activos por defecto
  addons.forEach(addon => {
    if (addon.classList.contains('active')) {
      totalPrice += parseInt(addon.dataset.price);
    }
  });

  priceDisplay.textContent = `$${totalPrice.toLocaleString('es-AR')}`;

  addons.forEach(addon => {
    addon.addEventListener('click', () => {
      const price = parseInt(addon.dataset.price);

      // Si es el boton "plan full"
      if (addon === btnFull) {
        const isActivating = !addon.classList.contains('active');

        addons.forEach(a => {
          if (a !== btnFull) {
            a.classList.toggle('active', isActivating);
          }
        });

        addon.classList.toggle('active', isActivating);

        // Recalcular total
        totalPrice = basePrice;
        addons.forEach(a => {
          if (a.classList.contains('active')) {
            totalPrice += parseInt(a.dataset.price);
          }
        });

      } else {
        // Toggle individual addon
        addon.classList.toggle('active');

        // Sumar o restar según active/desactive
        if (addon.classList.contains('active')) {
          totalPrice += price;
        } else {
          totalPrice -= price;
        }
      }

      priceDisplay.textContent = `$${totalPrice.toLocaleString('es-AR')}`;
    });
  });
});