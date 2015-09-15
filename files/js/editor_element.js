/*TODO: The MapJam editor needs to emit an event(s) via postMessage api so we know what values to save for map_id and hide_card */

PlatformElement.extend({

	initialize:function(){
		console.log("init MapJam editor element!", this);
		this._onHeightChange();
	},

	//translate string size to pixel
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
				//console.log("done saving height_px");
				//need to call render here??
				//self.render();
			});
		}
	}
});
