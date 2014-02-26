var a = "seven".length;
//mutable collections
var stooge  = {
    "first-name" : "Jane",
    "last-name" : "Nie"
};

stooge["mid-name"] = "Alambu";

if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

var another_stooge = Object.create(stooge);
var name;
for (name in stooge) {
    if (typeof stooge[name] !== 'function') {
        document.writeln(name + ': ' + stooge[name]);
    }
}

var add = function(a, b) {
    return a + b;
};

//function invocation
//pattern one: method invocation 
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
document.writeln(typeof myObject.value);
//function invocation
myObject.double = function() {
    //the global this is not the object
    var that = this; //workaround
    
    var helper = function() {
        that.value = add(that.value, that.value);
    };
    
    helper();
};

myObject.double();
document.writeln(myObject.getValue());
//constructor invocation not recommended
var Quo = function(s) {
    this.status = s;
};

Quo.prototype.get_status = function() {
    return this.status;
};

var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());

//apply invocation pattern
var arr = [3, 4];
var sum = add.apply(null, arr);

var statusObject = {
    status: 'OK'
};

var status = Quo.prototype.get_status.apply(statusObject);

//arguments usage
var sum = function() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    
    return sum;
};

document.writeln(sum(0, 1, 2, 3));

//exceptions
var add_safe = function(a, b) {
    if (typeof a !== 'number' || 
            typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
};

var try_it = function() {
    try {
        add_safe('seven');
    } catch(e) {
        document.writeln(e.name + ': ' + e.message);
    }
};

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

//recursive 
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk_the_DOM(node, func);
        node = node.nextSibling;
    }
};

var getElementsByAttribute = function(att, value) {
    var results = [];
    walk_the_DOM(document.body, function(node) {
        /*
        equals if (node.nodeType == 1)
                    actual = node.getAttribute(att);
        */
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
                (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
};
//closure
var myObject2 = function() {
    var value = 0;
    
    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    };
}();


