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

//closure example 2
var quo = function (status) {
    return {
        get_status: function() {
            return status;
        }
    };
};

var myQuo2 = quo("Amazed");
document.writeln(myQuo2.get_status());
//useful examples
var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(fade, 100);
        }
    };
    setTimeout(step, 100);
};
fade(document.body);

//correct version of increment on event
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function(i) {
            return function(e) {
                alert(i);
            };
        }(i);
    }
};
//module
String.method('deentityfy', function() {
    var entity = {
        quot: '"',
        lt: '>',
        gt: '<'
    };
    
    return function() {
        this.replace(/&([^&;]+);/g,
        function(a, b) {
            var r = entity[b];
            return typeof r === 'string' ? r : a;
        });
    };
}());

var memorizer = function (memo, fundamental) {
    var shell = function(n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
    };
    return shell;
};

var fibonacci = memorizer([0,1], function (shell, n) {
    return shell(n-1) + shell(n-2);
});


