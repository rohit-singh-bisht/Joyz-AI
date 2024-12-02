class homeFAQ extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <section>
              <div class="container faq__section">
                  <div class="row">
                  <div class="col-12">
                      <h2 class="section_title">FAQ</h2>
                  </div>
                  <div class="col-md-2"></div>
                  <div class="col-md-8">
                      <div class="accordion" id="accordionExample">
                      <div class="faq__card active">
                          <div
                          class="faq__card__header"
                          id="headingOne"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          >
                          What are features of beta?
                          </div>
  
                          <div
                          id="collapseOne"
                          class="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                          >
                          <div class="faq__card__body">
                              <ul>
                              <li>Auto-build and quick setup.</li>
                              <li>Instant AI answers that improve over time</li>
                              </ul>
                          </div>
                          </div>
                      </div>
                      <div class="faq__card">
                          <div
                          class="faq__card__header"
                          id="headingTwo"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="true"
                          aria-controls="collapseTwo"
                          >
                          What are features of beta?
                          </div>
  
                          <div
                          id="collapseTwo"
                          class="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                          >
                          <div class="faq__card__body">
                              <ul>
                              <li>Auto-build and quick setup.</li>
                              <li>Instant AI answers that improve over time</li>
                              </ul>
                          </div>
                          </div>
                      </div>
                      <div class="faq__card">
                          <div
                          class="faq__card__header"
                          id="headingThree"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="true"
                          aria-controls="collapseThree"
                          >
                          What are features of beta?
                          </div>
  
                          <div
                          id="collapseThree"
                          class="collapse"
                          aria-labelledby="headingThree"
                          data-parent="#accordionExample"
                          >
                          <div class="faq__card__body">
                              <ul>
                              <li>Auto-build and quick setup.</li>
                              <li>Instant AI answers that improve over time</li>
                              </ul>
                          </div>
                          </div>
                      </div>
                      </div>
                  </div>
                  <div class="col-md-2"></div>
                  </div>
              </div>
          </section>
      `;
  }
}

customElements.define("home-faq", homeFAQ);
