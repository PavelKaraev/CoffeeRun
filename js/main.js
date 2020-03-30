(function(window){
  'use strict';
  let FORM_SELECTOR = '[data-coffee-order="form"]';
  let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let FormHandler = App.FormHandler;
  let Validation = App.Validation;
  let CheckList = App.CheckList;

  let myTruck = new Truck('barista', new DataStore());
  window.myTruck = myTruck;
  let checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  let formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  formHandler.addDecafStrengthHandndler(Validation.decaf);
  formHandler.addRangeChangeHandler();
})(window);
