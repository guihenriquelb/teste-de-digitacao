//seleção de elementos

const text = document.querySelector("#text")
const input = document.querySelector("#input")
const restart = document.querySelector("#restart")
const result = document.querySelector("#result")
const historic = document.querySelector("#historic")

// textos

const texts = [
    "Texto1",
    "Texto2",
    "Texto3",
    "Texto4",
    "Texto5"
]

// funcões

// inserir texto randomico
function newText() {
    const index = Math.floor(Math.random() * texts.length)
    text.textContent = texts[index]
}

function updateText() {
    start()

    if(input.value === text.textContent){
        verify()
    }
}

function start() {
    const testStatus = JSON.parse(localStorage.getItem("testProgress"))

    if (!testStatus){
        localStorage.setItem("startTime", new Date().getTime())
        localStorage.setItem("testProgress", true)
    }   
}

function verify() {
    const finalTime = new Date().getTime()
    const startTime = parseInt(localStorage.getItem("startTime"))
    const timeSpent = (finalTime - startTime) / 1000

    result.textContent = `Parabéns! Você levou ${timeSpent.toFixed(2)} segundos`

    addToHistory(text.textContent, timeSpent)

    localStorage.setItem("testProgress", false)
    input.value = ""
    newText()
}

function addToHistory(typedText, timeSpent) {
    const itemHistory = document.createElement("p")
    itemHistory.textContent = `Texto: "${typedText}" - Tempo: ${timeSpent.toFixed(2)} segundos.`

    historic.appendChild(itemHistory)
}

function restartTest() {
    input.value = ""
    result.textContent = ""
    newText()
    localStorage.setItem("testProgress", false)
    historic.innerHTML = ""
}


input.addEventListener("keyup", updateText)
restart.addEventListener("click", restartTest)

newText()