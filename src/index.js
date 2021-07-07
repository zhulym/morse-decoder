const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};
/*=========================  function for DECODE string to morse   =========================*/
function decode(expr) {
    // get arr of letters
    const checkString = expr.includes('*', 0);
    const words = (checkString) ? expr.split('**********') : [expr];
    const letters = [];
    words.forEach(el => {
        let s = 0, e = 10;
        while (e <= el.length) {
            letters.push(el.substring(s, e));
            s += 10;
            e += 10;
        }
    });

    // get  morse arr
    const morseArr = letters.map(el => {
        let morseEl = '';
        for (let i = 0; i < 5; i++) {
            if (el.slice(i * 2, i * 2 + 2) === '10') {
                morseEl += '.';
            }
            if (el.slice(i * 2, i * 2 + 2) === '11') {
                morseEl += '-';
            }
        }
        return morseEl;
    })

    // get letters from MORSE_TABLE 
    const decodedArr = morseArr.map(el => {
        for (const key in MORSE_TABLE) {
            if (el === key) {
                return MORSE_TABLE[key];
            }
        }
    })

    const indexForSpaces = words.map(el => el.length / 10);
    let j = null;
    for (let i = 0; i < indexForSpaces.length - 1; i++) {       // -1 cause spaces less then words 
        if (i === 0) {
            j = indexForSpaces[i];                              // first index
            decodedArr.splice(j, 0, ' ');
            j += indexForSpaces[i + 1] + 1;                     //  i + 1 for next index;   +1 index of prev space
        } else {
            decodedArr.splice(j, 0, ' ');
            j += indexForSpaces[i + 1] + 1;
        }
    }

    return decodedArr.join('');
}

module.exports = {
    decode
}


/*=========================  function for ENCODE string to morse   =========================*/
// function decode(expr) {
//     // get array of all morse symbols
//     const words = expr.split(' ');
//     const letters = words.map(el => el.split(''));
//     const morse = [];
//     const encode = letters.forEach(el => el.forEach(letter => {
//         for (const key in MORSE_TABLE) {
//             if (letter === MORSE_TABLE[key]) {
//                 morse.push(key);
//             }
//         }
//     })
//     )

//     // make format from .---  to  0011001010
//     const formatTenEleven = morse.map(el => el.replace(/\.|-/g, match => (match == ".") ? "10" : "11"));
//     const insertSpace = formatTenEleven.map(el => {
//         while (el.length < 10) {el = 0 + el};
//         return el;
//     })

//     // put ******** instead spaces
//     const indexForSpace = letters.map(el => el.length);
//     let j = null;
//     for (let i = 0; i < indexForSpace.length - 1; i++) {       // -1 cause spaces less then words 
//         if (i === 0) {
//             j = indexForSpace[i];                              // first index
//             insertSpace.splice(j, 0, '**********');
//             j += indexForSpace[i + 1] + 1;                     //  i + 1 for next index;   +1 index of prev space
//         } else {
//             insertSpace.splice(j, 0, '**********');
//             j += indexForSpace[i + 1] + 1;
//         }
//     }
//     return insertSpace.join('');
// }