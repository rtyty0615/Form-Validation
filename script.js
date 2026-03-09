const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error"; 
    } else {
        showEmailError();
    }
});

form.addEventListener("submit", (event) => {
    if (!email.validity.valid) {
        showEmailError();
        event.preventDefault();
    };
    checkPostalCode();
    if (!postalCodeField.validity.valid) {
        event.preventDefault();
    }


});

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    emailError.className = "error active";
}

const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");

function checkPostalCode() {
    const constraints = {
        ch: [
            "^(CH-)?\\d{4}$",
            "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        fr: [
            "^(F-)?\\d{5}$",
            "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        de: [
            "^(D-)?\\d{5}$",
            "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        nl: [
            "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
            "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
        ],
    };

    const country = countrySelect.value;

    const constraint = new RegExp(constraints[country][0], "");
    console.log(constraint);

    if (constraint.test(postalCodeField.value)) {
        postalCodeField.setCustomValidity("");
        postalCodeError.textContent = "";
        postalCodeError.className = "error"; 
    } else {
        const errorMsg = constraints[country][1];
        postalCodeField.setCustomValidity(errorMsg);
        showPostalCodeError(errorMsg)
    }
}

function showPostalCodeError(message) {
    if (postalCodeField.validity.valueMissing) {
        postalCodeError.textContent = "You need to enter postal code.";
    } else if (postalCodeField.validity.customError) {
        postalCodeError.textContent = message;
    } 
    postalCodeError.className = "error active";
}

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);