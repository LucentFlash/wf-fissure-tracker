function init(){
    getFissures();
    loopIt();
}

async function loopIt() {
    setInterval(getFissures, 60000);
}

function timeRemaining(time) {
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var remaining = ((hours > 0) ? `${hours}h ` : '');
    remaining += ((minutes > 0) ? `${minutes}m` : (hours > 0) ? '' : '0m');
    return remaining;
}

function checkNormal() {
    var checkBox = document.getElementById("toggleNormal");
    var list = document.getElementById("myList");
    if (checkBox.checked == true) {
        for (i = 0; i < list.children.length; i++) {
            if (!list.children[i].innerText.includes("Steel Path") && !list.children[i].innerText.includes("Void Storm")) {
                list.children[i].style.display = 'block';
            }
        }
    } else {
        for (i = 0; i < list.children.length; i++) {
            if (!list.children[i].innerText.includes("Steel Path") && !list.children[i].innerText.includes("Void Storm")) {
                list.children[i].style.display = 'none';
            }
        }
    }
}

function checkSteelPath() {
    var checkBox = document.getElementById("toggleSteelPath");
    var list = document.getElementById("myList");
    if (checkBox.checked == true) {
        for (i = 0; i < list.children.length; i++) {
            if (list.children[i].innerText.includes("Steel Path")) {
                list.children[i].style.display = 'block';
            }
        }
    } else {
        for (i = 0; i < list.children.length; i++) {
            if (list.children[i].innerText.includes("Steel Path")) {
                list.children[i].style.display = 'none';
            }
        }
    }
}

function checkVoidStorm() {
    var checkBox = document.getElementById("toggleVoidStorm");
    var list = document.getElementById("myList");
    if (checkBox.checked == true) {
        for (i = 0; i < list.children.length; i++) {
            if (list.children[i].innerText.includes("Void Storm")) {
                list.children[i].style.display = 'block';
            }
        }
    } else {
        for (i = 0; i < list.children.length; i++) {
            if (list.children[i].innerText.includes("Void Storm")) {
                list.children[i].style.display = 'none';
            }
        }
    }
}

async function getFissures() {
    const response = await fetch('https://api.warframestat.us/pc/fissures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json();
    const tierSort = ['Lith', 'Meso', 'Neo', 'Axi', 'Requiem'];
    myJson.sort(function(a, b) {
        return tierSort.indexOf(a.tier) - tierSort.indexOf(b.tier);
    });
    myJson.sort(function(a, b) {
        return a.isHard - b.isHard;
    });
    myJson.sort(function(a, b) {
        return a.isStorm - b.isStorm;
    });
    var list = document.getElementById('myList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (i = 0; i < myJson.length; ++i) {
        let div = document.createElement('div');
        var steelPath = myJson[i].isHard ? 'Steel Path - ' : '';
        var voidStorm = myJson[i].isStorm ? 'Void Storm - ' : '';
        var countDownDate = new Date(myJson[i].expiry).getTime();
        if ((countDownDate - Date.now()) > 0) {
            div.innerText = `${myJson[i].node} - ${steelPath}${voidStorm}${myJson[i].tier} ${myJson[i].missionType} - `;
            div.innerText += `${timeRemaining(countDownDate - Date.now())}`;
            list.appendChild(div);
        }
    }
    checkSteelPath();
    checkVoidStorm();
}