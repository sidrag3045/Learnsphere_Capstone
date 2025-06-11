const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('./s3Client');
const AWS_CONFIG = require('../../config/aws');

// Generate a signed URL for uploading (video/PDF or thumbnails)
const generateUploadSignedUrl = async (s3Key, contentType) => {
  try {
    const command = new PutObjectCommand({
      Bucket: AWS_CONFIG.bucketName,
      Key: s3Key,
      ContentType: contentType
    });

    return await getSignedUrl(s3, command, { expiresIn: AWS_CONFIG.linkExpiry });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw new Error('Could not generate upload URL');
  }
};


module.exports = {
  generateUploadSignedUrl
};
