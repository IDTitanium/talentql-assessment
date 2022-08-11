# Project Details

## How Does It Work

This project contains an API endpoint that allows a user get age by passing in the date of birth. Usage information below.

Api Url ==> `{BASE_URL}/howold`

## API Usage

To use this api, you only have to attach a `dob` url parameter to the api url in a GET request.

Example:
	
	GET `{BASE_URL}/howold?dob=1/1/1990`

Expected response

	Status code: 200	
	```
	{
		"data": 32,
		"message": "You are 32 years old"
	}
	```

There `dob` paramter is compulsory and is being validated.

Expected date format for `dob` is `day/month/year`. Hence, to represent 8th of February, 2001. You use `8/2/2001`.

There is also support for UNIX time. So you can pass you dob in unix time. Example `8/2/2001` will roughly translate to `981639649` in UNIX time.

When the wrong date format is passed you may get a wrong age calculation.

The API is also rate limited. This means you can only make 3 api calls per second.
When you hit the limit you get an error response.

	```
	{
		"error": "You can only make 3 calls per second"
	}
	```

## Code Details

This project uses Express framework, Date FNS for dates handling, Express Rate Limiter library to handle rate limiting.

The entire (core) application logic exists in the `app.js` file. 

Within the `app.js` file, there is a simple validation for the date passed, and the follwing lines returns the actually age based on the given date.

## Contributing

If you find any issues, feel free to send in your PR! :)