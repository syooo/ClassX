var ClassX = require('../ClassX');

exports['should provide inheritance'] = function (test) {
    var MyClass;
    test.doesNotThrow(function () {
        MyClass = ClassX.extend({});
    });

    test.ok(typeof MyClass === 'function');

    var myEx;
    test.doesNotThrow(function () {
        myEx = new MyClass;
    });
    test.ok(myEx instanceof MyClass);
    test.ok(myEx instanceof ClassX);

    var MyClass2;
    test.doesNotThrow(function () {
        MyClass2 = MyClass.extend({});
    });

    var myEx2;
    test.doesNotThrow(function () {
        myEx2 = new MyClass2;
    });
    test.ok(myEx2 instanceof MyClass2);
    test.ok(myEx2 instanceof MyClass);
    test.ok(myEx2 instanceof ClassX);

    test.done()
};

exports['should provide the _super property, which calls method of parent class'] = function (test) {
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

    test.ok(parentMethodInvoked);
    test.ok(childMethodInvoked);

    test.done();
};

exports['should invoke _prop and _init method while initialization'] = function (test) {
    var propsInvoked = false,
        initInvoked = false,
        initInvokedBeforeProp;
    var MyClass = ClassX.extend({
        _props: function () {
            this._super();

            propsInvoked = true;
            initInvokedBeforeProp = initInvoked;
        },
        _init: function () {
            this._super();

            initInvoked = true;
        }
    });
    var myEx = new MyClass;
    test.ok(propsInvoked);
    test.ok(initInvoked);
    test.ok(!initInvokedBeforeProp);

    test.done();
};

exports['_init and _props methods should contain a call to _super method'] = function (test) {
    test.throws(function () {
        ClassX.extend({
            _init: function () {

            }
        });
    });
    test.throws(function () {
        ClassX.extend({
            _props: function () {

            }
        });
    });

    test.done();
};

exports['options passed to constructor should be accessible by `_options` property'] = function (test) {
    var options;
    var MyClass = ClassX.extend({
        _props: function () {
            this._super();

            options = this._options;
        }
    });

    new MyClass({
        a: true
    });
    test.deepEqual(options, {
        a: true
    });

    new MyClass;
    test.deepEqual(options, {});

    test.done();
};
