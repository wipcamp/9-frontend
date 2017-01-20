// Initialize Firebase
const config = {
    apiKey: "AIzaSyCRBB-Tk41WvH96-DRCBqZXH8ZRoaetwdc",
    authDomain: "test-f013f.firebaseapp.com",
    databaseURL: "https://test-f013f.firebaseio.com",
    storageBucket: "test-f013f.appspot.com",
    messagingSenderId: "907496327231"
};
firebase.initializeApp(config);

// id test in testfirebase
// const test = document.getElementById('test');

// get reference
const dbRef = firebase.database().ref();

// main function
$(function() {
    const input = $('input');
    const button = $('a');
    const tbody = $('tbody');
    let i = 0;
    let j = 9;

    // timeout
    let delay = 10000;
console.log(delay);
    // get data form database ( child - users )
    // 1000 = 1 second
    const usersRef = dbRef.child("users").orderByChild("score").limitToLast(100);
    // const getUsers = usersRef.on('value', snap => test.innerText = JSON.stringify(snap.val(), null, 3));

    // get score < only > !
    let users = [];
    let temp= [];
    usersRef.on("child_added", function(data) {
      // users.push(data.val());
      users.push(data.val());
    //   usersRef.on("value", function(data) {
    //
    // });

    });
    $(document).ready(function() {
      // New delay
      if(users !== temp ) {
        delay=2000;
        setTimeout(function() {
          $('.game-tbl').DataTable({
            data: users,
            responsive:true,
            order: [[ 2 , 'desc' ]],
            columns: [
              // { data: 'uid'},
              { data: 'urlpic',
              render: function ( data , type  , row){
                return '<img src="'+ data + '" class="rounded-circle">';
              }
            },
            {  data: 'name'   },
            {  data: 'score' }
          ]
        });
      }, delay);
      }
  });

// console.log(users);
});
