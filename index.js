
const express = require('express');
const app = express();
app.use(express.json());

const FULL_NAME = 'john_doe';
const DOB = '17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function isNumber(value) {
    return /^-?\d+$/.test(value);
}
function isAlphabet(value) {
    return /^[a-zA-Z]$/.test(value);
}
function isSpecialCharacter(value) {
    return !isNumber(value) && !isAlphabet(value);
}
function toAlternateCaps(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += i % 2 === 0 
            ? str[str.length - 1 - i].toUpperCase() 
            : str[str.length - 1 - i].toLowerCase();
    }
    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array."
      });
    }
        let numbers = [];
        let alphabets = [];
        let specials = [];

        data.forEach(item => {
            if (isNumber(item)) {
                numbers.push(item);
            } else if (isAlphabet(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                specials.push(item);
            }
        });

        // Even and Odd arrays as strings
        const even_numbers = numbers.filter(x => parseInt(x) % 2 === 0);
        const odd_numbers = numbers.filter(x => parseInt(x) % 2 !== 0);

        // Sum as string
        const sum = numbers.reduce((sum, curr) => sum + parseInt(curr), 0).toString();

        // Concatenate all alphabetic characters (reverse and alternate caps)
        const concat_string = toAlternateCaps(
            data.filter(x => isAlphabet(x)).join('')
        );
        
        // Response object
        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: specials,
            sum: sum,
            concat_string: concat_string
        });
    } catch (error) {
        res.status(200).json({
            is_success: false,
            user_id:`${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER
        });
    }
});


app.get('/,req,res=()=>{
       console.log("do post methods"); })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server running...'));
