// Check that CVV is either three or four digits long
function validateCVVEntry() {
    let cvv = $('#cvv').val();
    //console.log(cvv);
    if (cvv > 99 && cvv < 10000) {
        console.log('valid CVV');
    }
    else {
        console.log('lol no');
    }
}

// Validate the credit card number according to the Luhn algorithm
function LuhnValidate() {

}