/* ========================================
   NXTN WEBSITE
   js/script.js
======================================== */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a[href^='#']") : [];
  const revealItems = document.querySelectorAll(".reveal");

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    header?.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");
    header?.classList.add("menu-active");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  };

  menuToggle?.addEventListener("click", () => mobileMenu?.classList.contains("open") ? closeMenu() : openMenu());
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 767) closeMenu(); });

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
});
