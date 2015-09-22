console.log("iframe_Example!");
window.addEventListener("message", function(event){
	console.log("iframe got an event:", event);
	var message = event.data;
	window.frameOrigin = event.origin;//why do we store this?

	if(message.action = "settings:load"){
		console.log("got settings:load action. settings:", message.data);
		//store settings...
		//JR: after sending an update to our element
		//this event triggers again, but the data is null. avoid storing settings.
		if(message.data != null){
			window.weeblySettings = message.data;
		}
	}
});

$(document).ready(function(){
	//post an update back to the weebly element
	$("#click-me").click(function(){
		console.log("clicked... sending settings!");
		var map_id = "zvmffbh"
		window.weeblySettings.settings.map_id = map_id;
		window.weeblySettings.settings.map_url = "http://www.mapjam.com/"+map_id;
		var event = {
			action:"settings:update",
			data:window.weeblySettings.settings//JR: I'm not 100% sure we need to pass ALL settings back, or just what we want to change.
		};
		parent.postMessage(event, window.frameOrigin);
	});
});
