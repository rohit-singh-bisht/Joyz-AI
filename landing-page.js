const page = {
  loadAndInjectTemplate: (url, containerId, callback) => {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement("div");
        template.innerHTML = html;
        const content = template
          .querySelector("template")
          .content.cloneNode(true);
        document.getElementById(containerId).appendChild(content);
      })
      .catch((error) => console.error("Error loading template:", error));
  },
  load: () => {
    document.addEventListener("DOMContentLoaded", () => {
      page.loadAndInjectTemplate("section/hero-section.html", "hero");
      page.loadAndInjectTemplate("section/try-it-out-section.html", "try_it");
      page.loadAndInjectTemplate("section/features.html", "features");
      page.loadAndInjectTemplate("section/pricing.html", "pricing");
      //   page.loadAndInjectTemplate("section/faq.html", "faq");
      faqAccordionManager.init();
    });
  },
};

const faqAccordionManager = {
  init: () => {
    $(".faq__card .collapse").on("show.bs.collapse", function () {
      faqAccordionManager.toggleActiveState(this, true);
    });

    $(".faq__card .collapse").on("hide.bs.collapse", function () {
      faqAccordionManager.toggleActiveState(this, false);
    });
  },

  toggleActiveState: (collapseElement, isActive) => {
    const parentCard = $(collapseElement).closest(".faq__card");
    if (parentCard) {
      if (isActive) {
        parentCard.addClass("active");
      } else {
        parentCard.removeClass("active");
      }
    }
  },
};

page.load();
