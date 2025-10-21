// VIN Validation and Report Generation
document.addEventListener('DOMContentLoaded', function() {
    // Get all report buttons and VIN input
    const headerReportBtn = document.getElementById('header-report-btn');
    const heroReportBtn = document.getElementById('hero-report-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const vinSubmitBtn = document.getElementById('vin-submit-btn');
    const vinInput = document.querySelector('.vin-input');
    const vinForm = document.querySelector('.vin-form');
    const vinSection = document.querySelector('.vin-section');

    // VIN validation function
    function validateVIN(vin) {
        // Remove any spaces and convert to uppercase
        vin = vin.replace(/\s/g, '').toUpperCase();
        
        // Check if VIN is exactly 17 characters
        if (vin.length !== 17) {
            return { valid: false, message: 'VIN must be exactly 17 characters long' };
        }
        
        // Check if VIN contains only valid characters (no I, O, Q)
        const validChars = /^[A-HJ-NPR-Z0-9]{17}$/;
        if (!validChars.test(vin)) {
            return { valid: false, message: 'VIN contains invalid characters (I, O, Q not allowed)' };
        }
        
        return { valid: true, vin: vin };
    }

    // Show VIN section and scroll to it
    function showVINSection() {
        vinSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on VIN input after scrolling
        setTimeout(() => {
            vinInput.focus();
        }, 800);
    }

    // Process VIN and generate report
    function processVIN(vin) {
        const validation = validateVIN(vin);
        
        if (!validation.valid) {
            showError(validation.message);
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            hideLoading();
            generateReport(validation.vin);
        }, 2000);
    }

    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background-color: #ff4444;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-top: 15px;
            font-weight: 500;
            text-align: center;
            animation: slideDown 0.3s ease;
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Insert error message after the form
        vinForm.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Show loading state
    function showLoading() {
        vinSubmitBtn.disabled = true;
        vinSubmitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
        
        // Add loading spinner CSS
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #ffffff;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
                margin-right: 8px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Hide loading state
    function hideLoading() {
        vinSubmitBtn.disabled = false;
        vinSubmitBtn.innerHTML = 'Get Report';
    }

    // Generate report (simulate)
    function generateReport(vin) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="background-color: #4CAF50; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Report Generated Successfully!</h3>
                <p style="margin: 0 0 15px 0; opacity: 0.9;">VIN: ${vin}</p>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">
                    Your vehicle history report is ready. 
                    <a href="#" style="color: #fff; text-decoration: underline;">Download Report</a>
                </p>
            </div>
        `;
        
        // Insert success message after the form
        vinForm.appendChild(successDiv);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Clear the VIN input
        vinInput.value = '';
    }

    // Event listeners
    headerReportBtn.addEventListener('click', function() {
        showVINSection();
    });

    heroReportBtn.addEventListener('click', function() {
        showVINSection();
    });

    learnMoreBtn.addEventListener('click', function() {
        showVINSection();
    });

    vinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const vin = vinInput.value.trim();
        
        if (!vin) {
            showError('Please enter a VIN number');
            return;
        }
        
        processVIN(vin);
    });

    // Real-time VIN formatting
    vinInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        
        // Remove invalid characters
        value = value.replace(/[^A-HJ-NPR-Z0-9]/g, '');
        
        // Limit to 17 characters
        if (value.length > 17) {
            value = value.substring(0, 17);
        }
        
        e.target.value = value;
        
        // Remove error message when user starts typing
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    });

    // Add visual feedback for VIN input
    vinInput.addEventListener('focus', function() {
        this.style.borderColor = '#FFA500';
        this.style.boxShadow = '0 0 0 3px rgba(255, 165, 0, 0.2)';
    });

    vinInput.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (vinInput === document.activeElement) {
                vinForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Demo Report Button
    const demoReportBtn = document.getElementById('demo-report-btn');
    if (demoReportBtn) {
        demoReportBtn.addEventListener('click', function() {
            // Show loading state
            this.disabled = true;
            this.innerHTML = '<span class="loading-spinner"></span> Downloading...';
            
            // Simulate download
            setTimeout(() => {
                // Create a demo report download
                const demoContent = `
VIN RECORD CAR REPORT - DEMO
============================

Vehicle Information:
VIN: DEMO12345678901234
Make: Toyota
Model: Camry
Year: 2020
Color: Silver

Report Generated: ${new Date().toLocaleDateString()}

This is a demo report showing the format and information 
that would be included in a full vehicle history report.

For a complete report, please enter a valid VIN number.
                `;
                
                // Create and trigger download
                const blob = new Blob([demoContent], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'vin-record-demo-report.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                // Reset button
                this.disabled = false;
                this.innerHTML = 'Download Demo Report';
                
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'demo-success-message';
                successDiv.innerHTML = `
                    <div style="background-color: #4CAF50; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
                        <strong>Demo Report Downloaded!</strong><br>
                        Check your downloads folder for the demo file.
                    </div>
                `;
                
                this.parentNode.appendChild(successDiv);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successDiv.parentNode) {
                        successDiv.remove();
                    }
                }, 5000);
                
            }, 1500);
        });
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Add keyboard support for FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make FAQ items focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });

    // Update aria-expanded when FAQ items open/close
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const question = mutation.target.querySelector('.faq-question');
                const isActive = mutation.target.classList.contains('active');
                question.setAttribute('aria-expanded', isActive.toString());
            }
        });
    });

    faqItems.forEach(item => {
        observer.observe(item, { attributes: true });
    });

    // Navigation Functionality
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const footerLinks = document.querySelectorAll('.footer-link[data-section]');
    const allNavLinks = [...navLinks, ...footerLinks];

    // Smooth scrolling function
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Update active navigation link
    function updateActiveNavLink(activeSection) {
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    }

    // Handle navigation clicks
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            smoothScrollTo(targetSection);
            updateActiveNavLink(targetSection);
        });
    });

    // Scroll spy - update active nav based on scroll position
    function handleScrollSpy() {
        const sections = ['home', 'how-to', 'why-us', 'faq'];
        const scrollPosition = window.scrollY + 100;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && scrollPosition >= section.offsetTop) {
                updateActiveNavLink(sections[i]);
                break;
            }
        }
    }

    // Throttled scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScrollSpy, 10);
    });

    // Privacy Policy Modal
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPrivacyPolicyModal();
        });
    }

    function showPrivacyPolicyModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;

        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #000000; font-size: 1.5rem;">Privacy Policy</h2>
                <button id="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
            </div>
            <div style="color: #333; line-height: 1.6;">
                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                
                <h3>Information Sharing</h3>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                
                <h3>Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at info@thevinrecord.com</p>
            </div>
        `;

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        // Close modal functionality
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });

        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(modalOverlay)) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // Payment method interactions
    const paymentLogos = document.querySelectorAll('.payment-logo');
    paymentLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            const paymentType = this.classList[1]; // visa, mastercard, etc.
            showPaymentInfo(paymentType);
        });
    });

    function showPaymentInfo(paymentType) {
        const paymentNames = {
            'visa': 'Visa',
            'mastercard': 'MasterCard',
            'discover': 'Discover',
            'amex': 'American Express'
        };

        const paymentDescriptions = {
            'visa': 'We accept Visa credit and debit cards for secure payments.',
            'mastercard': 'MasterCard payments are processed securely through our payment gateway.',
            'discover': 'Discover card payments are accepted with full security protection.',
            'amex': 'American Express cards are welcome for all transactions.'
        };

        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        toast.innerHTML = `
            <strong>${paymentNames[paymentType]}</strong><br>
            ${paymentDescriptions[paymentType]}
        `;

        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Initialize scroll spy on page load
    handleScrollSpy();
});
