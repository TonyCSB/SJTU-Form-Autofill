let saveEntry = document.querySelector("#saveEntry");
let loadEntry = document.querySelector("#loadEntry");
let saveExit = document.querySelector("#saveExit");
let loadExit = document.querySelector("#loadExit");

loadExit.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'loadExit'});
    });
};