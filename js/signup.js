(function() {

  // Firebase configuration
  var config = {
    apiKey: "AIzaSyCRKAtCT-TIHINDJ20mxfGaK99CRfposMI",
    authDomain: "quacker-ec274.firebaseapp.com",
    databaseURL: "https://quacker-ec274.firebaseio.com",
    storageBucket: "quacker-ec274.appspot.com",
    messagingSenderId: "584056646121"
  };
  firebase.initializeApp(config);
  var auth = firebase.auth();

  // Listeners

  $('#btn-signup').click(function() {
    signup();
  });

  $('#txt-password-2').keydown(function(event) {
    if (event.keyCode == 13) signup();
  });

  $('#login-link').click(function() {
    window.location.href = "login.html";
  });


  // Procedural functions

  function signup() {
    const name = $('#txt-name').val() + " " + $('#txt-lastname').val();
    const email = $('#txt-email').val();
    const password1 = $('#txt-password-1').val();
    const password2 = $('#txt-password-2').val();

    if (password1 == password2) {

      auth.createUserWithEmailAndPassword(email, password1)
        .then(function() {

          auth.currentUser.updateProfile({
            displayName: name
          }).then(function() {
            window.location.href = 'app.html';
          }, function(error) {
            console.error("Error: " + error.message);
          });

        })
        .catch(function(error) {
          console.error("Error: "+ error.message);
          shake();
        });

    } else {
      console.error("Error: " + "The passwords doesn't match");
      shake();
    }
  }


  function shake() {
    $('#btn-signup').addClass('shake');
    
    setTimeout(function(){
      $('#btn-signup').removeClass('shake');
    }, 1200);
    
  }

}());