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
        root.ClassX = factory();
    }
}(this, function () {

    "use strict";

    /**
     * Base class that give us extend functionality and inject _super in every method.
     * @class ClassX
     */
    var ClassX = function (options) {

        /**
         * This object contains options that was passed into constructor.
         * @type {Object}
         * @protected
         * @example
         * var Man = ClassX.extend({
         *     yo: function () {
         *         console.log('Yo, man! I`am a ' + this._options.name);
         *     }
         * });
         * var rick = new Man({name: 'Rick'});
         * rick.yo(); // Yo, man! I`am a Rick
         */
        this._options = options || {};

        // We call _defineProperties before _initialize
        this._defineProperties();
        this._initialize();
    };

    /**
     * The place for defining properties, do not make a logic here,
     * this is just for properties declaration.
     * Must call this._super()
     * @protected
     * @example
     * var Train = ClassX.extend({
     *     _defineProperties: function () {
     *         this._super();
     *
     *         this._TYPE = 'steam';
     *         this._FUEL = 'coal';
     *         this._speed = 0;
     *     }
     * });
     */
    ClassX.prototype._defineProperties = function () {};

    /**
     * The place for initialization logic.
     * @constructor
     * @protected
     * @example
     * var Train = ClassX.extend({
     *     _initialize: function () {
     *         this._super();
     *
     *         this._honk();
     *         this._runEngine();
     *     }
     * });
     */
    ClassX.prototype._initialize = function () {};

    /**
     * Use for calling a method with the same name from the parent class.
     * @protected
     */
    ClassX.prototype._super = function () {
        throw new Error('Unexpected usage of `_super` method');
    };

    /**
     *
     * @param {Object} properties
     * @returns {ClassX}
     */
    ClassX.extend = function (properties) {
        var _super = this.prototype,
            superRE = /_super/;

        var ChildClass = function () {
            // `arguments` will pass into constructor and available as `this._options`
            ClassX.apply(this, arguments);
        };

        ChildClass.prototype = Object.create(_super);
        ChildClass.prototype.constructor = ChildClass;

        // `extend` isn't part of prototype! We can invoke `extend` only from constructor, not instance
        ChildClass.extend = this.extend;

        for (var key in properties) {
            if (!properties.hasOwnProperty(key)) {
                continue;
            }

            /**
             * Inject `_super` method
             * @see http://ejohn.org/blog/simple-javascript-inheritance/
             */
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
                } else if (key == '_initialize' || key == '_defineProperties') {
                    throw new Error('The `_defineProperties` and `_initialize` methods should invoke `_super` method');
                }
            }

            ChildClass.prototype[key] = properties[key];
        }

        return ChildClass;
    };

    return ClassX;
}));
