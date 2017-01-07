$(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCRBB-Tk41WvH96-DRCBqZXH8ZRoaetwdc",
    authDomain: "test-f013f.firebaseapp.com",
    databaseURL: "https://test-f013f.firebaseio.com",
    storageBucket: "test-f013f.appspot.com",
    messagingSenderId: "907496327231"
  };
  firebase.initializeApp(config);


  const preUsers = document.getElementById('object');
  
  const userRef = firebase.database().ref().child('users');

  userRef.on('value', snap => console.log(snap.val()));

}());
// $(function() {
//   var input =$('input');
//   var button =$('a');
//   var ul=$('ul');
//
//   listenToFirebase();
//
//   button.click(function() {
//     var text = input.val();
//     input.val('');
//     userRef.push(text);
//   });
//
//   function listenToFirebase() {
//     userRef.on('value', function(snapshot) {
//       var users = snapshot.val();
//       var i = 1;
//       ul.empty();
//       $.each(users, function(index, c) {
//         addToList(parseInt(i)+': ' + c);
//         i += 1;
//       });
//     });
//   }
//
//   function addToList(text) {
//     var li ='<li class ="list-group-item">' + text + '</li>';
//     ul.append(li);
//   }
//
// });
