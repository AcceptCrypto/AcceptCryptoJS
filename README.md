# Munt js
Documentation: https://docs.getmunt.com

Start accepting crypto with just 5 lines of Javascript code, get immediately a result back after a successful or failed payment.

### Getting started
First download the source code [here](https://github.com/muntpay/muntJS). Then go to the dashboard->Checkout forms and create a form. After you have created your form copy the token and paste it in the code below.

### Integrating
Here are the two only code snippets you would need for integrating Munt in the front-end of your website.
```html
<script src="js/munt.js"></script>
```
```javascript
checkout({
	token: "{{YOUR_TOKEN}}"
    }, function (response) {
    	if (!response.error) {
    		alert("Succeeded! Payment id: " + response.id);
    	} else {
	    	alert("Error!");
    	}
	});
```
The response will be sent as an array that contains the following objects:
1. error
	- Boolean, returns if the payment has been successful or not
2. id
	- String, returns the payment id after a payment has been successful
