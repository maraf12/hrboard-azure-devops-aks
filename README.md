📘 Application Idea
HRBoard is a web-based HR management system that allows adding, viewing, and managing employees. It is designed to be scalable, secure, and fully deployable using Infrastructure as Code on Azure.

🧱 Application Components
| Component | Technology         | Role                         |
| --------- | ------------------ | ---------------------------- |
| Frontend  | React              | Web interface for users      |
| Backend   | Spring Boot (Java) | REST API for employee data   |
| Database  | MySQL              | Stores employee data         |
| Secrets   | `.env` / Key Vault | Holds DB credentials, config |


🐳 Containerization
| Component | Technology     | Description                            |
| --------- | -------------- | -------------------------------------- |
| Backend   | Docker         | Spring Boot app containerized          |
| Frontend  | Docker         | React app containerized                |
| MySQL     | Helm (Bitnami) | MySQL deployed in AKS using Helm chart |


☁️ Infrastructure (Terraform)
| Module          | Azure Service            | Purpose                         |
| --------------- | ------------------------ | ------------------------------- |
| resource\_group | Resource Group           | Logical container for resources |
| aks             | Azure Kubernetes Service | Orchestrates containers         |
| acr             | Azure Container Registry | Stores Docker images            |
| keyvault        | Azure Key Vault          | Securely stores sensitive data  |
| dns             | Azure DNS (optional)     | Custom domain resolution        |


☸️ Kubernetes (AKS)
| Object              | Role                                              |
| ------------------- | ------------------------------------------------- |
| Namespace           | Logical separation for `hrboard`                  |
| MySQL (Bitnami)     | Managed MySQL via Helm in StatefulSet             |
| Backend Deployment  | Spring Boot REST API, internal + Ingress exposure |
| Frontend Deployment | React UI, public via Ingress                      |
| Services            | Internal ClusterIP communication                  |
| Ingress Controller  | NGINX exposes frontend (and optionally backend)   |

## 💬 Sample Output

- Visit: `http://<external-ip>` → _🚀 Welcome to DevOps and your first app!_

🔄 CI/CD – Azure DevOps (Planned)
| Step                | Description                           |
| ------------------- | ------------------------------------- |
| Build Docker images | Backend and frontend                  |
| Push to ACR         | Store images in Azure                 |
| Deploy to AKS       | Use `kubectl` or Helm via pipeline    |
| Secrets Integration | Pull secrets from `.env` or Key Vault |


🔒 Security & Access
| Component        | Role                                      |
| ---------------- | ----------------------------------------- |
| Key Vault / .env | Store secrets like DB credentials         |
| Ingress (NGINX)  | Public access to app without Bastion host |


📈 Monitoring (Optional)
| Tool                 | Role                                       |
| -------------------- | ------------------------------------------ |
| Pod logs             | Debug backend/frontend/database containers |
| Azure Monitor        | Observe AKS metrics and alerts [ to add ]  |


## 🛠 Project Structure

- `/terraform`: Infrastructure for ACR, AKS, and Resource Group
- `/app`: Node.js sample app + Dockerfile
- `/k8s`: Kubernetes deployment and service
- `.azure-pipelines.yml`: CI/CD workflow

## 📍 Step-by-Step Roadmap

1. **Provision Infrastructure** (Terraform)
2. **Build and Push Docker Image** (DevOps Agent → ACR)
3. **Deploy to AKS** (via Kubernetes YAML + pipeline)
4. **Automate via DevOps Pipelines**
5. **Use Self-hosted Agent if no free Microsoft parallelism**

## 🔗 Resources

- [Terraform Provider for AzureRM](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure DevOps Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops)
- [AKS Docs](https://learn.microsoft.com/en-us/azure/aks/)
- [Docker Basics](https://docs.docker.com/get-started/)
