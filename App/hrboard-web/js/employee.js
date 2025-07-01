export function fillEmployeeTable() {
   const employeeSearchBar = document.getElementById("employeeSearch");

   // Dynamic Search bar on Keyup event
   employeeSearchBar.addEventListener("keyup", () => {
      const searchKeyword = employeeSearchBar.value.trim();
      const searchParams = searchKeyword
         ? {
              name: searchKeyword,
              position: searchKeyword,
              department: searchKeyword,
              email: searchKeyword,
           }
         : {};
      fetchEmployees(searchParams, 0); // Always start from page 0 for new search
   });

   // Fetch employees with url
   function fetchEmployees(searchParams, page = 0, size = 10) {
      const url = new URL(`${API_BASE_URL}/api/employee/search`);
      url.searchParams.append("page", page);
      url.searchParams.append("size", size);

      if (searchParams.name) url.searchParams.append("name", searchParams.name);
      if (searchParams.position)
         url.searchParams.append("position", searchParams.position);
      if (searchParams.department)
         url.searchParams.append("department", searchParams.department);
      if (searchParams.email)
         url.searchParams.append("email", searchParams.email);

      fetch(url)
         .then((response) => response.json())
         .then((data) => {
            displayEmployees(data.items);
            updatePaginationControls(data, searchParams);
         })
         .catch((error) => console.error("Error Fetching employees: ", error));
   }

   // Display Fetched data in table
   function displayEmployees(employees) {
      const table = document.getElementById("employeeTbl");
      table.innerHTML = "";
      employees.forEach((employee) => {
         const row = `
                     <tr>
                     <td>${employee.id}</td>
                     <td>${employee.name}</td>
                     <td>${employee.position}</td>
                     <td>${employee.email}</td>
                     <td>
                        <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#employeeDetailsModal" data-id=${employee.id}><i class="bi bi-eye"></i></button>
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#employeeModal" data-action="edit" data-id=${employee.id}><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#employeeDeleteConfirmationModal" data-id=${employee.id}><i class="bi bi-trash"></i></button>
                     </td>
                     </tr>
                  `;
         table.innerHTML += row;
      });
   }

   function updatePaginationControls(data, searchParams) {
      const pageInfo = document.getElementById("page-info");
      const prevPageButton = document.getElementById("prev-page");
      const nextPageButton = document.getElementById("next-page");

      pageInfo.textContent = `Page ${data.currentPage + 1} of ${
         data.totalPages
      }`;
      prevPageButton.disabled = data.currentPage === 0;
      nextPageButton.disabled = data.currentPage === data.totalPages - 1;

      prevPageButton.onclick = () => {
         if (data.currentPage > 0) {
            fetchEmployees(searchParams, data.currentPage - 1, data.size);
         }
      };

      nextPageButton.onclick = () => {
         if (data.currentPage < data.totalPages - 1) {
            fetchEmployees(searchParams, data.currentPage + 1, data.size);
         }
      };
   }

   fetchEmployees({});
}

// Dynamic modal contents for add and update Employee
export function setupEmployeeModalEventListeners() {
   const employeeModal = document.getElementById("employeeModal");
   const modalTitle = employeeModal.querySelector(".modal-title");
   const modalSubmitButton = document.getElementById("modalSubmitButton");
   let employeeEditId = 0;

   employeeModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const action = button.getAttribute("data-action"); // action = "add" or "edit"
      const title = action === "add" ? "Add Employee" : "Edit Employee";
      modalTitle.textContent = title;
      const positionBtn = document.getElementById("positionBtn");
      const positionSubmitBtn = document.getElementById("positionSubmitBtn");
      modalSubmitButton.textContent = action === "add" ? "Add" : "Update";

      if (action === "edit") {
         const employeeId = button.getAttribute("data-id");
         employeeEditId = employeeId;
         // load the select box fields first
         clearEmployeeFormFields();
         loadDepartmentAndPositionField().then(() => {
            // only after the loading is done load form data with employee id
            loadEmployeeEditFormData(employeeId);
         });
      } else {
         // if not edit, load the select box fields
         clearEmployeeFormFields();
         loadDepartmentAndPositionField();
      }
   });

   positionBtn.addEventListener("click", (event) => {
      document.getElementById("positionForm").reset();
      event.preventDefault();
   });

   // Submit the position form and add new position to employee form's select box
   positionSubmitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      submitPositionForm();
   });
   function submitPositionForm() {
      const form = document.getElementById("positionForm");
      const formData = new FormData(form);
      const positionData = Object.fromEntries(formData.entries());
      console.log(positionData);
      fetch(`${API_BASE_URL}/api/position/add`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(positionData),
      })
         .then((response) => response.json())
         .then((data) => {
            console.log("Position saved:", data);
            clearEmployeeFormFields();
            loadDepartmentAndPositionField();
         })
         .catch((error) => console.error("Error Saving Position:", error));
   }

   // Submit the Employee form
   modalSubmitButton.addEventListener("click", () => {
      const action = modalTitle.textContent.includes("Add") ? "add" : "update";
      submitEmployeeForm(action);
   });
   // Form submit for add and edit
   function submitEmployeeForm(action) {
      const form = document.getElementById("employeeForm");
      const formData = new FormData(form);
      const employeeData = Object.fromEntries(formData.entries());
      const requestBody = {
         name: employeeData.name,
         email: employeeData.email,
         phone: employeeData.phone,
         role: {
            id: employeeData.role,
         },
         department: {
            id: employeeData.department,
         },
      };
      const url =
         action === "add"
            ? `${API_BASE_URL}/api/employee/add`
            : `${API_BASE_URL}/api/employee/update/${employeeEditId}`;
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
            console.log("Employee saved:", data);
            document.querySelector(".btn-close").click(); // Close the modal
            fillEmployeeTable(); // Refresh employee table
         })
         .catch((error) => console.error("Error saving employee:", error));
   }
}

