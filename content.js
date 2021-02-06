chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch (msg.text) {
        case "saveEntry":
        case "saveExit":
            save(msg.text);
            break;
        case "loadEntry":
        case "loadExit":
            autofill(msg.text);
            break;
    }
});

function save(type) {
    form = {};
    [...document.querySelectorAll("input[type=text]")].map(t => {
        form[t.name] = t.value;
    });
    [...document.querySelectorAll("input[type=radio]:checked")].map(r => {
        form[r.name] = r.value;
    });
    [...document.querySelectorAll("select")].map(s => {
        option = {
            "value": s.value,
            "text": s.options[s.selectedIndex].text
        }
        form[s.name] = option;
    });
    f = type == "saveEntry" ? "entryForm" : "exitForm";

    saveForm = {};
    saveForm[f] = form;
    chrome.storage.sync.set(saveForm, _ => console.log(form));
}

function autofill(type) {
    f = type == "loadEntry" ? "entryForm" : "exitForm";
    chrome.storage.sync.get(f, result => {
        let form = result[f];
        console.log(form);
        [...document.querySelectorAll("input[type=text]")].map(t => {
            if (t.name == "fieldComeDate") {
                t.value = new Date().toISOString().slice(0, 10);
            } else if (form[t.name] != undefined && form[t.name] != "") {
                t.value = form[t.name];
            }
        });
        [...document.querySelectorAll("input[type=radio]")].map(r => {
            if (form[r.name] != undefined) {
                document.querySelector(`input[type=radio][name='${r.name}'][value='${form[r.name]}']`).click();
            }
        });
        [...document.querySelectorAll("select")].map(s => {
            if (form[s.name] != undefined && form[s.name]["value"] != "") {
                option = form[s.name];
                op = document.querySelector(`select[name='${s.name}']`).querySelector(`option[value='${option["value"]}']`);
                if (op == null) {
                    o = document.createElement("option");
                    o.value = option["value"];
                    o.innerText = option["text"];
                    o.selected = true;
                    s.appendChild(o);
                } else {
                    op.selected = true;
                }
            }
        });
    });

    [...document.querySelectorAll("input[type=checkbox]")].map(c => {
        while (!c.checked) {
            c.click();
        }
    });
}