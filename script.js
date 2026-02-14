document.addEventListener('DOMContentLoaded', function() {
  let currentIndex = 0;
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const totalSlides = slides.length;
  let autoPlayInterval;

  function updateSlider() {
    // Mover el track
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
    
    // Actualizar clase active en slides
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Actualizar contenido del header según la slide activa
    const activeSlide = slides[currentIndex];
    const titleElement = document.getElementById('carouselTitle');
    const descriptionElement = document.getElementById('carouselDescription');
    
    if (activeSlide && titleElement && descriptionElement) {
      const title = activeSlide.getAttribute('data-title') || 'Transporte de Batea en V Región';
      const description = activeSlide.getAttribute('data-description') || 'Servicios profesionales de transporte de batea para áridos, materiales de construcción y carga a granel en V Región y todo Chile.';
      
      // Animación de fade out/in
      titleElement.style.opacity = '0';
      descriptionElement.style.opacity = '0';
      
      setTimeout(() => {
        titleElement.textContent = title;
        descriptionElement.textContent = description;
        titleElement.style.opacity = '1';
        descriptionElement.style.opacity = '1';
      }, 200);
    }
  }

  window.nextSlide = function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };

  window.previousSlide = function() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  window.currentSlide = function(index) {
    currentIndex = index - 1;
    updateSlider();
  };

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(window.nextSlide, 5000);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Inicializar slider
  updateSlider();
  
  // Auto-play
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }
  
  startAutoPlay();

  // Controles de teclado
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      window.previousSlide();
    } else if (e.key === 'ArrowRight') {
      window.nextSlide();
    }
  });
  
  // Soporte táctil básico
  let startX = 0;
  let endX = 0;
  
  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });
  
  carousel.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Mínimo deslizamiento
      if (diff > 0) {
        window.nextSlide(); // Deslizar izquierda = siguiente
      } else {
        window.previousSlide(); // Deslizar derecha = anterior
      }
    }
  });

  // Intersection Observer para animaciones de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animar text-block si existe
        const textBlock = entry.target.querySelector('.text-block');
        if (textBlock) {
          textBlock.classList.add('animate-in');
        }
        
        // Animar CTA si existe
        const cta = entry.target.querySelector('.cta');
        if (cta) {
          cta.classList.add('animate-in');
        }
      }
    });
  }, observerOptions);

  // Observar todas las secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Observar el footer también
  const footer = document.querySelector('footer');
  if (footer) {
    observer.observe(footer);
  }

  // Animar navbar al cargar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    setTimeout(() => {
      navbar.style.animation = 'slideDownNav 0.6s ease-out forwards';
    }, 100);
  }

  // Control de iconos flotantes - aparecen después de hacer scroll
  const floatingContact = document.querySelector('.floating-contact');
  const heroCarousel = document.querySelector('.hero-carousel');
  
  function checkScrollForFloatingButtons() {
    if (!floatingContact || !heroCarousel) return;
    
    const heroBottom = heroCarousel.offsetTop + heroCarousel.offsetHeight;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar iconos solo después de haber pasado completamente el carrusel
    // Agregamos un pequeño margen de 50px para que aparezcan un poco antes
    if (scrollPosition > heroBottom - 50) {
      floatingContact.classList.add('show');
    } else {
      floatingContact.classList.remove('show');
    }
  }
  
  // Verificar al cargar la página
  checkScrollForFloatingButtons();
  
  // Verificar al hacer scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Usar debounce para mejorar el rendimiento
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollForFloatingButtons, 10);
  }, { passive: true });
  
  // Verificar al redimensionar la ventana (por si cambia la altura del carrusel)
  window.addEventListener('resize', function() {
    checkScrollForFloatingButtons();
  }, { passive: true });
});

// Funciones de contacto
function contactarEmpresa() {
  contactarEmail();
}

