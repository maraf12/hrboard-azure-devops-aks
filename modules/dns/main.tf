resource "azurerm_dns_zone" "this" {
  name                = var.dns_zone_name
  resource_group_name = var.resource_group
}

output "dns_zone_name" {
  value = azurerm_dns_zone.this.name
}
