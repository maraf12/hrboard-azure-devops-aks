import { loadData } from "./dashboard.js";
import {
   fillDepartmentTable,
   listenForDepartmentDeleteEvent,
   setupDepartmentModalEventListeners,
} from "./department.js";
import {
   fillEmployeeTable,
   listenForEmployeeDeleteEvent,
   loadEmployeeDetailsModal,
   setupEmployeeModalEventListeners,
} from "./employee.js";

// Dynamically loading html files into index.html's content div.
document.addEventListener("DOMContentLoaded", function () {
   var links = document.querySelectorAll(".content-link");

   fetch("dashboard.html")
      .then((response) => response.text())
      .then((data) => {
         document.querySelector(".content").innerHTML = data;
         loadData();
      })
      .catch((error) => console.error("Error loading dashboard: ", error));

   links.forEach((link) => {
      link.addEventListener("click", function (event) {
         event.preventDefault();
         var page = this.getAttribute("data-link");
         loadContent(page);
      });
   });

   // loads the html file into content div
   function loadContent(page) {
      fetch(page)
         .then((response) => response.text())
         .then((data) => {
            document.querySelector(".content").innerHTML = data;
            switch (page) {
               case "dashboard.html":
                  loadData(); // function in chart.js
                  break;
               case "department.html":
                  fillDepartmentTable();
                  setupDepartmentModalEventListeners();
                  listenForDepartmentDeleteEvent();
                  break;
               case "employee.html":
                  fillEmployeeTable(); // function in employee.js
                  setupEmployeeModalEventListeners();
                  loadEmployeeDetailsModal();
                  listenForEmployeeDeleteEvent();
                  break;
            }
         })
         .catch((error) => console.error("Error loading content:", error));
   }
});
