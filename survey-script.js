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
        title: "Simple Setup",
        description: `<ol class='modal__steps'><li>Enter website URL</li><li>Share basic details</li><li>Test the chatbot</li><li>Add code to site</li></ol>`,
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
        navigationButtonsVisibility: "show",
        elements: [
          {
            type: "dropdown",
            name: "queriesPerDay",
            title: "How many support queries do you get per day?",
            hideNumber: true,
            isRequired: true,
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
