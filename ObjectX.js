/**
 * Base class that give us extend functionality
 * @class ObjectX
 * @type {Function}
 */
var ObjectX = new Function();

ObjectX.extend = function (prototype) {

    var f = function () {};
    f.prototype = Object.create(this.prototype);
    f.extend = this.extend;

    for (var key in prototype) {
        if (!prototype.hasOwnProperty(key)) {
            continue;
        }

        f.prototype[key] = prototype[key];
    }

    return f;
};






if (typeof exports !== 'undefined') {
    exports.ObjectX = ObjectX;
}
