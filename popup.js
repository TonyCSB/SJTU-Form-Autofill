let saveEntry = document.querySelector("#saveEntry");
let loadEntry = document.querySelector("#loadEntry");
let saveExit = document.querySelector("#saveExit");
let loadExit = document.querySelector("#loadExit");
let entryApp = document.querySelector("#entryApp");
let exitApp = document.querySelector("#exitApp");

entryApp.onclick = function(e) {
    chrome.tabs.create({active: true, url: "https://form.sjtu.edu.cn/infoplus/form/xzw_studentvisit_apply/start?locale=zh"});
};

exitApp.onclick = function(e) {
    chrome.tabs.create({active: true, url: "https://form.sjtu.edu.cn/infoplus/form/xzw_student_out_apply/start?locale=zh"});
};

saveEntry.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'saveEntry'});
    });
};

loadEntry.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'loadEntry'});
    });
};

saveExit.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'saveExit'});
    });
};

loadExit.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'loadExit'});
    });
};