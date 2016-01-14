/**
 * Created by Dmitry on 12.01.2016.
 */

// Игровая сцена
function GameScene(engine) {

    /** Набор состояний сцены
     *
     */
    var states = {
        currentScene:"testPolygon"
    };

    /** Объект сцены - камера
     * Описание: Предпологается что координаты камеры, это центр наблюдаемый на экране, т.е. Y=высота\2 и X=ширина\2
     * TODO: Камера должна летать с каким-то ускорением за игроком
     */
    var camera = {
        // Basic
        x:0,
        y:0,
        width:engine.graphicsScene.canvas.width,
        height:engine.graphicsScene.canvas.height,

        speed:5,

        update:function(dt) {
            this.x = player.x - this.width/2;
            this.y = player.y - this.height/2;
        }
    };

    /** Обект сцены - игрок
     * Описание:
     */
    var player = {
        // Basic
        x:camera.width/2,
        y:camera.height,
        width:10,
        height:50,

        speed:{
            x:0,
            y:0
        },
        max_speed:5,
        acceleration:2,

        update:function(dt) {
            if(engine.controller.keys[65]) { // A
                this.x -= this.max_speed / 10 * dt;
            } else if (engine.controller.keys[68]) { // D
                this.x += this.max_speed / 10 * dt;
            } else {

            }

            if (engine.controller.keys[87]) { // W

            } else if (engine.controller.keys[83]) { // S

            } else {

            }

            //PhysicsEngine.moveToDirection(player, objects, time);*/
        },
        draw:function() {
            engine.graphicsScene.context.fillStyle = 'rgba(255,0,0,1)';
            engine.graphicsScene.context.fillRect(
                this.x - camera.x,
                this.y - camera.y,
                this.width, this.height
            )
        }
    };

    // Список объектов сцены
    // TODO: Сделать подгружаемые объекты, а не хардкод
    var objects = [
        {
            // Basic
            name:"platform",
            x:400,
            y:200,
            layout:1,
            type:"box",
            width:400,
            height:10,
            directionVector:{
                x:0,
                y:1
            },

            // storage
            moveTime:0,

            update:function(dt) {
                this.moveTime += dt;
                if(this.moveTime < 1000) {
                    this.y += this.directionVector.y * 0.2 * dt;
                } else {
                    this.directionVector.y *= -1;
                    this.moveTime = 0;
                }
            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,0,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                )
            }
        }
    ];

    // Обновление сцены
    this.update = function(dt) {
        player.update(dt);
        camera.update(dt);

        $.each(objects, function(index, object) {
            object.update(dt);

            // Отрисовка только видимых объектов (в фокусе камеры)
            if(object.x + object.width > camera.x && object.x < camera.x + camera.width) {
                object.draw();
            }
        });

        player.draw();

        // Информация для дебага
        if (engine.showInfo) {
            engine.graphicsScene.context.fillStyle = 'black';
            engine.graphicsScene.context.font = 'bold 10pt monospace';
            engine.graphicsScene.context.fillText('Camera(' + camera.x + ', ' + camera.y + ')', 10, 60);
            engine.graphicsScene.context.fillText('Player(' + player.x + ', ' + player.y + ')', 10, 20);
            engine.graphicsScene.context.fillText('Speed(' + player.speed.x + ', ' + player.speed.y + ')', 10, 40);
        }
    };
}
