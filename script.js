const cpuValue = document.getElementById("cpuValue");
const memoryValue = document.getElementById("memoryValue");

const statusBox = document.getElementById("systemStatus");
const alertsList = document.getElementById("alertsList");
const suggestionsList = document.getElementById("suggestionsList");

const cpuHistory = [];
const memoryHistory = [];
const labels = [];

/* global Chart */

const cpuChart = new Chart(
    document.getElementById("cpuChart"),
    {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "CPU %",
                data: cpuHistory,
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            animation: true
        }
    }
);

const memoryChart = new Chart(
    document.getElementById("memoryChart"),
    {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Memory %",
                data: memoryHistory,
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            animation: true
        }
    }
);

function updateDashboard(cpu, memory)
{
    cpuValue.textContent = cpu + "%";
    memoryValue.textContent = memory + "%";

    const currentTime = new Date().toLocaleTimeString();

    labels.push(currentTime);
    cpuHistory.push(cpu);
    memoryHistory.push(memory);

    if (labels.length > 15)
    {
        labels.shift();
        cpuHistory.shift();
        memoryHistory.shift();
    }

    cpuChart.update();
    memoryChart.update();

    updateStatus(cpu, memory);
}

function updateStatus(cpu, memory)
{
    alertsList.innerHTML = "";
    suggestionsList.innerHTML = "";

    if (cpu > 85 || memory > 85)
    {
        statusBox.textContent = "Critical";
        statusBox.className = "status danger";

        alertsList.innerHTML =
            "<li>⚠ Critical resource usage detected</li>";

        suggestionsList.innerHTML =
            "<li>Close unnecessary applications</li>";
    }
    else if (cpu > 60 || memory > 60)
    {
        statusBox.textContent = "Warning";
        statusBox.className = "status warning";

        alertsList.innerHTML =
            "<li>⚠ Moderate resource pressure</li>";

        suggestionsList.innerHTML =
            "<li>Monitor running applications</li>";
    }
    else
    {
        statusBox.textContent = "Healthy";
        statusBox.className = "status healthy";

        alertsList.innerHTML =
            "<li>✓ No alerts detected</li>";

        suggestionsList.innerHTML =
            "<li>System operating normally</li>";
    }
}

/*
Temporary Demo Data
Backend connection comes later
*/

async function fetchSystemData()
{
    try
    {
        const response =
            await fetch("system_data.json");

        const data =
            await response.json();

        updateDashboard(
            data.cpu,
            data.memory
        );
    }
    catch(error)
    {
        console.log(error);
    }
}

setInterval(fetchSystemData, 2000);

fetchSystemData();