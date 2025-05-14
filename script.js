// Morse code dictionary
const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/' // Space separator
};

//Reverse lookup for decoding
const reverseMorseCodeMap = Object.entries(morseCodeMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {})

// Linked List implementation for storing messages
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

// Encode text to Morse code
function encodeToMorse(text) {
    const messageList = new LinkedList();
    text.toUpperCase().split('').forEach(char => {
        messageList.add(morseCodeMap[char] || '');
    });
    return messageList.toArray().join(' ');
}

// Decode Morse code to text
function decodeFromMorse(morse) {
    const messageList = new LinkedList();
    morse.split(' ').forEach(code => {
        messageList.add(reverseMorseCodeMap[code] || '');
    });
    return messageList.toArray().join('');
}

// Handling UI interactions
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encodeButton = document.getElementById('encodeButton');
    const decodeButton = document.getElementById('decodeButton');

    encodeButton.addEventListener('click', () => {
        outputText.value = encodeToMorse(inputText.value);
    });

    decodeButton.addEventListener('click', () => {
        outputText.value = decodeFromMorse(inputText.value);
    });
});
