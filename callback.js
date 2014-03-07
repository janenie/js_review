//function is first class object
var friends = ["Mike", "Stacy", "Andy", "Rick"];
friends.forEach(function(eachName, index) {
    console.log(index + 1 + ". "+ eachName);
});

var clientData = {
    id: 09,
    fullName: "Not Set",
    setUserName : function(firstName, lastName) {
        this.fullName = firstName + lastName;
    }
};

function getUserName(first, last, callback) {
    callback(first, last);
}

getUserName('Jan', 'Nie', clientData.setUserName);
console.log(clientData.fullName);

