// Show the popup and start the progress bar and survey
document.addEventListener("DOMContentLoaded", function () {
  createSurveyForm(); // Pass required values or set defaults here if necessary
});

// Create SurveyJS Form
function getUrlVars(url = window.location.href) {
  var vars = {};
  var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    (value || "") +
    expires +
    "; path=/; domain=" +
    location.hostname;
}
async function sendDataToFirebase(location, data) {
  const dBUrl = `https://onecrm-in-default-rtdb.asia-southeast1.firebasedatabase.app/${location}.json`;

  try {
    const response = await fetch(dBUrl, {
      method: "POST", // POST method to add a new entry
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error sending URL to Firebase");
    }

    const responseData = await response.json();
    console.log("URL successfully added to /websites.json:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function createSurveyForm(urlValue) {
  // alert(urlValue);
  // sendDataToFirebase('websites', urlValue)
  if (
    document.querySelector(
      "#user-get-started-navbar-modal-container .user-get-started-modal #surveyElement"
    )
  ) {
    document.querySelector(
      "#user-get-started-navbar-modal-container .user-get-started-modal #surveyElement"
    ).innerHTML = "";
  }
  const urlInput = getUrlVars()["site"];
  const eu = getCookie("eu") ? getCookie("eu") : false;
  const src = getCookie("src") ? getCookie("src") : false;
  const un = getCookie("un") ? getCookie("un") : "";
  let countryCode;
  let phoneNumberInputValue;

  var defaultThemeColors = Survey.StylesManager.ThemeColors["modern"];

  // Set colors similar to Notion's black and grey scheme
  defaultThemeColors["$main-color"] = "#2E2E2E"; // Dark grey for main elements
  defaultThemeColors["$main-hover-color"] = "#4D4D4D"; // Slightly lighter grey for hover
  defaultThemeColors["$text-color"] = "#000"; // White text color for contrast
  defaultThemeColors["$header-color"] = "#2E2E2E"; // Dark grey for headers

  defaultThemeColors["$header-background-color"] = "#191919"; // Black header background
  defaultThemeColors["$body-container-background-color"] = "#F5F5F5"; // Light grey for background
  defaultThemeColors["$input-background-color"] = "#2E2E2E"; // Dark grey for inputs
  defaultThemeColors["$input-border-color"] = "#4D4D4D"; // Slightly lighter grey for input borders
  // Apply the customized theme
  Survey.StylesManager.applyTheme("modern");
  const surveyJSON = {
    completedHtml:
      "<div class='end-screen-container'>\n<p>We've received your information! We'll be in touch soon.</p>\n</div>",
    pages: [
      {
        name: "page1",
        description:
          "<h2 class='modal__title'>Simple Setup</h2> <ol class='modal__steps'><li>Enter website URL</li><li>Share basic details</li><li>Test the chatbot</li><li>Add code to site</li></ol>",
        elements: [
          {
            type: "text",
            name: "website_url",
            title: "Enter website url",
            hideNumber: true,
            isRequired: true,
            placeholder: "https://",
          },
          {
            type: "text",
            name: "workEmail",
            title: "Your email id",
            placeholder: "help@joyz.ai",
            isRequired: true,
            hideNumber: true,
            inputType: "email",
          },
        ],
      },
      {
        name: "page2",
        description: `<h2 class='modal__tit'>We are building your chatbot...</h2> <p class='modal__sub'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
        <path d="M11.3438 5.50047C10.9688 5.50047 10.6562 5.81297 10.6562 6.18797C10.6562 6.53172 10.9688 6.84422 11.3438 6.84422H15.3125C15.6875 6.84422 16 6.53172 16 6.18797V2.18797C16 1.81297 15.6875 1.50047 15.3125 1.50047C14.9688 1.50047 14.6562 1.81297 14.6562 2.18797V5.50047H11.3438ZM1.34375 9.50047H4.65625C5.03125 9.50047 5.34375 9.21922 5.34375 8.84422C5.34375 8.46922 5.03125 8.15672 4.65625 8.15672H0.6875C0.3125 8.15672 0 8.46922 0 8.84422V12.8442C0 13.188 0.3125 13.5005 0.6875 13.5005C1.03125 13.5005 1.34375 13.188 1.34375 12.8442V9.50047ZM2.96875 5.71922C3.59375 4.00047 5.03125 2.71922 6.8125 2.31297C8.59375 1.90672 10.4688 2.43797 11.75 3.75047L14.875 6.65672C15.125 6.90672 15.5625 6.90672 15.8125 6.62547C16.0625 6.37547 16.0625 5.93797 15.7812 5.68797L12.6875 2.78172C11.0625 1.18797 8.75 0.500466 6.53125 1.00047C4.3125 1.50047 2.46875 3.12547 1.71875 5.28172C1.59375 5.62547 1.78125 6.00047 2.125 6.12547C2.46875 6.25047 2.84375 6.06297 2.96875 5.71922ZM0.21875 9.31297L3.3125 12.2192C4.9375 13.8442 7.25 14.5005 9.46875 14.0005C11.7188 13.5005 13.5312 11.8755 14.2812 9.71922C14.4062 9.37547 14.2188 9.00047 13.875 8.87547C13.5312 8.75047 13.1562 8.93797 13.0312 9.28172C12.4062 11.0005 10.9688 12.2817 9.1875 12.688C7.40625 13.0942 5.53125 12.563 4.25 11.2817L1.125 8.34422C0.875 8.09422 0.4375 8.12547 0.1875 8.37547C-0.0625 8.65672 -0.0625 9.06297 0.21875 9.31297Z" fill="#2E2E2E"/>
        </svg> Gathering data</p><div class="chatbot__basic__details">Meanwhile share some basic details to complete your chatbot...</div>`,
        elements: [
          {
            type: "dropdown",
            name: "repsCount",
            title: "How many support reps do you have?",
            hideNumber: true,
            isRequired: true,
            optionsCaption: "Choose...",
            allowClear: false,
            choices: [
              {
                value: "lessThan10",
                text: "Less than 10",
              },
              "10-50",
              "50-500",
              {
                value: "500Plus",
                text: "500+",
              },
            ],
          },
        ],
      },
    ],
    pageNextText: "Create Your Chatbot Now",
    completeText: "Next",
    questionErrorLocation: "bottom",
    showPrevButton: false,
  };

  window.survey = new Survey.Model(surveyJSON);
  survey.setValue("user_url", urlInput);
  survey.onCompleting.add(function (sender) {
    countryCode = document
      .querySelector(".iti__selected-dial-code")
      ?.innerHTML.replace(/[^\d.-]+/g, "");
    phoneNumberInputValue = document.querySelector(
      ".sv-text.intlTelInput"
    )?.value;
  });
  survey.onComplete.add(async function (sender) {
    if (sender.data) {
      const data = JSON.parse(JSON.stringify(sender.data));
      data["phone"] = countryCode + phoneNumberInputValue.replace(/\s\s+/g, "");
      stringifiedData = JSON.stringify(data, null, 3);
      console.log(stringifiedData);
      await sendDataToFirebase("formFills", data);
      window.location.href = "https://joyz.ai/congrats.html";
    }
  });

  survey.onAfterRenderQuestionInput.add(function (sender, input) {
    if (input.htmlElement.type == "tel") {
      input.htmlElement.name = "phone";
      input.htmlElement.classList.add("intlTelInput");
      document
        .querySelector(".sv-btn.sv-footer__complete-btn")
        .classList.add("squeeze-page-btn-purple");
      document.querySelector(".sv-btn.sv-footer__complete-btn").style.width =
        "100% !important";
      input.htmlElement.parentElement.parentElement.style.overflow = "visible";
      const inputHtml = input.htmlElement;
      const iti = window.intlTelInput(inputHtml, {
        autoPlaceholder: "on",
        geoIpLookup: function (callback) {
          $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
            resp
          ) {
            var countryCode = resp && resp.country ? resp.country : "";
            callback(countryCode);
          });
        },
        hiddenInput: `full_number_survey_form`,
        initialCountry: "IN",
        separateDialCode: true,
        utilsScript: "https://telecrm.in/whatsapp-cloud-api/js/utils.js",
      });

      inputHtml.addEventListener("input", function () {
        inputHtml.value = inputHtml.value.replace(/\D/g, "");
        if (inputHtml.value.trim()) {
          if (iti.isValidNumber()) {
            inputHtml.classList.remove("error");
            document.querySelector(
              ".sv-btn.sv-footer__complete-btn"
            ).style.pointerEvents = "auto";
          } else {
            inputHtml.classList.add("error");
            document.querySelector(
              ".sv-btn.sv-footer__complete-btn"
            ).style.pointerEvents = "none";
          }
        }
      });

      inputHtml.addEventListener("change", function () {
        inputHtml.value = inputHtml.value.replace(/^0/, "");
      });
    }
  });
  survey.onAfterRenderPage.add(function (sender, page) {
    let previousClass = "";
    if (document.querySelector(".sv-footer__next-btn")) {
      if (
        previousClass &&
        previousClass !== `sv-footer__next-btn_${page.page.name}`
      ) {
        document
          .querySelector(".sv-footer__next-btn")
          .classList.remove(previousClass);
      }
      document
        .querySelector(".sv-footer__next-btn")
        .classList.add(`sv-footer__next-btn_${page.page.name}`);
      previousClass = `sv-footer__next-btn_${page.page.name}`;
    }
  });

  survey.onOpenDropdownMenu.add((_, options) => {
    options.menuType = "dropdown";
  });

  const converter = markdownit({
    html: true,
  });
  survey.onTextMarkdown.add((_, options) => {
    let str = converter.renderInline(options.text);
    options.html = str;
  });

  survey.clearInvisibleValues = "onHidden";
  survey.showCompletedPage = true;

  document.querySelectorAll("#surveyElement").forEach(function (element) {
    survey.render(element);
  });
}

// Insert the Google Tag Manager script into the head
// (function insertGTMHead() {
//   var head = document.getElementsByTagName("head")[0];
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.async = true;
//   script.innerHTML =
//     "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PQT5QQNT');";
//   head.appendChild(script);
// })();

// Insert the Google Tag Manager noscript into the body
// (function insertGTMBODY() {
//   var body = document.getElementsByTagName("body")[0];
//   var noscript = document.createElement("noscript");
//   noscript.innerHTML =
//     '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQT5QQNT" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
//   body.appendChild(noscript);
// })();
