window.addEventListener('load',function(){
    //canvas setup
    const canvas =document.getElementById('canvas1');
    const ctx=canvas.getContext('2d') ;
    canvas.width=500;
    canvas.height=500;
    class InputHandler{
        constructor(game){
            this.game=game;
            window.addEventListener('keydown',e=>{
                if(((e.key==='ArrowUp') ||
                    (e.key==='ArrowDown')
                )
                && this.game.keys.indexOf(e.key)===-1){
                    this.game.keys.push(e.key);
                 } else if(e.key===" "){
                    this.game.player.shootTop();
                 }
            });

            window.addEventListener('keyup',e=>{
                if(this.game.keys.indexOf(e.key)>-1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1);
                 }  
            });
        }
    }
    class Proyectile{
        constructor(game,x,y){
            this.game=game;
            this.x=x;
            this.y=y;
            this.width=10;
            this.height=3;
            this.speed=3;
            this.markedForDeletion=false;
        }
        update(){
            this.x+=this.speed;
            if(this.x>this.game.width*0.8) this.markedForDeletion=true;
        }
        draw(context)
        {
            context.fillStyle='yellow';
            context.fillRect(this.x,this.y,this.width,this.height);
        }

    }
    class Praticle{

    }
    class Player{
        constructor(game){
            this.game=game;
            this.width=120;
            this.height=190;
            this.x=20;
            this.y=100;
            this.speedY=0;
            this.maxSpeed=2;
            this.proyectiles=[];
        }
        update(){
            if(this.game.keys.includes('ArrowUp')) this.speedY=-this.maxSpeed;
            else if(this.game.keys.includes('ArrowDown')) this.speedY=this.maxSpeed;
            else this.speedY=0;
            this.y+=this.speedY;
            //handle projectiles
            this.proyectiles.forEach(proyectiles=>{
                proyectiles.update();
            });
            this.proyectiles=this.proyectiles.filter(proyectiles=>!proyectiles.markedForDeletion);
        }
        draw(context){
            context.fillStyle='black';
            context.fillRect(this.x,this.y,this.width,this.height);
            this.proyectiles.forEach(proyectiles=>{
                proyectiles.draw(context);
            });
        }
        shootTop(){
            if(this.game.amno>0){
                this.proyectiles.push(new Proyectile(this.game,this.x +80 ,this.y +30)); 
                this.game.amno--;
            }
           
        }
    }
    class Enemy{

    }
    class Layer {

    }
    class Background{

    }
    class UI{

    }
    class Game {
        constructor(width,height){
            this.width=width;
            this.height=height;
            this.player=new Player(this);
            this.input=new InputHandler(this);
            this.keys=[];
            this.amno=20;
            this.maxAmno=50;
            this.amnoTimer=0;
            this.amnoInterval=500;
        }
        update(deltaTime){
            this.player.update();
            if(this.amnoTimer>this.amnoInterval){
                if(this.amno<this.maxAmno) this.amno++;
                this.amnoTimer=0;
            }else{
                this.amnoTimer+=deltaTime;
            }
        }
        draw(context){
            this.player.draw(context);
        }

    }
    
    const game=new Game(canvas.width,canvas.height);
    let lastTime=0
    //animation loop
    function animate(timeStamp){
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp;

        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});

