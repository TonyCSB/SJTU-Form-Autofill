chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch (msg.text) {
        case "saveEntry":
            entry_save();
            break;
        case "loadEntry":
            entry_autofill();
            break;
        case "saveExit":
            exit_save();
            break;
        case "loadExit":
            exit_autofill();
            break;
    }
});

function entry_save() {
    let mobile = document.querySelector("input[name='fieldMobile_0']").value;
    let type;
    let dorm;
    let room;
    let fullTime;
    let temperature;
    let from;
    let to;
    let addr;
    if (document.querySelector("#fieldEnterType_0-0").checked) {
        type = 1;
        dorm = document.querySelector("input[name='fieldDormitory_0']").value;
        room = document.querySelector("input[name='fieldRoom_0']").value;
        from = document.querySelector("input[name='fieldComeTime']").value;
        to = document.querySelector("input[name='fieldBackTime']").value;
    } else if (document.querySelector("#fieldEnterType_0-1").checked) {
        type = 2;
        dorm = document.querySelector("input[name='fieldDormitory_0']").value;
        room = document.querySelector("input[name='fieldRoom_0']").value;
        from = document.querySelector("input[name='fieldComeTime']").value;
        to = document.querySelector("input[name='fieldBackTime']").value;
    } else if (document.querySelector("#fieldEnterType_0-2").checked) {
        type = 3;
        if (document.querySelector("#fieldType_0-0").checked) {
            fullTime = false;
        } else if (document.querySelector("#fieldType_0-1").checked) {
            fullTime = true;
        }
        if (document.querySelector("#fieldTemperature-1").checked) {
            temperature = true;
        } else if (document.querySelector("#fieldTemperature-0").checked) {
            temperature = false;
        }
        addr = document.querySelector("input[name='fieldDormitory2_0']").value;
    }
    let campus = document.querySelector("select[name='fieldCampus']");
    let campusValue = campus.value;
    let campusName = campus.options[campus.selectedIndex].text;
    let gate = document.querySelector("select[name='fieldGate']");
    let gateValue = gate.value;
    let gateName = gate.options[gate.selectedIndex].text;
    let reason = document.querySelector("input[name='fieldReason']").value;
    let province= document.querySelector("select[name='fieldProvince']");
    let provinceValue = province.value;
    let provinceName = province.options[province.selectedIndex].text;
    let city= document.querySelector("select[name='fieldCity']");
    let cityValue = city.value;
    let cityName = city.options[city.selectedIndex].text;
    let district= document.querySelector("select[name='fieldCountry']");
    let districtValue = district.value;
    let districtName = district.options[district.selectedIndex].text;
    let risk;
    if (document.querySelector("#fieldRisk-0").checked) {
        risk = true;
    } else if (document.querySelector("#fieldRisk-1").checked) {
        risk = false;
    }
    let healthStatus = document.querySelector("select[name='fieldHealth']").selectedIndex;
    let value = {
        "mobile": mobile,
        "type": type,
        "dorm": dorm,
        "room": room,
        "fullTime": fullTime,
        "temperature": temperature,
        "addr": addr,
        "campusValue": campusValue,
        "campusName": campusName,
        "gateValue": gateValue,
        "gateName": gateName,
        "reason": reason,
        "from": from,
        "to": to,
        "provinceValue": provinceValue,
        "provinceName": provinceName,
        "cityValue": cityValue,
        "cityName": cityName,
        "districtValue": districtValue,
        "districtName": districtName,
        "risk": risk,
        "healthStatus": healthStatus
    };
    chrome.storage.sync.set({"entryForm": value}, function() {console.log(value)});
}

function exit_save() {
    let mobile = document.querySelector("input[name='fieldMobile_0']").value;
    let campus = document.querySelector("select[name='fieldCampus']");
    let campusValue = campus.value;
    let campusName = campus.options[campus.selectedIndex].text;
    let gate = document.querySelector("select[name='fieldGate']");
    let gateValue = gate.value;
    let gateName = gate.options[gate.selectedIndex].text;
    let reason = document.querySelector("input[name='fieldReason']").value;
    let destination = document.querySelector("input[name='fieldSite']").value;
    let from = document.querySelector("input[name='fieldOutTime']").value;
    let to = document.querySelector("input[name='fieldOutTime2']").value;
    let reEnter;
    let reEnterFrom;
    let reEnterTo;
    if (document.querySelector("#fieldThatDay-1").checked) {
        reEnter = true;
        reEnterFrom = document.querySelector("input[name='fieldComeTime']").value;
        reEnterTo = document.querySelector("input[name='fieldBackTime']").value;
    } else if (document.querySelector("#fieldThatDay-1").checked) {
        reEnter = false;
        reEnterFrom = null;
        reEnterTo = null;
    }
    let temperature;
    if (document.querySelector("#fieldNormalTemperature-1").checked) {
        temperature = true;
    } else if (document.querySelector("#fieldNormalTemperature-0").checked) {
        temperature = false;
    }
    let risk;
    if (document.querySelector("#fieldFromEpidemicArea-1").checked) {
        risk = true;
    } else if (document.querySelector("#fieldFromEpidemicArea-0").checked) {
        risk = false;
    }
    let teacher = document.querySelector("select[name='fieldTeacher']");
    let teacherValue = teacher.value;
    let teacherName = teacher.options[teacher.selectedIndex].text;
    let value = {
        "mobile": mobile,
        "campusValue": campusValue,
        "campusName": campusName,
        "gateValue": gateValue,
        "gateName": gateName,
        "reason": reason,
        "destination": destination,
        "from": from,
        "to": to,
        "reEnter": reEnter,
        "reEnterFrom": reEnterFrom,
        "reEnterTo": reEnterTo,
        "temperature": temperature,
        "risk": risk,
        "teacherName": teacherName,
        "teacherValue": teacherValue
    };
    chrome.storage.sync.set({"exitForm": value}, function() {console.log(value)});
}

