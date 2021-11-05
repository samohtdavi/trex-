var trex, trex_correndo, pontas;
var solo,imagemdosolo, soloinvisivel;
var nuvem,imagemn;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var pontuacao = 0;
var grupocactos, gruponuvens;
var estadodojogo = "JOGAR";
var trex_colidindo
var GameOver, imagemGameOver 
var somdopulodamorte,pulatropinha,ganhamotropinha
var andamaisrapidoaegarai=7
var restart, imagemr;
var pteranodonte
var pteranodontemg
function preload (){
  //loadAnimation/loadImage = carrega todas as imagens/animações 
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  imagemdosolo = loadImage ( "ground2.png");
  imagemn=loadImage("cloud.png")
  cacto1=loadImage("obstacle1.png")
  cacto2=loadImage("obstacle2.png")
   cacto3=loadImage("obstacle3.png")
   cacto4=loadImage("obstacle4.png")
   cacto5=loadImage("obstacle5.png")
   cacto6=loadImage("obstacle6.png") 
  imagemGameOver=loadImage("gameOver.png")
  trex_colidindo =loadAnimation("trex_collided.png")
  somdopulodamorte=loadSound("die.mp3")
  pulatropinha=loadSound("jump.mp3")
  ganhamotropinha=loadSound ("checkPoint.mp3")
  imagemr=loadImage("restart.png")
  pteranodontemg=loadAnimation("ptr1.png","ptr2.png")
}

function setup(){ //Padrões de configuração do jogo!
  createCanvas(600,200);
  restart = createSprite (300,130,20,20)
  restart.addImage (imagemr)
  restart.scale = 0.3
  restart.visible = false 
  pteranodonte=createSprite (500,170,10,10)
  pteranodonte.addAnimation ("ptr1.png",pteranodontemg)
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);  
  // addAnimation adiciona a animação no Sprite!
  trex.addAnimation ("running", trex_correndo); 
  trex.addAnimation ("colided",trex_colidindo)
  // pontas = createEdgeSprites (); // Beiradas! 
  trex.scale = 0.5; //scala e posição
  
  //SOLO
  solo = createSprite(300,190,600,20); 
  solo.addImage ("ground1", imagemdosolo)
  
  //solo invisível:
  soloinvisivel = createSprite(300,200,600,10); 
  soloinvisivel.visible = false; 
  
  grupocactos = new Group();
  gruponuvens = new Group();
  GameOver = createSprite (300,100,10,10)
  GameOver.addImage (imagemGameOver)
GameOver.scale =0.5;
  GameOver.visible=false;
}
 

function draw(){
  background ("white");
  text("pontuação; "+pontuacao,500,40)
  
  
  if(estadodojogo === "JOGAR"){
    solo.velocityX = -andamaisrapidoaegarai;
    pontuacao=pontuacao + Math.round (frameCount/190)
    if(keyDown("space") && trex.y >=160)   {
      trex.velocityY = -15;
      pulatropinha.play()
      
    }  
    if(pontuacao%100===0&&pontuacao>0){
      ganhamotropinha.play()
      andamaisrapidoaegarai=andamaisrapidoaegarai+1
    }
    
    trex.velocityY = trex.velocityY + 0.8; //"gravidade"
if(solo.x<0) {
    solo.x=solo.width/2;  //width === largura{
  
}
  gerarNuvem ();
    gerarcacto();
    if (grupocactos.isTouching(trex)){
    estadodojogo = "ENCERRAR"   
      
      trex.changeAnimation("colided",trex_colidindo)
      somdopulodamorte.play()
    }
  } else if (estadodojogo === "ENCERRAR"){
    trex.velocityY=0
    solo.velocityX = 0;
    grupocactos.setVelocityXEach(0)
  gruponuvens.setVelocityXEach(0)
    grupocactos.setLifetimeEach(-1)
    gruponuvens.setLifetimeEach(-1)
    GameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
      callfunction()
     
    }
  }
  trex.collide (soloinvisivel ); // quicando nas beiras
  
  
  
  drawSprites();
  
}



function gerarNuvem () {
  
  if(frameCount%60===0){
    
    nuvem=createSprite (600,100,40,60)
    nuvem.y=  Math.round(random(10,100));
    nuvem.velocityX = -2
    nuvem.addImage(imagemn)
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
    nuvem.scale= 0.5
    nuvem.lifetime = 310
    gruponuvens.add(nuvem);
  }

}

function gerarcacto () {
  if(frameCount%70===0){
      cacto=createSprite(600,174,40,60)
  cacto.velocityX = -andamaisrapidoaegarai
    var rand = Math.round(random(1,6))
    switch (rand) {
      case 1:cacto.addImage(cacto1)
        break; 
        case 2:cacto.addImage(cacto2)
        break; 
        case 3:cacto.addImage(cacto3)
        break; 
        case 4:cacto.addImage(cacto4)
        break; 
        case 5:cacto.addImage(cacto5)
        break; 
        case 6:cacto.addImage(cacto6)
        break; 
        default: break
        
    }
        cacto.scale= 0.4;
        grupocactos.add(cacto);
        cacto.lifetime=310
  }

  
  
}
function callfunction(){
  grupocactos.destroyEach()
  gruponuvens.destroyEach()
  trex.changeAnimation("running",trex_correndo) 
  restart.visible=false
  GameOver.visible=false
  pontuacao=0
  
  estadodojogo="JOGAR"
}






