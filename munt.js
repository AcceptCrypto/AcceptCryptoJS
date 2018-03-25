/**
 * Created by Sven on 11-12-2017
 */

var e = document.createElement("iframe");
setAttributes(e, {'id' : 'MuntIFrame', 'allowfullscreen' : '', 'onload' : 'this.width=window.innerWidth;',  'src' : 'https://getmunt.com/checkout', 'style' :
'    z-index: -1;' +
'    display: block;' +
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

        setAttributes(e, {'src' : 'https://getmunt.com/checkout/' + params.token, 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: 2147483647;' +
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

            console.log(response);

            if (response.origin === "https://getmunt.com") {

                var data = response.data;

                console.log(data);

                if (!data.error) {

                    response = {error: false, id: data.id};
                    callback(response);
                    closeIFrame();

                } else {

                    if (data.close) {

                        closeIFrame();
                        response = {error: true, message: "Aborted payment"};
                        callback(response);

                    } else {

                        response = {error: true, message: "An error occurred, please try again"};
                        callback(response);

                    }

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

function checkoutButton(params, callback) {

    var link = document.createElement("link");

    setAttributes(link, {
        "rel" : "stylesheet",
        "href" : "https://getmunt.com/v1/css/munt.css"
    });

    document.head.appendChild(link);

    if (document.head.contains(link)) {

        var button = document.getElementById("muntCheckoutButton");

        button.addEventListener("click", function( event ) {

            event.preventDefault();

            var response = {};

            if(params.token !== undefined) {

                setAttributes(e, {'src' : 'https://getmunt.com/checkout/' + params.token, 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: 2147483647;' +
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

            if (response.origin === "https://getmunt.com") {

                var data = response.data;

                console.log(data);

                if (!data.error) {

                    response = {error: false, id: data.id};
                    callback(response);
                    closeIFrame();

                } else {

                    if (data.close) {

                        closeIFrame();
                        response = {error: true, message: "Aborted payment"};
                        callback(response);

                    } else {

                        response = {error: true, message: "An error occurred, please try again"};
                        callback(response);

                    }

                }

            } else {

                response = {error: true, message: "Invalid origin " + response.origin};
                callback(response);

            }

        }, false);

    }

}

function closeIFrame() {

    setAttributes(e, {'src' : 'https://getmunt.com/checkout/', 'onload' : 'this.width=window.innerWidth;', 'style' : 'z-index: -1;' +
    '    display: block;' +
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