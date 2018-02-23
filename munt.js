/**
 * Created by Sven on 11-12-2017.
 */

var host = "https://getmunt.com";

function checkout(params, callback) {

    var bc = new BroadcastChannel("checkout_response");

    var response = {};

    if(params.token !== undefined){

        window.open(host + "/checkout/"+params.token, "checkout", "");

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod ===  "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, function(response){

            console.log(response);

            if (response.origin === host) {

                var data = response.data;

                console.log(data);

                if (!data.error) {

                    response = {error: false, id: data.id};
                    callback(response);

                } else {

                    response = {error: true, message: "An error occurred, please try again"};
                    callback(response);

                }

            } else {

                response = {error: true, message: "Invalid origin " + response.origin};
                callback(response);

            }

        }, false);

    } else {

        response = {error: true, message: "missing payment_id"};
        callback(response);

    }

}