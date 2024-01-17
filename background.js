chrome.runtime.onInstalled.addListener(function() {
    chrome.action.onClicked.addListener(function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('./index.html')
        })
    })
})