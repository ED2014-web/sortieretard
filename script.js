let records = {elouan: [], gabriel: [], timeo: []};
let totals = {elouan: 0, gabriel: 0, timeo: 0};

window.onload = () => {
  if(localStorage.getItem("records3")){
    records = JSON.parse(localStorage.getItem("records3"));
    totals.elouan = records.elouan.reduce((acc, r) => acc + r.minutes, 0);
    totals.gabriel = records.gabriel.reduce((acc, r) => acc + r.minutes, 0);
    totals.timeo = records.timeo.reduce((acc, r) => acc + r.minutes, 0);
    updateUI("elouan");
    updateUI("gabriel");
    updateUI("timeo");
  }
};

function addEntry(person){
  const planned = document.getElementById("plannedTime-" + person).value;
  const actual = document.getElementById("actualTime-" + person).value;
  if(!planned || !actual){
    alert("Merci de remplir les deux champs");
    return;
  }

  const plannedDate = new Date(actual.split("T")[0] + "T" + planned);
  const actualDate = new Date(actual);

  const diffMs = actualDate - plannedDate;
  const minutes = Math.max(0, Math.round(diffMs / 60000));

  const entry = {planned, actual, minutes};
  records[person].push(entry);
  totals[person] += minutes;

  localStorage.setItem("records3", JSON.stringify(records));
  updateUI(person);
}

function updateUI(person){
  document.getElementById("total-" + person).innerText = totals[person];
  const tbody = document.getElementById("records-" + person);
  tbody.innerHTML = "";
  records[person].forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.planned}</td><td>${r.actual.replace("T", " ")}</td><td>${r.minutes}</td>`;
    tbody.appendChild(tr);
  });
}
