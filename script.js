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


    // Hero Typewriter
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const textToType = "FORGE YOUR LEGACY";
        let index = 0;
        
        function typeHero() {
            if (index < textToType.length) {
                let htmlStr = "";
                for (let i = 0; i <= index; i++) {
                    if (i === 11) htmlStr += "<span>";
                    htmlStr += textToType[i];
                    if (i === index && i >= 11) htmlStr += "</span>";
                }
                heroTitle.innerHTML = htmlStr;
                index++;
                setTimeout(typeHero, 150); // Speed of typing
            }
        }
        setTimeout(typeHero, 300); // initial delay
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