function contactarEmail() {
  const email = 'tsolucionesflocam@gmail.com';
  const asunto = 'Cotización Transporte Carga Pesada';
  const cuerpo = 'Hola, me interesa obtener una cotización para transporte de carga pesada. Por favor contáctenme.';
  
  Swal.fire({
    title: '📧 Abrir Cliente de Email',
    html: `¿Deseas abrir tu cliente de email para enviar la consulta?<br><br><small>Si no tienes configurado un cliente de email, te mostraremos alternativas.</small>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '🚀 Abrir Email',
    cancelButtonText: 'Ver Alternativas',
    confirmButtonColor: '#f97316',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
    if (result.isConfirmed) {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      
      try {
        window.location.href = mailtoLink;
        
        // Verificar si el mailto funcionó
        setTimeout(() => {
          Swal.fire({
            title: '¿Se abrió correctamente?',
            text: '¿Se abrió tu cliente de email correctamente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, perfecto 🚀',
            cancelButtonText: 'No, mostrar alternativas',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#f97316'
          }).then((result) => {
            if (!result.isConfirmed) {
              mostrarAlternativaEmail(email);
            }
          });
        }, 2000);
      } catch (error) {
        mostrarAlternativaEmail(email);
      }
    } else {
      mostrarAlternativaEmail(email);
    }
  });
}

function mostrarAlternativaEmail(email) {
  Swal.fire({
    title: '📧 Información de Contacto',
    html: `
      <div style="text-align: left; padding: 20px;">
        <p><strong>📧 Email:</strong> ${email}</p>
        <p><strong>📝 Mensaje sugerido:</strong></p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <em>Hola, me interesa obtener una cotización para transporte de carga pesada. Por favor contáctenme.</em>
        </div>
        <p><small>También puedes usar los otros medios de contacto disponibles.</small></p>
      </div>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: '📋 Copiar Email',
    cancelButtonText: 'Cerrar',
    confirmButtonColor: '#f97316',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
    if (result.isConfirmed) {
      // Copiar email al portapapeles
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          Swal.fire({
            title: '¡Copiado! 📋',
            text: `Email copiado al portapapeles: ${email}`,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
        }).catch(() => {
          Swal.fire({
            title: 'Error al copiar',
            text: 'No se pudo copiar automáticamente. Puedes copiar manualmente: ' + email,
            icon: 'warning',
            confirmButtonColor: '#f97316'
          });
        });
      }
    }
  });
}

function contactarWhatsApp() {
  const numero = '56982218804';
  const mensaje = '¡Hola! Me interesa obtener información sobre sus servicios de transporte de carga pesada.';
  const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  
  Swal.fire({
    title: '📱 WhatsApp',
    html: `¿Deseas abrir WhatsApp para enviar un mensaje?<br><br><small>Se abrirá WhatsApp Web con un mensaje predefinido.</small>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '🚀 Abrir WhatsApp',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#25d366',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(whatsappUrl, '_blank');
      Swal.fire({
        title: '¡Perfecto! 🚀',
        text: 'WhatsApp se está abriendo en una nueva ventana.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  });
}

function llamarTelefono() {
  const telefono = '+56982218804';
  
  Swal.fire({
    title: '📞 Llamar por Teléfono',
    html: `¿Deseas llamar al <strong>${telefono}</strong>?<br><br><small>Esta función depende de tu dispositivo.</small>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '📞 Llamar Ahora',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `tel:${telefono}`;
      Swal.fire({
        title: 'Iniciando llamada... 📞',
        text: 'Se está iniciando la llamada en tu dispositivo.',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  });
}

function verUbicacion() {
  const ubicacion = 'Santiago, Chile';
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(ubicacion)}`;
  
  Swal.fire({
    title: '📍 Ver Ubicación',
    html: `¿Deseas ver nuestra ubicación en Google Maps?<br><br><strong>Ubicación:</strong> ${ubicacion}<br><small>Cobertura en todo Chile</small>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '🗺️ Abrir Maps',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(googleMapsUrl, '_blank');
      Swal.fire({
        title: 'Abriendo Google Maps... 🗺️',
        text: 'Google Maps se está abriendo en una nueva ventana.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  });
}
