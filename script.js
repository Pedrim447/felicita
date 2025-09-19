// ===== VARIÁVEIS GLOBAIS =====
let mobileMenuOpen = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
   
    initializeScrollEffects();
    initializeButtonEffects();
    initializeLazyLoading();
});

// ===== MENU MOBILE =====
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.nav-mobile');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ===== NAVEGAÇÃO SUAVE =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Fechar menu mobile se estiver aberto
    if (mobileMenuOpen) {
        toggleMobileMenu();
    }
}

// ===== WHATSAPP =====
function handleWhatsAppContact(type = 'geral') {
    const messages = {
        'geral': "Olá! Gostaria de saber mais sobre as cestas de café da manhã da Felicita Box.",
        'pedido': "Olá! Gostaria de fazer um pedido de cesta de café da manhã.",
        'Cesta Premium': "Olá! Gostaria de saber mais sobre a Cesta Premium da Felicita Box.",
        'Cesta Deluxe': "Olá! Gostaria de saber mais sobre a Cesta Deluxe da Felicita Box.",
        'Cesta Personalizada': "Olá! Gostaria de solicitar uma cesta personalizada da Felicita Box."
    };
    
    const phone = "5598989299728";
    const message = messages[type] || messages['geral'];
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
}

// ===== GOOGLE MAPS =====
function openMaps() {
    const address = "Outeiro da Cruz, São Luís MA, 65035-520, Brasil";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    // Efeito do header no scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 90) {
            header.style.background = 'hsl(var(--background) / 0.98)';
            header.style.boxShadow = '0 2px 20px hsl(var(--primary) / 0.1)';
        } else {
            header.style.background = 'hsl(var(--background) / 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Efeito parallax no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.home');
        
        if (heroBackground && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== ANIMAÇÕES DE ENTRADA =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.about-card, .product-card, .info-card, .action-card, .contact-info-card, .contact-cta-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== EFEITOS DOS BOTÕES =====
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Efeito ripple ao clicar
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Hover nos cards de produto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Fade in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.style.opacity = '1';
                };
                tempImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== SMOOTH SCROLL POLYFILL =====
// Para navegadores mais antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    function smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Sobrescrever a função scrollToSection para navegadores antigos
    const originalScrollToSection = scrollToSection;
    scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            smoothScrollTo(element);
        }
        
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    };
}

// ===== UTILITÁRIOS =====
// Debounce function para performance
function debounce(func, wait) {
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

// Aplicar debounce no scroll para melhor performance
const debouncedScrollHandler = debounce(function() {
    // Scroll handlers aqui se necessário
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ANALYTICS E TRACKING =====
// Tracking de cliques nos botões do WhatsApp
document.addEventListener('click', function(e) {
    if (e.target.closest('[onclick*="handleWhatsAppContact"]')) {
        // Aqui você pode adicionar tracking analytics
        console.log('WhatsApp button clicked');
    }
});

// ===== ACESSIBILIDADE =====
// Navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu mobile
    if (e.key === 'Escape' && mobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Enter para ativar botões com foco
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// ===== DETECÇÃO DE DISPOSITIVO =====
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
window.addEventListener('resize', debounce(function() {
    if (!isMobile() && mobileMenuOpen) {
        toggleMobileMenu();
    }
}, 250));

// ===== FALLBACKS =====
// Fallback para navegadores sem suporte a IntersectionObserver
if (!window.IntersectionObserver) {
    const fallbackElements = document.querySelectorAll(
        '.about-card, .product-card, .info-card, .action-card, .contact-info-card'
    );
    
    fallbackElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// ===== CSS ADICIONAL VIA JAVASCRIPT =====
// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    /* Melhorar foco para acessibilidade */
    .btn:focus-visible,
    button:focus-visible {
        outline: 2px solid hsl(var(--accent));
        outline-offset: 2px;
    }
    
    /* Hover suave nos links */
    a {
        transition: var(--transition-smooth);
    }
`;
document.head.appendChild(style);