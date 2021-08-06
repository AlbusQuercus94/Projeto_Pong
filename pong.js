//Variáveis do ambiente
let ctx ; //renderiza objetos no canvas
const h = 500; //altura do canvas
const w = 800; //largura do canvas
const p_w = 20; //largura das raquetes, como são raquetes iguais apenas uma constante necessária
const p_h = 150; //altura das raquetes, que são iguais, logo uma constante só
var velo = 3 //velocidade base da bola

//Variáveis dos Jogadores
let p1_y;
let p2_y; //variáveis que controlam os movimentos de para cima e para baixo das "raquetes" de cada player 
let p1_points, p2_points // variáreis responsáveis pela computação dos pontos
const p1_x = 10;//posição do eixo x do jogador 1
const p2_x = w - p_w - 10; //posição do eixo x do jogador 2
let p1_key; //Botão de movimento do jogador 1
let p2_key; //Botão de movimento do jogador 2

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
    
    //Verifica a colisão com a raquete do jogador 1
    if(ball_x >= p1_x && 
        ball_x <= p1_x + 10 && 
        ball_y >= p1_y && 
        ball_y <= p1_y + p_h){
            ball_x_orientation = 1;
            velo+=0.5;//A cada vez que a bola colidir com a raquete 1 a bola aumenta a velocidade me 0.5
    }
    //Verifica a colisão com a raquete do jogador 2
    else if(ball_x >= p2_x &&
        ball_x <= p2_x + 10 &&
        ball_y >= p2_y &&
        ball_y <= p2_y + p_h){
            ball_x_orientation = -1;
            velo +=0.5;//A cada vez que a bola colidir com a raquete 2 a bola aumenta a velocidade me 0.5            
    }
    //Verifica a colisão com o chão ou o teto
    if (ball_y + 10 >= h || ball_y <= 0) ball_y_orientation *= -1

    //Movimento da bola no eixo X e Y
    ball_x += velo * ball_x_orientation
    ball_y += velo * ball_y_orientation
    console.log(velo)

    //Contabilizando pontos
    if(ball_x + 10 >w){
        p1_points++;
        initBall()
    }else if (ball_x < 0){
        p2_points++;
        initBall()
    }


    //Adicionando o código responsável por mover as raquetes
    //Raquete do jogador um
    if(p1_key == 87 && p1_y > 0){
        p1_y -= 10
    }else if(p1_key == 83 && p1_y + p_h < h){
        p1_y += 10
    }
    
    //Raquete do jogador dois
    if( p2_key == 38 && p2_y > 0){
        p2_y -= 10
    }else if (p2_key == 40 && p2_y + p_h < h){
        p2_y +=10
    }
    
    draw() //Não esquecer de chamar o draw no loop para poder aparecer a tela
}

//Função responsável pela movimentação da bola
function initBall() {
    console.log(`${p1_points} VS ${p2_points}`);
    ball_y_orientation = Math.pow (2, Math.floor(Math.random() * 2) + 1) - 3
    ball_x_orientation = Math.pow (2, Math.floor(Math.random() * 2) + 1) - 3
    ball_y = w / 2 - 10
    ball_x = h / 2 - 10
    velo = 3 //Reseta o valor da bola a cada ponto feito

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
    drawRect(ball_x, ball_y, 10, 10);

    //Escrever os Pontos
    writePoints()
    
}

function writePoints(){
    ctx.font = "50px monospace";
    ctx.fillStyle = "#fff";
    //w/4 = 1/4 da tela, que é a tela do jogador 1
    ctx.fillText(p1_points, w/4, 50);
    //3*(w/4) = 3/4 da tela, que é a tela do jogador 2
    ctx.fillText(p2_points, 3*(w/4),50)
}

document.addEventListener("keydown",function(ev){
    //keyCode 87 = w, keyCode8 3 = s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        p1_key = ev.keyCode
    }
    //keyCode 38 arrowUp, keyCode 40 = arrowDown
    else if (ev.keyCode == 38 || ev.keyCode == 40){
        p2_key = ev.keyCode
    }
}) 

setup() //Chamada da função setup para iniciar o jogo