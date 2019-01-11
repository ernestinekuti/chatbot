// budget controller

var budgetController = (function() {
  // function constructors
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function(totalIncome) {
    return this.percentage;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calculateTotal = function(type) {
    var sum = 0;

    // loop over the array

    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
    console.log(sum);
  };

  /*     var allExpenses = [];
        var allIncomes = [];
        var totalExpenses = 0; */

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //create new id
      // console.log(data.allItems[type].length);
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create new item
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      // Push it into our new data structure
      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function() {
      //1. calculate total income and expense
      calculateTotal("exp");
      calculateTotal("inc");
      data.budget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
      // calculate the budget income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spent
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },
    testing: function() {
      console.log(data);
    }
  };
})();
// UI CONTROLLER
var UIController = (function() {
  var Domstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec;

    /*
    + or - before number 
    exactly 2 decimal points 
    comma separating the thousands

    */

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getinput: function() {
      return {
        type: document.querySelector(Domstrings.inputType).value, // Will be either Inc or exp
        description: document.querySelector(Domstrings.inputDescription).value,
        value: parseFloat(document.querySelector(Domstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      //create html string with placeholder tags
      if (type === "inc") {
        element = Domstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = Domstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace placeholder text with some actual data

      newHtml = html.replace("%id", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      // Inser the Html into dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorId) {
      var el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArray;
      fields = document.querySelectorAll(
        Domstrings.inputDescription + "," + Domstrings.inputValue
      );
      fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(function(cur, index, array) {
        cur.value = "";
        //cur.description = "";
      });
      fieldsArray[0].focus();
    },

    displayBudget: function(obj) {
      var type = obj.budget > 0 ? "inc" : "exp";
      document.querySelector(Domstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(Domstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        Domstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");
      document.querySelector(Domstrings.percentageLabel).textContent =
        obj.percentage;
      if (obj.percentage > 0) {
        document.querySelector(Domstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(Domstrings.percentageLabel).textContent =
          "-----";
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(Domstrings.expensesPercLabel);

      nodeListForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    displayMonth: function() {
      var now, year, month, months;
      now = new Date();
      months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(Domstrings.dateLabel).textContent =
        months[month] + " " + year;
    },

    changedType: function() {
      var fields = document.querySelectorAll(
        Domstrings.inputType +
          "," +
          Domstrings.inputDescription +
          "," +
          Domstrings.inputValue
      );

      nodeListForEach(fields, function(cur) {
        cur.classList.toggle("red-focus");
      });

      document.querySelector(Domstrings.inputBtn).classList.toggle("red");
    },
    getDomstrings: function() {
      return Domstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDomstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType);
  };

  var updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    //2.Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    //1.caluculate percentages

    budgetCtrl.calculatePercentages();

    //2. Read the percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    //3. update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newOne;
    // 1. get the field input data
    input = UICtrl.getinput();
    console.log(input);
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newOne = budgetCtrl.addItem(input.type, input.description, input.value);
      console.log(newOne);

      UICtrl.addListItem(newOne, input.type);

      UICtrl.clearFields();
      //5. Calculate and update budget
      updateBudget();

      //6. Calucate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemId, splitID, type, ID;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      splitID = itemId.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1. delete item form the data structure
      budgetCtrl.deleteItem(type, ID);

      //2. Delete the item from the UI
      UICtrl.deleteListItem(itemId);

      //3.Update and show the new budget
      updateBudget();

      //4. Calucate and update percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      //console.log('Application has started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
