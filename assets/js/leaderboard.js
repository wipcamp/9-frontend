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
  let i=0;
  let j=9;

// timeout
var delay=2250;

// get data form database ( child - users )
// 1000 = 1 second
  const usersRef = dbRef.child("users").orderByChild("score").limitToLast(10);
// const getUsers = usersRef.on('value', snap => test.innerText = JSON.stringify(snap.val(), null, 3));

// get score < only > !
  let scores = [];
  let names = [];
  let urlpics = [];
  usersRef.on("child_added", function(data) {
    let users = data.val();
    names.push(users.name);
    scores.push(users.score);
    urlpics.push(users.urlpic);
  });

  $(document).ready(function() {
    setTimeout(function() {
      if (i<10) {
        for(i=0;i<10;i++) {
          input.val();
          addToList();
        }
      }
    }, delay);
  });

  // add to table
  function addToList(text) {
    const tr ='<tr>' + '<th scope="row" class="game-forCenter" >'+ (i+1) + '</th>' + '<td class="hidden-sm-down game-forCenter">'+ '<img src="' + (urlpics[j]) + '" alt="' + (names[j]) + '" class="rounded-circle" />' + '</td>' + '<td class="game-forCenter">'+ names[j] + '</td>' + '<td>'+ scores[j] + '</td>' + '</tr>';
    tbody.append(tr);
    j--;
  }

});
