// Initialize Firebase
const config = {
    apiKey: "AIzaSyCRBB-Tk41WvH96-DRCBqZXH8ZRoaetwdc",
    authDomain: "test-f013f.firebaseapp.com",
    databaseURL: "https://test-f013f.firebaseio.com",
    storageBucket: "test-f013f.appspot.com",
    messagingSenderId: "907496327231"
};
firebase.initializeApp(config);

jQuery.fn.dataTableExt.oApi.fnDataUpdate = function ( oSettings, nRowObject, iRowIndex )
{
    jQuery(nRowObject).find("TD").each( function(i) {
          var iColIndex = oSettings.oApi._fnVisibleToColumnIndex( oSettings, i );
          oSettings.oApi._fnSetCellData( oSettings, iRowIndex, iColIndex, jQuery(this).html() );
    } );
};

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

    // get data form database ( child - users )
    // 1000 = 1 second
    const usersRef = dbRef.child("game2");
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
        delay=2250;
        setTimeout(function() {
          var t = $('.game-tbl').DataTable({
            data: users,
            responsive: true,
            columnDefs: [
              {
                  className: "hidden-xs-down",
                  targets :[1]
              },
            ],
            order: [[ 3 , 'desc' ]],
            columns: [
              { data: null,
              render: function ( data , type , row){
                return '<div '+ data +'>';
              }
            },
              { data: 'urlpic',
              render: function ( data , type  , row){
                return '<img src="'+ data + '" class="rounded-circle">';
              }
            },
            {  data: 'name' },
            {  data: 'score' }
          ]
        });

        t.on( 'order.dt search.dt', function () {
          t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
          } );
        } ).draw();

      }, delay);
      }
  });
});
