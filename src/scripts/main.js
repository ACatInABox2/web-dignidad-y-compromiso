const firma_digital = {
    nombre: "Santiago Torres",
    email: "santiagomh912@gmail.com",
    telefono: "+57 3216166273",
    cargo: "Desarrollador Web",
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(firma_digital);
    includeComponent("header", "./components/header.html");
    includeComponent("footer", "./components/footer.html");
    includeComponent("Información", "./components/card.html");
    includeComponent("Ideología", "./components/ideologia.html");
    includeComponent("Candidatos", "./components/candidatos.html");
    includeComponent("Eventos", "./components/eventos.html");
    includeComponent("Contacto", "./components/contacto.html");
    
    // Inicializar navegación después de cargar el header
    setTimeout(() => {
        initializeNavigation();
    }, 100);
});

function includeComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    fetch(file)
        .then(res => res.text())
        .then(html => {
            element.innerHTML = html;
            // Inicializar funcionalidades después de cargar componentes
            if (id === "Candidatos") {
                initializeCandidatesButton();
            }
            if (id === "Contacto") {
                initializeContactForm();
            }
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
}

function initializeCandidatesButton() {
    const showMoreBtn = document.getElementById('show-more-candidates');
    const hiddenCandidates = document.querySelectorAll('.hidden-candidate');
    const btnText = document.querySelector('.btn-text');
    
    if (!showMoreBtn) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // Mostrar candidatos ocultos
            hiddenCandidates.forEach(candidate => {
                candidate.style.display = 'block';
            });
            btnText.textContent = 'Ver menos candidatos';
            showMoreBtn.classList.add('expanded');
            isExpanded = true;
        } else {
            // Ocultar candidatos
            hiddenCandidates.forEach(candidate => {
                candidate.style.display = 'none';
            });
            btnText.textContent = 'Ver más candidatos';
            showMoreBtn.classList.remove('expanded');
            isExpanded = false;
        }
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }
        
        // Simular envío (aquí se conectaría con un backend real)
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto sticky al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menú hamburger para móviles
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Ajustar por la altura de la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

