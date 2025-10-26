
output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.web.public_ip
}

output "website_url" {
  description = "URL to access the website"
  value       = "http://${aws_instance.web.public_ip}"
}

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}
