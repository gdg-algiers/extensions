// listen when the user clicks on the extension icon

// global varialbes
var hiddenTabs = [];
var tmpTabId;
var state = 'displayed';


function removeTabs(ids){
    chrome.tabs.remove(ids);
}

function createTabs(tabs){
    tabs.map(function(info){
        createTab(info);
    });
}

function createTab(obj){
    chrome.tabs.create(obj);
}

function enableBadge(text){
    chrome.browserAction.setBadgeText({text:text});
    //color must be rgba value or hexa
    chrome.browserAction.setBadgeBackgroundColor({color:[193,46,46,1]})
}
function disableBadge(){
    chrome.browserAction.setBadgeText({text:''});
}


chrome.browserAction.onClicked.addListener(function(tab){
    console.log('extension icon clicked');

    // get the id of the current window
    var currentWindowId = tab.windowId;

    if(state === 'displayed'){
        // get tabs of the current window.
        chrome.tabs.getAllInWindow(currentWindowId,function(tabs){

            // create an empty tab so we don't lose the window
            chrome.tabs.create({url:'chrome://newtab'},function(tmpTab){
                tmpTabId = tmpTab.id;
            });

            
            // reset hiddenTabs to empty array to avoid adding to the previous list.
            hiddenTabs = []; 
            // store all opened tabs info
            var ids = tabs.map(function(t){
                hiddenTabs.push({index:t.index,url:t.url});
                return Number(t.id);
            });

            // so we need to remove the tabs for the moment.
            removeTabs(ids);
            enableBadge(hiddenTabs.length.toString());
            state = 'hidden';

        });
    }else{
        // we want to display what was hidden.

        // display the hidden tabs.
        hiddenTabs.map(function(tab){
            createTab(tab);
        });

        // remove the temporary tab.
        removeTabs(tmpTabId);
        disableBadge();
        state = 'displayed';
    }    
});