function entry_autofill() {
    chrome.storage.sync.get("entryForm", function(result) {
        let form = result["entryForm"];
        let mobile = form['mobile'];
        let type = form['type'];
        let dorm = form['dorm'];
        let room = form['room'];
        let fullTime = form['fullTime'];
        let temperature = form['temperature'];
        let campusValue = form['campusValue'];
        let campusName = form['campusName'];
        let gateValue = form['gateValue'];
        let gateName = form['gateName'];
        let reason = form['reason'];
        let from = form['from'];
        let to = form['to'];
        let provinceValue = form['provinceValue'];
        let provinceName = form['provinceName'];
        let cityValue = form['cityValue'];
        let cityName = form['cityName'];
        let districtValue = form['districtValue'];
        let districtName = form['districtName'];
        let risk = form['risk'];
        let healthStatus = form['healthStatus'];
        let addr = form['addr'];

        
        // 手机号 Mobile
        if (mobile != "") {
            document.querySelector("input[name='fieldMobile_0']").value = form['mobile'];
        }


        // 进校类型 Type of entry
        let date = new Date().toISOString().slice(0, 10);
        switch (type) {
            case 1:
                document.querySelector("#fieldEnterType_0-0").click();
                if (dorm != "") {
                    document.querySelector("input[name='fieldDormitory_0']").value = dorm;
                }
                if (room != "") {
                    document.querySelector("input[name='fieldRoom_0']").value = room;
                }
                
    
                // 进校日期 Entering Date
                document.querySelector("input[name='fieldComeDate']").value = date;
                
        
                // 进校门时间段 Esitimated time of Entering campus
                if (from != "") {
                    document.querySelector("input[name='fieldOutTime']").value = from;
                }
                if (to != "") {
                    document.querySelector("input[name='fieldOutTime2']").value = to;
                }     
                break;
            case 2:
                document.querySelector("#fieldEnterType_0-1").click();
                if (dorm != "") {
                    document.querySelector("input[name='fieldDormitory_0']").value = dorm;
                }
                if (room != "") {
                    document.querySelector("input[name='fieldRoom_0']").value = room;
                }
            
    
                // 进校日期 Entering Date
                document.querySelector("input[name='fieldComeDate']").value = date;
                
        
                // 进校门时间段 Esitimated time of Entering campus
                if (from != "") {
                    document.querySelector("input[name='fieldOutTime']").value = from;
                }
                if (to != "") {
                    document.querySelector("input[name='fieldOutTime2']").value = to;
                }  
                break;   
            case 3:
                document.querySelector("#fieldEnterType_0-2").click();
                if (fullTime) {
                    document.querySelector("#fieldType_0-1").checked = true;
                } else if (fullTime == false) {
                    document.querySelector("#fieldType_0-0").checked = true;
                }
                if (temperature) {
                    document.querySelector("#fieldTemperature-1").checked = true;
                } else if (temperature == false) {
                    document.querySelector("#fieldTemperature-0").checked = true;
                }
                if (addr != "") {
                    document.querySelector("input[name='fieldDormitory2_0']").value = addr;
                }
                break;
        } 


        // 校区 Campus
        if (campusName != "" && campusValue != "") {
            var campus = document.createElement("option");
            campus.value = campusValue;
            campus.innerText = campusName;
            campus.selected = true;
            document.querySelector("select[name='fieldCampus']").appendChild(campus);    
        }


        // 校门 Campus Gate
        if (gateValue != "" && gateName != "") {
            var gate = document.createElement("option");
            gate.value = gateValue;
            gate.innerText = gateName;
            gate.selected = true;
            document.querySelector("select[name='fieldGate']").appendChild(gate);
        }


        // 进校事由 Reason for Entering Campus
        if (reason != "") {
            document.querySelector("input[name='fieldReason']").value = reason;
        }   


        // 何处返沪 Where
        if (provinceName != "" && provinceValue != "") {
            var province = document.createElement("option");
            province.value = provinceValue;
            province.innerText = provinceName;
            province.selected = true;
            document.querySelector("select[name='fieldProvince']").appendChild(province);
        }
        if (cityName != "" && cityValue != "") {
            var city = document.createElement("option");
            city.value = cityValue;
            city.innerText = cityName;
            city.selected = true;
            document.querySelector("select[name='fieldCity']").appendChild(city);
        }
        if (districtName != "" && districtValue != "") {
            var district = document.createElement("option");
            district.value = districtValue;
            district.innerText = districtName;
            district.selected = true;
            document.querySelector("select[name='fieldCountry']").appendChild(district);
        }

        // 疫情安全风险 COVID-19 exposure risk
        if (risk) {
            document.querySelector("#fieldRisk-0").checked = true;
        } else if (risk == false) {
            document.querySelector("#fieldRisk-1").checked = true;
        }

        document.querySelector("select[name='fieldHealth']").options[healthStatus].selected = true;

        while (!document.querySelector("input[name='fieldAgree1']").checked) {
            document.querySelector("input[name='fieldAgree1']").click();
        }
    });
}

