window.onload = function() {
console.log(window.appId)
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOxkcZqpTix24iQ1aGFi95EBr0My1Ley4",
  authDomain: "vrex-c8cd0.firebaseapp.com",
  databaseURL: "https://vrex-c8cd0.firebaseio.com",
  projectId: "vrex-c8cd0",
  storageBucket: "vrex-c8cd0.appspot.com",
  messagingSenderId: "863289428138"
};
firebase.initializeApp(config);

// App name
var appName = window.id;

// Get a reference to the database service
var database = firebase.database().ref(appName);

var SceneVue = new Vue({
    el: '#scene',
    data: {
        items: [],
        currentItem: '',
        category: '',
        attribute: ''
    },
    methods: {
      saveScene: function() {
        database.set(this.items);
        // console.log(this.items)
      },
      addObject: function(type) {
        this.items.push({
            "position": "-1 3.25 -7",
            "color": "#EF2D5E",
            "scale": "1 1 1",
            "radius": "1.25",
            "geometry": type
        });
      },
      removeCurrentObject: function() {
        if(this.currentItem !== "" && this.currentItem !== null){
          // console.log(this.currentItem);
          this.items.splice(this.currentItem, 1);
          this.currentItem = '';
        }
      },
      setCategory: function(cat) {
        this.category = cat;
        this.attribute = '';
      },
      setAttribute: function(attr) {
        this.attribute = attr;
      },
      getPosition: function(item) {
        if(!item.position){
          item.position = {
            x : 0,
            y : 0,
            z : 0
          };
        }
        return item.position.x + " " + item.position.y + " " + item.position.z;
      },
      getScale: function(item) {
        if(!item.scale){
          item.scale = {
            x : 1,
            y : 1,
            z : 1
          };
        }
        return item.scale.x + " " + item.scale.y + " " + item.scale.z;

      },
      getRotation: function(item) {
        if(!item.rotation){
          item.rotation = {
            x : 0,
            y : 0,
            z : 0
          };
        }
        return item.rotation.x + " " + item.rotation.y + " " + item.rotation.z;
      },
    },
    created: function() {
      // Load data
      var self = this;
      // $.ajax({
      //     url: '/js/data.json',
      //     method: 'GET',
      //     success: function (data) {
      //       console.log(data)
      //         self.items = data;
      //     },
      //     error: function (error) {
      //         console.log(error);
      //     }
      // });

      database.on("value", function(snapshot) {
         var data = snapshot.val();
         console.log(data)
         self.items = data
      }, function (error) {
         console.log("Error: " + error.code);
      });
    },
    mounted: function () {
      var self = this;
      // Clicking on an object
      $('a-scene').on('raycaster-intersection', function(e) {
        var elIntersected = e.detail.els[0];
        console.log(e.details)
        $('a-scene').off('click');
        $('a-scene').click(function() {
          self.currentItem = parseInt(elIntersected.id);
        });
      });

      // Not clicking at anything
      $('a-scene').on('raycaster-intersection-cleared', function(){
        $('a-scene').off('click');
        $('a-scene').click(function(e) {
          self.currentItem = '';
          self.category = '';
          self.attribute = '';
        });
      });
    }
});

}
