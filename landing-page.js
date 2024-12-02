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
      page.loadAndInjectTemplate("section/faq.html", "faq");
    });
  },
};

// const faqAccordionManager = {
//   init: () => {
//     const collapsibleElements = document.querySelectorAll(
//       ".faq__card .collapse"
//     );
//     collapsibleElements.forEach(faqAccordionManager.addListeners);
//   },

//   addListeners: (collapse) => {
//     console.log("collapse", collapse);
//     collapse.addEventListener("shown.bs.collapse", () => {
//       faqAccordionManager.toggleActiveState(collapse, true);
//     });

//     collapse.addEventListener("hidden.bs.collapse", () => {
//       faqAccordionManager.toggleActiveState(collapse, false);
//     });
//   },

//   toggleActiveState: (collapseElement, isActive) => {
//     const parentCard = collapseElement.closest("div");
//     console.log("parent card", parentCard);
//     if (parentCard) {
//       if (isActive) {
//         parentCard.classList.add("active");
//       } else {
//         parentCard.classList.remove("active");
//       }
//     }
//   },
// };

page.load();
