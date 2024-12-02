class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
                <img src="https://joyz.ai/assests/icon.png" class="logo_icon" />
                <div class="logo_text">
                Joyz
                <span>AI</span>
                </div>
            </a>

            <div
                class="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
            >
                <button class="dark my-2 my-sm-0">Get my chatbot</button>
            </div>
            </nav>
        </div>
    </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
