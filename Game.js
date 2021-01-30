class Game{
    constructor(){

    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      snowman1 = createSprite(30,30);
      snowman1.addImage(snowmanImage);
      snowman1.scale = 0.4;
      snowman2 = createSprite(displayWidth - 30, 30);
      snowman2.addImage(snowmanImage);
      snowman2.scale = 0.4;
      snowman3 = createSprite(30, displayHeight - 30);
      snowman3.addImage(snowmanImage);
      snowman3.scale = 0.4;
      snowman4 = createSprite(displayWidth - 30, displayHeight - 30);
      snowman4.addImage(snowmanImage);
      snowman4.scale = 0.4;
      snowmans = [snowman1, snowman2, snowman3, snowman4];

    }



    play(){


      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(230);
  
        
        var index = 0;
  
        
        var x = 100;
        var y;
  
        for(var plr in allPlayers){
          
          index = index + 1 ;

          //x = x + 200;
          
          y = displayHeight - allPlayers[plr].distance;
          x = displayWidth - allPlayers[plr].xdistance;

          snowmans[index-1].x = x;
          snowmans[index-1].y = y;
  
          if (index === player.index){
            camera.position.x = snowmans[index-1].x
            camera.position.y = snowmans[index-1].y
          }
         
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }

      
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }

      
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.xdistance +=10
        player.update();
      }

      
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.xdistance -=10
        player.update();
      }

  
      //if (player.distance > 3800){
        //gameState = 2;
  
     // }
  
      
      drawSprites();
    }




}