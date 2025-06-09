require('dotenv').config();

const AWS_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.AWS_BUCKET_NAME,
  linkExpiry: parseInt(process.env.AWS_S3_SIGNED_URL_EXPIRY || '3600'),
  cloudFrontDomain: process.env.CLOUDFRONT_PUBLIC_URL,
};

module.exports = AWS_CONFIG;
