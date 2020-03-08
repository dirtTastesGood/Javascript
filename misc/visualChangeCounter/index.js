let randomTotal = document.querySelector('.random-total'),
    tillMessage = document.querySelector('.till .message'),
    totalInput  = document.querySelector('.till input');

// Takes in string from till input and
// returns total in proper format => $ xxx,xxx,xxx.xx
const updateTotal = (total, char) => {
    let isDigit = new RegExp(/([0-9])/),
        nonDigit = new RegExp(/([\D])/g),
        leadingZeros = new RegExp(/(^0+)/),
        preDecimal, postDecimal;

    // Remove leading zeros and non-digit characters,
    // convert to array
    total = total.replace(nonDigit, '')
    total = total.replace(leadingZeros, '')
    total = total.split('')

    if(total.length == 0){
        total = '0.00';

    } else if(total.length < 2 && total.length > 0){
        total.unshift('0','.','0');
        total = total.join('');

    } else if (total.length == 2){
        total.unshift('0', '.')
        total = total.join('');

    } else {
        preDecimal  = total.splice(0, total.length - 2);
        postDecimal = total.splice(total.length - 2, total.length)

        total = preDecimal.join('') + '.' + postDecimal.join('')
    }

    return `$ ${total}`
} 

totalInput.addEventListener('focusout', () => {
    if(totalInput.value.length < 3){
        totalInput.value = '$ 0.00';
    }
})

totalInput.addEventListener('input', (e) => {
    let newValue,
        digit = new RegExp(/([0-9])/),
        newChar = e.data;

    if(digit.test(newChar) && newChar != '$'){
        newValue = updateTotal(totalInput.value, newChar);
    } else {
        newValue = totalInput.value.replace(newChar, '')

        if(newChar == '$' || '.'){
            newValue = totalInput.value.split('')
            newValue.pop()
            newValue = newValue.join('')
        }
    }

    totalInput.value = `${newValue}`;

});
