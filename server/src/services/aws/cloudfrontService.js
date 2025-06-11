const fs = require('fs');
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');
const path = require('path');
const AWS_CONFIG = require('../../config/aws');

// Ensure CloudFront private key is configured and exists
if (!AWS_CONFIG.cloudFrontPrivateKeyPath || !fs.existsSync(AWS_CONFIG.cloudFrontPrivateKeyPath)) {
  throw new Error('CloudFront private key not found or not configured.');
}

// Read the CloudFront private key from the configured path
const privateKey = fs.readFileSync(path.resolve(AWS_CONFIG.cloudFrontPrivateKeyPath), 'utf8');

// Generate a signed URL for accessing private resources via CloudFront (lessons, videos, PDFs)
const generateCloudFrontSignedUrl = (resourcePath) => {
  const url = `${AWS_CONFIG.cloudFrontDomain}/${resourcePath}`;
  return getSignedUrl({
    url,
    keyPairId: AWS_CONFIG.cloudFrontKeyPairId,
    privateKey,
    expires: AWS_CONFIG.cloudFrontSignedUrlExpiresIn || 300,
  });
};

// Generate a public URL for accessing files via CloudFront (thumbnails, static assets)
const generatePublicUrl = (s3Key) => {
  if (!s3Key) return null;
  return `${AWS_CONFIG.cloudFrontDomain}/${s3Key}`;
};


module.exports = { generateCloudFrontSignedUrl, generatePublicUrl };
