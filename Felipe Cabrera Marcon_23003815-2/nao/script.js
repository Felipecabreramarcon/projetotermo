let botaonao= document.getElementById("nao")

botaonao.addEventListener("mouseover",mover)

function mover(){
    function getRandomInt() {
        min = 0
        max = 500
        return Math.floor(Math.random() * (max - min)) + min;
      }

      let numX = getRandomInt();
      let numY = getRandomInt();

      botaonao.style.left = numX + "px"; 
      botaonao.style.top = numY + "px";
}