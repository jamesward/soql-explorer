var apiVersion = 'v30.0',
    clientId = 'YOUR_CONSUMER_KEY_HERE',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "http://localhost:5000/oauthcallback.html",
    proxyURL = 'https://sfdc-cors.herokuapp.com';

function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        window.salesforceToken = response.access_token;
    } else {
        alert("AuthenticationError: No Token");
    }
}

function executeQuery() {
    if (!window.salesforceToken) {
        alert('You are not authenticated. Please login first.');
    }
    else {
      $.ajax(proxyURL + '/services/data/v30.0/query/?q=' + $('#query').val(), {
        headers: {'Authorization': 'Bearer ' + window.salesforceToken},
        dataType: 'json',
        success: function (data) {
            $('#result').html(JSON.stringify(data, undefined, 3));
        },
        error: function (error) {
            alert("Error: " + JSON.stringify(error));
        }
      });
    }
}

$('#btn-login').click(login);
$('#btn-exec').click(executeQuery);

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}