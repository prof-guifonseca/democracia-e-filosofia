// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

// Navigation Menu Toggle
function toggleNavMenu() {
    navMenu.classList.toggle('show');
    document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : 'auto';
}

// Event Listeners for Navigation
if (navToggle) {
    navToggle.addEventListener('click', toggleNavMenu);
}

if (navClose) {
    navClose.addEventListener('click', toggleNavMenu);
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            toggleNavMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        toggleNavMenu();
    }
});

// Header Scroll Effect
function handleHeaderScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY >= 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.etapa-card, .oficina-card, .personagem-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-on-scroll');
        }
    });
}

// Character Card Interactions
function initializeCharacterCards() {
    const personagemCards = document.querySelectorAll('.personagem-card');
    
    personagemCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            const personagem = this.getAttribute('data-personagem');
            const name = this.querySelector('.personagem-card__name').textContent;
            const concept = this.querySelector('.personagem-card__concept').textContent;
            
            // Create a subtle feedback effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Store favorite characters in memory (not localStorage as per instructions)
            if (!window.favoriteCharacters) {
                window.favoriteCharacters = new Set();
            }
            
            if (window.favoriteCharacters.has(personagem)) {
                window.favoriteCharacters.delete(personagem);
                console.log(`Removido dos favoritos: ${name}`);
            } else {
                window.favoriteCharacters.add(personagem);
                console.log(`Adicionado aos favoritos: ${name} - ${concept}`);
            }
            
            updateFavoriteVisuals();
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.personagem-card__avatar');
            const name = this.querySelector('.personagem-card__name');
            
            avatar.style.transform = 'scale(1.2) rotateY(15deg)';
            name.style.color = 'var(--color-azul)';
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.personagem-card__avatar');
            const name = this.querySelector('.personagem-card__name');
            
            avatar.style.transform = '';
            name.style.color = '';
        });
    });
}

// Update visual indicators for favorite characters
function updateFavoriteVisuals() {
    const personagemCards = document.querySelectorAll('.personagem-card');
    
    personagemCards.forEach(card => {
        const personagem = card.getAttribute('data-personagem');
        
        if (window.favoriteCharacters && window.favoriteCharacters.has(personagem)) {
            card.style.borderColor = 'var(--color-azul)';
            card.style.boxShadow = '0 0 20px rgba(0, 119, 190, 0.3)';
        } else {
            card.style.borderColor = 'transparent';
            card.style.boxShadow = '';
        }
    });
}

// Methodology Cards Interaction
function initializeMethodologyCards() {
    const etapaCards = document.querySelectorAll('.etapa-card');
    
    etapaCards.forEach(card => {
        card.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            const title = this.querySelector('.etapa-card__title').textContent;
            
            // Visual feedback
            this.style.transform = 'translateY(-12px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            console.log(`Etapa ${step} selecionada: ${title}`);
        });
    });
}

// Workshop Cards Interaction
function initializeWorkshopCards() {
    const oficinaCards = document.querySelectorAll('.oficina-card');
    
    oficinaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Download Button Functionality
function initializeDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            this.style.transform = 'translateY(-4px) scale(0.98)';
            this.innerHTML = '📚 Preparando download...';
            
            setTimeout(() => {
                this.innerHTML = '📚 Baixar Livro Gratuito';
                this.style.transform = '';
                
                // Simulate download (replace with actual download logic)
                alert('Em breve o download será iniciado! Obrigado pelo seu interesse na Casa da Democracia.');
            }, 1500);
        });
    }
}

// Social Sharing
function initializeSocialSharing() {
    const socialLinks = document.querySelectorAll('.social-link');
    const pageTitle = 'A Casa da Democracia, Casa do Povo - Práticas Filosóficas sobre a Democracia';
    const pageUrl = window.location.href;
    
    socialLinks.forEach(link => {
        const platform = link.textContent.toLowerCase();
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' - ' + pageUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Smooth Scroll Enhancement
function enhanceSmoothScroll() {
    // Add easing to existing smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Typing Effect for Hero Quote
function initializeTypingEffect() {
    const quote = document.querySelector('.hero__quote');
    
    if (quote) {
        const text = quote.textContent;
        quote.textContent = '';
        quote.style.borderLeft = '4px solid var(--color-branco)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                quote.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize Everything
function initializeApp() {
    // Initialize all interactive features
    initializeCharacterCards();
    initializeMethodologyCards();
    initializeWorkshopCards();
    initializeDownloadButton();
    initializeSocialSharing();
    enhanceSmoothScroll();
    initializeParallaxEffect();
    initializeTypingEffect();
    
    // Initial scroll animations
    animateOnScroll();
    updateActiveNavLink();
    
    console.log('🏠 Casa da Democracia - Aplicação inicializada com sucesso!');
    console.log('✨ Recursos disponíveis: Navegação responsiva, animações, cards interativos, favoritos');
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleHeaderScroll();
    updateActiveNavLink();
    animateOnScroll();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
        toggleNavMenu();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize when page is fully loaded
window.addEventListener('load', () => {
    // Add loading complete class for additional animations
    document.body.classList.add('loaded');
    
    // Preload any dynamic content
    console.log('📚 Página carregada completamente - Pronto para interação!');
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    handleHeaderScroll();
    updateActiveNavLink();
    animateOnScroll();
}, 16); // ~60fps

window.removeEventListener('scroll', () => {
    handleHeaderScroll();
    updateActiveNavLink();
    animateOnScroll();
});

window.addEventListener('scroll', throttledScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        toggleNavMenu();
    }
});

// Add focus management for keyboard navigation
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to mobile menu when open
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === navMenu && mutation.type === 'attributes') {
            if (navMenu.classList.contains('show')) {
                trapFocus(navMenu);
                // Focus first link when menu opens
                const firstLink = navMenu.querySelector('.nav__link');
                if (firstLink) firstLink.focus();
            }
        }
    });
});

observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });