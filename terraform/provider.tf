# Set the variable value in *.tfvars file
# or using -var="civo_token=..." CLI option
variable "civo_token" {}

terraform {
  required_providers {
    civo = {
      source = "civo/civo"
      version = "0.9.23"
    }
  }
}



# Configure the Civo Provider
provider "civo" {
  token = var.civo_token
}
