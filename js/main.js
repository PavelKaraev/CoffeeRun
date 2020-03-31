(function(window){
  'use strict';
  let FORM_SELECTOR = '[data-coffee-order="form"]';
  let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  let SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let RemoteDataStore = App.RemoteDataStore;
  let FormHandler = App.FormHandler;
  let Validation = App.Validation;
  let CheckList = App.CheckList;

  let remoteDS = new RemoteDataStore(SERVER_URL);
  let myTruck = new Truck('barista', remoteDS);
  window.myTruck = myTruck;
  let checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  let formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data){
    return myTruck.createOrder.call(myTruck, data)
    .then(() => checkList.addRow.call(checkList, data));
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  myTruck.printOrders(checkList.addRow.bind(checkList));
  formHandler.addDecafStrengthHandndler(Validation.decaf);
  formHandler.addRangeChangeHandler();
})(window);