// Populate form data for editing
function loadEmployeeEditFormData(employeeId) {
   const departmentSelect = document.getElementById("departmentSelect");
   const positionSelect = document.getElementById("positionSelect");

   fetch(`${API_BASE_URL}/api/employee/${employeeId}`)
      .then((response) => response.json())
      .then((employee) => {
         document.getElementById("employeeName").value = employee.name;
         document.getElementById("employeeEmail").value = employee.email;
         document.getElementById("employeePhone").value = employee.phone;

         departmentSelect.value = employee.department.id;
         positionSelect.value = employee.position.id;
      });

   function selectOptionById(selectbox, value) {
      for (const option of selectbox.options) {
         if (option.textContent === value) {
            option.selected = true;
            break;
         }
      }
   }
}

// Clear emloyee form fields
function clearEmployeeFormFields() {
   document.getElementById("employeeForm").reset();
   document.getElementById("employeeName").value = "";
   document.getElementById("employeeEmail").value = "";
   document.getElementById("employeePhone").value = "";
   function clearEmployeeFormFields() {
    document.getElementById("employeeForm").reset();
    // Remove the innerHTML clearing lines completely
}
}

// Load the department and position select box
function loadDepartmentAndPositionField() {
   const departmentSelect = document.getElementById("departmentSelect");
   const positionSelect = document.getElementById("positionSelect");

   // Department Fetch
   const departmentFetch = fetch(`${API_BASE_URL}/api/department`)
      .then((response) => response.json())
      .then((departments) => {
         // Placeholder option
         const placeholderOption = document.createElement("option");
         placeholderOption.value = "";
         placeholderOption.textContent = "Choose an option";
         placeholderOption.disabled = true;
         placeholderOption.selected = true;
         departmentSelect.appendChild(placeholderOption);

         departments.forEach((department) => {
            const option = document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;
            departmentSelect.appendChild(option);
         });
      })
      .catch((error) => console.error("Error fetching departments:"));

   // Position fetch
   const positionFetch = fetch(`${API_BASE_URL}/api/position`)
      .then((response) => response.json())
      .then((positions) => {
         // Placeholder option
         const placeholderOption = document.createElement("option");
         placeholderOption.value = "";
         placeholderOption.textContent = "Choose an option";
         placeholderOption.disabled = true;
         placeholderOption.selected = true;
         positionSelect.appendChild(placeholderOption);

         positions.forEach((position) => {
            const option = document.createElement("option");
            option.value = position.id;
            option.textContent = position.title;
            positionSelect.appendChild(option);
         });
      })
      .catch((error) => console.error("Error fetching positions:"));

   return Promise.all([departmentFetch, positionFetch]);
}

// Employee Details Modal
export function loadEmployeeDetailsModal() {
   const employeeDetailsModal = document.getElementById("employeeDetailsModal");

   employeeDetailsModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const employeeId = button.getAttribute("data-id");

      fetch(`${API_BASE_URL}/api/employee/${employeeId}`)
         .then((response) => response.json())
         .then((employee) => {
            document.getElementById("id").value = employee.id;
            document.getElementById("name").value = employee.name;
            document.getElementById("department").value = employee.department.name;
            document.getElementById("position").value = employee.position.title;
            document.getElementById("email").value = employee.email;
            document.getElementById("phone").value = employee.phone;
            document.getElementById("salary").value = employee.salary;
         })
         .catch((error) =>
            console.error("Error Fetching Employee Details: ", error)
         );
   });
}

// Employee Delete Event
export function listenForEmployeeDeleteEvent() {
   const employeeDeleteConfirmationModal = document.getElementById(
      "employeeDeleteConfirmationModal"
   );
   let employeeId = 0;

   employeeDeleteConfirmationModal.addEventListener(
      "show.bs.modal",
      (event) => {
         const button = event.relatedTarget;
         employeeId = button.getAttribute("data-id");
      }
   );

   const deleteButton = document.getElementById("employeeDeleteButton");
   deleteButton.onclick = () => {
      fetch(`${API_BASE_URL}/api/employee/delete/${employeeId}`, {
         
         method: "DELETE",
      })
         .then((response) => {
            if (response.status === 204) {
               console.log(
                  `Employee with Id: ${employeeId} deleted successfully`
               );
               const modalElement = document.getElementById(
                  "employeeDeleteConfirmationModal"
               );
               const modalInstance =
                  bootstrap.Modal.getInstance(modalElement) ||
                  new bootstrap.Modal(modalElement);
               modalInstance.hide();
               fillEmployeeTable();
            }
         })
         .catch((error) => console.error("Error deleting employee: ", error));
   };
}// config.js - SIMPLIFIED
export const API_BASE_URL = 'http://hrboard-api.hrboard.svc.cluster.local:8080';

