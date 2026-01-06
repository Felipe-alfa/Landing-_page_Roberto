/* ========================================
   LANDING PAGE - DR. ROBERTO AQUINO
   JavaScript para Interatividade
   ======================================== */

// ========================================
// MENU MOBILE - Toggle
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    
    // Trocar ícone do menu
    const icon = menuToggle.querySelector('i');
    if (navMobile.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ========================================
// FECHAR MENU AO CLICAR EM LINK
// ========================================
const navLinks = document.querySelectorAll('.nav-mobile .nav-link, .nav-mobile .btn');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========================================
// SCROLL SUAVE PARA ÂNCORAS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HEADER - Sombra ao rolar página
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// ANIMAÇÃO AO SCROLL - Elementos aparecem
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Opcional: parar de observar após animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os elementos com classe 'animate-on-scroll'
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// BOTÃO WHATSAPP FLUTUANTE - Aparecer
// ========================================
const floatingWhatsapp = document.getElementById('floatingWhatsapp');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingWhatsapp.style.opacity = '1';
        floatingWhatsapp.style.visibility = 'visible';
    } else {
        floatingWhatsapp.style.opacity = '0';
        floatingWhatsapp.style.visibility = 'hidden';
    }
});

// Inicialmente oculto
floatingWhatsapp.style.opacity = '0';
floatingWhatsapp.style.visibility = 'hidden';
floatingWhatsapp.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

// ========================================
// ANO ATUAL NO FOOTER
// ========================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ========================================
// DELAY NAS ANIMAÇÕES DOS CARDS
// ========================================
// As animações já usam a variável CSS --delay
// Mas podemos adicionar mais controle aqui se necessário

document.querySelectorAll('[style*="--delay"]').forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
});

// ========================================
// PRELOAD - Suavizar carregamento
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// FORMULÁRIO DE CONTATO (Opcional)
// Adicione esta funcionalidade se criar um formulário
// ========================================
/*
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Dados do formulário:', data);
        
        // Aqui você pode enviar para um backend ou serviço de email
        // Exemplo: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}
*/

// ========================================
// LAZY LOADING DE IMAGENS (Otimização)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Para usar lazy loading, adicione data-src no lugar de src nas imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// PREVENIR SCROLL HORIZONTAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});

// ========================================
// ACTIVE LINK NO MENU (Opcional)
// Destacar link ativo baseado na seção visível
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// ========================================
// PERFORMANCE - Throttle para eventos de scroll
// ========================================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle aos eventos de scroll
const throttledScroll = throttle(() => {
    highlightActiveLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ========================================
// LOG DE INICIALIZAÇÃO
// ========================================
console.log('✅ Landing Page Dr. Roberto Aquino carregada com sucesso!');
console.log('📝 Para editar conteúdo, veja os comentários no HTML');
console.log('🎨 Para editar estilos, veja o arquivo style.css');
