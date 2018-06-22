/**
 * Created by Sven on 11-12-2017.
 */

var host = "https://acceptcryp.to";

var e = document.createElement("iframe");
setAttributes(e, {'id' : 'CheckoutIFrame', 'allowfullscreen' : '', 'onload' : 'this.width=window.innerWidth;',  'src' : host+'/embed', 'style' :
'    z-index: -1;' +
'    display: none;' +
'    border: 0px none transparent;' +
'    overflow-x: hidden;' +
'    overflow-y: hidden;' +
'    visibility: hidden;' +
'    margin: 0px;' +
'    padding: 0px;' +
'    position: fixed;' +
'    left: 0px;' +
'    top: 0px;' +
'    height: 100%;' +
'    pointer-events: none;'});

window.onload = function () {

    document.body.appendChild(e);

};

function checkout(params, callback) {
    
    var response = {};

    if(params.token !== undefined){

        setAttributes(e, {'src' : host+'/embed/' + params.token, 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: 2147483647;' +
        '    display: block;' +
        '    border: 0px none transparent;' +
        '    overflow-x: hidden;' +
        '    overflow-y: hidden;' +
        '    visibility: visible;' +
        '    margin: 0px;' +
        '    padding: 0px;' +
        '    position: fixed;' +
        '    left: 0px;' +
        '    top: 0px;' +
        '    height: 100%;' +
        '    pointer-events: auto;'});

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod ===  "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, function(response){

            if (response.origin === host) {

                var data = response.data;

                console.log(data);

                if (data.type === "checkout") {

                    if (data.error === false) {

                        response = {error: false, id: data.id};
                        callback(response);
                        closeIFrame();

                    } else {

                        if (data.close === true) {

                            closeIFrame();
                            response = {error: true, message: "Aborted payment"};
                            callback(response);

                        } else {

                            response = {error: true, message: data.message};
                            callback(response);

                        }

                    }

                }

            }

        }, false);

    } else {

        response = {error: true, message: "missing payment_id"};
        callback(response);

    }

}

function checkoutButton(params, callback) {

    var link = document.createElement("link");

    setAttributes(link, {
        "rel" : "stylesheet",
        "href" : host+"/v1/css/checkout.css"
    });

    document.head.appendChild(link);

    if (document.head.contains(link)) {

        var button = document.getElementById("CheckoutButton");

        button.addEventListener("click", function( event ) {

            event.preventDefault();

            var response = {};

            if(params.token !== undefined) {

                setAttributes(e, {'src' : host+'/embed/' + params.token, 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: 2147483647;' +
                '    display: block;' +
                '    border: 0px none transparent;' +
                '    overflow-x: hidden;' +
                '    overflow-y: hidden;' +
                '    visibility: visible;' +
                '    margin: 0px;' +
                '    padding: 0px;' +
                '    position: fixed;' +
                '    left: 0px;' +
                '    top: 0px;' +
                '    height: 100%;' +
                '    pointer-events: auto;'});

            } else {

                response = {error: true, message: "missing payment_id"};
                callback(response);

            }

        });

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod ===  "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, function(response){

            console.log(response);

            if (response.origin === host) {

                var data = response.data;

                if (data.type === "checkout") {

                    if (data.error === false) {

                        response = {error: false, id: data.id};
                        callback(response);
                        closeIFrame();

                    } else {

                        if (data.close === true) {

                            closeIFrame();
                            response = {error: true, message: "Aborted payment"};
                            callback(response);

                        } else {

                            response = {error: true, message: "An error occurred, please try again"};
                            callback(response);

                        }

                    }

                }

            }

        }, false);

    }

}

function closeIFrame() {

    setAttributes(e, {'src' : host+'/embed/', 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: -1;' +
    '    display: none;' +
    '    border: 0px none transparent;' +
    '    overflow-x: hidden;' +
    '    overflow-y: hidden;' +
    '    visibility: hidden;' +
    '    margin: 0px;' +
    '    padding: 0px;' +
    '    position: fixed;' +
    '    left: 0px;' +
    '    top: 0px;' +
    '    width: 100%;' +
    '    height: 100%;' +
    '    pointer-events: none;'});
    document.body.appendChild(e);

}

function setAttributes(e, attrs) {
    for(var a in attrs) {
        e.setAttribute(a, attrs[a]);
    }

}