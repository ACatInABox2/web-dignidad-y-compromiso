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
            if (id === "Eventos") {
                initializeEventsButton();
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

function initializeEventsButton() {
    const showMoreBtn = document.getElementById('show-more-events');
    const hiddenEvents = document.querySelectorAll('.hidden-event');
    const btnText = showMoreBtn ? showMoreBtn.querySelector('.btn-text') : null;
    
    if (!showMoreBtn) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // Mostrar eventos ocultos
            hiddenEvents.forEach(event => {
                event.style.display = 'block';
            });
            btnText.textContent = 'Ver menos eventos';
            showMoreBtn.classList.add('expanded');
            isExpanded = true;
        } else {
            // Ocultar eventos
            hiddenEvents.forEach(event => {
                event.style.display = 'none';
            });
            btnText.textContent = 'Ver más eventos';
            showMoreBtn.classList.remove('expanded');
            isExpanded = false;
        }
    });
}

// Función global para expandir detalles de candidatos
function toggleCandidateDetails(button) {
    const candidateCard = button.closest('.candidate-card');
    const expandedSection = candidateCard.querySelector('.candidate-details-expanded');
    
    // Agregar botón de cerrar si no existe
    if (!expandedSection.querySelector('.close-modal')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => closeCandidateModal(closeBtn);
        expandedSection.querySelector('.expanded-content').appendChild(closeBtn);
    }
    
    expandedSection.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar el modal
function closeCandidateModal(closeBtn) {
    const expandedSection = closeBtn.closest('.candidate-details-expanded');
    expandedSection.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Función para expandir detalles de eventos
function toggleEventDetails(button) {
    const eventCard = button.closest('.event-card');
    const eventTitle = eventCard.querySelector('.event-title').textContent;
    const eventDescription = eventCard.querySelector('.event-description').textContent;
    const eventLocation = eventCard.querySelector('.event-location').textContent;
    const eventTime = eventCard.querySelector('.event-time').textContent;
    const eventImage = eventCard.querySelector('.event-img').src;
    
    // Crear modal para eventos
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="event-modal-content">
            <button class="close-modal" onclick="closeEventModal(this)">×</button>
            <div class="event-modal-grid">
                <div class="event-modal-image">
                    <img src="${eventImage}" alt="${eventTitle}" class="event-modal-img">
                </div>
                <div class="event-modal-info">
                    <h2>${eventTitle}</h2>
                    <p class="event-modal-description">${eventDescription}</p>
                    <div class="event-modal-meta">
                        <p><strong>📍 Ubicación:</strong> ${eventLocation.replace('📍 ', '')}</p>
                        <p><strong>🕒 Horario:</strong> ${eventTime.replace('🕒 ', '')}</p>
                    </div>
                    <div class="event-modal-actions">
                        <button class="event-register-btn">Registrarse</button>
                        <button class="event-share-btn">Compartir</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de eventos
function closeEventModal(closeBtn) {
    const modal = closeBtn.closest('.event-modal');
    modal.remove();
    document.body.style.overflow = 'auto';
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

