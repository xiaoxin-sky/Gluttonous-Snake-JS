(function (){
  function Food (size=8){
    this.size = size;
    this.x=null;
    this.y=null;
    this.map = null;
    this.creatFood =(el)=>{//食物显示在地图上,el是地图dom对象
      this.map = el? el:this.map;
      var myfood = document.getElementById('myfood');
      if(myfood){
        this.map.removeChild(myfood);
      }
      this.map.appendChild(this.randomFood());
      this.detect();
    }
    this.randomFood = function (){//随即获取一个食物元素
      this.getPosition();//获取一个坐标值
      let myfood = this.createDom('div',{
        'width':this.size+'px',
        'height':this.size+'px',
        'background':'yellow',
        'position':'absolute',
        'top':this.y+'px',
        'left':this.x+'px'
      });
      myfood.id = 'myfood';
      return myfood;
      
    }
    this.getPosition = function (){
      let w = this.map.offsetWidth / this.size;//获取横向格子数
      let h = this.map.offsetHeight / this.size;//获取纵向格子数
      this.x =  parseInt( Math.random()*w )*this.size;
      this.y =  parseInt( Math.random()*h )*this.size;
      
    }
    this.detect = ()=>{//碰撞检测
      //console.log(this.map.childNodes[1]);
        setInterval(()=>{
          if(this.map.childNodes[1]){
            // var snakeHead = this.map.childNodes[1].childNodes[0];
            var snakeHead = document.getElementById('myhead');
            if(snakeHead.offsetLeft&&snakeHead.offsetTop){
            
            if(this.x==snakeHead.offsetLeft && this.y==snakeHead.offsetTop){
              this.creatFood();
            }}
          }
        },10);
      
      
      
      
    }
  }
  Food.prototype = new Tools();
  Food.prototype.constructor = Food;
  return window.Food = Food;
})();