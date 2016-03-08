
var app = angular.module('firstApp', []);


app.service('UserService', function(){
  var service = this;

  var USERNAME_KEY = 'username';
  var _user = {
    username: localStorage.getItem(USERNAME_KEY),

    //TODO: Implement password support in the future
    password: undefined
  }

  service.setUser = _setUser;
  service.removeUser = _removeUser;
  service.getUsername = _getUsername;
  service.hasUser = _hasUser;

  function _removeUser() {
    _setUser(null);
  }
     function _setUser(username) {
       _user.username = username;
       if (_.isNull(username)){
         localStorage.removeItem(USERNAME_KEY, username);
       }else {
       localStorage.setItem(USERNAME_KEY, username);
     }
    }
       function _getUsername() {
        return _user.username;
      }

        function _hasUser() {
          // FIXME: 0 passes trough
          return !_.isNull(_getUsername());
        }
          function _getUsername() {
            return _user.username;
          }
});
app.controller('LoginController', function(UserService){
  var vm = this;
  vm.username = '';
  vm.login= _login;
  function _login(){
    UserService.setUser(vm.username);
  }
})
app.service('StatusService', function(){
  var service = this;
  service.statuses = [];
  var _statuses = [];
  var _userStatuses = [];

  service.addStatus = function(newStatus) {
    if (!_.isEmpty(newStatus.user) && !_.isEmpty(newStatus.message)) {
      _statuses.push(newStatus);
      _userStatuses.splice(0);
      angular.copy(_statuses, _userStatuses);
    }
    else {
      alert("Please type in message");
    }
  }

  service.resetStatuses = function(){
    _statuses.splice(0);
  }

  service.getStatuses = function () {
    return _statuses;
  }

  service.addStatuses = function(newStatus){
    _statuses.push(newStatus);
  }
});
app.controller('MainController', function(UserService){
  var vm = this;
  vm.hasUser = UserService.hasUser;
  vm.getUsername = UserService.getUsername;
  vm.removeUser = UserService.removeUser;
});
app.controller('UserController', function(UserService, StatusService) {
  var vm = this;
  _resetForm();
    vm.setStatus = function (){
      var _newStatus = {
        date : vm.date,
        user: UserService.getUsername(),
        message: vm.message
      };

      StatusService.addStatus(_newStatus);
      _resetForm()
    };
      function _resetForm() {
        vm.date = new Date();
        vm.message = '';
      }
;


});

app.controller('StatusController', function(UserService, StatusService){
  var vm = this;
  vm.statuses = StatusService.getStatuses();

  vm.deleteStatus = function() {
    vm.statuses.splice(0);

  }
});
