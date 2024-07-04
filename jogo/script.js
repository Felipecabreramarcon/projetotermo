let teclas = window.document.querySelectorAll(".tecla");
let jogo = window.document.querySelector("#game");
let linhas = window.document.querySelectorAll("#game div table tr");
let enterButton = window.document.querySelector(".ENTER");
let deleteButton = window.document.querySelector("#delete");
let linhaAtual = 0;
let tentativa = "";
let cont = 1;
let palavra;
let dica;
let redirecionamento;
let palavraCont = 0;

console.log(jogo, linhas, linhaAtual, linhas[linhaAtual]);

const palavras = [
  {
    palavra: "Lixeira",
    dica:
      "Este objeto é um guardião do nosso planeta, recebendo o que não serve mais e o transformando em algo útil novamente. É onde depositamos nossa contribuição para um mundo mais limpo e sustentável.",
    redirecionamento:
      "https://superprobettanin.com.br/blog/lixeiras-de-reciclagem/",
  },
  {
    palavra: "Reciclagem",
    dica:
      "Transformação de materiais usados em novos produtos, reduzindo o desperdício e o consumo de recursos naturais.",
    redirecionamento:
      "https://mundoeducacao.uol.com.br/geografia/reciclagem.htm",
  },
  {
    palavra: "Biodiversidade",
    dica:
      "Variedade de vida na Terra, incluindo a diversidade de espécies, ecossistemas e diferenças genéticas dentro das populações.",
    redirecionamento:
      "https://www.greenpeace.org/brasil/blog/o-que-e-biodiversidade-e-quais-as-ameacas/",
  },
  {
    palavra: "Desmatamento",
    dica:
      "Remoção de florestas para dar lugar à agricultura ou desenvolvimento urbano, causando impactos ambientais significativos.",
    redirecionamento: "https://www.ecycle.com.br/desmatamento/",
  },
  {
    palavra: "Reflorestamento",
    dica:
      "Plantio de árvores em áreas onde a floresta foi destruída, ajudando a recuperar ecossistemas e combater as mudanças climáticas.",
    redirecionamento:
      "https://www.iberdrola.com/sustentabilidade/o-que-e-reflorestamento#:~:text=Trata%2Dse%20do%20plantio%20em,adequado%20nesse%20caso%20seria%20florestamento",
  },
  {
    palavra: "Ecologia",
    dica:
      "Ciência que estuda as relações entre os organismos vivos e o ambiente em que vivem, incluindo interações com outros organismos.",
    redirecionamento:
      "https://brasilescola.uol.com.br/biologia/ecologia.htm#:~:text=Ecologia%20%C3%A9%20a%20ci%C3%AAncia%20que%20estuda%20as%20rela%C3%A7%C3%B5es%20entre%20os,%2C%20popula%C3%A7%C3%B5es%2C%20comunidades%20e%20ecossistemas",
  },
];

function digita(tecla) {
  console.log(cont);
  if (cont <= palavra.length) {
    tentativa += tecla;
    linhas[linhaAtual].childNodes[cont - 1].innerHTML = tecla;
    atual();
    cont++;
  }
}

deleteButton.addEventListener("click", backspace);

function backspace() {
  if (cont > 1 && cont < 8) {
    linhas[linhaAtual].childNodes[cont - 2].innerHTML = "";
    cont--;
    tentativa = tentativa.slice(0, -1);
    atual();
  }
  if (cont === 1) {
    linhas[linhaAtual].childNodes[cont - 1].innerHTML = "";
    tentativa = tentativa.slice(0, -1);
    atual();
  }
  if (cont === 8) {
    linhas[linhaAtual].childNodes[cont - 2].innerHTML = "";
    cont--;

    tentativa = tentativa.slice(0, -1);
    atual();
  } else {
    return;
  }
}

function enter() {
  console.log(linhaAtual);

  if (tentativa.trim().toUpperCase() == palavra.trim().toUpperCase()) {
    ganhou();
    console.log("ganhou");
  }
  if (tentativa.length < palavra.length) {
    alert("erro");
  } else {
    palavra = palavra.toUpperCase();
    for (let i = 0; i < palavra.length; i++) {
      console.log(tentativa[i], palavra[i]);
      if (tentativa[i] === palavra[i]) {
        if (linhas[linhaAtual].childNodes[i]) {
          linhas[linhaAtual].childNodes[i].style.backgroundColor = "#3aa394"; // Letra correta na posição correta
          linhas[linhaAtual].childNodes[i].style.transform = "rotateY(360deg)";
          teclas.forEach((tecla) => {
            if (tecla.innerHTML == tentativa[i]) {
              tecla.style.transition = "800ms";
              tecla.style.backgroundColor = "#3aa394";
              tecla.style.transform = "rotateY(360deg)";
            }
          });
        }
      } else if (palavra.includes(tentativa[i])) {
        if (linhas[linhaAtual].childNodes[i]) {
          linhas[linhaAtual].childNodes[i].style.backgroundColor = "#d3ad69"; // Letra correta, mas na posição errada
          linhas[linhaAtual].childNodes[i].style.transform = "rotateY(360deg)";
          teclas.forEach((tecla) => {
            if (tecla.innerHTML == tentativa[i]) {
              tecla.style.transition = "800ms";
              tecla.style.backgroundColor = "#d3ad69";
              tecla.style.transform = "rotateY(360deg)";
            }
          });
        }
      }
      if (tentativa[i] !== palavra[i] && !palavra.includes(tentativa[i])) {
        linhas[linhaAtual].childNodes[i].style.backgroundColor =
          "rgba(0,0,0,0.21)";
        linhas[linhaAtual].childNodes[i].style.color = "#d3d3d3";
        linhas[linhaAtual].childNodes[i].style.transform = "rotateY(360deg)";
        teclas.forEach((tecla) => {
          if (tecla.innerHTML == tentativa[i]) {
            tecla.style.transition = "800ms";
            tecla.style.backgroundColor = "rgba(0,0,0,0.21)";
            tecla.style.color = "#d3d3d3";
            tecla.id = "naoTem";
            tecla.style.transform = "rotateY(360deg)";
          }
        });
      }
    }
    tentativa = "";

    linhaAtual++;
    if (linhaAtual === 6) {
      document.querySelector(`.failScreen`).style.display = "flex";
      return;
    }
    cont = 1;
    atual();
  }
}

