(function(window){
    let App = window.App || {};
    
    let Validation = {
        isCompanyEmail: function(email){
            return /.+@bignerdranch\.com$/.test(email);
        },
        decaf: function(str, num){
            return /decaf/gi.test(str) && num > 20;
        }
    } 

    App.Validation = Validation;
    window.App = App;
})(window);