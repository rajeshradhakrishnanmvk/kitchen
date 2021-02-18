resource "civo_dns_domain_name" "domain" {
  name = "happilypresents.co.in"
}

resource "civo_dns_domain_record" "www" {
    domain_id = civo_dns_domain_name.domain.id
    type = "A"
    name = "www"
    value = civo_instance.kitchen-infra-v3.public_ip
    ttl = 600
    depends_on = [civo_dns_domain_name.domain, civo_instance.kitchen-infra-v3]
}