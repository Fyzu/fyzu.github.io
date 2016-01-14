/**
 * Created by Dmitry on 12.01.2016.
 */

// Игровой контролер
function Controller() {
    var self = this;
    this.keys = {};

    // Устанавливаем слушатели нажатых клавиш
    $('body').keydown(function(e) {
        self.keys[e.which] = true;
    }).keyup(function(e){
        delete self.keys[e.which];
    });
}