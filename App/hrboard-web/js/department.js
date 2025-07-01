import { API_BASE_URL } from "./employee.js";
export function fillDepartmentTable() {
   const departmentSearchBar = document.getElementById("departmentSearch");

   // Dynamic Search bar on Keyup event
   departmentSearchBar.addEventListener("keyup", () => {
      const searchKeyword = departmentSearchBar.value.trim();
      fetchDepartments(searchKeyword);
   });

   // Fetch departments with url
   function fetchDepartments(searchKeyword) {
      const url = new URL(`${API_BASE_URL}/api/department/count`);

      if (searchKeyword) {
         url.searchParams.append("name", searchKeyword);
      }

      fetch(url)
         .then((response) => response.json())
         .then((departments) => {
            displayDepartments(departments);
         })
         .catch((error) =>
            console.error("Error Fetching departments: ", error)
         );
   }

   // Display Fetched data in table
   function displayDepartments(departments) {
      const table = document.getElementById("departmentTbl");
      table.innerHTML = "";
      departments.forEach((department) => {
         const row = `
                     <tr>
                     <td>${deparment.id}</td>
                     <td>${deparment.departmentName}</td>
                     <td>${deparment.employeeCount}</td>
                     <td>
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#departmentModal" data-action="edit" data-id=${deparment.id}><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#departmentDeleteConfirmationModal" data-id=${deparment.id}><i class="bi bi-trash"></i></button>
                     </td>
                     </tr>
                  `;
         table.innerHTML += row;
      });
   }

   fetchDepartments();
}

export function setupDepartmentModalEventListeners() {
   const departmentModal = document.getElementById("departmentModal");
   const modalTitle = departmentModal.querySelector(".modal-title");
   const modalSubmitButton = document.getElementById("modalSubmitButton");
   let departmentEditId = 0;

   departmentModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const action = button.getAttribute("data-action"); // action = "add" or "edit"
      const title = action === "add" ? "Add Department" : "Edit Department";
      modalTitle.textContent = title;
      modalSubmitButton.textContent = action === "add" ? "Add" : "Update";

      if (action === "edit") {
         const departmentId = button.getAttribute("data-id");
         departmentEditId = departmentId;
         // load the select box fields first
         clearDepartmentFormFields();
         loadDepartmentEditFormData(departmentId);
      } else {
         // if not edit, load the select box fields
         clearDepartmentFormFields();
      }
   });

   // Submit the Department form
   modalSubmitButton.addEventListener("click", () => {
      const action = modalTitle.textContent.includes("Add") ? "add" : "update";
      submitDepartmentForm(action);
   });
   // Form submit for add and edit
   function submitDepartmentForm(action) {
      const form = document.getElementById("departmentForm");
      const formData = new FormData(form);
      const departmentData = Object.fromEntries(formData.entries());
      const requestBody = {
         name: departmentData.name,
      };
      const url =
         action === "add"
            ? `${API_BASE_URL}/api/department/add`
            : `${API_BASE_URL}/api/department/update/${departmentEditId}`;
      const method = action === "add" ? "POST" : "PUT";
      fetch(url, {
         method: method,
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(requestBody),
      })
         .then((response) => response.json())
         .then((data) => {
            console.log("Department saved:", data);
            document.querySelector(".btn-close").click(); // Close the modal
            fillDepartmentTable(); // Refresh department table
         })
         .catch((error) => console.error("Error saving department:", error));
   }
}

// Clear emloyee form fields
function clearDepartmentFormFields() {
   document.getElementById("departmentForm").reset();
   document.getElementById("departmentName").value = "";
}

// Populate form data for editing
function loadDepartmentEditFormData(departmentId) {
   const departmentName = document.getElementById("departmentName");
   fetch(`${API_BASE_URL}/api/department`)
      .then((response) => response.json())
      .then((departments) => {
         departments.forEach((department) => {
            if (department.id == departmentId) {
               departmentName.value = department.name;
            }
         });
      });
}

// Employee Delete Event
export function listenForDepartmentDeleteEvent() {
   const departmentDeleteConfirmationModal = document.getElementById(
      "departmentDeleteConfirmationModal"
   );
   let departmentId = 0;

   departmentDeleteConfirmationModal.addEventListener(
      "show.bs.modal",
      (event) => {
         const button = event.relatedTarget;
         departmentId = button.getAttribute("data-id");
      }
   );

   const deleteButton = document.getElementById("departmentDeleteButton");
   deleteButton.onclick = () => {
      fetch(`${API_BASE_URL}/api/department/delete/${departmentId}`, {
         method: "DELETE",
      })
         .then((response) => {
            if (response.status === 204) {
               console.log(
                  `Department with Id: ${departmentId} deleted successfully`
               );
               const modalElement = document.getElementById(
                  "departmentDeleteConfirmationModal"
               );
               const modalInstance =
                  bootstrap.Modal.getInstance(modalElement) ||
                  new bootstrap.Modal(modalElement);
               modalInstance.hide();
               fillDepartmentTable();
            }
         })
         .catch((error) => console.error("Error deleting department: ", error));
   };
}
