data "civo_instances_size" "small" {
    filter {
        key = "name"
        values = ["g2.small"]
    }
}

data "civo_template" "debian" {
   filter {
        key = "code"
        values = ["buster"]
   }
}