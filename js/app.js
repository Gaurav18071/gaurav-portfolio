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
    const particleCanvas = document.getElementById("cursor-particles");

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
       CUSTOM CURSOR — SPARKLE PARTICLES TRAIL
    ========================================== */

    if (particleCanvas && !isCoarsePointer && !prefersReducedMotion) {
        const ctx = particleCanvas.getContext("2d");
        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            particleCanvas.width = width * dpr;
            particleCanvas.height = height * dpr;
            if (ctx.resetTransform) ctx.resetTransform();
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const colors = [
            "#ff2d55",
            "#e60039",
            "#ff4d6d",
            "#ff6a00",
            "#ffb703",
            "#ffd166",
            "#ffffff"
        ];

        const particles = [];
        let animId = null;
        let lastX = null;
        let lastY = null;

        const spawnParticle = (x, y, extraSpeed = 1) => {
            const size = Math.random() * 4.5 + 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const moveAngle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 1.5 + 0.4) * extraSpeed;

            particles.push({
                x: x + (Math.random() - 0.5) * 6,
                y: y + (Math.random() - 0.5) * 6,
                size: size,
                color: color,
                alpha: 1,
                decay: Math.random() * 0.016 + 0.016,
                vx: Math.cos(moveAngle) * speed,
                vy: Math.sin(moveAngle) * speed + 0.35,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.12
            });
        };

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.angle += p.spin;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                const currentSize = p.size * (0.35 + 0.65 * p.alpha);

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);
                ctx.restore();
            }

            if (particles.length > 0) {
                animId = requestAnimationFrame(render);
            } else {
                animId = null;
                ctx.clearRect(0, 0, width, height);
            }
        };

        const startLoop = () => {
            if (!animId) {
                animId = requestAnimationFrame(render);
            }
        };

        window.addEventListener("pointermove", (e) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            if (lastX === null) {
                lastX = currentX;
                lastY = currentY;
                spawnParticle(currentX, currentY);
                startLoop();
                return;
            }

            const dx = currentX - lastX;
            const dy = currentY - lastY;
            const dist = Math.hypot(dx, dy);

            if (dist > 3) {
                const steps = Math.min(Math.floor(dist / 5), 6);
                const count = Math.max(1, steps);
                for (let i = 0; i < count; i++) {
                    const t = (i + 1) / count;
                    spawnParticle(lastX + dx * t, lastY + dy * t);
                }
                lastX = currentX;
                lastY = currentY;
                startLoop();
            }
        }, { passive: true });

        window.addEventListener("pointerdown", (e) => {
            for (let i = 0; i < 12; i++) {
                spawnParticle(e.clientX, e.clientY, 2);
            }
            startLoop();
        }, { passive: true });

        window.addEventListener("pointerleave", () => {
            lastX = null;
            lastY = null;
        });
    } else if (particleCanvas) {
        particleCanvas.style.display = "none";
    }

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
