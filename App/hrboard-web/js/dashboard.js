import { API_BASE_URL } from "./employee.js";
export function loadData() {
   fetch(`${API_BASE_URL}/api/department/count`)
      .then((response) => response.json())
      .then((items) => {
         updateDepartmentAndEmployeeCount(items);
         initializeChart(items);
      });
}

function updateDepartmentAndEmployeeCount(items) {
   const employeeCount = document.getElementById("employeeCount");
   const departmentCount = document.getElementById("departmentCount");

   let count = 0;
   items.forEach((item) => {
      count += item.employeeCount;
   });
   employeeCount.textContent = count;
   departmentCount.textContent = items.length;
}

function initializeChart(items) {
   let labels = [];
   let data = [];

   items.forEach((item) => {
      labels.push(item.departmentName);
      data.push(item.employeeCount);
   });
   const ctx = document.getElementById("departmentChart").getContext("2d");

   new Chart(ctx, {
      type: "bar",
      data: {
         labels: labels,
         datasets: [
            {
               label: "Number of Employees",
               data: data,
               borderWidth: 1,
            },
         ],
      },
      options: {
         maintainAspectRatio: false,
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
}
