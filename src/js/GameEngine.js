/**
 * Created by Dmitry on 12.01.2016.
 */

// Игровой движок
var GameEngine = (function () {
    function GameEngine() {
        this.graphicsScene = null;
        this.gameScene = null;
        this.controller = null;
        this.lastRenderDate = null;
        this.showInfo = true;
    }

    // Рендер фрейма
    GameEngine.prototype.render = function () {

        this.gameScene.context.clearRect(0, 0, this.gameScene.canvas.width, this.gameScene.canvas.height);

        var currentRenderDate = new Date().getTime();

        // Обновляем сцену
        this.gameScene.update(currentRenderDate - this.lastRenderDate);

        this.lastRenderDate = currentRenderDate;
    };

    // Инициализация игры
    GameEngine.prototype.init = function (canvas) {
        var self = this;
        this.controller = new Controller();
        this.lastRenderDate = new Date().getTime();
        this.graphicsScene = new GraphicsScene(canvas, function () {
            self.render()
        });
        this.gameScene = new GameScene(this);

        this.graphicsScene.init();

    };

    return GameEngine;
})();