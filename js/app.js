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
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

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
       CUSTOM CURSOR — desktop only
    ========================================== */

    if (dot && ring && !isCoarsePointer && !prefersReducedMotion) {
        let cursorX = 0;
        let cursorY = 0;
        let ringX = 0;
        let ringY = 0;
        let cursorTicking = false;

        document.addEventListener("mousemove", (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;

            dot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

            if (!cursorTicking) {
                cursorTicking = true;
                requestAnimationFrame(function animateRing() {
                    ringX += (cursorX - ringX) * 0.18;
                    ringY += (cursorY - ringY) * 0.18;
                    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

                    if (Math.abs(cursorX - ringX) > 0.5 || Math.abs(cursorY - ringY) > 0.5) {
                        requestAnimationFrame(animateRing);
                    } else {
                        cursorTicking = false;
                    }
                });
            }
        }, { passive: true });

        document.querySelectorAll("a, button, .glass-card, .skill-pill").forEach((item) => {
            item.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
            item.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
        });
    } else if (dot && ring) {
        dot.style.display = "none";
        ring.style.display = "none";
    }

    /* ==========================================
       SCROLL REVEAL — Intersection Observer
    ========================================== */

    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll(".reveal");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealElements.forEach((element) => revealObserver.observe(element));

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
        document.querySelectorAll(".reveal, .fade-up").forEach((el) => {
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
