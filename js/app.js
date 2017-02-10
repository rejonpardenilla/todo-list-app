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
  var db = firebase.database();


  //Listeners

  $('.signout-btn').click(function() {
    auth.signOut();
  });

  $('#input-task').keydown(function(event) {
    if (event.keyCode == 13) addTask();
  });

  $('#content').on('click', '.fi-check', function() {
    var id = $(this).attr('id');
    var _id = '#' + id;
    $(_id).parent().fadeOut(function() {
      removeTask(id);
    });
  });


  auth.onAuthStateChanged(function(user) {
    if (user) fillContent();
    else window.location.href = "login.html";
  });



  // Functions

  function addTask() {
    var usr = auth.currentUser;
    var inputTask = $('#input-task');
    var task = inputTask.val();
    var timestamp = + new Date();

    if (!usr || task.length < 3 || task.length > 60) {
      shake();
      return;
    }

    db.ref('users/' + usr.uid + '/tasks/' + timestamp)
      .set(task)
      .then( inputTask.val('') )
      .catch(function(error) {
        console.log(error.message);
      });

  }


  function fillContent() {
    var usr = auth.currentUser;
    db.ref('users/' + usr.uid + '/tasks/')
      .orderByKey()
      .on('value', function(data) {

        // No tasks? say "Nothing to do"
        if ( !data.val() ) {

          $('#content').html(

            '<div class="row align-center text-center no-tasks">' +
              '<div class="column small-11 medium-7">' +
                '<em>Nothing to do.</em>' +
              '</div>' +
            '</div>'

            );
          return;
        }


        var dataHtml = '';


        //Tasks? Show them
        data.forEach(function(element) {

          var elementHtml = 
            '<div class="row align-center">' +
              '<div class="column small-11 medium-7 task-column">' +
                '<div class="task">' +
                  '<span>'+ element.val() +'</span>' +
                  '<i class="fi-check size-40 clickable" id="'+ element.key +'"></i>' +
                '</div>' +
              '</div>' +
            '</div>'

          dataHtml = elementHtml + dataHtml;

        });

        $('#content').html(dataHtml);
        
      }); //end .on

  }


  function removeTask(id) {
    var uid = auth.currentUser.uid;
    db.ref('users/' + uid + '/tasks/' + id)
      .set(null);

  }

  function shake() {
    $('#input-task').addClass('shake');
    
    setTimeout(function(){
      $('#input-task').removeClass('shake');
    }, 1200);
    
  }


}());

