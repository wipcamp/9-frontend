var vmSrc ={
  el : "#div-app",
  data : {
      title : "Hello VueJS",
      powerBy : "Tae.",
      firstname : "",
      lastname : ""
  },
  methods : {
    clickMe : function(){
      alert("Click Laew");
    },
    keyDown : function(){
      console.log("Keerati");
    },
    loadData : function(){
     this.firstname= "tae";
     this.lastname= "eiei";
   },
   reset : function(){
     this.firstname= "";
     this.lastname= "";
   }
  },
  // computed : {
  //
  // },
  mounted : function(){
    // this.loadData();
  },
  // components : {
  //
  // },
}
