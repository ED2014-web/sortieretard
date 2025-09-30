let totalMinutes = 0;
let records = [];

window.onload = () => {
  if(localStorage.getItem("records")){
    records = JSON.parse(localStorage.getItem("records"));
    totalMinutes = records.reduce((acc, r) => acc + r.minutes, 0);
    updateUI();
  }
};

function addEntry(){
  const planned = document.getElementById("plannedTime").value;
  const actual = document.getElementById("actualTime").value;
  if(!planned || !actual){
    alert("Merci de remplir les deux champs");
    return;
  }

  const plannedDate = new Date(actual.split("T")[0] + "T" + planned);
  const actualDate = new Date(actual);

  const diffMs = actualDate - plannedDate;
  const minutes = Math.max(0, Math.round(diffMs / 60000));

  const entry = {planned, actual, minutes};
  records.push(entry);
  totalMinutes += minutes;

  localStorage.setItem("records", JSON.stringify(records));
  updateUI();
}

function updateUI(){
  document.getElementById("total").innerText = totalMinutes;
  const tbody = document.getElementById("records");
  tbody.innerHTML = "";
  records.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.planned}</td><td>${r.actual.replace("T", " ")}</td><td>${r.minutes}</td>`;
    tbody.appendChild(tr);
  });
}
