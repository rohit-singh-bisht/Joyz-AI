var page = {
  loadAndInjectTemplate: (url, containerId) => {
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
      console.log("here I am");
      page.loadAndInjectTemplate("layout/header-template.html", "header");
    });
  },
};

page.load();
