const { S3Client } = require('@aws-sdk/client-s3');
const AWS_CONFIG = require('../../config/aws');

const s3 = new S3Client({
  region: AWS_CONFIG.region,
  credentials: {
    accessKeyId: AWS_CONFIG.accessKeyId,
    secretAccessKey: AWS_CONFIG.secretAccessKey
  }
});

module.exports = s3;
