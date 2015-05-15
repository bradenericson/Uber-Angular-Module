# Uber-Angular-Module
An Angular Module used to work with the Uber API.

 The Uber module is used to easily communicate with the Uber API.
 To use any of the services that connect to the Uber API, the user
 must get a key through oauth. An oauth login from the ng-cordova-oauth (https://github.com/nraboy/ng-cordova-oauth)
 repository was used to create the auth service inside this module.
  
 The comments detailing the specifics of each of the Uber endpoints the services hit, were taken from the Uber Api's website:
 https://developer.uber.com/v1/endpoints/
 >Check it out for response examples. All $http promises returned from the services should resolve into the same response data shown on Uber's documentation page.'
 
## Factories
### auth
The auth service is used to authorize a user and to authenticate each server request for the developer.
For any of the following endpoints, the user must have verified their account through the oauth handshake
and successfully saved a token to be used for all further api calls.

```javascript
.login(clientId, appScope, options)
```
the login method is used to verify the customer's account. The login method used the ng-cordova-oauth 
implementation for loggin in. It should redirect the user to Uber where they sign in, verify the app,
then get redirected back to the application with the token. **cordova friendly**

```javascript
.saveToken(token)
```
The save token is used after the user has successfully given permission to the app. The token is saved
into the auth service where it is then injected into all future api calls. This method is necessary to
allowing the rest of the methods to work

 ```javascript
.getToken()
 ```      
the getToken method is used internally by the module to attach the bearer token to every api request for the user
Only requests made inside the module will have the token attached - so requests to your own API will not have this
token attached.

### Products
The Products endpoint returns information about the Uber products offered at a given location. 
The response includes the display name and other details about each product, 
and lists the products in the proper display order.

```javascript
.get( lat, long, product_id [optional] )
``` 
This will return a promise that will return an array of production information from the uber api.
 
 
### Estimates
The Estimates service combines the Price and Time estimate endpoints into one service.

```javascript
.getPrice(start_latitude, start_longitude, end_latitude, end_longitude)
```
The Price Estimates endpoint returns an estimated price range for each product offered at a given location. 
The price estimate is provided as a formatted string with the full price range and the localized currency symbol.
The response also includes low and high estimates, and the ISO 4217 currency code for situations requiring currency conversion. 
When surge is active for a particular product, its surge_multiplier will be greater than 1, 
but the price estimate already factors in this multiplier.
**Returns**: An $http promise that resolves into the response from the uber api.
 
 ```javascript
 .getTime(start_latitude, start_longitude, product_id [optional])
 ```
The Time Estimates endpoint returns ETAs for all products offered at a given location,
with the responses expressed as integers in seconds. We recommend that this endpoint be
called every minute to provide the most accurate, up-to-date ETAs.
**Returns**: an $http promise that resolves into the response from the uber api.
 
### Promotions
The Promotions endpoint returns information about the promotion that will be available
to a new user based on their activity's location. These promotions do not apply for existing users.

```javascript
.get(start_latitude, start_longitude, end_latitude, end_longitude)
```
 **Returns** an $http promise that resolves into the response from the promotions endpoint

### User
The User Activity endpoint returns a limited amount of data about a user's lifetime activity with Uber.
The response will include pickup and dropoff times, the city the trips took place in, the distance of past requests,
and information about which products were requested. The history array in the response will have a maximum length
based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
 
 ```javascript    
 .history(offset, limit)
 ```
the User.history method returns an $http promise that resolves into the history of rides an uber customer has taken.
 
 ```javascript 
 .me()
 ```
**Returns** an $http promise that resolves into your account information.

### Request
The Request endpoint allows a ride to be requested on behalf of an Uber user given their desired product, start, and end locations.
Please review the Sandbox documentation on how to develop and test against these endpoints without making real-world Requests and being charged.

```javascript  
.request(product_id, start_latitude, start_longitude, end_latitude, end_longitude, surge_confirmation_id [optional] )
```
the request method makes a request on behalf of an uber user.

```javascript    
.details()
```
The details method returns information on the user's current request
"Get the real time status of an ongoing trip that was created using the Ride Request endpoint."

```javascript 
.estimate(product_id, start_latitude, start_longitude, end_latitude [optional], end_longitude [optional])
```
The Request Estimate endpoint allows a ride to be estimated given the desired product, start, and end locations. 
If the end location is not provided, only the pickup ETA and details of surge pricing information are provided. 
If the pickup ETA is null, there are no cars available, but an estimate may still be given to the user.
You can use this endpoint to determine if surge pricing is in effect. Do this before attempting to make a request
so that you can preemptively have a user confirm surge by sending them to the surge_confirmation_href provided in the response.

```javascript
.cancel(request_id)
```
Cancel an ongoing Request on behalf of a rider.

```javascript 
.map(request_id)
```
Get a map with a visual representation of a Request.
 
```javascript
 .receipt(request_id)
```
Get the receipt information of the completed request.