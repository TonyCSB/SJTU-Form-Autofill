chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch (msg.text) {
        case "loadExit":
            exit_autofill();
            break;
    }
});

function exit_autofill() {
    // 手机号 Mobile
    let mobile = "13817576706";

    document.querySelector("input[name='fieldMobile_0']").value = mobile;


    // 校区 Campus
    let campusValue = "02";
    let campusName = "闵行";

    var campus = document.createElement("option");
    campus.value = campusValue;
    campus.innerText = campusName;
    campus.selected = true;
    document.querySelector("select[name='fieldCampus']").appendChild(campus);


    // 校门 Campus Gate
    let gateCode = "0204";
    let gateName = "剑川路601号门（北三门）";

    var gate = document.createElement("option");
    gate.value = gateCode;
    gate.innerText = gateName;
    gate.selected = true;
    document.querySelector("select[name='fieldGate']").appendChild(gate);


    // 出校事由 Reason for Exiting Campus
    let reason = "走读出校";
    document.querySelector("input[name='fieldReason']").value = reason;


    // 出校日期 Exiting Date
    let date = new Date().toISOString().slice(0, 10);
    document.querySelector("input[name='fieldComeDate']").value = date;


    // 出校目的地 Destination
    let destination = "南洋北苑";
    document.querySelector("input[name='fieldSite']").value = destination;


    // 出校门时间段 Esitimated time of exiting campus
    let from = "18:00";
    let to = "20:00";
    document.querySelector("input[name='fieldOutTime']").value = from;
    document.querySelector("input[name='fieldOutTime2']").value = to;

    
    // 是否当天往返 Whether re-enter on the same day
    let reEnter = true;
    let reEnterFrom = "22:00";
    let reEnterTo = "23:00";
    if (reEnter) {
        document.querySelector("#fieldThatDay-1").checked = true;
        document.querySelector("input[name='fieldComeTime']").value = reEnterFrom;
        document.querySelector("input[name='fieldBackTime']").value = reEnterTo;
    } else {
        document.querySelector("#fieldThatDay-0").checked = true
    }


    // 体温是否正常 Body temperature normal
    let temperature = true;
    if (temperature) {
        document.querySelector("#fieldNormalTemperature-1").checked = true;
    } else {
        document.querySelector("#fieldNormalTemperature-0").checked = true;
    }


    // 疫情安全风险 COVID-19 exposure risk
    let risk = false;
    if (risk) {
        document.querySelector("#fieldFromEpidemicArea-1").checked = true;
    } else {
        document.querySelector("#fieldFromEpidemicArea-0").checked = true;
    }
}