enterButton.addEventListener("click", enter);

teclas.forEach((tecla) => {
  tecla.addEventListener("click", () => {
    if (tecla.id !== "naoTem") {
      digita(tecla.innerHTML);
    }
  });
});

console.log(linhas[linhaAtual].childNodes);

function atual() {
  if (linhaAtual > 0) {
    for (let i = 0; i < palavra.length; i++) {
      console.log(linhas[linhaAtual].childNodes[i]);
      linhas[linhaAtual - 1].childNodes[i].style.border = "none";
    }
  }
  for (let i = 0; i < palavra.length; i++) {
    console.log(linhas[linhaAtual].childNodes[i]);
    linhas[linhaAtual].childNodes[i].style.border = "none";
  }
  if (cont > 0) {
    console.log(linhas[linhaAtual].childNodes[cont - 1]);

    linhas[linhaAtual].childNodes[cont - 1].style.border = "1px solid black";
  }
}

document.addEventListener("keydown", function (event) {
  teclas.forEach((tecla) => {
    if (tecla.innerHTML == event.key.toUpperCase() && tecla.id !== "naoTem") {
      digita(tecla.innerHTML);
    }
  });
  if (event.key == "Enter") {
    enter();
  }
  if (event.key == "Backspace") {
    backspace();
  }
  console.log(tentativa);
  console.log(cont);
});

function ganhou() {
  const myCanvas = document.createElement("canvas");
  myCanvas.classList = "canvas";
  document.body.appendChild(myCanvas);
  var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
  });
  myConfetti({
    particleCount: 500,
    spread: 150,

    // any other options from the global
    // confetti function
  });
  for (let i = 1; i < 6; i++) {
    linhas[i].style.display = "none";
  }

  var winModal = document.querySelector(".winModal");
  var flexCol = document.querySelector(".flexCol");
  let button = document.createElement("button");
  button.classList = "winbtnn ai";
  button.innerHTML = `Entenda a importância da(o): ${palavras[palavraCont].palavra}`;
  button.addEventListener("click", () => {
    window.open(palavras[palavraCont].redirecionamento, "_blank");
  });
  flexCol.appendChild(button);

  winModal.style.display = "flex";

  if (!palavras[palavraCont + 1]) {
    const proximaPalavraButton = document.querySelector(".ii");
    proximaPalavraButton.style.display = "none";
  }
  setInterval(() => {
    myCanvas.style.display = "none";
  }, 3000);
}

function proximaPalavra() {
  var winModal = document.querySelector(".winModal");
  const flexCol = document.querySelector(".flexCol");
  const button = document.querySelector(".ai");
  console.log(button);
  flexCol.removeChild(button);

  winModal.style.display = "none";
  palavraCont++;
  reset();
}

let isActive = false;
let howButton = document.querySelector("#HowToPlayButton");
let howModal = document.querySelector(".HowToPlayButton");
let howModalContainer = document.querySelector(".ModalHow");
let body = document.querySelector("body");
howButton.addEventListener("click", () => {
  howModalContainer.style.display = "flex";
  howModalContainer.style.backdropFilter = "brightness(0.3)";
});
howModalContainer.addEventListener("click", () => {
  howModalContainer.style.display = "none";
  howModalContainer.style.backdropFilter = "";
});
let tip = document.querySelector(".tip");

function start(palavras) {
  palavra = palavras[palavraCont].palavra;
  dica = palavras[palavraCont].dica;
  redirecionamento = palavras[palavraCont].redirecionamento;

  tip.innerHTML = dica;
  linhas.forEach((linha) => {
    for (let i = 0; i < palavra.length; i++) {
      const letra = document.createElement("td");
      letra.classList = "td";
      linha.appendChild(letra);
    }
  });
  linhas.forEach((linha, index) => {
    linha.style.display = "flex";
  });
}

start(palavras);

function reset() {
  document.querySelector(`.failScreen`).style.display = "none";
  cont = 1;
  tentativa = "";
  linhaAtual = 0;
  linhas.forEach((linha) => {
    linha.innerHTML = "";
  });
  teclas.forEach((tecla) => {
    tecla.style.backgroundColor = "#777777";
    tecla.style.transform = "rotateY(0deg)";
    tecla.id = "";
  });
  start(palavras);
}

let isOpen = false;
function abreDica() {
  if (isOpen) {
    tip.style.display = "flex";
    isOpen = !isOpen;
  } else {
    tip.style.display = "none";
    isOpen = !isOpen;
  }
}
