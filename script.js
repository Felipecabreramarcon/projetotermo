let cont = 0;
let tentativa = "";
let letras = document.getElementsByClassName("td");
let teste = 5;
let linha = 1;
let del = document.getElementById('delete');
function colocaLetra(event) {
    let palavra = "JUNIN ";

    if (cont <= teste) {
        if (cont < 29) {
            letras[cont + 1].style.outline = "2px solid black"
        } else {
            letras[cont].style.outline = "2px solid black"
        }
        let temp = event.target.innerHTML;
        letras[cont].innerHTML = temp;
        tentativa += temp;
        cont++;
        console.log(cont);
        letras[cont - 1].style.outline = "none";

    }
    if (cont % 5 == 0) {
        letras[cont].style.outline = "2px solid black"
    }
    if (cont >= teste) {
        linha += 1;
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
for (let i = 0; i < letras.length; i++) {
    letras[i].addEventListener("click", () => seleciona(i));
}
function seleciona(i) {

    let limiteInferior = (linha - 1) * 5;
    let limiteSuperior = linha * 5;

    if (i >= limiteInferior && i < limiteSuperior) {
        for (let j = 0; j < letras.length; j++) {
            letras[j].style.outline = 'none';
        }

        letras[i].style.outline = '2px solid black';
        cont = i;
    }
}






del.addEventListener("click", voltatecla);

function voltatecla() {
    console.log(cont);


    letras[cont].innerHTML = '';
    if (cont > 0 && cont % 5 !== 0) {

        tentativa.
            console.log(tentativa);
        atual = cont;

        letras[cont - 1].style.outline = "2px solid black";
        letras[cont].style.outline = "none"
        cont--;
    }


}

