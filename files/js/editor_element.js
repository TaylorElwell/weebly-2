/*TODO: The MapJam editor needs to emit an event(s) via postMessage api so we know what values to save for map_id and hide_card */
PlatformElement.extend({

	initialize:function(){
		console.log("init MapJam editor element!", this);
		//TODO: listen for postMessage events from map jam iframe?
		//for now, listen for url changes via the onload event?
		//this.listenTo(this.settings, "change:height", $.proxy(this._onHeightChange, this));
		//this.listenTo(this.settings, "change:mapURL", $.proxy(this._onMapIdChange, this));
		//JR: it seems like our element gets recreated anytime anything changes
		//the above event binding is probably pointless.
		//trigger manually?
		this._onHeightChange();
		this._onMapIdChange();
		this._onMapUrlChange();
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

	//update our map_url property
	_onMapIdChange:function(event){
		var url = "http://www.mapjam.com/"+this.settings.get("map_id");
		//commented to prevent a circular mess. remove comment once we get the id from the iframe
		//this.settings.set("mapUrl", url);
	},

	//TEMP: update the map_id property based on the url
	//this should go away when we can reliably get the id from
	//the iframe.
	_onMapUrlChange:function(event){
		var mapUrl = this.settings.get("map_url");
		console.log("_onMapUrlChange");
		if(mapUrl.length > 21 ){
			//find map_id
			var id = mapUrl.substr(mapUrl.lastIndexOf("/")+1);
			if(id != this.settings.get("map_id")){
				console.log("setting map_id", id);
				this.settings.set("map_id", id);
				var self = this;
				this.settings.save().done(function(){
					console.log("done saving map_id!");
					//do we need to call render here??
					//self.render();
				});
			}
		}
		//hide the placeholder and show the iframe if map_id is legit
		if(this.settings.get("map_id") != ""){
			this.$el.find(".mapjam-placeholder").hide();
			this.$el.find(".mapjam-iframe").show();
		} else {
			this.$el.find(".mapjam-placeholder").show();
			this.$el.find(".mapjam-iframe").hide();
		}
	}
});