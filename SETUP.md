# Setup Guide for AAZ NextGen

## Overview

This is a comprehensive setup guide for the AAZ NextGen website, including the admin panel with authentication system. Users must login every time they visit the admin panel.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/your-database-name

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NextAuth Configuration (for admin authentication)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
npm install dotenv
```

### 2. Cloudinary Setup

1. Sign up for a free Cloudinary account at https://cloudinary.com/
2. Get your credentials from the Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Update the `.env.local` file with your Cloudinary credentials

### 3. Create Admin User

Run the following command to create the default admin user:

```bash
npm run create-admin
```

This will create an admin user with:

- **Email**: admin@aaz.com
- **Password**: Admin@2024!

### 4. Start Development Server

```bash
npm run dev
```

## Admin Panel Access

### Default Admin Credentials

- **Email**: admin@aaz.com
- **Password**: Admin@2024!

⚠️ **Important**: Change the default password after first login for security!

### How to Access Admin Panel

1. Navigate to `/login`
2. Use the admin credentials to login
3. You'll be redirected to `/admin` dashboard

### Admin Panel Security Features

- **Session Duration**: 1 hour maximum
- **Auto Logout**: Session expires when user leaves admin panel
- **Route Protection**: All `/admin/*` routes require authentication
- **Redirect**: Unauthenticated users are redirected to login page

### How Admin Authentication Works

1. User visits any admin route (`/admin`, `/admin/results`, etc.)
2. If not authenticated, redirected to `/login`
3. After successful login, redirected to admin dashboard
4. Session expires after 1 hour or when user leaves the admin panel
5. User must login again to access admin features

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

### Admin Authentication System

- ✅ Secure login page with validation
- ✅ Route protection for all admin pages
- ✅ Session management with auto-logout
- ✅ Default admin user creation script

### API Endpoints

- ✅ `GET /api/downloads` - Fetch all downloads
- ✅ `POST /api/downloads` - Create new download with file upload
- ✅ `DELETE /api/downloads` - Delete download and file
- ✅ `GET /api/dashboard` - Fetch dashboard statistics
- ✅ `POST /api/auth/[...nextauth]` - NextAuth authentication

## Usage

### Admin Panel Usage

1. Start the development server: `npm run dev`
2. Navigate to `/login`
3. Use admin credentials to login
4. Access admin dashboard at `/admin`
5. Manage downloads at `/admin/downloads`
6. Manage events at `/admin/events`
7. Manage results at `/admin/results`

### File Management

Use the downloads management page to upload PDF files:

```
http://localhost:3000/admin/downloads
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth API routes
│   │   │   └── auth.config.ts            # NextAuth configuration
│   │   ├── dashboard/route.ts             # Dashboard statistics API
│   │   └── downloads/route.ts             # File upload/download API
│   └── [locale]/
│       ├── login/page.tsx                 # Admin login page
│       └── admin/
│           ├── layout.tsx                 # Admin layout with session management
│           ├── page.tsx                   # Dashboard with real data
│           └── downloads/page.tsx         # File upload interface
├── components/
│   └── SessionProvider.tsx                # NextAuth session provider
├── lib/
│   ├── cloudinary.ts                      # Cloudinary configuration
│   ├── dbConnect.ts                       # MongoDB connection
│   └── models/
│       ├── User.ts                        # User model for authentication
│       ├── Download.ts                    # Download model
│       ├── Events.ts                      # Events model
│       └── Result.ts                      # Results model
├── middleware.ts                          # Route protection middleware
└── scripts/
    └── create-admin.js                    # Admin user creation script
```

## Troubleshooting

### Authentication Issues

- Ensure NEXTAUTH_SECRET is set in environment variables
- Check NEXTAUTH_URL matches your development URL
- Verify admin user exists in database (run `npm run create-admin`)

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

### Admin Panel Access Issues

- Ensure you're logged in before accessing admin routes
- Check session hasn't expired (1 hour limit)
- Verify middleware is properly configured

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run create-admin` - Create default admin user
