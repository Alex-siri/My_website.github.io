document.addEventListener('DOMContentLoaded', () => {
    console.log("Alex Gym JavaScript is successfully running!");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    const navMenu = document.querySelector('.menu');
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector('i') : null;
    
    // Hamburger Menu Toggle
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and X
            if (navMenu.classList.contains('active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-times');
            } else {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Close mobile menu if it's open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if(hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            }

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Start your journey button
    const startJourneyBtn = document.querySelector('#home .btn');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }

    // BMI Calculator Logic
    const bmiBtn = document.getElementById('bmi-btn');
    if (bmiBtn) {
        bmiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const height = parseFloat(document.getElementById('bmi-height').value) / 100; // cm to m
            const resultDiv = document.getElementById('bmi-result');

            if (weight > 0 && height > 0) {
                const bmi = (weight / (height * height)).toFixed(1);
                let category, color;

                if (bmi < 18.5) {
                    category = "Underweight";
                    color = "#3498db"; // Blue
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    category = "Normal Weight";
                    color = "#2ecc71"; // Green
                } else if (bmi >= 25 && bmi <= 29.9) {
                    category = "Overweight";
                    color = "#f1c40f"; // Yellow
                } else {
                    category = "Obese";
                    color = "#e74c3c"; // Red
                }

                resultDiv.style.display = "block";
                resultDiv.style.color = color;
                resultDiv.innerHTML = `Your BMI: ${bmi} <br> <span style="font-size: 1.2rem;">Status: ${category}</span>`;
            } else {
                resultDiv.style.display = "block";
                resultDiv.style.color = "var(--text-main)";
                resultDiv.innerHTML = "Please enter valid numbers!";
            }
        });
    }

    // Contact form submission handling
    const contactFormBtn = document.getElementById('form-btn');
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            const successDiv = document.getElementById('form-success');
            const errorDiv = document.getElementById('form-error');

            if (name && email && subject && message) {
                // Change button text while loading
                contactFormBtn.innerText = 'SENDING...';
                contactFormBtn.disabled = true;

                // Send data to our new backend API using fetch
                fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, subject, message }),
                })
                .then(response => response.json())
                .then(data => {
                    // Form is valid and processed by backend
                    errorDiv.style.display = 'none';
                    successDiv.style.display = 'block';
                    
                    // Reset button
                    contactFormBtn.innerText = 'SEND MESSAGE';
                    contactFormBtn.disabled = false;
                    
                    // Clear the inputs
                    document.getElementById('contact-name').value = '';
                    document.getElementById('contact-email').value = '';
                    document.getElementById('contact-subject').value = '';
                    document.getElementById('contact-message').value = '';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        successDiv.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    // Reset button
                    contactFormBtn.innerText = 'SEND MESSAGE';
                    contactFormBtn.disabled = false;
                    
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #e74c3c; margin-right: 10px;"></i>Server error. Make sure the backend is running!';
                    errorDiv.style.display = 'block';
                    successDiv.style.display = 'none';
                });
            } else {
                // Invalid form - missing fields
                successDiv.style.display = 'none';
                errorDiv.style.display = 'block';
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // Prepare Typewriter Elements
    const typeElements = document.querySelectorAll('.typewrite-text');
    typeElements.forEach(el => {
        // Fix height so layout doesn't jump
        const rect = el.getBoundingClientRect();
        if(rect.height > 0) el.style.minHeight = rect.height + 'px';
        
        el.dataset.originalHtml = el.innerHTML;
        el.innerHTML = '';
    });

    function typeWriterHTML(element, htmlString, index = 0) {
        if (index === 0) {
            element.innerHTML = '';
        }

        let isTag = false;
        let currentString = element.dataset.currentTyping || '';

        function type() {
            if (index < htmlString.length) {
                let char = htmlString.charAt(index);
                currentString += char;
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;
                
                element.innerHTML = htmlString.substring(0, index + 1);
                
                index++;
                if (isTag) {
                    type();
                } else {
                    setTimeout(type, 10); // Very fast typing
                }
            } else {
                 element.style.minHeight = 'auto'; // restore
            }
        }
        type();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                if (entry.target.classList.contains('typewrite-text') && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    typeWriterHTML(entry.target, entry.target.dataset.originalHtml);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
