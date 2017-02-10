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
  

  // Listeners

  $('#btn-signup').click(function() {
    signup();
  });

  $('#txt-password-2').keydown(function(event) {
    if (event.keyCode == 13) {
      login();
    }
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

      firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then(function() {

          auth.currentUser.updateProfile({
            displayName: name
          }).then(function() {
            window.location.href = 'app.html';
          }).catch(function( error ) {
            console.log( error.message );
          });

        })
        .catch(function(error) {
          console.log(error.message);
          shake();
        });

    } else {
      console.log("The passwords doesn't match");
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