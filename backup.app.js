
var app = angular.module('firstApp', []);

app.controller('UserController', function($rootScope) {
  var vm = this;
  vm.user = "";
  vm.message = '';

  vm.setStatus = function (){
    var _userToSend = '';
    console.log('Sending user status');
    console.log(JSON.stringify(_userToSend));
    $rootScope.$broadcast('set-status', _userToSend {
      user: vm.user,
      message: vm.message
    });
  };
});
app.controller('StatusController', function($rootScope){
  var vm = this;
  vm.statuses = [];
});
