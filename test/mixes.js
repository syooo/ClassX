var assert = require("assert"),
    ClassX = require('../ClassX');

describe('Mixes tests', function () {

    describe('Mixing with bad arguments', function () {
        [false, undefined, null].forEach(function (notAnObject) {
            it('should throw errors if ' + String(notAnObject) + ' passed', function (notAnObject) {
                assert.throws(function () {
                    ClassX.mix(notAnObject);
                }, /Mixin must be an object/);
            }.bind(this, notAnObject));
        }, this);
    });

    describe('Common mixing', function () {
        var Mixin1 = {
            mixedProp: 'mixed prop',
            mixedProp2: 'mixed prop 2'
        };

        var Mixin2 = {
            mixedProp3: 'mixed prop 3'
        };

        var ClassProto = {
            prop: 'class prop',
            mixedProp2: 'redefined prop 2'
        };

        var Class = ClassX.mix(Mixin1).extend(ClassProto);

        it('should just extend a class prototype', function () {
            assert.equal(Class.prototype.mixedProp, 'mixed prop');
            assert.equal(Class.prototype.prop, 'class prop');
            var instance = new Class;
            assert.equal(instance.mixedProp, 'mixed prop');
            assert.equal(instance.prop, 'class prop');
        });

        it('should have properties with lesser priority than class properties', function () {
            var instance = new Class;
            assert.equal(instance.mixedProp2, 'redefined prop 2');
        });

        var Class2 = ClassX.mix(Mixin1, Mixin2).extend(ClassProto);

        it('should accept many mixins', function () {
            assert.equal(Class2.prototype.mixedProp, 'mixed prop');
            assert.equal(Class2.prototype.mixedProp3, 'mixed prop 3');
            var instance = new Class2;
            assert.equal(instance.mixedProp, 'mixed prop');
            assert.equal(instance.mixedProp3, 'mixed prop 3');
        })
    });
});

