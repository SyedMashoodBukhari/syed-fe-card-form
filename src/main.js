$(document).ready(function () {
    // Check that the card number entered is valid
    $('#card-number').on('keyup', function () {
        let cardNumber = this.value;
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
function LuhnValidate() {

}