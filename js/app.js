/* ==========================================
   APP INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    const progressBar = document.getElementById("progress-bar");
    const loader = document.getElementById("loader");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    /* ==========================================
       LOADER — fast hide, session-aware
    ========================================== */

    if (loader) {
        if (sessionStorage.getItem("loaderShown")) {
            loader.classList.add("hide");
        } else {
            sessionStorage.setItem("loaderShown", "true");
            setTimeout(() => loader.classList.add("hide"), 900);
        }
    }

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const setMenuOpen = (open) => {
        if (!hamburger || !navMenu) return;
        hamburger.classList.toggle("active", open);
        navMenu.classList.toggle("active", open);
        hamburger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            setMenuOpen(!navMenu.classList.contains("active"));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setMenuOpen(false);
        }
    });

    /* ==========================================
       SCROLL — single rAF-throttled handler
    ========================================== */

    let scrollTicking = false;

    const onScroll = () => {
        const scrollY = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", scrollY > 50);
        }

        if (progressBar) {
            const scrollHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const progress = scrollHeight > 0
                ? Math.round((scrollY / scrollHeight) * 100)
                : 0;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute("aria-valuenow", String(progress));
        }

        let current = "";
        sections.forEach((section) => {
            if (scrollY >= section.offsetTop - 120) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                onScroll();
                scrollTicking = false;
            });
        }
    }, { passive: true });

    onScroll();


    /* ==========================================
       SCROLL REVEAL — Intersection Observer
    ========================================== */

    if (!prefersReducedMotion) {

        const fadeElements = document.querySelectorAll(".fade-up:not(.active)");

        const fadeObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        fadeElements.forEach((element) => fadeObserver.observe(element));

    } else {
        document.querySelectorAll(".fade-up").forEach((el) => {
            el.classList.add("active");
        });
    }

    /* ==========================================
       LAZY IMAGES — native + fallback
    ========================================== */

    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
        img.decoding = "async";
    });

});
