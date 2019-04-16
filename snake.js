(function(){
  //贪吃蛇类文件
  function Snake(size=8){
    this.x = 10*size;//初始化头部水平距离 
    this.y = 5*size;//初始化头部垂直距离
    this.size = size;//初始化单个身体大小
    this.length=2;//初始化长度
    this.body = null;//创建一个外壳，用于存放射身体
    this.snake_arr=null;//初始化蛇身体数组
    this.direct = '39';//方向分为 左 上 右 下，依次是37，38，39，40
    this.map = null;
    this.creatSnake = (el)=>{//接收一个mapDom对象
      this.map = el ? el:this.map;
      var oldsnake = document.getElementById('snakeBody');
      if(oldsnake){
        this.map.removeChild(oldsnake);
      }
      this.body = this.createDom('div');
      this.body.id = 'snakeBody';
      this.direct = '39';
      let color = 'red';
      let left = this.x;
      let top = this.y;
      let div = null;
      
      for(let i = 0;i<this.length;i++){
        
        if(i>0){
          color = "#fff";
          left = this.x-this.size*i;
         var  zindex = i;
        }else{
         var  zindex = 99999;
        }
        div = this.createDom('div',{
          'width':this.size+'px',
          'height':this.size+'px',
          'position':'absolute',
          'backgroundColor':color,
          'left':left,
          'top':top,
          'zIndex':zindex
        });
        this.body.appendChild(div);
        this.snake_arr= this.body.childNodes;
        
      }
      this.snake_arr[0].id = 'myhead';
      this.map.appendChild(this.body);
      this.check();//创建完就开始检测
    }
    this.start = ()=>{//开始运行
      this.press();
      clearInterval(timer);
      var timer = setInterval(()=>{
        var i = 0;//每次运行都是从头部开始
        this.change(i);
      },100);
      
      
    }
    this.change = (i,x=0,y=0)=>{
      
      if(i==0){//如果是头部
        var x =this.snake_arr[i].offsetLeft;
        var y = this.snake_arr[i].offsetTop;
        
        switch(this.direct){
          case 38://上
            this.snake_arr[i].style['top'] = y - this.size+'px';
            break;
          case 39://右
            this.snake_arr[i].style['left'] = x + this.size+'px';
            break;
          case 40://下
            this.snake_arr[i].style['top'] = y+ this.size+'px';
            break;
          case 37://左
            this.snake_arr[i].style['left'] = x - this.size+'px';
            break;
          default :
            this.snake_arr[i].style['left'] =  x + this.size +'px';
            break;
        }
        var food = document.getElementById('myfood');
        var fx = food.offsetLeft;
        var fy = food.offsetTop;
        if( (this.snake_arr[i].offsetLeft==fx) && (this.snake_arr[i].offsetTop) ==fy){//如果撞到了食物。需要添加一个身体div
          
          div = this.createDom('div',{
            'width':this.size+'px',
            'height':this.size+'px',
            'position':'absolute',
            'backgroundColor':'#fff'
          });
          this.body.appendChild(div);
        }
        i++;
        this.change(i,x,y);
      }else if(i == this.snake_arr.length){//如果交替已经到了尾部
        return;
      }else{
        var m = this.snake_arr[i].offsetLeft;//72
        var n = this.snake_arr[i].offsetTop;
        // console.log('i:'+i+'--'+'m:'+m+'x:'+'--'+x);
        this.snake_arr[i].style['left'] = x+'px';
        this.snake_arr[i].style['top'] = y+'px';
        i++;
        this.change(i,m,n);
      }

    }
    this.check = ()=>{//蛇的碰撞检测，包括了身体和墙。
      var timer = setInterval(() => {
        var snakeHead = document.getElementById('myhead');
        if(snakeHead.offsetLeft<0 ||
            snakeHead.offsetLeft > this.map.offsetWidth || 
            snakeHead.offsetTop<0 ||
            snakeHead.offsetTop>this.map.offsetHeight){
              // console.log(this.snake_arr.length);
              clearInterval(timer);
              alert('你撞墙了，老铁,游戏结束，你的得分是：'+(this.snake_arr.length-2));
              this.creatSnake();
              
        }
        for(var i =1;i<this.snake_arr.length;++i){
          if(snakeHead.offsetLeft==this.snake_arr[i].offsetLeft && snakeHead.offsetTop== this.snake_arr[i].offsetTop){
            clearInterval(timer);
            alert('吃到自己了,游戏结束，你的得分是：'+(this.snake_arr.length-2));
            this.creatSnake();//先提示结束，后进行蛇的重建
          }
        }
      }, 10);
      
    }
    this.press = ()=>{//获取每次按下键值。
      document.onkeydown = (ev)=>{
        let code = ev.keyCode? ev.keyCode : ev.switch;
        switch(code){//向正方向走的时候，按反方向无效
          case 38://上
            this.direct = this.direct == 40? 40:38;
            break;
          case 39://右
            this.direct = this.direct == 37? 37:39;
            break;
          case 40://下
          this.direct = this.direct == 38? 38:40;
            break;
          case 37://左
          this.direct = this.direct == 39? 39:37;
            break;
        }
      }
    }
  }
  Snake.prototype = new Tools();
  Snake.prototype.constructor = Snake;
    
  return window.Snake = Snake;
})();