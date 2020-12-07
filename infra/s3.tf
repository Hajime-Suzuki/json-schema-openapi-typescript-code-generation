resource "aws_s3_bucket" "main" {
  bucket = var.DOMAIN
  acl    = "public-read"

  policy = <<-EOF
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "PublicReadGetObject",
              "Effect": "Allow",
              "Principal": "*",
              "Action": [
                  "s3:GetObject"
              ],
              "Resource": [
                  "arn:aws:s3:::${var.DOMAIN}/*"
              ]
          }
      ]
  }
  EOF

  website {
    index_document = "index.html"
  }

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_object" "html" {
  bucket       = aws_s3_bucket.main.bucket
  key          = "index.html"
  source       = "./index.html"
  content_type = "text/html"
}
