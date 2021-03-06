/*TODO: The MapJam editor needs to emit an event(s) via postMessage api so we know what values to save for map_id and hide_card */
PlatformElement.extend({

  initialize: function(){
    //TODO: listen for postMessage events from map jam iframe?
    //for now, listen for url changes via the onload event?
    //this.listenTo(this.settings, "change:height", $.proxy(this._onHeightChange, this));
    //this.listenTo(this.settings, "change:map_id", $.proxy(this._onMapUrlChange, this));
    //JR: it seems like our element gets recreated anytime anything changes
    //the above event binding is probably pointless.
    //trigger manually?
    this._onMapUrlChange();
    this._onHeightChange();
    this._onPopupChange();
  },

  _onPopupChange: function (event) {
    var self = this;
    var ca = this.settings.get("content_action");
    var p = this.settings.get("popup");
    var s = p == 'side' ? 'side_popup' : 'zoom_and_pan';
    if (ca !== s) {
      this.settings.set("content_action", s);
      console.log(this.settings);
      this.settings.save().done(function () {
        self.render();
      });
    }
  },

  _onHeightChange: function(event) {
    console.log("_onHeightChange:", event);
    var h = this.settings.get("height");
    var val = 600;   // medium is default
    if(h == "tiny"){
      val = 120;
    } else if (h == "small"){
      val = 240;
    } else if (h == "medium"){
      val = 600;
    } else if (h == "large"){
      val = 800;
    }
    console.log("setting height:", h, val);
    var self = this;
    if(this.settings.get("height_px") != val){
      this.settings.set("height_px", val);
      this.settings.save().done(function() {
        console.log("done saving height_px", self.settings.get("height_px"));
        self.render();
      });
    }
  },

  //TEMP: update the map_id property based on the url
  //this should go away when we can reliably get the id from
  //the iframe.
  _onMapUrlChange: function(event) {
      var mapId = this.settings.get("map_id");
      var prev = this.settings.get("prev_map_id");
      console.log("_onMapUrlChange: " + mapId + ", prev=" + prev);
      if (mapId === 'mymaps') {
        // revert to either the previous map or else the world map view
        this.settings.set("map_id", prev);
        this.settings.save().done(function(){
          console.log("done saving map_id: " + prev);
          //do we need to call render here??
          //self.render();
        });
      } else {
        // store this valid map in prev_map_id so we can revert to it if needed
        this.settings.set("prev_map_id", mapId);
        var self = this;
        this.settings.save().done(function(){
          console.log("done saving prev_map_id: " + mapId);
          //do we need to call render here??
          //JR: calling render here just to make sure things stick. weebly is a bit, wonky.
          //self.render();
        });
      }
  }
});
