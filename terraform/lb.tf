resource "civo_loadbalancer" "www-lb" {
    hostname = "www.happilypresents.co.in"
    protocol = "http"
    port = 80
    max_request_size = 30
    policy = "round_robin"
    max_conns = 10
    fail_timeout = 40

    backend {
        instance_id = civo_instance.kitchen-infra-v3.id
        protocol =  "http"
        port = 80
    }


}