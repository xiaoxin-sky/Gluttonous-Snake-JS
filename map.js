(function(){
  function Map (){
    this.width = 800;
    this.height = 400;
    this.mapDom = null;
    this.show = function (){
      this.mapDom = this.createMap();//创建一个地图
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(this.mapDom);
      return this.mapDom;
    }
    this.createMap = function (){
      var div = this.createDom('div',{
        'width':this.width+'px',
        'height':this.height+'px',
        'position':'relative',
        'background':'gray'
      });
      div.id='map';
      return div;
    }
  }
  Map.prototype = new Tools();
  Map.prototype.constructor = Map;
  return window.Map = Map;
})();