//seleção de elementos

const text = document.querySelector("#text")
const input = document.querySelector("#input")
const restart = document.querySelector("#restart")
const result = document.querySelector("#result")
const historic = document.querySelector("#historic")


// textos

const texts = [
    "O número dos que nos invejam confirma as nossas capacidades.",
    "A vida é muito importante para ser levada a sério.",
    "É melhor conquistar a si mesmo do que vencer mil batalhas.",
    "Ser feliz sem motivo é a mais autêntica forma de felicidade.",
    "A alegria de fazer o bem é a única felicidade verdadeira."
]

// funcões

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

//eventos

input.addEventListener("keyup", updateText)
restart.addEventListener("click", restartTest)

//iniciar

newText()