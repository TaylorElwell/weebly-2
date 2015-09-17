/*TODO: The MapJam editor needs to emit an event(s) via postMessage api so we know what values to save for map_id and hide_card */
PlatformElement.extend({

	initialize:function(){
		console.log("init MapJam editor element!", this);
		//TODO: listen for postMessage events from map jam iframe?
		//for now, listen for url changes via the onload event?
		//this.listenTo(this.settings, "change:height", $.proxy(this._onHeightChange, this));
		//this.listenTo(this.settings, "change:map_id", $.proxy(this._onMapUrlChange, this));
		//JR: it seems like our element gets recreated anytime anything changes
		//the above event binding is probably pointless.
		//trigger manually?
    this._onMapUrlChange();
		this._onHeightChange();
	},

	_onHeightChange:function(event){
		console.log("_onHeightChange:", event);
		var h = this.settings.get("height");
		var val = 600;//medium is default
		if(h == "tiny"){
			val = 120;
		} else if(h=="small"){
			val = 240;
		} else if(h == "medium"){
			val = 600;
		} else if(h=="large"){
			val = 800;
		}
		console.log("setting height:", h, val);
		var self = this;
		if(this.settings.get("height_px" != val)){
			this.settings.set("height_px", val);
			this.settings.save().done(function(){
				console.log("done saving height_px");
				//need to call render here??
				//self.render();
			});
		}
	},

	//TEMP: update the map_id property based on the url
	//this should go away when we can reliably get the id from
	//the iframe.
  _onMapUrlChange:function(event){
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
      var oldUrl = this.settings.get("map_url");
      var newUrl = oldUrl.substring(0, oldUrl.lastIndexOf('/')) + mapId;
      console.log('Setting new url: ' + newUrl);
      this.settings.set("map_url", newUrl);
      this.settings.save().done(function(){
        console.log("done saving prev_map_id: " + mapId);
        //do we need to call render here??
        //self.render();
      });
    }
	}
});