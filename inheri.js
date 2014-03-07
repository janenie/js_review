//define a constructor and arguments
//pseudoclassical pattern of inheritance
var Mammal = function(name) {
    this.name = name;
};

Mammal.prototype.get_name = function() {
    return this.name;
};

Mammal.prototype.says = function() {
    return this.saying || '';
};

var cat = function (name) {
    this.name = name;
    this.saying = 'meow';
};

Cat.prototype = new Mammal();

Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        } 
        s += 'r';
    }
    return s;
};

Cat.prototype.get_name = function() {
    return this.says() + this.name + this.says();
};

var myCat = new Cat('jane');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();

//breif and clearer way of inheritance
Function.method(inherit, function(Parent) {
    this.prototype = new Parent;
    return this;
});
var Cat2 = function(name) {
    this.name = name;
    this.saying = "hahah";
}.
inherit(Mammal).method('purr', function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
}).
method('get_name', function() {
    return this.says() + ' ' + this.name +
    ' ' + this.says();
});

//methods above own no privacy and no access of super
//dangerous of using the constructor functions
//prototypal inheritance
var myMammal = {
    name: 'Herb the Mammal',
    get_name : function() {
        return this.name;
    },
    says: function() {
        return this.saying || '';
    }
};

var myRabbit = Object.create(myMammal);
myRabbit.name = 'Henrietta';
myRabbit.saying = 'meow';

var block = function() {
    var oldSpace = scope;
    scope = Object.create(scope);
    
    //Advance past the left curly brace
    advance('{');
    parse(scope);
    advance('}');
    scope = oldSpace;
};

//above inheritances have no privacy
//thus functional has made it
var test_ = function(spec, my) {
    var that, name;
    //shared attributes
    my = my || {};
    my.name = 'Jan';
    my.get_name = function() {
        return my.name;
    };
    
    that = {
        name: 'John'
    };
    //priviledged methods
    that.get_name = function() {
        return my.name + ' ' + that.name;
    };
    return that;
};

var mammal_ = function(spec) {
    var that = {};
    
    that.get_name = function() {
        return spec.name;
    };
    
    that.says = function() {
        return spec.saying || '';
    };
};

var mammal1 = mammal_({name:'live'});
var cat_ = function(spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal_(spec);
    that.purr = function(n) {
        var i, s = '';
        for (i = 0; i < n; i++) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function() {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var scat = cat_({name: 'll'});

//Parts
var eventuality = function(that) {
    var registry = {};
    that.fire = function(event) {
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ?
                    event : event.type;
            if (registry.hasOwnProperty(type)) {
                array = registry[type];
                for (i = 0; i < array.length; i += 1) {
                    handler = array[i];
                    func = handler.method;
                    if (typeof func === 'string') {
                        func = this[func];
                    }
                    
                    func.apply(this, handler.parameters ||
                        [event]);
                }
            }
            return this;
    };
    
    that.on = function (type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        };
        
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};




