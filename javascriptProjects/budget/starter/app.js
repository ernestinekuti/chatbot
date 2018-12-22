// budget controller

var budgetController = (function () {
    var x = 23;
    var add = function (a) {
        return x + a;
    }
    return {

    }
})();
// UI CONTROLLER
var UIController = (function () {
    var Domstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getinput: function () {
            return {
                type: document.querySelector(Domstrings.inputType).value, // Will be either Inc or exp
                description: document.querySelector(Domstrings.inputDescription).value,
                value: document.querySelector(Domstrings.inputValue).value

            };
        },
        getDomstrings: function () {
            return Domstrings;
        }
    }

})();

// GLOBAL APP CONTROLLER
var Controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDomstrings();

    var ctrlAddItem = function () {
        // 1. get the field input data
        var input = UICtrl.getinput();
        console.log(input);


        //2. Add the item to the budget controller

        //3. add the item to the UI

        // 4. calculate the budget

        // 5. Display the budget on the UI




    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();

        }

    });

})(budgetController, UIController);