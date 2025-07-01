# HRBoard – Full Project Components Summary

## 📘 Application Idea
HRBoard is a web-based HR management system that allows adding, viewing, and managing employees. It is designed to be scalable, secure, and fully deployable using Infrastructure as Code on Azure.

---

## 🧱 Application Components

| Component        | Technology           | Role                                  |
|------------------|----------------------|---------------------------------------|
| Frontend         | React                | Web interface for users               |
| Backend          | Node.js + Express    | REST API for employee data            |
| Database         | MongoDB              | Stores employee data                  |
| Environment Vars | Key Vault / Secrets  | Holds sensitive data like URI, JWT    |

---

## 🐳 Containerization

| Component       | Technology  | Description                          |
|------------------|-------------|--------------------------------------|
| Backend          | Docker      | Node.js app containerized            |
| Frontend         | Docker      | React app containerized              |
| MongoDB          | Docker      | Used inside a Kubernetes StatefulSet |

---

## ☁️ Infrastructure (Terraform)

| Module           | Azure Service               | Purpose                                 |
|------------------|-----------------------------|------------------------------------------|
| resource_group   | Resource Group              | Logical container for resources          |
| aks              | Azure Kubernetes Service    | Runs containers at scale                 |
| acr              | Azure Container Registry    | Stores Docker images                     |
| keyvault         | Azure Key Vault             | Stores secrets securely                  |
| dns              | Azure DNS                   | Public domain resolution                 |

---

## ☸️ Kubernetes (AKS)

| Object             | Role                                               |
|--------------------|----------------------------------------------------|
| Namespace          | Logical grouping (`hrboard`)                       |
| MongoDB StatefulSet| Persistent DB with Azure Disk                      |
| Backend Deployment | REST API, accessed internally                      |
| Frontend Deployment| UI served via Ingress                              |
| Services           | ClusterIP communication between components         |
| Ingress (NGINX)    | Exposes frontend to public internet via DNS        |

---

## 🔄 CI/CD – Azure DevOps (Planned)

| Step                   | Description                                      |
|------------------------|--------------------------------------------------|
| Build Docker images    | For backend and frontend                         |
| Push to ACR            | Push built images to Azure Container Registry    |
| Deploy via kubectl     | Apply manifests to AKS                           |
| Key Vault integration  | Retrieve secrets securely                        |

---

## 🔒 Security & Access

| Component        | Role                                         |
|------------------|----------------------------------------------|
| Key Vault        | Holds secrets like MONGO_URI, JWT            |
| Ingress (Public) | Allows access via domain without a bastion   |
---

## 📈 Basic Monitoring

| Component          | Role                                         |
|--------------------|----------------------------------------------|
| Pod logs           | Debugging issues in API or DB                |
| Application Insights (Optional) | Trace requests and logs         |
| Azure Monitor (Optional)        | Cluster activity and alerts     |

---

