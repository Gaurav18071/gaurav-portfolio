/* ==========================================
   APP INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    



/* ==========================================
   NAVBAR
========================================== */

const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

/* ==========================================
   STICKY NAVBAR
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ==========================================
   MOBILE MENU
========================================== */

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

});


/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    });

});


/* ==========================================
   ACTIVE LINK ON SCROLL
========================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


/* ==========================================
   CLOSE MENU ON OUTSIDE CLICK
========================================== */

document.addEventListener("click", (e) => {

    const clickedInsideNavbar = e.target.closest(".navbar");

    if (!clickedInsideNavbar) {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    }

});


/* ==========================================
   ESC KEY CLOSE MENU
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    }

});

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    // Show loader only once per browser tab/session
    if (!sessionStorage.getItem("loaderShown")) {

        sessionStorage.setItem("loaderShown", "true");

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1800);

    } else {

        loader.classList.add("hide");

    }

});

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================
   CUSTOM CURSOR
========================================== */

const dot=document.querySelector(".cursor-dot");

const ring=document.querySelector(".cursor-ring");

document.addEventListener("mousemove",(e)=>{

    dot.style.left=e.clientX+"px";

    dot.style.top=e.clientY+"px";

    ring.style.left=e.clientX+"px";

    ring.style.top=e.clientY+"px";

});

const hoverItems=document.querySelectorAll(

"a,button,.glass-card,.skill-pill"

);

hoverItems.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        ring.classList.add("cursor-hover");

    });

    item.addEventListener("mouseleave",()=>{

        ring.classList.remove("cursor-hover");

    });

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.classList.add("active");
            } else {
                entry.classList.remove("active");
            }

        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
});