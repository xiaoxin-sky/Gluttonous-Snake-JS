(function(){

  function App(){
    this.map = '';
    this.food = '';
    this.snake ='';
    this.init = ()=>{//初始化游戏
      this.map = new Map();
      let map = this.map.show();//初始化地图,返回一个mapDom

      this.food = new Food();
      this.food.creatFood(map);//初始化食物

      this.snake = new Snake();
      this.snake.creatSnake(map);
    }
    this.start = ()=>{//开始游戏
      this.snake.start();
    }
  }
  return window.App = App;
})();