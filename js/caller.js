
$(document).ready(function() {
    console.log('Document is ready');

    $('#activate-btn').click(function(event) {
        console.log('Activation button is clicked');
        event.preventDefault();
        showAlert('Activated', 'alert-success');
        // var Meter_id = $('#meterid').val();
        // var Username = $('#username').val();
        // var Amount = $('#amount').val();

        // axios.get('http://localhost:5000/meters', {
        //     Meter_id : Meter_id,
        //     Username: Username,
        //     Amount: Amount
        // })
        // .then(function(response) {
        //     showAlert('Activated', 'alert-success');
        //     // var token = response.data.token;
        //     // localStorage.setItem('token', token);
        //     // window.location.href = 'index.html';
        // })
        // .catch(function (error) {
        //     LoginAlert('Missing details ' + error.message, 'alert-danger');
        // })
      });

      $('#logout').click(function(event) {
        console.log('log out button is clicked');
        event.preventDefault();
        axios.get('http://localhost:5000/disconnect', {
           headers: {
            'Content-Type': 'application/json',
            'X-Token': localStorage.getItem('token')
           } 
        })
        .then(function(response) {
            if (response.status == 204) {
            console.log('Logged out successfully');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            }
        })
      })

      $('#signup-btn').click(function(event) {
        console.log('SignUp button clicked!');
        event.preventDefault();
          var names = $('#names').val();
          var email = $('#email').val();
          var password = $('#password').val();
          var confirmpassword = $('#confirmpassword').val();
  
          if (password !== confirmpassword) {
              showAlert('Passwords do not match!', 'alert-danger');
          } else {
              axios.post('http://localhost:5000/users', {
                  names: names,
                  email: email,
                  password: password
              })
              .then(function(response) {
                  console.log(`Registration Successful ${response}`);
                  showAlert('Registered successfully! Redirecting...', 'alert-success');
                  setTimeout(function() {
                      window.location.href = 'login.html';
                  }, 3000);
              })
              .catch(function(error) {
                  showAlert('Error registering user: ' + error.message, 'alert-danger');
              });
          }
      });
  
      function showAlert(message, className) {
          var alertDiv = $('<div>').addClass('alert ' + className).text(message);
          var container = $('.signup-container');
          var form = $('#signup');
  
          container.prepend(alertDiv);
  
          setTimeout(function() {
              alertDiv.remove();
          }, 3000);
      }

      function LoginAlert(message, className) {
        var alertDiv = $('<div>').addClass('alert ' + className).text(message);
        var container = $('.login-container');
        var form = $('#login');

        container.prepend(alertDiv);

        setTimeout(function() {
            alertDiv.remove();
        }, 3000);
    }
  });
