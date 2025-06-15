# LearnSphere Backend

This is the **Node.js/Express backend** for LearnSphere, built using Sequelize ORM and MySQL. It provides RESTful APIs for course management, authentication, content delivery, and more.

## 📁 Project Structure

```
server/
├── src/
│   ├── config/               # AWS config, env, CloudFront keys
│   ├── controllers/          # Route handlers
│   ├── loaders/              # Database setup
│   ├── middlewares/          # Auth, error handling
│   ├── models/               # Sequelize models
│   ├── routes/               # Express routes
│   ├── services/             # Business logic for courses, lessons, etc.
│   ├── utils/                # Validation and utility functions
```

## 🚀 Features

- JWT-based authentication
- Role-based authorization (Student/Instructor)
- Course → Module → Lesson structure
- Secure content streaming with AWS CloudFront
- Signed URL generation (CloudFront & S3)
- Progress tracking and enrollment system
- Sequelize CLI-based model and migration management

## 🛠️ Tech Stack

- Node.js + Express
- Sequelize ORM + MySQL
- AWS S3 & CloudFront (signed URL)
- JWT for auth
- Joi for validations

## 🔧 Setup Instructions

```bash
cd server
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the root `server/` directory:

```
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=mysql://user:pass@localhost:3306/learnsphere
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=ap-south-1
S3_BUCKET=learnsphere-dev-content
CLOUDFRONT_PUBLIC_URL=https://your-distribution.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=APKAXXXXXX
CLOUDFRONT_PRIVATE_KEY_PATH=./src/config/cloudfront-private-key.pem
CLOUDFRONT_SIGNED_URL_EXPIRY=900
```

## 📎 Additional Notes

- `generateCloudFrontSignedUrl()` is used to protect lesson content.
- Thumbnails can be served publicly via CloudFront.
- All signed URLs are time-limited for security.

---

_Last updated on 2025-06-15_
