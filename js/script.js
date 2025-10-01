// === CONFIGURAÇÃO INICIAL ===
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupThemeToggle();
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupSmoothScrolling();
}

// === TEMA ESCURO/CLARO ===
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const preferredTheme = localStorage.getItem('theme') || 'dark';
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', preferredTheme);
    updateThemeIcon(preferredTheme);
    
    // Event listener para toggle
    themeToggle?.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Adicionar animação de transição
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle ion-icon');
    if (themeIcon) {
        themeIcon.setAttribute('name', theme === 'dark' ? 'sunny-outline' : 'moon-outline');
    }
}

// === NAVEGAÇÃO ===
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// === SMOOTH SCROLLING ===
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === ANIMAÇÕES DE SCROLL ===
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// === ANIMAÇÕES CUSTOMIZADAS ===
function setupAnimations() {
    // Typing animation para o título
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar após um pequeno delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax effect para elementos
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.image-decoration');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// === LOADING SCREEN ===
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-screen';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    // Remover após o carregamento
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
            }, 300);
        }, 1000);
    });
}

// === CURSOR CUSTOMIZADO (OPCIONAL) ===
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Efeitos hover
    const hoverElements = document.querySelectorAll('a, button, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// === FORMULÁRIO DE CONTATO (SE HOUVER) ===
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Aqui você pode implementar o envio do formulário
            console.log('Dados do formulário:', data);
            
            // Feedback visual
            showNotification('Mensagem enviada com sucesso!', 'success');
        });
    }
}

// === NOTIFICAÇÕES ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover automaticamente
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Botão fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// === PERFORMANCE ===
function optimizePerformance() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload de links importantes
    const importantLinks = document.querySelectorAll('a[href^="http"]');
    importantLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = this.href;
            document.head.appendChild(linkElement);
        }, { once: true });
    });
}

// === ANALYTICS (OPCIONAL) ===
function setupAnalytics() {
    // Rastreamento de cliques em botões importantes
    const trackableElements = document.querySelectorAll('.btn, .project-link, .social-links a');
    
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementText = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown';
            console.log(`Clique rastreado: ${elementText}`);
            
            // Aqui você pode enviar dados para Google Analytics, etc.
            // gtag('event', 'click', { event_category: 'button', event_label: elementText });
        });
    });
}

// === INICIALIZAÇÃO FINAL ===
// Chamar funções adicionais se necessário
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    setupAnalytics();
    
    // Adicionar cursor customizado apenas em desktop
    if (window.innerWidth > 768) {
        // setupCustomCursor(); // Descomente se quiser cursor customizado
    }
});

// === STYLES ADICIONAIS VIA JS ===
const additionalStyles = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .loading-content {
        text-align: center;
        color: var(--text-primary);
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success { background: #10b981; }
    .notification-error { background: #ef4444; }
    .notification-info { background: var(--primary-color); }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    }
    
    .custom-cursor.cursor-hover {
        transform: scale(1.5);
        background: var(--primary-light);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);