/**
 * Created by braden on 5/9/15.
 */

angular.module("Uber", [])

    .constant('UBER_CLIENT_ID', "<<Your ID here>>")
    .constant('UBER_API', "https://api.uber.com/v1/")
    .constant('UBER_API_LESS', "https://api.uber.com/")
    .config([function(){

    }])

    .run([function(){

    }])
//assume bearer token is already on the

    //request uber directive
    //price estimate directive
    //time estimate directive
    //product selection directive
    .factory("Products",["$http",function($http){
        var service = {};

        service.get = function(productId){
            var id = productId || "";
            return $http.get(UBER_API + 'products/'+id);
        };

        return service;
    }])

    .factory("Estimates", ["$http", function($http){
        var service = {};

        service.getPrice = function(){
            return $http.get(UBER_API + "estimates/price");
        };

        service.getTime = function(start_latitude, start_longitude, product_id){
            product_id = product_id || "";
            return $http({
                url: UBER_API + "estimates/time",
                method: "GET",
                params: {start_latitude: start_latitude, start_longitude: start_longitude, product_id: product_id}
            });

        };

        return service;
    }])

    .factory("Promotions", ["$http", function($http){
        var service = {};

        service.get = function(start_latitude, start_longitude, end_latitude, end_longitude){
            return $http({
                url: UBER_API + "promotions",
                method: "GET",
                params: {
                    start_latitude: start_latitude,
                    start_longitude: start_longitude,
                    end_latitude: end_latitude,
                    end_longitude: end_longitude
                }
            });
        };

        return service;
    }])

    .factory("User", ["$http", function($http){
        var service = {};

        service.history = function(offset, limit){
            return $http({
                url: UBER_API_LESS + "v1.2/history",
                method: "GET",
                params: {offset: offset, limit: limit}
            });
        };

        service.me = function(){
            return $http.get(UBER_API + "me")
        };

        return service;
    }])


    .factory("Request", ["$http", function($http){
        var service = {};

        service.request = function(product_id, start_latitude, start_longitude, end_latitude, end_longitude, surge_confirmation_id){
            var params = {
                product_id: product_id,
                start_latitude: start_latitude,
                start_longitude: start_longitude,
                end_latitude: end_latitude,
                end_longitude: end_longitude
            };
            if(surge_confirmation_id){
                params.surge_confirmation_id = surge_confirmation_id;
            }
            return $http.post(UBER_API + "requests", params);
        };

        service.details = function(request_id){
            return $http.get(UBER_API + "requests/" + request_id);
        };

        service.estimate = function(product_id, start_latitude, start_longitude, end_latitude, end_longitude){
            var params = {
                product_id: product_id,
                start_latitude: start_latitude,
                start_longitude: start_longitude
            };

            if(end_latitude){
                params.end_latitude = end_latitude;
            }

            if(end_longitude){
                params.end_longitude = end_longitude;
            }

            return $http.post(UBER_API + "requests/estimate", params)
        };

        service.cancel = function(request_id){
            return $http({
                url: UBER_API+"requests/"+request_id,
                method: "DELETE"
            });
        };

        service.map = function(request_id){
            return $http.get(UBER_API+"requests/"+request_id+'/map');
        };

        service.receipt = function(request_id){
            return $http.get(UBER_API + "requests/" + request_id + '/receipt')
        };

        return service;
    }]);




