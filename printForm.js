let id = ''
const params = new URLSearchParams(window.location.search)
for (const [key, value] of params) { let id = value; }

//Show animation
document.getElementById('pageTitle').style.display = "none";
document.getElementById('formBody').style.display = "none";
document.getElementById('returnSection').style.display = "none";

//fetch data
const url = `https://pffm.azurewebsites.net/getForms?formId=consultationFee&id=${id}`
const header = {
    "Access-Control-Allow-Origin": "*"
}

fetch(url, {
    method: "GET",
    headers: header
})
    .then(response => response.json())
    .then(data => populatePage(data))
    .catch(console.error)

async function populatePage(data) {
    document.getElementById('clientName').innerHTML = data.clientId;
    document.getElementById('staffName').innerHTML = data.employeeName;
    // transform to data to arrays
    let date = [data.date1, data.date2, data.date3];
    let goal = [data.goal1, data.goal2, data.goal3];
    let service = [data.serviceSummary1, data.serviceSummary2, data.serviceSummary3];
    let time = [`${data.hour1}:${data.minutes1}`, `${data.hour2}:${data.minutes2}`,`${data.hour3}:${data.minutes3}`];

    for (let i = 1; i < 4; i++) {
        document.getElementById(`date${i}`).innerHTML = date[i];
        document.getElementById(`goal${1}`).innerHTML = goal[i];
        document.getElementById(`service${i}`).innerHTML = service[i];
        document.getElementById(`time${i}`).innerHTML = time[i]
        if (!date[i + 1]) {
            i = 4
        }
    }

    showPage()
    let exit = document.getElementById('exit');
    exit.addEventListener(('click'), (e) => {
        sessionStorage.setItem('user', data.clientId)
        location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/client-portal' 
    })
}

//show Data
function showPage() {
    document.getElementById('pageTitle').style.display = "block";
    document.getElementById('formBody').style.display = "block";
    document.getElementById('returnSection').style.display = "block";
    document.getElementById('loadingAnimationSection').style.display = "none"
}


