(function (){

  function Tools () {
  }
  Tools.prototype.createDom = function ( el, data){//data 为json的形式,el创建的元素
    var el = document.createElement(el);
    if(data){
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          el.style[key] = data[key];
        }
      }
    }
    return el;
  }
  return window.Tools = Tools;
})();