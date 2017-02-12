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

  $('#btn-login').click(function() {
    login();
  });

  $('#txt-password').keydown(function(event) {
    if (event.keyCode == 13) {
      login();
    }
  });

  $('#signup-link').click(function() {
    window.location.href = "signup.html";
  });

  // Listen every for any change in user 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) window.location.href = "app.html";
  });




  // Procedural functions

  function login() {
    const email = $('#txt-email').val();
    const password = $('#txt-password').val();

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
         console.log(error.message);
         shake();
       });
  }

  function shake() {
    $('#btn-login').addClass('shake');
    
    setTimeout(function(){
      $('#btn-login').removeClass('shake');
    }, 1200);
    
  }


}());