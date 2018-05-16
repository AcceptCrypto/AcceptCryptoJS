# AcceptCrypto js
Documentation: https://docs.acceptcryp.to

Start accepting crypto with just 5 lines of Javascript code, get immediately a result back after a successful or failed payment.

### Getting started
First things first, create a checkout form from the dashboard->checkout forms, then copy the code snippet generated paste it inside your website or copy the below code and change {{YOUR_TOKEN}} with the token generated (without the {{}}).

### Initiate a payment
The below code will trigger our Javascript library to open the checkout popup, you can use this inside an onclick event. Tip: only trigger this script from a user action e.g. a click, otherwise the user will have a horrible experience or the script will even get blocked in some browsers.
```html
<script src="https://acceptcryp.to/v1/checkout.js"></script>
```
```javascript
checkout({
	token: "YOUR TOKEN"
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

### Checkout button
The below code will automatically generate a checkout button by importing the CSS files needed. You can of course customize the button yourself by overriding the CSS. If you whish to customize it more the above code is best suited for you since it does not have any UI components.

```html
<a href="#" id="CheckoutButton">Pay with crypto</a>
<script src="https://acceptcryp.to/v1/checkout.js"></script>
<script type="text/javascript">
    checkoutButton({
        token: "YOUR TOKEN"
    },
    function (response) {
        if(response.error) {
        } else {
        }
    });
</script>
```
The response will be sent as an array that contains the following objects:
1. error
	- Boolean, returns if the payment has been successful or not
2. id
	- String, returns the payment id after a payment has been successful
