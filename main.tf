provider "azurerm" {
  features {}
}

module "resource_group" {
  source = "./modules/resource_group"
  name   = var.project_name
  location = var.location
}

module "aks" {
  source            = "./modules/aks"
  cluster_name      = "${var.project_name}-aks"
  resource_group    = module.resource_group.name
  location          = var.location
  node_count        = var.aks_node_count
  node_size         = var.aks_node_size
  dns_prefix        = var.project_name
}

module "acr" {
  source         = "./modules/acr"
  resource_group = module.resource_group.name
  location       = var.location
  acr_name       = "${var.project_name}acr"
}

module "keyvault" {
  source         = "./modules/keyvault"
  resource_group = module.resource_group.name
  location       = var.location
  keyvault_name  = "${var.project_name}-kv"
}

module "dns" {
  source           = "./modules/dns"
  resource_group   = module.resource_group.name
  dns_zone_name    = "${var.project_name}.com"
}
