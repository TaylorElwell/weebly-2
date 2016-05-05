# weebly
Weebly

Development consists of modifying
- manifest.json,
- files/js/editor_element.js
- files/html/element.tpl

The doco from Weebly is quite hard to understand! https://dev.weebly.com/get-started-with-developing-apps.html

# Communication between Weebly and Mapjam is as follows:

- Weebly editor element accepts input from the user and stores values in a backbone object called ‘settings’
- On change of these settings, the editor_element updates some values and calls render() if needed. This causes the mustache template in files/html/element.tpl to be re-rendered.
- The element.tpl mustache template simply writes our embed code onto the weebly web page wherever it is inserted.
- If a user actually edits a map, we open mapjam.com within an iFrame. This uses the postMessage API to communicate between three-oh and weebly.
- Weebly passes a JWT to mapjam and we decode this to find the current user. We then store the elementID (weebly identifier for the selected page element), weeblyUserId, and the selected Map Key in Mongo.
- Updates to the selected map in three-oh are passed back via postMessage API (see client mapService.notifyWeebly and wh.controller. Server side the map.controller handles the weebly settings for a given JWT.

# To upload a new version.

Edit the files as needed, then login to weebly.com using weebly@mapjam.com
Then enter https://www.weebly.com/developer-admin

# To test changes locally

- enter the clientID and secret for the selected weebly app into your three-oh config.json
- edit the URLs in manifest.json to point to your local environment (I use ngrok to provide https for the auth endpoints)
- zip the contents of the weebly app and ‘Upload a new zip file’ each time you make changes.
- install your test app onto a page in weebly and test it out.
- repeat the above until you have fixed it or your brain has stopped working!
