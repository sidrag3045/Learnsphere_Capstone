const fs = require('fs');
const path = require('path');
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');
const AWS_CONFIG = require('../../config/aws');

// Generate a signed URL for accessing private lesson content via CloudFront
const generateCloudFrontSignedUrl = (resourcePath) => {
  try {
    const privateKeyPath = path.resolve(AWS_CONFIG.cloudFrontPrivateKeyPath || '');

    if (!fs.existsSync(privateKeyPath)) {
      throw new Error('CloudFront private key not found or not configured.');
    }

    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    const url = `${AWS_CONFIG.cloudFrontDomain}/${resourcePath}`;

    return getSignedUrl({
      url,
      keyPairId: AWS_CONFIG.cloudFrontKeyPairId,
      privateKey,
      expires: AWS_CONFIG.cloudFrontSignedUrlExpiresIn || 300,
    });
  } catch (err) {
    console.error('Error generating CloudFront signed URL:', err.message);
    throw new Error('CloudFront URL generation failed');
  }
};

// Generate a public URL for thumbnails/static content via CloudFront
const generatePublicUrl = (s3Key) => {
  if (!s3Key) return null;
  return `${AWS_CONFIG.cloudFrontDomain}/${s3Key}`;
};

module.exports = {
  generateCloudFrontSignedUrl,
  generatePublicUrl,
};