function exit_autofill() {
    chrome.storage.sync.get("exitForm", function(result) {
        let form = result["exitForm"];
        let mobile = form['mobile'];
        let campusValue = form['campusValue'];
        let campusName = form['campusName'];
        let gateValue = form['gateValue'];
        let gateName = form['gateName'];
        let reason = form['reason'];
        let destination = form['destination'];
        let from = form['from'];
        let to = form['to'];
        let reEnter = form['reEnter'];
        let reEnterFrom = form['reEnterFrom'];
        let reEnterTo = form['reEnterTo'];
        let temperature = form['temperature'];
        let risk = form['risk'];
        let teacherName = form['teacherName'];
        let teacherValue = form['teacherValue'];

        
        // 手机号 Mobile
        if (mobile != "") {
            document.querySelector("input[name='fieldMobile_0']").value = form['mobile'];
        }


        // 校区 Campus
        if (campusName != "" && campusValue != "") {
            var campus = document.createElement("option");
            campus.value = campusValue;
            campus.innerText = campusName;
            campus.selected = true;
            document.querySelector("select[name='fieldCampus']").appendChild(campus);    
        }


        // 校门 Campus Gate
        if (gateValue != "" && gateName != "") {
            var gate = document.createElement("option");
            gate.value = gateValue;
            gate.innerText = gateName;
            gate.selected = true;
            document.querySelector("select[name='fieldGate']").appendChild(gate);
        }


        // 出校事由 Reason for Exiting Campus
        if (reason != "") {
            document.querySelector("input[name='fieldReason']").value = reason;
        }
        

        // 出校日期 Exiting Date
        let date = new Date().toISOString().slice(0, 10);
        document.querySelector("input[name='fieldComeDate']").value = date;


        // 出校目的地 Destination
        if (destination != "") {
            document.querySelector("input[name='fieldSite']").value = destination;
        }
        

        // 出校门时间段 Esitimated time of exiting campus
        if (from != "") {
            document.querySelector("input[name='fieldOutTime']").value = from;
        }
        if (to != "") {
            document.querySelector("input[name='fieldOutTime2']").value = to;
        }        

        
        // 是否当天往返 Whether re-enter on the same day
        if (reEnter) {
            document.querySelector("#fieldThatDay-1").checked = true;
            if (reEnterFrom) {
                document.querySelector("input[name='fieldComeTime']").value = reEnterFrom;
            }
            if (reEnterTo) {
                document.querySelector("input[name='fieldBackTime']").value = reEnterTo;
            }
        } else if (reEnter == false) {
            document.querySelector("#fieldThatDay-0").checked = true
        }


        // 体温是否正常 Body temperature normal
        if (temperature) {
            document.querySelector("#fieldNormalTemperature-1").checked = true;
        } else if (temperature == false) {
            document.querySelector("#fieldNormalTemperature-0").checked = true;
        }


        // 疫情安全风险 COVID-19 exposure risk
        if (risk) {
            document.querySelector("#fieldFromEpidemicArea-1").checked = true;
        } else if (risk == false) {
            document.querySelector("#fieldFromEpidemicArea-0").checked = true;
        }


        // 思政老师 Student affair coordinator
        if (teacherName != "" && teacherValue != "") {
            var teacher = document.createElement("option");
            teacher.value = teacherValue;
            teacher.innerText = teacherName;
            teacher.selected = true;
            document.querySelector("select[name='fieldTeacher']").appendChild(teacher);
        }
        
    });
}