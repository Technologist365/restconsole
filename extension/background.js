const ID = 'hbabcmkaecpfejeajmjokielbemplani';
const URL = 'https://chrome.google.com/webstore/detail/' + ID;

// add click event listenr
chrome.browserAction.onClicked.addListener(function(tab) {
    // get all apps
    chrome.management.getAll(function(apps) {
        // loop through apps
        for (var i in apps) {
            var app = apps[i];

            // found it!
            if (app.id == ID) {
                // is it enabled?
                if (app.enabled) {
                    //launch it
                    chrome.management.launchApp(app.id);
                } else {
                    // enable it
                    chrome.management.setEnabled(app.id, true, function() {
                        // then launch it
                        chrome.management.launchApp(app.id);
                    });
                }

                // we are done here
                return;
            }
        }

        // fail! go to store!
        chrome.tabs.create({'url': URL});
    });
});
