
var app = angular.module('firstApp', []);

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
      alert("Please define user and message");
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
  service.dbSave = function(infoToSave) {
    var db = this;
    
  }
app.controller('UserController', function(StatusService) {
  var vm = this;
  vm.date = new Date();

  vm.setStatus = function (){
    var _newStatus = {
      date : vm.date,
      user: vm.user,
      message: vm.message
    };

    StatusService.addStatus(_newStatus);
    function _resetForm() {
      vm.date = '';
      vm.message = '';
    }
    _resetForm();
  };
});

app.controller('StatusController', function(StatusService){
  var vm = this;
  vm.statuses = StatusService.getStatuses();

  vm.deleteStatus = function() {
    vm.statuses.splice(0);

  }
});
