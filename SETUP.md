# Setup Guide for AAZ NextGen

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/your-database-name

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NextAuth Configuration (if using authentication)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## Cloudinary Setup

1. Sign up for a free Cloudinary account at https://cloudinary.com/
2. Get your credentials from the Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Update the `.env.local` file with your Cloudinary credentials

## Features Implemented

### File Upload with Cloudinary

- ✅ PDF file upload to Cloudinary
- ✅ Files stored in `aaz-nextgen/downloads` folder
- ✅ Automatic file deletion when download is removed
- ✅ Support for all download categories

### Dashboard with Real Data

- ✅ Real-time statistics from database
- ✅ Recent events, results, and downloads
- ✅ Top performing students
- ✅ Analytics by category and grade
- ✅ Loading states and error handling

### API Endpoints

- ✅ `GET /api/downloads` - Fetch all downloads
- ✅ `POST /api/downloads` - Create new download with file upload
- ✅ `DELETE /api/downloads` - Delete download and file
- ✅ `GET /api/dashboard` - Fetch dashboard statistics

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to the admin dashboard:

   ```
   http://localhost:3000/admin
   ```

3. Use the downloads management page to upload PDF files:
   ```
   http://localhost:3000/admin/downloads
   ```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── dashboard/route.ts     # Dashboard statistics API
│   │   └── downloads/route.ts     # File upload/download API
│   └── [locale]/admin/
│       ├── page.tsx               # Dashboard with real data
│       └── downloads/page.tsx     # File upload interface
├── lib/
│   ├── cloudinary.ts              # Cloudinary configuration
│   ├── dbConnect.ts               # MongoDB connection
│   └── models/
│       ├── Download.ts            # Download model
│       ├── Events.ts              # Events model
│       └── Result.ts              # Results model
```

## Troubleshooting

### File Upload Issues

- Ensure Cloudinary credentials are correct
- Check file size limits (Cloudinary free tier: 100MB)
- Verify PDF file format

### Database Connection Issues

- Ensure MongoDB is running
- Check MONGO_URI format
- Verify database permissions

### Dashboard Loading Issues

- Check all API endpoints are accessible
- Verify database collections exist
- Check browser console for errors
