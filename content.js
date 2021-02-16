chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch (msg.text) {
        case "saveEntry":
        case "saveExit":
            save();
            break;
        case "loadEntry":
        case "loadExit":
            autofill();
            break;
    }
});

function save() {
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

    saveForm = {};
    saveForm[document.title] = form;
    chrome.storage.sync.set(saveForm, _ => console.log(form));
}

function autofill() {
    chrome.storage.sync.get(document.title, result => {
        let form = result[document.title];
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

window.addEventListener("load", function(){
    const regex = /https?:\/\/form.sjtu.edu.cn\/infoplus\/form\/\d+\/render/g;
    if (regex.test(document.URL)) {
        generateIcon("fas fa-file-export", "载入模板", "autofillIcon");
        generateIcon("fas fa-file-import", "保存模板", "saveTemplateIcon");
        document.getElementById("saveTemplateIcon").addEventListener("click", save);
        document.getElementById("autofillIcon").addEventListener("click", autofill);
    }
});

function generateIcon(icon, helpText, id) {
    // li
    li = document.createElement("li");
    li.classList = "tool_button";

    // a
    link = document.createElement("a");
    link.classList = "tool_button";
    link.id = id;
    link.href = "#";

    // i
    i = document.createElement("i");
    i.classList = icon;
    i.setAttribute("style", "font-family:'Font Awesome 5 Free' !important");

    // span
    span = document.createElement("span");
    span.classList = "toolbar_button_tip round-corner z-depth-1";
    span.innerText = helpText;

    // append together
    link.appendChild(i);
    link.appendChild(span);
    li.appendChild(link);

    document.getElementById("form_command_bar").appendChild(li);
}
