📦 Composants du projet HRBoard – Vue globale
1. 🧠 Idée de l'application
HRBoard est une application web RH permettant de gérer les employés (ajout, visualisation, stockage). Elle est conçue pour être scalable, sécurisée, et déployée automatiquement sur le cloud.

2. 🧱 Composants applicatifs
Nom	Techno	Rôle
Frontend	React	Interface utilisateur
Backend	Node.js + Express	API REST pour gérer les employés
Base de données	MongoDB (StatefulSet)	Stocke les données d’employés
Variables ENV	.env, secrets K8s	Configuration sensible (URI Mongo, JWT, etc.)

3. 🐳 Conteneurisation
Composant	Technologie	Description
Backend Container	Docker	Image Node.js API
Frontend Container	Docker	Image React
MongoDB Container	Docker	Utilisé dans StatefulSet

4. ☁️ Infrastructure (via Terraform)
Module Terraform	Ressource Azure	But
resource_group	Resource Group	Conteneur logique pour tous les services
aks	Azure Kubernetes Service	Orchestration des pods
acr	Azure Container Registry	Stockage des images Docker
keyvault	Azure Key Vault	Stockage sécurisé des secrets (URI, JWT, etc.)
dns	Azure DNS	Nom de domaine public pour l’ingress

5. ☸️ Kubernetes (déployé sur AKS)
Objet K8s	Rôle
Namespace hrboard	Isolation logique de l'app
StatefulSet MongoDB	Base de données persistante avec PVC
Deployment Backend	API exposée en ClusterIP
Deployment Frontend	UI exposée en LoadBalancer (via Ingress)
Services (ClusterIP)	Communication interne entre frontend, backend et MongoDB
Ingress NGINX (public)	Expose le frontend sur un nom DNS

6. 🔄 CI/CD – Azure DevOps Pipelines (prévu)
Étapes clés	But
Build Docker images	Pour backend et frontend
Push to ACR	Pousser les images dans le registre
Déploiement via kubectl	Appliquer les manifests K8s automatiquement
Accès aux secrets Key Vault	Intégration avec Azure Key Vault

7. 🔒 Sécurité & Accès
Composant	Fonction
Azure Key Vault	Centralisation des secrets (pas de hardcode)
Ingress Public	Accès HTTP public avec nom de domaine Azure DNS
Pas de Bastion	Accès direct via IP publique Ingress (avec NSG contrôlé)

8. 📈 Monitoring de base
Composant	Rôle
Logs des pods (kubectl)	Pour consulter les erreurs du backend, Mongo, etc.
Application Insights	(Prévu ou optionnel) Pour traçabilité des requêtes
Azure Monitor	(Optionnel) Pour logs d’activité du cluster AKS

🔚 Résumé des flux
css
Copy
Edit
[ Utilisateur ] 
     ↓
[ Azure DNS ] 
     ↓
[ Ingress NGINX Public (AKS) ]
     ↓
[ Frontend React ]
     ↓
[ Backend Node.js API ]
     ↓
[ MongoDB StatefulSet (PVC Azure Disk) ]
Souhaites-tu que je transforme ceci en slide PowerPoint, ou en schéma d’architecture visuel à insérer dans ton rapport ou ton repo GitHub ?









Tools



ChatGPT can make m
