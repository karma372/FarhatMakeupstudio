document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. Navbar Scroll Effect --- */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* --- 2. Mobile Navigation Toggle --- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navOverlay = document.querySelector(".nav-overlay");

    if (menuToggle && navOverlay) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navOverlay.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
        });
    }

    window.toggleMenu = function() {
        if (menuToggle && navOverlay) {
            menuToggle.classList.remove("active");
            navOverlay.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    };

    /* --- 3. Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll("section, .feature-item, .service-card, .gallery-item");
    revealElements.forEach(el => el.classList.add("reveal"));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 130; 

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger initial check on load

    /* --- 4. Lightbox Gallery Expansion System --- */
    const lightboxMarkup = `
        <div id="lightbox" class="lightbox">
            <span class="close-lightbox">&times;</span>
            <img class="lightbox-content" id="lightbox-img" src="" alt="Expanded View">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxMarkup);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    const galleryItems = document.querySelectorAll(".gallery-item img");

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(img => {
            img.parentElement.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; 
            });
        });

        const hideLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        closeLightbox.addEventListener("click", hideLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) hideLightbox();
        });
    }

    /* --- 5. Custom Booking Handler --- */
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const message = document.getElementById("message").value.trim();

            if (!name || !phone || !service || !date) {
                alert("Please fill in all required fields.");
                return;
            }

            alert(`✅ Thank you, ${name}! \nYour appointment for ${service} on ${date} is noted. \nWe will review and call you on ${phone} shortly to confirm.`);

            const waMessage = `Hi Farhat Makeup Studio! %0A%0A*Booking Request*%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Date:* ${date}%0A*Message:* ${message}`;
            const waLink = `https://wa.me/916201039513?text=${waMessage}`;
            
            if (confirm("Send this appointment sheet confirmation directly via WhatsApp for faster approval?")) {
                window.open(waLink, "_blank");
            }

            appointmentForm.reset();
        });
    }

    /* --- 6. Smooth Scroll Fix for Offset --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
