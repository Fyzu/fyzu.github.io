/**
 * Created by Dmitry on 12.01.2016.
 */

// Графическая сцена
var GraphicsScene = (function(){
    function GraphicsScene(canvas, render) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.render = render;

        this.context.translate(0, 0);
        this.context.scale(1, 1);
    }

    GraphicsScene.prototype.update = function() {
        var self = this;

        this.render(this.context);

        requestAnimationFrame(function() { self.update() });
    };

    GraphicsScene.prototype.init = function() {
        this.update();
    };

    return GraphicsScene;
})();