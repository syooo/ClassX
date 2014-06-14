var ObjectX = require('../ObjectX');
ObjectX = ObjectX.ObjectX;

exports['should provide inheritance'] = function (test) {
    var MyClass;
    test.doesNotThrow(function () {
        MyClass = ObjectX.extend({});
    });

    test.ok(typeof MyClass === 'function');

    var myEx;
    test.doesNotThrow(function () {
        myEx = new MyClass;
    });
    test.ok(myEx instanceof MyClass);
    test.ok(myEx instanceof ObjectX);

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
    test.ok(myEx2 instanceof ObjectX);
    test.done()
};

exports['should provide the _super property, which calls method of parent class'] = function (test) {
    var parentMethodInvoked = false,
        childMethodInvoked = false;

    var MyClass = ObjectX.extend({
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
}
