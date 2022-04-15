window.addEventListener('load', function() {
    var position = 'absolute';
    var elements = [];
    //创建对象
    function Food (x,y,width,height,color) {
        this.x = x || 0;
        this.y = y || 0;
        //食物的高度和宽度
        this.width = width || 20;
        this.height = height || 20;
        //食物的颜色
        this.color = color || 'green';
    }
    //随机产生食物
    Food.prototype.render = function(map) {
        //随机食物的位置
    }
})