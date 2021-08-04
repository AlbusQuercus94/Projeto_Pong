//Variáveis do ambiente
let ctx ; //renderiza objetos no canvas
const h = 500; //altura do canvas
const w = 800; //largura do canvas
const p_w = 20; //largura das raquetes, como são raquetes iguais apenas uma constante necessária
const p_h = 200; //altura das raquetes, que são iguais, logo uma constante só

//Variáveis dos Jogadores
let p1_y;
let p2_y; //variáveis que controlam os movimentos de para cima e para baixo das "raquetes" de cada player 
let p1_points, p2_points // variáreis responsáveis pela computação dos pontos
const p1_x = 10;//posição do eixo x do jogador 1
const p2_x = w - p_w - 10; //posição do eixo x do jogador 2

//Variável da bola
let ball_y_orientation; //Direção que a bola está indo no eixo y
let ball_x_orientation; //Direção que a bola está indo no eixo x
let ball_y; //Posição da bola no eixo y
let ball_x; //Posição da bola no eixo x


//Função resposável por inicializar todas as variáveis
function setup() {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //Inicializa a posição dos jogadores, que é no meio da tela
    p1_y = p2_y = (h / 2) - (p_h / 2);

    //Inicializa os pontos dos jogadores, que é zero
    p1_points = 0;
    p2_points = 0;

    //Definindo o frame rate
    setInterval(loop, 1000 / 60);
    
    initBall();
}


//Função Loop responsável por calcular o eventos dentro do jogo(onde a bola irá, quem marcou ponto e o fim do jogo.)
function loop () {
    draw() //Não esquecer de chamar o draw no loop para poder aparecer a tela
}

//Função responsável pela movimentação da bola
function initBall() {
    console.log(`${p1_points} VS ${p2_points}`);
    ball_y_orientation = Math.pow (2, Math.floor(Math.random() * 2) + 1) - 3
    ball_x_orientation = Math.pow (2, Math.floor(Math.random() * 2) + 1) - 3
    ball_y = w / 2 - 10
    ball_x = h / 2 - 10

}

//Função que desenhas as raquetes
function drawRect(x, y, w, h, color = "#fff") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#000'
    
}

function draw () {
    //Fundo
    drawRect(0, 0, w, h, '#000');
    //Player 1
    drawRect(p1_x, p1_y, p_w, p_h);
    //Player 2 
    drawRect(p2_x, p2_y, p_w, p_h);
    //Barra Lateral
    drawRect(w / 2 - 5, 0, 5, h);
    //Bola
    drawRect(ball_x, ball_y, 10, 10)
    
    
}


setup() //Chamada da função setup para iniciar o jogo