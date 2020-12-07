resource "aws_route53_record" "record" {
  zone_id = var.ZONE_ID
  name    = var.DOMAIN
  type    = "A"

  alias {
    name                   = aws_s3_bucket.main.website_domain
    zone_id                = aws_s3_bucket.main.hosted_zone_id
    evaluate_target_health = false
  }
}

