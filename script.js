/**
 * Portfolio Website - JavaScript
 * Handles navigation, dropdowns, active page indicators, and scroll animations
 */

// ============================================
// ACTIVE PAGE INDICATOR
// ============================================

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && (href === 'index.html' || href === ''))) {
            link.classList.add('active');
        }
    });
}

// ============================================
// DROPDOWN MENU FUNCTIONALITY
// ============================================

/**
 * Initialize dropdown menus with hover and click functionality
 */
function initDropdowns() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (!dropdown) return;
        
        const navLink = item.querySelector('.nav-link');
        
        // Handle hover for desktop
        let hoverTimeout;
        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }, 200);
        });
        
        // Handle click for mobile (optional enhancement)
        navLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isVisible = dropdown.style.visibility === 'visible';
                dropdown.style.opacity = isVisible ? '0' : '1';
                dropdown.style.visibility = isVisible ? 'hidden' : 'visible';
                dropdown.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            });
        }
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

/**
 * Intersection Observer for scroll-triggered animations
 * Adds 'visible' class to elements when they enter viewport
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .featured-card, .small-card, .about-content, .skills-container, .experience-item, .contact-content, .project-item, .page-title'
    );

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

/**
 * Enhanced smooth scrolling for anchor links
 * Adds offset for fixed headers
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash or just '#'
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100; // Offset from top in pixels (for fixed header)
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PAGE TRANSITIONS (Optional Enhancement)
// ============================================

/**
 * Add smooth page transition effect
 */
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"], a[href="/"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply transition for same-origin navigation
            if (this.hostname === window.location.hostname || !this.hostname) {
                // Add fade-out effect (optional)
                document.body.style.opacity = '0.95';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 100);
            }
        });
    });
}

// ============================================
// MOBILE MENU (Future Enhancement)
// ============================================

/**
 * Initialize mobile menu toggle (if needed in future)
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// ============================================
// MICRO-INTERACTIONS
// ============================================

/**
 * Add subtle hover effects and micro-interactions
 */
function initMicroInteractions() {
    // Add smooth transitions to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add subtle glow effect on project cards
    const projectCards = document.querySelectorAll('.project-card, .project-item');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Glow effect is handled by CSS
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    initDropdowns();
    initScrollReveal();
    initSmoothScroll();
    initPageTransitions();
    initMobileMenu();
    initMicroInteractions();
    
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize page title animations
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        setTimeout(() => {
            pageTitle.classList.add('visible');
        }, 100);
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Throttle function for scroll events (if needed in future)
 */
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

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if element is in viewport
 * Can be used for custom animations if needed
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function for resize events
 */
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

// Handle window resize for responsive dropdowns
window.addEventListener('resize', debounce(() => {
    // Reset dropdowns on resize
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (window.innerWidth > 768) {
            dropdown.style.opacity = '';
            dropdown.style.visibility = '';
            dropdown.style.transform = '';
        }
    });
}, 250));

/*---------------------------------
   About image scroll effect     
----------------------------------*/ 
window.addEventListener('scroll', () => {
    const container = document.getElementById('morphContainer');
    const photo = document.getElementById('photoLayer');
    
    if (!container) return;

    const rect = container.getBoundingClientRect();
    
    // Trigger when the top of the container is 20% from the top of the screen
    if (rect.top < window.innerHeight * 0.20) {
        photo.classList.add('active');
    } else {
        photo.classList.remove('active');
    }
});

/*----------------------------------
    Hamburger menubar for mobile
------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('nav-container');

// Toggle Menu and X Animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navContainer.classList.toggle('active');
});

// Close menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navContainer.classList.remove('active');
    });
});

/*----------------------------------
    MUSIC SWAP ICONS
------------------------------------- */

const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

// Update duration as soon as it's available
audio.addEventListener('loadedmetadata', () => {
    setDuration();
});

// Backup: sometimes loadedmetadata fires before the bar is ready
if (audio.readyState >= 1) {
    setDuration();
}

function setDuration() {
    seekBar.max = audio.duration;
    totalTimeDisplay.innerHTML = formatTime(audio.duration);
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "||";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }
}

// Highly accurate time updates
audio.addEventListener('timeupdate', () => {
    if (!audio.paused) {
        seekBar.value = audio.currentTime;
        currentTimeDisplay.innerHTML = formatTime(audio.currentTime);
    }
});

// Manual Seek (Drag/Rewind)
function handleSeek() {
    audio.currentTime = seekBar.value;
    currentTimeDisplay.innerHTML = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? '0' + sec : sec);
}