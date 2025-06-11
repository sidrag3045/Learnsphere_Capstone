const fs = require('fs');
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');
const path = require('path');
const AWS_CONFIG = require('../../config/aws');

if (!AWS_CONFIG.cloudFrontPrivateKeyPath || !fs.existsSync(AWS_CONFIG.cloudFrontPrivateKeyPath)) {
  throw new Error('CloudFront private key not found or not configured.');
}

const privateKey = fs.readFileSync(path.resolve(AWS_CONFIG.cloudFrontPrivateKeyPath), 'utf8');

const generateCloudFrontSignedUrl = (resourcePath) => {
  const url = `${AWS_CONFIG.cloudFrontDomain}/${resourcePath}`;
  return getSignedUrl({
    url,
    keyPairId: AWS_CONFIG.cloudFrontKeyPairId,
    privateKey,
    expires: AWS_CONFIG.cloudFrontSignedUrlExpiresIn || 300,
  });
};

module.exports = { generateCloudFrontSignedUrl };
