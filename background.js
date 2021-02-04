// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.sendMessage(tab.id, {text: 'report_back'});
// });

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({})
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });