var assert = require("assert"),
    ClassX = require('../ClassX');

describe('Extend tests', function () {

    it('should provide inheritance', function () {
        var MyClass;
        assert.doesNotThrow(function () {
            MyClass = ClassX.extend({});
        });

        assert.equal(typeof MyClass, 'function');

        var myEx;
        assert.doesNotThrow(function () {
            myEx = new MyClass;
        });
        assert.ok(myEx instanceof MyClass);
        assert.ok(myEx instanceof ClassX);
        assert.ok(myEx.constructor === MyClass);

        var MyClass2;
        assert.doesNotThrow(function () {
            MyClass2 = MyClass.extend({});
        });

        var myEx2;
        assert.doesNotThrow(function () {
            myEx2 = new MyClass2;
        });
        assert.ok(myEx2 instanceof MyClass2);
        assert.ok(myEx2 instanceof MyClass);
        assert.ok(myEx2 instanceof ClassX);
        assert.ok(myEx2.constructor === MyClass2);
    });

    it('should provide the _super property, which calls method of parent class', function () {
        var parentMethodInvoked = false,
            childMethodInvoked = false;

        var MyClass = ClassX.extend({
            m: function () {
                parentMethodInvoked = true;
            }
        });

        var MyClass2 = MyClass.extend({
            m: function () {
                this._super();
                childMethodInvoked = true;
            }
        });

        var myEx = new MyClass2;
        myEx.m();

        assert.ok(parentMethodInvoked);
        assert.ok(childMethodInvoked);
    });


    it('should invoke _prop and _initialize method while initialization', function () {
        var propsInvoked = false,
            initInvoked = false,
            initInvokedBeforeProp;
        var MyClass = ClassX.extend({
            _defineProperties: function () {
                this._super();

                propsInvoked = true;
                initInvokedBeforeProp = initInvoked;
            },
            _initialize: function () {
                this._super();

                initInvoked = true;
            }
        });
        var myEx = new MyClass;
        assert.ok(propsInvoked);
        assert.ok(initInvoked);
        assert.ok(!initInvokedBeforeProp);
    });

    it('_initialize and _defineProperties methods should contain a call to _super method', function () {
        assert.throws(function () {
            ClassX.extend({
                _initialize: function () {}
            });
        });
        assert.throws(function () {
            ClassX.extend({
                _defineProperties: function () {}
            });
        });
    });

    it('options passed to constructor should be accessible by `_options` property', function () {
        var options;
        var MyClass = ClassX.extend({
            _defineProperties: function () {
                this._super();

                options = this._options;
            }
        });

        new MyClass({
            a: true
        });
        assert.deepEqual(options, {
            a: true
        });

        new MyClass;
        assert.deepEqual(options, {});
    });
});
