/**
 * Created by Dmitry on 12.01.2016.
 */

// Физический движок
var PhysicsEngine = {
    moveToDirection:function(that, objects, time) {

        var move = true;
        $.each(objects, function(index, object) {
            console.log(that);
            if(that.directionVector.x > 0) {
                if(object.x <= that.x + that.size_x) {
                    move = false;
                }
            } else {
                if(object.x + object.size_x >= that.x ) {
                    move = false;
                }
            }
        });

        if(move)
            that.x += that.directionVector.x * that.mov_speed * time;
    }
};