// Initialize Firebase
const config = {
  apiKey: "AIzaSyCRBB-Tk41WvH96-DRCBqZXH8ZRoaetwdc",
  authDomain: "test-f013f.firebaseapp.com",
  databaseURL: "https://test-f013f.firebaseio.com",
  storageBucket: "test-f013f.appspot.com",
  messagingSenderId: "907496327231"
};
firebase.initializeApp(config);

const test = document.getElementById('test');

// get reference
const dbRef = firebase.database().ref();

// main function
$(function() {
  const input = $('input');
  const button = $('a');
  const tbody = $('tbody');
  let i=0;

// get data form database ( child - users )
  const usersRef = dbRef.child("users").orderByChild("score").limitToLast(10);
  const getUsers = usersRef.on('value', snap => test.innerText = JSON.stringify(snap.val(), null, 3));

// get score < only > !
let scores = [];
let names = [];
let urlpics = [];
  usersRef.on("child_added", function(data) {

    let users = data.val();
    names.push(users.name);
    scores.push(users.score);
    urlpics.push(users.urlpic);
    console.log(names);
    console.log(scores);
    console.log(urlpics);
  });



// json -> arrays




  //-------------------------------------------//
  // show in table
    button.click(function() {
      if (i<10) {
        for(i=0;i<10;i++) {
          const text = input.val();
          input.val();
          addToList(text);
        }
      }
    })

  // add to table
  function addToList(text) {
    const tr ='<tr>' + '<td>'+ (i+1) + '</td>' + '<td class="hidden-sm-down">'+ "picurl" + '</td>' + '<td>'+ "Facebook Name"+ '</td>' + '<td>'+ "Score" + '</td>' + '</tr>';
    tbody.append(tr);
  }

});
