(function(window){
  'use strict';
  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(selector){
    if(!selector){
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    this.$range = this.$formElement.find('input[type="range"]');
    this.$rangeValue = this.$formElement.find('.range-value');

    this.colorRangeValue = function(rangeValue){
      if(rangeValue < 40){
        this.$rangeValue.css('color', 'green');
      }else if(rangeValue < 70 && value >= 40){
        this.$rangeValue.css('color', 'orange');
      }else if(rangeValue >= 70){
        this.$rangeValue.css('color', 'red');
      }
    }

    this.colorRangeValue(this.$range.val());

    if(this.$formElement.length === 0){
      throw new Error(`Could not find element with selector: ${selector}`)
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      let data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(`${item.name} is ${item.value}`);
      })
      if(data.size === 'CoffeeZilla'){
        $('#achivement').modal('show');
      }
      fn(data);
      this.reset();
      this.elements[0].focus();
    })
  }

  FormHandler.prototype.addInputHandler = function(fn){
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event){
      let email = event.target.value;
      let message = '';
      if(fn(email)){
        event.target.setCustomValidity();
      }else{
        message = `${email} is not authorized email address`;
        event.target.setCustomValidity(message);
      }
    })
  }

  FormHandler.prototype.addDecafStrengthHandndler = function(fn){
    console.log('Setting Decaf strength handler for form');
    this.$formElement.on('input', '[name="coffee"], [name="strength"]', function(event){
      let coffee = $('[name="coffee"]').val();
      let strength = $('[name="strength"]').val();
      let message = '';
      if(fn(coffee, strength)){
        message = `${coffee} is not decaf with ${strength}% strength`;
        event.target.setCustomValidity(message);
      }
    })
  }

  FormHandler.prototype.addRangeChangeHandler = function(){
    let rangeValue = this.$rangeValue;
    this.$range.on('input', function(){
      let value = +$(this).val();
      rangeValue.text(`${value}%`);
      if(value < 40){
        rangeValue.css('color', 'green');
      }else if(value < 70 && value >= 40){
        rangeValue.css('color', 'orange');
      }else if(value >= 70){
        rangeValue.css('color', 'red');
      }
    }).on('change', function(){
      let value = +$(this).val();
      rangeValue.text(`${value}%`);
      if(value < 40){
        rangeValue.css('color', 'green');
      }else if(value < 70 && value >= 40){
        rangeValue.css('color', 'orange');
      }else if(value >= 70){
        rangeValue.css('color', 'red');
      }
    })
  }
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
