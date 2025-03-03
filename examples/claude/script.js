document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Typing animation for hero section
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    const textArray = [
        "echo 'Welcome to HackerHall'",
        "python3 ai_project.py",
        "npm run build:automation",
        "git push origin main",
        "./launch_ai_game.sh"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Pause at the end of sentence
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            // Move to next sentence
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 1000);
        }
    }
    
    // Start the typing animation
    setTimeout(type, 1500);
    
    // Add glitch effect to logo on hover
    const logoElement = document.querySelector('.ascii-art');
    logoElement.addEventListener('mouseover', function() {
        this.classList.add('glitch-effect');
    });
    
    logoElement.addEventListener('mouseout', function() {
        this.classList.remove('glitch-effect');
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add terminal command effect to section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('command-executed');
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // Modal functionality
    const modal = document.getElementById('subscribeModal');
    const subscribeButtons = document.querySelectorAll('.cta-button.secondary');
    const closeModal = document.querySelector('.close-modal');

    // Open modal when subscribe button is clicked
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});

// Add CSS class for glitch effect animation
document.head.insertAdjacentHTML('beforeend', `
<style>
.glitch-effect {
    animation: glitch 1s infinite;
}

.command-executed {
    position: relative;
}

.command-executed::after {
    content: " [OK]";
    color: #0f0;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    animation-delay: 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
`); 