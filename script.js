document.addEventListener('DOMContentLoaded', () => {
    console.log("Alex Gym JavaScript is successfully running!");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
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
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
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

    // Contact form submission handling
    const contactFormBtn = document.querySelector('#contact .btn');
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputs = document.querySelectorAll('#contact input, #contact textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
            });

            if (isValid) {
                alert('Thank you for reaching out! We will get back to you soon.');
                inputs.forEach(input => input.value = ''); // Clear form
            } else {
                alert('Please fill out all fields before submitting.');
            }
        });
    }
});
