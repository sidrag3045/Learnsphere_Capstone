const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('./s3Client');
const AWS_CONFIG = require('../../config/aws');

// Generate a signed URL for downloading (video/PDF)
const generateSignedUrl = async (s3Key, expiresIn = 900) => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_CONFIG.bucketName,
      Key: s3Key
    });

    return await getSignedUrl(s3, command, { expiresIn });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Could not generate video access URL');
  }
};

// Upload file from buffer (if needed later in backend)
// const uploadFileToS3 = async (s3Key, fileBuffer, mimeType) => {
//   try {
//     const command = new PutObjectCommand({
//       Bucket: AWS_CONFIG.bucketName,
//       Key: s3Key,
//       Body: fileBuffer,
//       ContentType: mimeType
//     });

//     await s3.send(command);
//     return `s3://${AWS_CONFIG.bucketName}/${s3Key}`;
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw new Error('Upload failed');
//   }
// };

module.exports = {
  generateSignedUrl
};
