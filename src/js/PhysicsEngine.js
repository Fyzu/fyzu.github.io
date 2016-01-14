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
    },
    collusionCheck:function(that, objects) {
        var result = null;

        $.each(objects, function(index, object) {
            var vX = (that.x + (that.width/2)) - (object.x + (object.width/2)),
                vY = (that.y + (that.height/2)) - (object.y + (object.height/2)),
                hWidths = (that.width/2) + (object.width/2),
                hHeights = (that.height/2) + (object.height/2),
                oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);

            if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                if (oX >= oY) {
                    if (vY > 0) {
                        result = "top";
                        that.y += oY;
                    } else {
                        result = "back";
                        that.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        result = "left";
                        that.x += oX;
                    } else {
                        result = "right";
                        that.x -= oX;
                    }
                }
            }
        });

        return result;
    }
};