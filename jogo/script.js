let teclas = document.querySelectorAll(".tecla")
let jogo = document.querySelector("#game")
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
    if (cont > 1) {
        linhas[linhaAtual].childNodes[cont - 1].innerHTML = ""
        cont--
        tentativa = tentativa.slice(0, -1)
        console.log(tentativa)
        atual()
    } else {
        return
    }

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
                    linhas[linhaAtual].childNodes[i + 1].style.transform = "rotateY(360deg)"
                    teclas.forEach(tecla => {
                        if (tecla.innerHTML == tentativa[i]) {
                            tecla.style.transition = "800ms"
                            tecla.style.backgroundColor = "#3aa394"
                            tecla.style.transform = "rotateY(360deg)"
                        }
                    })
                }
            } else if (palavra.includes(tentativa[i])) {
                if (linhas[linhaAtual].childNodes[i + 1]) {
                    linhas[linhaAtual].childNodes[i + 1].style.backgroundColor = "#d3ad69"; // Letra correta, mas na posição errada
                    linhas[linhaAtual].childNodes[i + 1].style.transform = "rotateY(360deg)"
                    teclas.forEach(tecla => {
                        if (tecla.innerHTML == tentativa[i]) {
                            tecla.style.transition = "800ms"
                            tecla.style.backgroundColor = "#d3ad69"
                            tecla.style.transform = "rotateY(360deg)"
                        }
                    })
                }
            }
            if (tentativa[i] !== palavra[i] && !palavra.includes(tentativa[i])) {
                linhas[linhaAtual].childNodes[i + 1].style.backgroundColor = "rgba(0,0,0,0.21)";
                linhas[linhaAtual].childNodes[i + 1].style.color = "#d3d3d3";
                linhas[linhaAtual].childNodes[i + 1].style.transform = "rotateY(360deg)"
                teclas.forEach(tecla => {
                    if (tecla.innerHTML == tentativa[i]) {
                        tecla.style.transition = "800ms"
                        tecla.style.backgroundColor = "rgba(0,0,0,0.21)"
                        tecla.style.color = "#d3d3d3"
                        tecla.id = 'naoTem'
                        tecla.style.transform = "rotateY(360deg)"
                    }
                })
            }
        }
        linhas[linhaAtual].childNodes[cont - 1].style.border = "none"
        tentativa = ""
        linhaAtual++
        cont = 1
        atual()
    }
    if (tentativa.trim().toUpperCase() === palavra.trim().toUpperCase()) {
        ganhou();
        console.log('ganhou');
        linhas[linhaAtual].childNodes.forEach(e => {
            e.style.backgroundColor = "#3aa394";
            e.style.transform = "rotateY(360deg)";
        });
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
    tecla.addEventListener("click", () => {
        if (tecla.id !== "naoTem") {

            digita(tecla.innerHTML)
        }
    })
})

function atual() {
    for (let i = 0; i < palavra.length; i++) {
        linhas[linhaAtual].childNodes[i + 1].style.border = "none"
    }
    if (cont > 0) {
        linhas[linhaAtual].childNodes[cont].style.border = "1px solid black"
    }

}
document.addEventListener('keydown', function (event) {
    teclas.forEach((tecla) => {
        if (tecla.innerHTML == event.key.toUpperCase() && tecla.id !== "naoTem") {
            digita(tecla.innerHTML)
        }
    })
    if (event.key == "Enter") {
        enter()
    }
    if (event.key == "Backspace") {
        backspace()
    }
});
function ganhou() {
    jogo.innerHTML = ""
}

start(palavra)
