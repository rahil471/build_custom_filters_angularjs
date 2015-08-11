var app = angular.module('angularTable', []);

app.controller('demoCtrl',function($http){
	var vm = this;
	vm.users = []; //declare an empty array
	$http.get("mockJson/mock.json").success(function(response){ 
		vm.users = response;  //ajax request to fetch data into vm.data
	});
});


//filter name customSearch
app.filter('customSearch',[function(){
	/** @data is the original data**/
	/** @skill is the search query for skill**/
	/** @status is the search query for status**/
	return function(data,skill,status){
		var output = []; // store result in this
		
		/**@case1 if both searches are present**/
		if(!!skill && !!status){
			skill = skill.toLowerCase(); 
			status = status.toLowerCase();
			//loop over the original array
			for(var i = 0;i<data.length; i++){
				// check if any result matching the search request
				if(data[i].skill.toLowerCase().indexOf(skill) !== -1 && data[i].status.toLowerCase().indexOf(status) !== -1){
					//push data into results array
					output.push(data[i]);
				}
			}
		} else if(!!skill){ /**@case2 if only skill query is present**/
			skill = skill.toLowerCase();
			for(var i = 0;i<data.length; i++){
				if(data[i].skill.toLowerCase().indexOf(skill) !== -1){
					output.push(data[i]);
				}
			}
		} else if(!!status){ /**@case3 if only status query is present**/
			status = status.toLowerCase();
			for(var i = 0;i<data.length; i++){
				if(data[i].status.toLowerCase().indexOf(status) !== -1){
					output.push(data[i]);
				}
			}
		} else {
			/**@case4 no query is present**/
			output = data;
		}
		return output; // finally return the result
	}
}]);