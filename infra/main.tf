
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3"
    }
  }

  backend "s3" {
    bucket  = "terraform-remote-state-hajime"
    key     = "json-schema-and-docs/terraform.tfstate"
    region  = "eu-central-1"
  }
}

provider "aws" {
  region  = var.REGION
}

