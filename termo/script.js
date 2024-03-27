let cont = 0;
let tentativa = "";
let letras = document.getElementsByClassName("td");
let teste = 5;

function colocaLetra(event) {
    let palavra = "COISA";

    if (cont <= teste) {
        let temp = event.target.innerHTML;
        letras[cont].innerHTML = temp;
        tentativa += temp;
        cont++;
    }

    if (cont >= teste) {
        for (let i = teste - 5, j = 0; i < teste; i++, j++) {
            let cor = "";
            if (tentativa[j] === palavra[j]) {
                cor = "#3aa394"; // letra correta na posição correta
            } else if (palavra.includes(tentativa[j])) {
                cor = "#d3ad69"; // letra correta, mas na posição errada
            } else {
                cor = ""; // letra errada
            }
            letras[i].style.backgroundColor = cor;
        }
        tentativa = "";
        teste += 5;
    }
}

let teclas = document.getElementsByClassName("tecla");
for (let i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener("click", colocaLetra);
}
