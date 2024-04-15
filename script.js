let teclas = document.querySelectorAll(".tecla")
let linhas = document.querySelectorAll("tr")
let enterButton = document.querySelector(".ENTER")
let deleteButton = document.querySelector("#delete")
let linhaAtual = 0
let tentativa = ''
cont = 1
let palavra = "macaco"
function digita(tecla) {
    if (cont <= palavra.length) {
        tentativa += tecla
        linhas[linhaAtual].childNodes[cont].innerHTML = tecla
        atual()
        cont++
    }
}
deleteButton.addEventListener("click", backspace)
function backspace() {
    linhas[linhaAtual].childNodes[cont - 1].innerHTML = ""
    cont--
    tentativa = tentativa.slice(0, -1)
    console.log(tentativa)
    atual()
}
function enter() {
    if (tentativa.length < palavra.length) {
        alert("erro")
    } else {
        palavra = palavra.toUpperCase()
        for (let i = 0; i < palavra.length; i++) {
            console.log(tentativa[i], palavra[i])
            if (tentativa[i] === palavra[i]) {
                if (linhas[linhaAtual].childNodes[i + 1]) {
                    linhas[linhaAtual].childNodes[i + 1].style.backgroundColor = "#3aa394"; // Letra correta na posição correta
                }
            } else if (palavra.includes(tentativa[i])) {
                if (linhas[linhaAtual].childNodes[i + 1]) {
                    linhas[linhaAtual].childNodes[i + 1].style.backgroundColor = "#d3ad69"; // Letra correta, mas na posição errada
                }
            }
        }
        linhas[linhaAtual].childNodes[cont - 1].style.border = "none"
        tentativa = ""
        linhaAtual++
        cont = 1
        atual()
    }
    if (tentativa === palavra) {
        linhas[linhaAtual].childNodes.forEach(e => {
            e.style.backgroundColor = "#3aa394"
        })
    }

}
enterButton.addEventListener("click", enter)
function start(palavra) {

    linhas.forEach((linha) => {
        for (let i = 0; i < palavra.length; i++) {
            const letra = document.createElement('td');
            letra.classList = "td";
            linha.appendChild(letra);
        }
    });
}

teclas.forEach((tecla) => {
    tecla.addEventListener("click", () => digita(tecla.innerHTML))
})

function atual() {
    for (let i = 0; i < palavra.length; i++) {
        linhas[linhaAtual].childNodes[i + 1].style.border = "none"
    }
    linhas[linhaAtual].childNodes[cont].style.border = "1px solid black"
}

start(palavra)
