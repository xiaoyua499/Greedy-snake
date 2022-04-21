window.addEventListener('load', function () {
    var document = window.document;
    //初始化
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

        remove();
    }
    window.Snake = Snake;
    //创建游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;

        // this.snake.move(this.food, this.map);
        // this.snake.render(this.map);
    }
    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);

        bindKey()
    }
    //蛇的move方法
    Snake.prototype.move = function (food, map) {
        //让蛇的身体每一部分移动一下
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //根据移动方向,决定蛇头如何处理
        switch (this.direction) {
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }

        //判断是否吃到食物
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        if (headX === food.x && headY === food.y) {
            //吃到食物, 往蛇节的最后加一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            //把现在的食物删除, 并重新随机生成食物
            food.render(map);
        }
    }
    //让蛇自己动
    function remove() {
        //删除渲染的蛇
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除页面上渲染的蛇
            elements[i].parenNode.removeChild(elements[i]);
            //删除elements数组中的元素
            elements.splice(i, 1);
        }
    }
    //让蛇自己动
    function runSnake() {
        var timerId = setInterval(function () {
            this.snake.move(this.food, this.map);
            //删除之前的蛇
            this.snake.render(this.map);

            //判断蛇是否撞墙
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                clearInterval(timerId);
                alert('Game Over');
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timerId);
                alert('Game Over');
            }
        }.bind(that), 150);
    }
    //通过键盘控制蛇的移动方向
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    //lest
                    this.snake.direction = 'left';
                    break;
                case 38:
                    //top
                    this.snake.direction = 'top';
                    break;
                case 39:
                    //right
                    this.snake.direction = 'right';
                    break;
                case 40:
                    //bottom
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }

}