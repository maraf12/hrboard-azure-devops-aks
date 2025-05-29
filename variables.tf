variable "project_name" {
  description = "The name of the project"
  type        = string
}

variable "location" {
  description = "Azure location"
  type        = string
  default     = "westeurope"
}

variable "aks_node_count" {
  description = "Number of nodes in AKS"
  type        = number
  default     = 3
}

variable "aks_node_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_D2s_v3"
}
