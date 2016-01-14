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
        x:-30,
        y:0,
        width:10,
        height:50,

        speed:{
            x:0,
            y:0
        },
        max_speed:0.5,
        acceleration:0.001,
        jumping:false,
        jumping_speed:0.5,

        update:function(dt) {
            var collusionDir = PhysicsEngine.collusionCheck(this, objects);

            if(engine.controller.keys[68] && collusionDir != "left") { // A
                if(this.speed.x > this.max_speed) {
                    this.speed.x = this.max_speed;
                } else {
                    this.speed.x += this.acceleration * dt;
                }
            } else if (engine.controller.keys[65] && collusionDir != "right") { // D
                if(this.speed.x < -this.max_speed) {
                    this.speed.x = -this.max_speed;
                } else {
                    this.speed.x -= this.acceleration * dt;
                }
            } else {
                if(this.speed.x != 0)
                    if(Math.abs(this.speed.x) < this.acceleration) {
                        this.speed.x = 0;
                    } else {
                        this.speed.x += -Math.sin(this.speed.x) * this.acceleration * dt * 5;
                    }
            }

            if (engine.controller.keys[87] && collusionDir != "top") { // W
                if(!this.jumping) {
                    this.jumping = true;
                    this.speed.y = -this.jumping_speed;
                }
            }

            if(collusionDir != null)
                if(collusionDir == "left" || collusionDir == "right") {
                    this.speed.x = 0;
                } else {
                    this.speed.y = 0;
                    if(collusionDir != "top")
                        this.jumping = false;
                }

            if(this.speed.x != 0)
                this.x += this.speed.x * dt;

            this.y += this.speed.y * dt;
            this.speed.y += 0.00098 * dt;

        },
        draw:function() {
            engine.graphicsScene.context.fillStyle = 'rgba(255,0,0,1)';
            engine.graphicsScene.context.fillRect(
                this.x - camera.x,
                this.y - camera.y,
                this.width, this.height
            );
        }
    };

    // Список объектов сцены
    // TODO: Сделать подгружаемые объекты, а не хардкод
    var objects = [
        {
            name:"Move platform",
            x:100,
            y:-300,
            layout:1,
            type:"box",
            width:400,
            height:10,

            directionVector:{
                x:0,
                y:1
            },
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
                );
            }
        },
        {
            name:"platform1",
            x:-10000,
            y:50,
            type:"box",
            width:100000,
            height:10,

            update:function(dt) {

            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,0,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"platform2",
            x:15,
            y:-10,
            type:"box",
            width:100000,
            height:10,

            update:function(dt) {

            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,0,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"platform3",
            x:-200,
            y:-200,
            type:"box",
            width:10,
            height:100000,

            update:function(dt) {

            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,0,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"box1",
            x:100,
            y:20,
            type:"box",
            width:30,
            height:30,
            update:function(dt) {
            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,255,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"box2",
            x:100,
            y:-50,
            type:"box",
            width:30,
            height:30,
            update:function(dt) {
            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,255,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"box3",
            x:-100,
            y:-50,
            type:"box",
            width:30,
            height:30,
            update:function(dt) {
            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,255,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
            }
        },
        {
            name:"box3",
            x:-170,
            y:-100,
            type:"box",
            width:30,
            height:30,
            update:function(dt) {
            },
            draw:function() {
                engine.graphicsScene.context.fillStyle = 'rgba(0,255,0,1)';
                engine.graphicsScene.context.fillRect(
                    this.x - camera.x,
                    this.y - camera.y,
                    this.width, this.height
                );
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
                if(engine.showInfo) {
                    engine.graphicsScene.context.fillStyle = 'black';
                    engine.graphicsScene.context.font = 'bold 10pt monospace';
                    engine.graphicsScene.context.fillText(object.name, object.x - camera.x, object.y - camera.y - 10);
                }
            }
        });

        player.draw();

        // Информация для дебага
        if (engine.showInfo) {
            engine.graphicsScene.context.fillStyle = 'black';
            engine.graphicsScene.context.font = 'bold 10pt monospace';
            engine.graphicsScene.context.fillText('Current scene: ' + states.currentScene, camera.width/2.2, 10);
            engine.graphicsScene.context.fillText('Camera(' + camera.x + ', ' + camera.y + ')', 10, 60);
            engine.graphicsScene.context.fillText('Player(' + player.x + ', ' + player.y + ')', 10, 20);
            engine.graphicsScene.context.fillText('Speed(' + player.speed.x + ', ' + player.speed.y + ')', 10, 40);
            engine.graphicsScene.context.fillText('player', player.x - camera.x + player.width/2 - 20, player.y - camera.y - 10);
        }
    };
}
