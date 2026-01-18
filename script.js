// Wait for DOM and jQuery to be ready
$(document).ready(function() {
    
// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Creative Coder'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before starting new phrase
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
if (typingText) {
    typeText();
}

// Smooth Scroll for Navigation Links using jQuery
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
        const offsetTop = target.offset().top - 80;
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800);
        
        // Close mobile menu if open
        $('.navbar-collapse').collapse('hide');
    }
});

// Navbar Background on Scroll - handled in theme toggle section below

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $(entry.target).addClass('animated');
        }
    });
}, observerOptions);

// Observe elements for animation using jQuery
$('.skill-card, .project-card, .about-text p, .highlight-item').each(function() {
    $(this).addClass('animate-on-scroll');
    observer.observe(this);
});

// Counter Animation for Stats using jQuery
function animateCounter($element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            $element.text(target);
            clearInterval(timer);
        } else {
            $element.text(Math.floor(start));
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !$(entry.target).hasClass('counted')) {
            const target = parseInt($(entry.target).attr('data-target'));
            animateCounter($(entry.target), target);
            $(entry.target).addClass('counted');
        }
    });
}, { threshold: 0.5 });

$('.stat-number').each(function() {
    statsObserver.observe(this);
});

// Form Submission using jQuery
$('.contact-form').on('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message using Bootstrap alert
    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Thank you!</strong> Your message has been sent. I'll get back to you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    $(this).prepend(alertHtml);
    
    // Reset form
    this.reset();
    
    // Remove alert after 5 seconds
    setTimeout(function() {
        $('.alert').fadeOut(function() {
            $(this).remove();
        });
    }, 5000);
});

// Parallax Effect for Hero Section using jQuery
$(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    const hero = $('.hero');
    if (hero.length && scrolled < $(window).height()) {
        $('.gradient-orb').each(function(index) {
            const speed = (index + 1) * 0.5;
            $(this).css('transform', `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`);
        });
    }
});

// Active Navigation Link Highlighting using jQuery
function highlightNavLink() {
    const scrollY = $(window).scrollTop();
    
    $('section[id]').each(function() {
        const section = $(this);
        const sectionHeight = section.outerHeight();
        const sectionTop = section.offset().top - 100;
        const sectionId = section.attr('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            $('.nav-link').removeClass('active');
            $(`.nav-link[href="#${sectionId}"]`).addClass('active');
        }
    });
}

$(window).on('scroll', highlightNavLink);

// Skill Card Hover Effect Enhancement using jQuery
$('.skill-card').on('mouseenter', function() {
    $(this).css('transform', 'translateY(-10px) scale(1.02)');
}).on('mouseleave', function() {
    $(this).css('transform', 'translateY(0) scale(1)');
});

// Project Card Tilt Effect using jQuery
$('.project-card').on('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`);
}).on('mouseleave', function() {
    $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
});

// Cursor Trail Effect using jQuery (Optional - can be disabled if too distracting)
$(document).on('mousemove', function(e) {
    // Only show trail on hero section
    const hero = $('.hero');
    if (hero.length && e.clientY < $(window).height()) {
        const trail = $('<div>').addClass('cursor-trail').css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });
        $('body').append(trail);
        
        setTimeout(function() {
            trail.css({
                opacity: 0,
                transform: 'scale(0)'
            });
            setTimeout(function() {
                trail.remove();
            }, 300);
        }, 100);
    }
});

// Add cursor trail styles
$('<style>').text(`
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--accent-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transition: opacity 0.3s, transform 0.3s;
        transform: translate(-50%, -50%);
    }
`).appendTo('head');

// Loading Animation using jQuery
$(window).on('load', function() {
    $('body').addClass('loaded');
});

// Smooth reveal animation for sections using jQuery and Intersection Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $(entry.target).css({
                opacity: '1',
                transform: 'translateY(0)'
            });
        }
    });
}, { threshold: 0.1 });

$('section').each(function() {
    $(this).css({
        opacity: '0',
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    });
    revealObserver.observe(this);
});

// Carousel Auto-play Enhancement
$('.carousel').each(function() {
    const carousel = $(this);
    carousel.carousel({
        interval: 5000,
        pause: 'hover'
    });
    
    // Add fade effect to testimonials carousel
    if (carousel.attr('id') === 'testimonialsCarousel') {
        carousel.on('slide.bs.carousel', function() {
            $(this).find('.carousel-item').removeClass('fade-in');
        });
        carousel.on('slid.bs.carousel', function() {
            $(this).find('.carousel-item.active').addClass('fade-in');
        });
    }
});

// Initialize tooltips if Bootstrap tooltips are used
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Pricing card hover animation
$('.pricing-card').on('mouseenter', function() {
    $(this).find('.pricing-header').addClass('animate__animated animate__pulse');
}).on('mouseleave', function() {
    $(this).find('.pricing-header').removeClass('animate__animated animate__pulse');
});

// Set current year in footer
$('#currentYear').text(new Date().getFullYear());

// Theme Toggle Functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = $('#themeIcon');
    if (theme === 'light') {
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
    }
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Theme toggle button click handler
$('#themeToggle').on('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Update navbar background on scroll for light theme
$(window).on('scroll', function() {
    const currentScroll = $(window).scrollTop();
    const navbar = $('.custom-navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentScroll > 100) {
        if (currentTheme === 'dark') {
            navbar.css({
                'background': 'rgba(10, 10, 10, 0.95)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.3)'
            });
        } else {
            navbar.css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.1)'
            });
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.css({
                'background': 'rgba(10, 10, 10, 0.8)',
                'box-shadow': 'none'
            });
        } else {
            navbar.css({
                'background': 'rgba(255, 255, 255, 0.9)',
                'box-shadow': 'none'
            });
        }
    }
});

}); // End of jQuery document ready
