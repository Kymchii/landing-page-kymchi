document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".nav-container");
    if (window.scrollY > 50) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    function updateActiveNav() {
        const navLinks = document.querySelectorAll(".nav-list a");
        const currentHash = window.location.hash;

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentHash) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    updateActiveNav();

    window.addEventListener("hashchange", updateActiveNav);
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-list a");

    const observerOptions = {
        root: null, 
        rootMargin: "-50px 0px -50px 0px",
        threshold: 0.1,
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`.nav-list a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => observer.observe(section));

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
});

//Toggler navbar
const toggler = document.querySelector('.nav-toggler');
const menu = document.querySelector('.nav-list');
const icon = document.querySelector(".nav-container i")

toggler.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('active');
    const isActive = menu.classList.contains('active')

    icon.className = isActive
    ? 'bi bi-x-lg' : 'bi bi-list';
});