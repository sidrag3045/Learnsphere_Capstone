require('dotenv').config();

const AWS_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.AWS_BUCKET_NAME,
  linkExpiry: process.env.AWS_S3_SIGNED_URL_EXPIRY
};

module.exports = AWS_CONFIG;
