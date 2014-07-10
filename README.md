ClassX
=======

![travis-ci.org](https://travis-ci.org/syooo/ClassX.svg)

Basic module that provide Backbone like extend with _super functionality. Also mixins.

- [x] extend - you can extend any of your class
- [x] _super - easy invoke parent's methods
- [x] mixins - mix any object to your class


##Usage
####Extend
```javascript
/**
 * @class Note
 * @extends ClassX
 */
var Note = ClassX.extend({
    /**
     * @private
     */
    _defineProperties: function () {
        this._super();

        /**
         * @type {Date}
         * @private
         */
        this._dateCreation = this._options.dateCreation || new Date();
    },

    /**
     * @constructor
     * @protected
     */
    _initialize: function() {
        this._super();

        console.log('This note was created ' + this._dateCreation.getTime());
    }
});

/**
 * @class PrivateNote
 * @extends Note
 */
var PrivateNote = Note.extend({

    /**
     * @constructor
     * @protected
     */
    _initialize: function() {
        this._super();

        console.log('No one can see this.');
    }
});

var note = new Note({dateCreation: new Date(1991)}); // This note was created ...
var secretNote = new PrivateNote(); // This note was created ... No one can see this.
```

####Mixins
Mixins are common objects that you can mix into any of your class.
```javascript
/**
 * @mixin WithEncryption
 */
var WithEncryption = {
    encrypt: function () {
        console.log('encrypted!');
    }
}

/**
 * @class ClassWithEncryption
 * @mixes WithEncryption
 */
var ClassWithEncryption = ClassX.mix(WithEncryption).extend({
    /**
     * @constructor
     * @protected
     */
    _initialize: function() {
        this._super();

        this.encrypt();
    }
});

var instance = new ClassWithEncryption(); // encrypted!

```

##Install
```
npm install objectx
```


##Run tests
```
mocha --reporter spec
```
