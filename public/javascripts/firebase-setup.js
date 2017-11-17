window.onload = function() {
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAu4uRr3QPR-g8XTYN3kiuu3Dxi1pKyTm4",
  authDomain: "fb-hack-7e53c.firebaseapp.com",
  databaseURL: "https://fb-hack-7e53c.firebaseio.com",
  projectId: "fb-hack-7e53c",
  storageBucket: "fb-hack-7e53c.appspot.com",
  messagingSenderId: "127989580103"
};
firebase.initializeApp(config);

// App name
var appName = window.id;

// Get a reference to the database service
var database = firebase.database().ref(appName);

var SceneVue = new Vue({
    el: '#scene',
    data: {
        items: {items: [], environment: ''},
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
        var position = {
          x: (window.position["x"] - window.camera.getWorldDirection()['x'] * 4),
          y: (window.position["y"] - window.camera.getWorldDirection()['y'] * 4),
          z: (window.position["z"] - window.camera.getWorldDirection()['z'] * 4)
        }

        this.items.push({
            "position": position,
            "color": "#EF2D5E",
            "scale": {x: 1, y: 1, z: 1},
            "radius": "1.25",
            "geometry": type
        });
      },
      removeCurrentObject: function() {
        if(this.currentItem !== "" && this.currentItem !== null){
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
      getModel: function(item) {
        return '/models/' + item.model + '/scene.gltf';
      },
      setEnvironment: function(environment) {
       this.items.environment = 'preset:' + environment
      }
    },
    created: function() {
      // Load data
      var self = this;

      AFRAME.registerComponent('listener', {
        tick: function () {
          window.position = this.el.getAttribute('position')
        }
      });

      database.on("value", function(snapshot) {
         var data = snapshot.val();
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
        $('a-scene').off('click');
        $('a-scene').click(function() {
          if (!!elIntersected.id) {
            self.currentItem = parseInt(elIntersected.id);
          }
        });
      });

      // Not clicking at anything
      $('a-scene').on('raycaster-intersection-cleared', function(){
        $('a-scene').off('click');
        $('a-scene').click(function(e) {
          self.currentItem = '';
          self.category = '';
          self.attribute = '';
          $('.sidebar button').removeClass('selected');
        });
      });

      // Highlight button on click
      $('.sidebar button').click(function() {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
      });

      window.camera = document.querySelector('[camera]').object3D
      // console.log(window.camera)
    }
});

}
