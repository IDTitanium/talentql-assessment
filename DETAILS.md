# How Does It Work?

This project contains an API endpoint that allows a user get age by passing in the date of birth. Usage information below.

Api Url ==> `/howold`

### API Usage

To use this api, you only have to attach a `dob` url parameter to the api url in a GET request.

Example:
	
	GET `{BASE_URL}/howold?dob=1/1/1990`

Expected response
	
	```
	{
		"data": 32,
		"message": "You are 32 years old"
	}
	```

There `dob` paramter is compulsory and is being validated.

Expected date format for `dob` is `day/month/year`. Hence, to represent 8th of February, 2001. You use `8/2/2001`.


### Code Details

This project uses Express framework, Date FNS for dates handling, Express Rate Limiter library to handle rate limiting.

The entire (core) application logic exists in the `app.js` file. 
