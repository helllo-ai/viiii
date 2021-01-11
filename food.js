class Food {
    constructor(){     
        this.foodStock =0
        this.lastfed
      this.image = loadImage("images/Milk.png");
    }
    

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

      getFedTime(lastfed){
       this.lastfed=lastfed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }
    bedroom(){
        background(bedroom,550,500);

    }

    wash(){
        background(wash,550,500)
    }

    living(){
        background(living,550,500)
    }
   display(){
    var x=80,y=100;
    imageMode(CENTER);
    image (this.image,720,220,70,70);

    if (this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++){
            if (i%10===0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }

     
 
   
  
}
  
  };