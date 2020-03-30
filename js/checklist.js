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
      'class':'checkbox mb-2'
    });
    let $label = $('<label></label>', {
      'class': 'form-check-label'
    });
    let $checkbox = $('<input></input>',{
      'type': 'checkbox',
      'value': coffeeOrder.emailAddress,
      'class': 'mr-2'
    })
    let description = `${coffeeOrder.coffee}, ${coffeeOrder.strength}%, ${coffeeOrder.size}, ${coffeeOrder.flavor ? coffeeOrder.flavor : ''}, ${coffeeOrder.emailAddress}`;

    switch (coffeeOrder.flavor) {
      case 'caramel':
        $div.css('background-color', '#ffd59a');
        break;
      case 'almond':
        $div.css('background-color', '#efdecd');
        break;
      case 'mocha':
        $div.css('background-color', '#bea493');
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

  CheckList.prototype.getRow = function(editElement){
    let text = $(editElement).text();
    let [coffee, strength, size, flavor, email] = text.split(',');
    
    this.editRow(coffee, strength, size, flavor, email)
  }
  
  CheckList.prototype.editRow = function(coffee, strength, size, flavor, email){
    let $form = $('[data-coffee-order="form"]');

    if(coffee){
      $form.find('[name="coffee"]').val(coffee);
    }

    if(strength){
      $form.find('[name="strength"]').val(strength);
    }

    if(size){
      $form.find(`input[value=${size}]`).prop('checked', true);
    }
    
    if(flavor){
      $form.find(`option[value=${flavor}]`).prop('selected', true);
    }

    if(email){
      $form.find('[name="emailAddress"]').val(email);
    }
  }

  CheckList.prototype.addClickHandler = function(fn){
    let timerID;

    this.$element.on('click', 'input', function(event){
      if(!timerID){
        this.$element.find(`[value="${event.target.value}"]`).closest('[data-coffee-order="checkbox"]').css('box-shadow', '100px 100px 20px rgba(0,0,0,0.4) inset');
        timerID = setTimeout(() => {
          let email = event.target.value;
          this.removeRow(email);
          fn(email);
        }, 1000);
      }
    }.bind(this)).on('dblclick', function(){
      clearTimeout(timerID);
      this.$element.find(`[value="${event.target.value}"]`).closest('[data-coffee-order="checkbox"]').css('box-shadow', 'none');
      let element = event.target;
      this.getRow(element);
    }.bind(this));
  }


  App.CheckList = CheckList;
  window.App = App;
})(window)
