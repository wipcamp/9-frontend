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
const dbRef = firebase.database().ref();


$(function() {
  const input = $('input');
  const button = $('a');
  const tbody = $('tbody');
  let i=0;

  const usersRef = dbRef.child("users").orderByChild("score").on('value', snap => test.innerText = JSON.stringify(snap.val(), null, 3));
  let getArrays = [];
  getArrays = usersRef;
  console.log(getArrays);
    button.click(function() {
      if (i<10) {
        for(i=0;i<10;i++) {
          const text = input.val();
          input.val();
          addToList(text);
        }
      }
    })


  function addToList(text) {
    const tr ='<tr>' + '<td>'+ (i+1) + '</td>' + '<td class="hidden-sm-down">'+ "picurl" + '</td>' + '<td>'+ "Facebook Name"+ '</td>' + '<td>'+ "Score" + '</td>' + '</tr>';
    tbody.append(tr);
  }

});
