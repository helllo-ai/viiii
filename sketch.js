//Create variables here
 var dog,happyDog, database, foodS, foodStock,dog1
 var fedTime,lastFed,feed,addFood,foodObj,bedroom,living,wash
 gamestate="Play"
 function preload(){
  dog1=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
  wash=loadImage("images/Wash Room.png");
  living=loadImage("images/Living Room.png");
  bedroom=loadImage("images/Bed Room.png");
  }
  
  function setup() {
    database=firebase.database();
    createCanvas(1000,400);
  
    foodObj = new Food();
  
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);
    
    dog=createSprite(800,200,150,150);
    dog.addImage(dog1);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
  
    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
  
  }
  
  function draw() {
    background(46,139,87);
    readState=database.ref('gamestate');
    readState.on("value",function(data){
      gamestate=data.val();
    });
    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    });
    if (gamestate!="Hungry"){
      feed.hide();
      addFood.hide();
      //dog.hide();
    } else {
      feed.show();
      addFood.show();
      dog.addImage(dog1)
    }
    currentTime=hour();
    if(currentTime==(lastFed+1)){
      update("Play");
      foodObj.living();
    } else if (currentTime==(lastFed+2)){
      update("Sleeping")
      foodObj.bedroom();
    } else if (currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
      update("Bathing")
      foodObj.wash();
    } else{
      update("Hungry")
      foodObj.display();
    }
    
   
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);
     }else if(lastFed==0){
       text("Last Feed : 12 AM",350,30);
     }else{
       text("Last Feed : "+ lastFed + " AM", 350,30);
     }
   
    drawSprites();
  }
  
  //function to read food Stock
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  
  //function to update food stock and last fed time
  function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  //function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

  function update(state){
    database.ref('/').update({
      gamestate:state
    });
  }