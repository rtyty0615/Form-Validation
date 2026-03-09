const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("input", () => {
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
    };
    if (!password.validity.valid) {
        showPasswordError();
        event.preventDefault();
    };
    if (!passwordConfirm.validity.valid) {
        showPasswordConfirmError();
        event.preventDefault();
    };


});

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address.";
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

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");

password.addEventListener("input", () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    password.setCustomValidity("");
    if (!password.validity.valid) {
        showPasswordError();
    } else if (!passwordRegex.test(password.value)) {
        password.setCustomValidity("Complexity requirements not met.");
        showPasswordError();
    } else {
        passwordError.textContent = "";
        passwordError.className = "error";
    }
});

function showPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter a password.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
    } else if (password.validity.customError) {
        passwordError.textContent = "Entered value needs to have at least one uppercase, one lowercase, one digit, and one special character.";
    } 
    passwordError.className = "error active";
}

const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmError = document.querySelector("#password-confirm + span.error");

passwordConfirm.addEventListener("input", () => {
    passwordConfirm.setCustomValidity("");
    if (!passwordConfirm.validity.valid) {
        showPasswordConfirmError();
    } else if (passwordConfirm.value !== password.value) {
        passwordConfirm.setCustomValidity("Confirmed password is not the same.");
        showPasswordConfirmError();
    } else {
        passwordConfirmError.textContent = "";
        passwordConfirmError.className = "error";
    }
});

function showPasswordConfirmError(){
    if (passwordConfirm.validity.valueMissing) {
        passwordConfirmError.textContent = "You need to enter a password.";
    } else if (passwordConfirm.validity.customError){
        passwordConfirmError.textContent = "You must enter the same password!";
    }
    passwordConfirmError.className = "error active";
}