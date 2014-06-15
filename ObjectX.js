(function (root, factory) {
    /**
     * UMD (Universal Module Definition)
     * @see https://github.com/umdjs/umd
     */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ObjectX = factory();
    }
}(this, function () {

    "use strict";

    /**
     * Base class that give us extend functionality
     * @class ObjectX
     */
    var ObjectX = function (options) {
        this._options = options || {};

        this._props();
        this._init();
    };

    /**
     * The place for defining properties,
     * do not make a logic here, this is just for properties declaration
     * @protected
     */
    ObjectX.prototype._props = function () {

    };

    /**
     * @constructor
     * @protected
     */
    ObjectX.prototype._init = function () {

    };

    ObjectX.extend = function (properties) {
        var _super = this.prototype,
            superRE = /_super/;

        var ChildClass = function () {
            ObjectX.apply(this, arguments);
        };

        ChildClass.prototype = Object.create(_super);
        ChildClass.extend = this.extend;

        for (var key in properties) {
            if (!properties.hasOwnProperty(key)) {
                continue;
            }

            // Inject _super method
            // @see http://ejohn.org/blog/simple-javascript-inheritance/
            if (_super[key] &&
                typeof _super[key] == 'function' &&
                typeof properties[key] == 'function') {

                if (superRE.test(properties[key].toString())) {
                    ChildClass.prototype[key] = (function (name, newFunc) {
                        return function () {
                            var tempSuper = this._super;
                            this._super = _super[name];
                            var coolFunc = newFunc.apply(this, arguments);
                            this._super = tempSuper;
                            return coolFunc;
                        }
                    })(key, properties[key]);

                    continue;
                } else if (key == '_init' || key == '_props') {
                    throw new Error('The _props` and `_init` methods should invoke _super method');
                }
            }

            ChildClass.prototype[key] = properties[key];
        }

        return ChildClass;
    };

    return ObjectX;
}));

