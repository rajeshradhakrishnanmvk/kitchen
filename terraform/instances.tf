resource "civo_instance" "kitchen-infra-v3" {
    hostname = "happilypresents.co.in"
    tags = ["kitchen-book-api", "kitchen-chapter-api"]
    notes = "this is a note for the server"
    size = element(data.civo_instances_size.small.sizes, 0).name
    template = element(data.civo_template.debian.templates, 0).id
}