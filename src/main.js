$(document).ready(function () {
    // Check that the card number entered is valid
    $('#card-number').on('keyup', function () {
        // Strip any formatting from input
        let cardNumber = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        
        // Output formatted value to user
        this.value = formatCardNumber(cardNumber);

        let acceptablePattern = /^([0-9]{14,16})$/;

        // Compare regex pattern against the value with stripped formatting
        if (!acceptablePattern.test(cardNumber)) {
            $('.card-form__error').text('Card number is invalid. Please correct it.');
            $('.card-form__submit').prop('disabled', true);
        } else {
            // Validate with Luhn algorithm only if number entered passes regex validation
            let luhnCheck = luhnValidate(cardNumber);

            if (luhnCheck) {
                $('.card-form__error').text('');
                $('.card-form__submit').prop('disabled', false);
            } else {
                $('.card-form__error').text('Card number is invalid. Please correct it.');
                $('.card-form__submit').prop('disabled', true);
            }
        }
    });

    // Check that the name is only alphanumeric characters with no special symbols
    $('#card-holder-name').on('keyup', function () {
        let name = this.value;
        let acceptablePattern = /^\s*[a-zA-Z0-9,\s]+\s*$/;

        if (!acceptablePattern.test(name)) {
            $('.card-form__error').text('Name is invalid. Please only enter letters or numbers.');
            $('.card-form__submit').prop('disabled', true);
        } else {
            $('.card-form__error').text('');
            $('.card-form__submit').prop('disabled', false);
        }
    });

    // Check that CVV is either three or four digits long
    $('#cvv').on('keyup', function () {
        let cvv = this.value;
        let acceptablePattern = /^([0-9]{3,4})$/;

        if(!acceptablePattern.test(cvv)) {
            $('.card-form__error').text('CVV must be either three or four digits long.');
            $('.card-form__submit').prop('disabled', true);
        } else {
            $('.card-form__error').text('');
            $('.card-form__submit').prop('disabled', false);
        }
    });
});

// 
/**
 * Runs basic validation on the card number according to the Luhn algorithm
 * 
 * @param {number} cardNumber The card number with all formatting removed
 * @returns {boolean} True is successful else returns false
 */
function luhnValidate(cardNumber) {
    // Convert card number to a string
    cardNumber = cardNumber + '';

    let digitSum = 0;
    let maxLength = cardNumber.length - 1;

    // i counts down in order to start at the right-most digit in the string
    for (let i = maxLength; i >= 0; i--) {
        var currentDigit = parseInt(cardNumber[i]); // Convert digit back to a number

        if ((maxLength - i) & 1) {
            let additionValue = currentDigit * 2;

            digitSum += (additionValue < 10) ? additionValue : 1 + (additionValue % 10);
        } else {
            digitSum += currentDigit;
        }
    }

    let finalValue = digitSum % 10;

    if (finalValue === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Auto-formats the card number into groups of four digits
 * as the user types the number in to make it easier to read
 * 
 * @param {number} cardNumber The card number with all formatting removed
 * @returns {string} Formatted card number for display
 */
function formatCardNumber(cardNumber) {
    let parts = [];

    for (i = 0, length = cardNumber.length; i < length; i+=4) {
        parts.push(cardNumber.substring(i, i+4));
    }

    if(parts.length) {
        return parts.join(' ');
    } else {
        return cardNumber;
    }
}