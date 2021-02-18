resource "civo_firewall" "mongodb" {
  name = "mongodb"
}

resource "civo_firewall_rule" "mongodb-ingress" {
  firewall_id = civo_firewall.mongodb.id
  protocol = "tcp"
  start_port = "27017"
  end_port = "27017"
  cidr = [format("%s/%s",civo_instance.kitchen-infra-v3.public_ip,"32")]
  direction = "ingress"
  label = "server mongodb"
  depends_on = [civo_firewall.mongodb]
}