const searchBtn = document.getElementById('searchBtn');
const sound = document.getElementById('sound');
const resultContainer = document.getElementById('result');

searchBtn.addEventListener('click', function () {
    const inputText = document.getElementById('inputField');
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputText.value}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        resultContainer.innerHTML = `
        <div class="word">
            <h2>${inputText.value}</h2>
            <button><i class="fa-solid fa-volume-high" onclick="playAudion()"></i></button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
        </div>
        <p class="wordMeaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="wordExample">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>
        `
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`)
    })
    .catch(err => {
        resultContainer.innerHTML = `
            <h2 class="error">Couldn't Find the Word</h2>
        `
    })
})

function playAudion () {
    sound.play();
}