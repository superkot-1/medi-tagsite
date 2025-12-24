// MediTag - Main JavaScript Functionality

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeTypedText();
    initializeRegistrationForm();
    initializeEmergencyModal();
    initializeTestimonialSlider();
    initializeScrollAnimations();
    initializeMobileMenu();
    
    // Initialize particle background
    initializeParticleBackground();
}

// Typed Text Animation
function initializeTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Переосмыслен',
                'Защищен',
                'Оцифрован',
                'Сохранен'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Registration Form Functionality
function initializeRegistrationForm() {
    const tagNumberInput = document.getElementById('tagNumber');
    const registrationFields = document.getElementById('registrationFields');
    const registrationForm = document.getElementById('registrationForm');
    const registerBtn = document.getElementById('registerBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const progressIndicator = document.getElementById('progressIndicator');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    let isTagVerified = false;
    
    // Tag number validation
    if (tagNumberInput) {
        tagNumberInput.addEventListener('input', function() {
            const tagNumber = this.value.trim();
            const validationElement = document.getElementById('tagValidation');
            
            // Clear previous validation
            validationElement.innerHTML = '';
            
            if (tagNumber.length === 8) {
                // Simulate validation
                validationElement.innerHTML = '<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                
                // Show registration fields after a delay
                setTimeout(() => {
                    registrationFields.classList.remove('hidden');
                    btnText.textContent = 'Complete Registration';
                    isTagVerified = true;
                    
                    // Show progress indicator
                    progressIndicator.classList.remove('hidden');
                    updateProgress();
                    
                    // Animate fields appearance
                    anime({
                        targets: '#registrationFields > div',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(100),
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                    
                }, 500);
                
            } else if (tagNumber.length > 0) {
                validationElement.innerHTML = '<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
                registrationFields.classList.add('hidden');
                btnText.textContent = 'Verify Tag Number';
                isTagVerified = false;
                progressIndicator.classList.add('hidden');
            }
        });
    }
    
    // Form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!isTagVerified) {
                showNotification('Пожалуйста, сначала введите действительный номер медицинского тега.', 'warning');
                return;
            }
            
            // Show loading state
            registerBtn.disabled = true;
            btnLoader.classList.remove('hidden');
            btnText.textContent = 'Processing...';
            
            // Simulate registration process
            setTimeout(() => {
                // Hide loading state
                registerBtn.disabled = false;
                btnLoader.classList.add('hidden');
                btnText.textContent = 'Registration Complete!';
                
                // Update progress to 100%
                updateProgress(100);
                
                // Show success message and redirect
                showNotification('Регистрация успешна! Перенаправление в личный кабинет...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'cabinet.html';
                }, 2000);
                
            }, 3000);
        });
    }
    
    // Update progress based on form completion
    function updateProgress(forcedProgress = null) {
        if (forcedProgress !== null) {
            progressBar.style.width = forcedProgress + '%';
            progressText.textContent = forcedProgress + '%';
            return;
        }
        
        const fields = registrationFields.querySelectorAll('input, textarea');
        let filledFields = 0;
        
        fields.forEach(field => {
            if (field.value.trim() !== '') {
                filledFields++;
            }
        });
        
        const progress = Math.round((filledFields / fields.length) * 100);
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
    }
    
    // Add event listeners to all form fields for progress tracking
    if (registrationFields) {
        const fields = registrationFields.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('input', updateProgress);
            field.addEventListener('change', updateProgress);
        });
    }
}

// Emergency Modal Functionality
function initializeEmergencyModal() {
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeEmergencyModal = document.getElementById('closeEmergencyModal');
    
    if (emergencyBtn && emergencyModal) {
        emergencyBtn.addEventListener('click', () => {
            emergencyModal.classList.remove('hidden');
            
            // Animate modal appearance
            anime({
                targets: emergencyModal.querySelector('.bg-white'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    }
    
    if (closeEmergencyModal && emergencyModal) {
        closeEmergencyModal.addEventListener('click', () => {
            emergencyModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        emergencyModal.addEventListener('click', (e) => {
            if (e.target === emergencyModal) {
                emergencyModal.classList.add('hidden');
            }
        });
    }
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    if (slider) {
        new Splide('#testimonialSlider', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            gap: '2rem',
            breakpoints: {
                768: {
                    gap: '1rem'
                }
            }
        }).mount();
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('card-hover')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuart',
                        delay: Math.random() * 200
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            showNotification('Mobile menu functionality - This would open a navigation menu', 'info');
        });
    }
}

// Particle Background Effect
function initializeParticleBackground() {
    // Simple particle effect using CSS animations
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(37, 99, 235, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            animation: floatUp 8s linear infinite;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    };
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Utility Functions

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function validateDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// QR Code Generation (simulated)
function generateQRCode(data) {
    // In a real application, this would generate an actual QR code
    // For demo purposes, we'll simulate it
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="white"/>
            <rect x="10" y="10" width="180" height="180" fill="black" opacity="0.1"/>
            <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12">QR CODE</text>
            <text x="100" y="120" text-anchor="middle" font-family="monospace" font-size="8">${data.substring(0, 10)}</text>
        </svg>
    `)}`;
}

// Medical Data Encryption (simulated)
function encryptMedicalData(data) {
    // In a real application, this would use proper encryption
    // For demo purposes, we'll simulate encryption
    return btoa(JSON.stringify(data));
}

function decryptMedicalData(encryptedData) {
    // In a real application, this would use proper decryption
    // For demo purposes, we'll simulate decryption
    try {
        return JSON.parse(atob(encryptedData));
    } catch (e) {
        return null;
    }
}

// Auto-save functionality
function initializeAutoSave() {
    const autoSave = (formId, callback) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        let saveTimeout;
        const saveDelay = 2000; // 2 seconds
        
        form.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Simulate saving to localStorage
                localStorage.setItem(formId + '_autosave', JSON.stringify(data));
                
                if (callback) {
                    callback(data);
                }
            }, saveDelay);
        });
    };
    
    return { autoSave };
}

// Export functions for use in other pages
window.MediTag = {
    showNotification,
    validateEmail,
    validatePhone,
    validateDate,
    generateQRCode,
    encryptMedicalData,
    decryptMedicalData,
    initializeAutoSave
};