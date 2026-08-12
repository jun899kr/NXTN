document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".product-header");
  const menuButton = document.querySelector(".product-menu-button");
  const mobileMenu = document.querySelector(".product-mobile-menu");
  const mobileLinks = document.querySelectorAll(".product-mobile-menu a");

  const setMenu = (open) => {
    menuButton?.classList.toggle("is-open", open);
    mobileMenu?.classList.toggle("is-open", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuButton?.addEventListener("click", () => {
    setMenu(!mobileMenu?.classList.contains("is-open"));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle(
        "is-scrolled",
        window.scrollY > 40
      );
    },
    { passive: true }
  );

  const showcaseMainImage =
    document.querySelector(".showcase-main-image");

  const showcaseThumbnails = Array.from(
    document.querySelectorAll(".showcase-thumbnail")
  );

  const showcasePrev =
    document.querySelector(".showcase-prev");

  const showcaseNext =
    document.querySelector(".showcase-next");

  if (
    showcaseMainImage &&
    showcaseThumbnails.length &&
    showcasePrev &&
    showcaseNext
  ) {
    const showcaseImages = [
      {
        image: showcaseMainImage.getAttribute("src"),
        alt: showcaseMainImage.getAttribute("alt") || ""
      },

      ...showcaseThumbnails.map((thumbnail) => ({
        image: thumbnail.dataset.image,
        alt: thumbnail.dataset.alt || ""
      }))
    ];

    let currentIndex = 0;

    const updateShowcase = (index) => {
      currentIndex =
        (index + showcaseImages.length) %
        showcaseImages.length;

      const selectedImage =
        showcaseImages[currentIndex];

      showcaseMainImage.src =
        selectedImage.image;

      showcaseMainImage.alt =
        selectedImage.alt;

      showcaseThumbnails.forEach(
        (thumbnail, thumbnailIndex) => {
          thumbnail.classList.toggle(
            "active",
            thumbnailIndex === currentIndex - 1
          );
        }
      );
    };

    showcaseThumbnails.forEach(
      (thumbnail, index) => {
        thumbnail.addEventListener(
          "click",
          () => {
            updateShowcase(index + 1);
          }
        );
      }
    );

    showcasePrev.addEventListener(
      "click",
      () => {
        updateShowcase(currentIndex - 1);
      }
    );

    showcaseNext.addEventListener(
      "click",
      () => {
        updateShowcase(currentIndex + 1);
      }
    );
  }
});
