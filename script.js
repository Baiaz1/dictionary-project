const inputValue = document.querySelector('.input');
const btn = document.querySelector('.btn');
const block = document.querySelector('.block');
const nameW = document.querySelector('.name')
const partOfSpeech = document.querySelector('.partOfSpeech')
const transcription = document.querySelector('.transcription')
const exampleW = document.querySelector('.example')

const el = document.createElement('p')
const el1 = document.createElement('p')
const el2 = document.createElement('p')
const el3 = document.createElement('audio')
const el4 = document.createElement('p')
const nameW2 = document.createElement('p')
const partOfSpeech2 = document.createElement('p')
const example2 = document.createElement('p')
const transcript2 = document.createElement('p')

function getWord (word, meanings, transcript, example, audio) {
    nameW2.textContent = 'Word:';
    partOfSpeech2.textContent = 'Part of speach:';
    transcript2.textContent = 'Transcription:'
    example2.textContent = 'Example:'
    el.textContent = word;
    el1.textContent = meanings;
    el2.textContent = transcript;
    el4.textContent = example;
    el3.src = audio;
    el3.controls = true;
    inputValue.value = '';
    block.style.border = '1px solid black';
    nameW.append(nameW2)
    partOfSpeech.append(partOfSpeech2)
    transcription.append(transcript2)
    exampleW.append(example2)
    nameW.append(el)
    partOfSpeech.append(el1)
    transcription.append(el2)
    exampleW.append(el4)
    block.append(el3)
}

function cleanText () {
    nameW.remove(nameW2)
    partOfSpeech.remove(partOfSpeech2)
    transcription.remove(transcript2)
    nameW.remove(el)
    partOfSpeech.remove(el1)
    transcription.remove(el2)
    block.remove(el3)
}

let n = 0;

btn.addEventListener('click', () => {
    n++
})

btn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue.value}`
    xhr.open('GET', url);

    xhr.onload = () => {
        let word  = JSON.parse(xhr.response)
        let last = word[0].meanings.length - 1;
        let lastPhonetics = word[0].phonetics.length - 2;
        let searchedWord =  word[0].word;
        let meanings = word[0].meanings[0].partOfSpeech;
        let transcript = word[0].phonetics[lastPhonetics].text;
        let example = word[0].meanings[last].definitions[0].example;
        let audio = word[0].phonetics[lastPhonetics].audio;
    
        if(n === 1){
            getWord(searchedWord, meanings, transcript, example, audio)
        }else{
            getWord(searchedWord, meanings, transcript, example, audio)
        }
    }
    xhr.send();
})
