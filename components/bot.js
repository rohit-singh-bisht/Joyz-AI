class AppJoyzAI extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="joyzAI__bot">
            <div class="joyzAI__bot__header navbar-brand">
                <img src="https://joyz.ai/assests/icon.png" class="logo_icon" />
                <div class="logo_text">
                Joyz
                <span>AI</span>
                </div>
            </div>
            <div class="joyzAI__bot__body">
                <div class="msg incoming__msg">
                How to setup chatbot?
                </div>
                <div class="msg outgoing__msg">
                    Steps to setup chatbot

                    <ul>
                        <li>Enter your website url, and create chatbot</li>
                        <li>Integrate chatbot code on your site</li>
                        <li>Start answering questions automatically</li>
                        <li>Auto add questions and answers to your knowledgebase to improve future answers</li>
                    </ul>
                </div>
            </div>
            <div class="joyzAI__bot__response">
                <div class="joyzAI__bot__input__wrapper">
                    <input type="text" placeholder="Type your question" />
                    <div class="send__message__button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M3.26394 2.95989C3.16045 2.91001 3.04482 2.89089 2.93078 2.90481C2.81674 2.91872 2.70909 2.96508 2.62063 3.03838C2.53217 3.11168 2.46661 3.20883 2.43174 3.31829C2.39688 3.42776 2.39417 3.54493 2.42394 3.65589L4.22394 10.3999C4.28394 10.6279 4.46394 10.7959 4.70394 10.8319L12.9239 12.1999C13.2599 12.2599 13.2599 12.7399 12.9239 12.7999L4.70394 14.1679C4.59107 14.1866 4.48591 14.2373 4.40087 14.3138C4.31582 14.3903 4.25443 14.4896 4.22394 14.5999L2.42394 21.3439C2.39417 21.4549 2.39688 21.572 2.43174 21.6815C2.46661 21.791 2.53217 21.8881 2.62063 21.9614C2.70909 22.0347 2.81674 22.0811 2.93078 22.095C3.04482 22.1089 3.16045 22.0898 3.26394 22.0399L21.2639 13.0399C21.3654 12.9908 21.4509 12.914 21.5108 12.8185C21.5707 12.723 21.6024 12.6126 21.6024 12.4999C21.6024 12.3872 21.5707 12.2767 21.5108 12.1812C21.4509 12.0857 21.3654 12.009 21.2639 11.9599L3.26394 2.95989Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("app-joyzai", AppJoyzAI);
