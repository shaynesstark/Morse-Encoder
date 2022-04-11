const phraseInput = document.getElementById('phrase-input');
const playButton = document.getElementById('play-button');
const codeDiv = document.getElementById('code');

var code = '';

playButton.addEventListener('click', (e) => {
  e.preventDefault();
  playPhrase(phraseInput.value);
})

const audio = new Audio('./assets/440.wav');

const SHORT_TIME = 50;
const LONG_TIME = 150;
const WORD_SPACE_TIME = 350;

const short = () => {
  audio.play();
  code += '&nbsp;.';
  return new Promise(resolve => {
    setTimeout(() => {
      stop(audio);
      resolve();
    }, SHORT_TIME);
  })
}

const long = () => {
  audio.play();
  code += '&nbsp;_';
  return new Promise(resolve => {
    setTimeout(() => {
      stop(audio);
      resolve();
    }, LONG_TIME);
  });
}

const pause = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const stop = (element) => {
  element.pause();
  element.currentTime = 0;
}

const morse = {
  A: [short, long],
  B: [long, short, short, short],
  C: [long, short, long, short],
  D: [long, short, short],
  E: [short],
  F: [short, short, long, short],
  G: [long, long, short],
  H: [short, short, short, short],
  I: [short, short],
  J: [short, long, long, long],
  K: [long, short, long],
  L: [short, long, short, short],
  M: [long, long],
  N: [long, short],
  O: [long, long, long],
  P: [short, long, long, short],
  Q: [long, long, short, long],
  R: [short, long, short],
  S: [short, short, short],
  T: [long],
  U: [short, short, long],
  V: [short, short, short, long],
  W: [short, long, long],
  X: [long, short, short, long],
  Y: [long, short, long, long],
  Z: [long, long, short, short],
  0: [long, long, long, long, long],
  1: [short, long, long, long, long],
  2: [short, short, long, long, long],
  3: [short, short, short, long, long],
  4: [short, short, short, short, long],
  5: [short, short, short, short, short],
  6: [long , short, short, short, short],
  7: [long, long, short, short, short],
  8: [long, long, long, short, short],
  9: [long, long, long, long, short],
}

const playPhrase = async (phrase) => {
  code = '';
  let words = phrase.toUpperCase().split(' ');

  let first = true;
  for (let word of words) {
    if (!first) 
      code += '&nbsp;&nbsp;/&nbsp;&nbsp;';
    
    first = false;
    let letters = word.split('');
    for (let letter of letters) {
      if (!morse[letter]) continue;
      let letterCode = morse[letter];
      for (let fn of letterCode) {
        await fn();
        await pause(SHORT_TIME);
      }
      code += '&nbsp;&nbsp;';
      await pause(LONG_TIME);
      continue;
    }
    await pause(WORD_SPACE_TIME);
  }

  codeDiv.innerHTML = code;
}