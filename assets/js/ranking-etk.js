// Initialize Firebase
  const config = {
      apiKey: "AIzaSyAhBOG3nZFT0xjOu5UPm1k-ZVot1IPEfoQ",
      authDomain: "wip-camps-game.firebaseapp.com",
      databaseURL: "https://wip-camps-game.firebaseio.com",
      storageBucket: "wip-camps-game.appspot.com",
      messagingSenderId: "768785136426"
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
    let delay = 3000;

    // get data form database ( child - users )
    // 1000 = 1 second
    const usersRef = dbRef.child("etk").child("web").orderByChild("highscore").limitToLast(100);
    // const getUsers = usersRef.on('value', snap => test.innerText = JSON.stringify(snap.val(), null, 3));

    // get score < only > !
    let users = [];
    let nameUsers = [];
    let temp= [];
    usersRef.on("child_added", function(data) {
      // users.push(data.val());
      users.push(data.val());
      nameUsers.push(data.key);
      // console.log(data.key);
    });
    $(document).ready(function() {
      setTimeout(function() {
        var t = $('.game-tbl').DataTable({
          data: users,
          responsive: true,
          paging: true,
          destroy: true,
          searching: false,
          // orderable: false,
          language : {
            emptyTable : "กรุณา Refresh(F5) อีกครั้ง เพื่อโหลดข้อมูล"
          },
          bSortable : false,
          columnDefs: [
            // {
            //     className: "hidden-xs-down",
            //     targets :[1]
            // },
            {
              orderable : false,
              targets :[0,1,2]
            }
          ],
          order: [[ 2 , 'desc' ]],
          columns: [
            { data: null,
              render: function ( data , type , row){
                return '<div>';
              }
            },
            //   { data: 'urlpic',
            //   render: function ( data , type  , row){
            //     return '<img src="'+ data + '" class="rounded-circle">';
            //   }
            // },
            { data: 'score'
            ,
            render: function ( data , type , row){
              return '<div>';
            }
          },
          {  data: 'highscore' }
        ]
      });

      let checkIndex = nameUsers.length-1;
      // console.log("checkindex - "+checkIndex);
      // const tempIndex = checkIndex;
      // console.log("tempindex - "+tempIndex);
      t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          if(i===0){
            cell.innerHTML = '<img src="../game/img/medal-gold.svg" alt="" class="prize">' + (i+1);
          }
          else if(i===1){
            cell.innerHTML = '<img src="../game/img/medal-silver.svg" alt="" class="prize">' + (i+1);
          }
          else if(i===2){
            cell.innerHTML = '<img src="../game/img/medal-bronze.svg"  alt="" class="prize">' + (i+1);
          }
          else {
            cell.innerHTML = i+1;
          }
          // cell.innerHTML = i+1;
        } );

        t.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          cell.innerHTML = nameUsers[checkIndex];
          if(checkIndex>=0){
            checkIndex--;
          }

        } );
      } ).draw();

    }, delay);

  });
    // console.log(users);
    //
    // console.log(nameUsers);
});
