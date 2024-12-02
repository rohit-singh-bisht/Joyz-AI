class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
            <div class="container">
                <div class="row">
                <div class="col-12">
                    <h2 class="section_subtitle">
                        <a href="#">Vision</a>
                    </h2>

                    <div class="footer__social">
                        <app-social></app-social>
                    </div>

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
