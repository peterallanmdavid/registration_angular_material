var mainModule = angular.module('mainModule',['mainContentModule',] );

var mainContentModule = angular.module('mainContentModule', ['ngMaterial','angularMoment'])



mainContentModule.constant('_', window._);

mainContentModule.directive('mainContentContainer', function() {
    return {
      	template: 
        '<div class = "main-content" ng-controller = "mainHeaderController">'+
			  '<md-card>'+
			  	'<md-card-header>'+
			  		'<md-card-avatar>'+
			  		'<img class="md-user-avatar" src = "./images/logo.icon.png"/>'+
			  		'</md-card-avatar>'+
			  		'<md-card-header-text>'+
			  			'<span class="md-title">Pete\'s Online Shopping</span>'+
			  			'<span class="md-subhead">Shop till you drop</span>'+
			  		'</md-card-header-text>'+
			  	'</md-card-header>'+
			  	'<div registration-form ></div>'+
			  '</md-card>'+
        '<div>'  		
    };
  });

mainContentModule.directive('registrationForm', function() {
	return{
		template:
		'<md-card-content id="popupContainer">'+
  			'<md-input-container>'+
		        '<label>Title</label>'+
		        '<input ng-model="user.title" ng-change = "onChangeFields()">'+
	      	'</md-input-container>'+
	      	'<md-input-container>'+
		        '<label>Email</label>'+
		        '<input ng-model="user.email" ng-change = "onChangeFields()">'+
	      	'</md-input-container>'+
	      	'<div layout-gt-sm="row">'+
		      	'<md-input-container  class="md-block" flex-gt-sm>'+
			        '<label>First Name</label>'+
			        '<input ng-model="user.firstName" ng-change = "onChangeFields()">'+
		      	'</md-input-container>'+
		      	'<md-input-container  class="md-block" flex-gt-sm>'+
			        '<label>Sur Name</label>'+
			        '<input ng-model="user.surName" ng-change = "onChangeFields()">'+
		      	'</md-input-container>'+
	      	'</div>'+

      		'<div layout-gt-sm="row">'+
		      	'<md-input-container  class="md-block three-fields" flex-gt-sm>'+
			        '<label>Street</label>'+ 
			        '<input ng-model="user.street" ng-change = "onChangeFields()">'+
		      	'</md-input-container>'+
		      	'<md-input-container  class="md-block three-fields" flex-gt-sm>'+
			        '<label>Town</label>'+
			        '<input ng-model="user.town" ng-change = "onChangeFields()">'+
		      	'</md-input-container>'+
		      	'<md-input-container  class="md-block three-fields" flex-gt-sm>'+
			        '<label>Postal Code</label>'+
			        '<input ng-model="user.postalCode" ng-change = "onChangeFields()">'+
		      	'</md-input-container>'+
	      	'</div>'+
	      	
	      	'<div layout-gt-sm="row">'+
	      		'<md-input-container>'+
	      			'<label>Birth Date</label>'+
	      		'</md-input-container>'+
		      	'<md-input-container  class="md-block" flex-gt-sm>'+
			        '<md-checkbox ng-model="validaton.isLegalAge" aria-label="I\'m above 18" ng-change = "onCheckLegalAge()">'+
	            		'I\'m above 18'+
	          		'</md-checkbox>'+			 
		      	'</md-input-container  class="md-block" flex-gt-sm>'+
	      	'</div>'+
	      	'<md-input-container>'+
	      	 	'<md-datepicker ng-model="user.dateOfBirth" md-placeholder="Enter Birth Date" md-max-date="validaton.maxDate"  md-min-date="validation.minDate">'+
          		'</md-datepicker>'+
      		'</md-input-container>'+
      		'<div class="animate-switch-container" ng-switch on="validaton.formValid">'+
			      '<div class="animate-switch" ng-switch-when="true">'+
			      	'<md-button class="md-raised md-primary" ng-click = "onRegister($event)">Register</md-button>'+
			      '</div>'+
			      '<div class="animate-switch" ng-switch-when="false">'+
			      	'<md-button  ng-disabled="true" class="md-raised md-primary">Register</md-button>'+
			      '</div>'+
			      '<div class="animate-switch" ng-switch-default>'+
			      	'<md-button  ng-disabled="true" class="md-raised md-primary">Register</md-button>'+
			      '</div>'+
			  '</div>'+
	      	 
  		'</md-card-content>'
	}
});




mainContentModule.controller('mainHeaderController',['$scope' , '$mdDialog',  function($scope, $mdDialog)  {
    $scope.user = {
      title: '',
      firstName: '',
      surName: '',
  	  street:"",
  	  town:"",
  	  postalCode:"",
      dateOfBirth: new Date()
    };
    $scope.validaton = {
    	maxDate: new Date(),
    	minDate: new Date(),
    	formValid:false,
    	isLegalAge:false
    }

    $scope.onCheckLegalAge = function(){
    	$scope.myDate = new Date();
    	if($scope.validaton.isLegalAge){
    		 $scope.validaton.maxDate =new Date(
		      $scope.myDate.getFullYear()-18,
		      $scope.myDate.getMonth(),
		      $scope.myDate.getDate()
      		);
    	}else{
    		  $scope.myDate.getFullYear(),
		      $scope.myDate.getMonth(),
		      $scope.myDate.getDate()-1
    	}
    	 if($scope.user.dateOfBirth > $scope.validaton.maxDate){
		 		$scope.user.dateOfBirth= $scope.validaton.maxDate
		 }
		
    }
    $scope.onChangeFields = function(){
    	 $scope.validaton.formValid = true;
    	_.forIn($scope.user, function(value, key){
    		
    		if(key==="dateOfBirth"){
    			if(value=== new Date()){
    				$scope.validaton.formValid=false;
    			}
    			
    		}else if(value===""){
				$scope.validaton.formValid=false;
    		}
    	})
    }
    $scope.onRegister = function(ev){
    	var content = "Congratulations " + $scope.user.firstName + "!!!, You have succesfull created your profile, lets go and shop!"
    	console.log("success")
    	$mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('RegistrationSuccess')
	        .content(content)
	        .ok('Proceed to Shop!')
	        .targetEvent(ev)
	    );
    }
  }]);
