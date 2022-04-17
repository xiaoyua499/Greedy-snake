window.addEventListener('load', function () {
    var position = 'absolute';
    var elements = [];
    //创建食物对象
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        //食物的高度和宽度
        this.width = width || 20;
        this.height = height || 20;
        //食物的颜色
        this.color = color || 'green';
    }
    //随机产生食物
    Food.prototype.render = function (map) {
        //随机食物的位置
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
        //动态创建食物对应的div
        var div = document.createElement('div');
        map.appendChild(div);
        div.style.position = position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.color = this.color;
        elements.push(div);
    }
    window.Food = Food;

    //创建蛇对象
    function Snake(width, height, direction) {
        //设置每一节蛇的宽高
        this.width = width || 20;
        this.height = height || 20;
        //蛇的每一部分,第一部分为蛇头
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ];
        //蛇运动的方向 默认为 right
        this.direction = direction || 'right';
    }
    //创建render方法
    Snake.prototype.render = function (map) {
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);
            div.style.position = position;
            div.style.left = obj.x * this.width + 'px';
            div.style.top = obj.y * this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = obj.color;
        }
    }
    window.Snake = Snake;
})