ObjectX
=======

Basic module to work with js wia sugar


Usage
-----
    var HelloWorldClass = ObjectX.extend({
        helloWorld: function () {
            console.log('helloWorld');
        }
    });

    hwc = new HelloWorldClass();
    hwc.helloWorld(); // helloWorld

Run tests
-----
    nodeunit
