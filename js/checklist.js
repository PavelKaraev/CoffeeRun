(function(window){
  'use strict';
  let App = window.App || {};
  let $ = window.jQuery;

  function CheckList(selector){
    if(!selector){
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if(this.$element.length === 0){
      throw new Error(`Could not find element with selector: ${selector}`);
    }
  };

  function Row(coffeeOrder){
    let $div = $('<div></div>',{
      'data-coffee-order': 'checkbox',
      'class':'checkbox'
    });
    let $label = $('<label></label>', {
      'class': 'form-check-label mb-2'
    });
    let $checkbox = $('<input></input>',{
      'type': 'checkbox',
      'value': coffeeOrder.emailAddress,
      'class': 'mr-2'
    })
    let description = `[${coffeeOrder.strength}x], ${coffeeOrder.size}, ${coffeeOrder.flavor ? coffeeOrder.flavor : ''}, (${coffeeOrder.emailAddress})`;

    switch (coffeeOrder.flavor) {
      case 'caramel':
        $label.css('background-color', '#ffd59a');
        break;
      case 'almond':
        $label.css('background-color', '#efdecd');
        break;
      case 'mocha':
        $label.css('background-color', '#bea493');
        break;
    }

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  CheckList.prototype.addRow = function(coffeeOrder){
    this.removeRow(coffeeOrder.emailAddress);

    let rowElement = new Row(coffeeOrder);

    this.$element.append(rowElement.$element);
  }

  CheckList.prototype.removeRow = function(emailAddress){
    this.$element.find(`[value="${emailAddress}"]`).closest('[data-coffee-order="checkbox"]').remove();
  }

  CheckList.prototype.addClickHandler = function(fn){
    this.$element.on('click', 'input', function(event){
      let email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  }

  App.CheckList = CheckList;
  window.App = App;
})(window)
