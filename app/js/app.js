$(function() {

  force.init({
    appId: '3MVG9xOCXq4ID1uE5sILNJHk06inAqUxj9yjE.FWXLLbWBDt9RNgCnnQF4twGikbdC.nzjvVT9mumyYBoQzPw',
    proxyURL: 'https://sfdc-cors.herokuapp.com'
  });


  $('#btn-login').click(function() {
    force.login(
      function() {
        console.log('Login succeeded');
      },
      function(error) {
        alert('Login failed: ' + error);
      }
    );
  });

  $('#btn-exec').click(function() {
    if (force.isLoggedIn) {
      force.query($('#query').val(),
        function (data) {
          $('#result').html(JSON.stringify(data, undefined, 3));
        },
        function (error) {
          alert("Error: " + JSON.stringify(error));
        });
    }
    else {
      alert('You are not authenticated. Please login first.');
    }
  });

});