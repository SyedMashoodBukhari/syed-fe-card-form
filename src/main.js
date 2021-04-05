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
            $('.card-form__error').text('');
            $('.card-form__submit').prop('disabled', false);
            
            // Validate with Luhn algorithm only if number entered passes regex validation
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

// Validate the credit card number according to the Luhn algorithm
function luhnValidate() {
}

/**
 * Auto-formats the card number into groups of four digits
 * as the user types the number in to make it easier to read
 * 
 * @param {number} cardNumber 
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