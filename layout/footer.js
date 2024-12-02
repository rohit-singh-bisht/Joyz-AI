class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
            <div class="container">
                <div class="row">
                <div class="col-12">
                    <h2 class="section_subtitle">Vision</h2>

                    <div class="footer__social"></div>

                    <div class="footer__copymark">
                    &copy; 2024, JoyzAI. All Rights Reserved.
                    </div>
                </div>
                </div>
            </div>
        </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
