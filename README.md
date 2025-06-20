# AAZ Next-gen Educational Platform

## Overview

AAZ Next-gen is a modern educational platform designed to ignite intellectual curiosity and elevate student potential through innovative contests, assessments, and learning resources.

## Technical Details

- **Built With**: Next.js (v15+), Tailwind CSS, React (v19+), TypeScript, MongoDB, Cloudinary
- **Project Timeline**: Development started June 1, 2025 | Current version June 16, 2025
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: Cloudinary for secure file uploads and management
- **Authentication**: NextAuth.js for secure admin access

## Features

### 🏆 Academic Contests

- **NoorQuest**: Quranic knowledge challenge
- **CodeNova**: Programming competition
- **NuminaX**: Mathematics problem-solving
- **NovaMind**: Science exploration
- **Inkspire Chronicles**: Creative writing
- **VisionVerse**: Visual arts expression

### 📊 Key Services

- Instant test results with real-time analytics
- Downloadable study materials with Cloudinary integration
- Digital resource library with secure file management
- Multi-level academic programs
- Admin dashboard with comprehensive statistics

### 📈 Academic Levels

- NovaNest (Grades I–II)
- Ignitia (Grades III–IV)
- LuminaCore (Grades V–VI)
- VortexEdge (Grades VII–VIII)
- AstraPrime (Grades IX–X)
- Zenithra (Grades XI–XII)

### 🔧 Admin Features

- **File Management**: Upload, organize, and delete PDF resources
- **Real-time Dashboard**: Live statistics and analytics
- **Event Management**: Create and manage academic events
- **Results Management**: Track student performance and achievements
- **Download Categories**: Past Papers, Guide Books, Forms, Reference Books, Brochures, Books

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+) or yarn
- MongoDB database
- Cloudinary account
- Modern web browser

### Installation

```bash
git clone [repository-url]
cd aaz-nextgen
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/your-database-name

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Running the Application

```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Project Structure (Next.js App Router)

```
AAZ-NEXTGEN/
├── public/
│ ├── assets/
│ │ ├── images/
│ │ │ ├── contest/
│ │ │ ├── hero/
│ │ │ └── logo.png
│ │ └── pdf/
│ │   ├── guidebook-2024.pdf
│ │   └── past-papers-2023.pdf
├── src/
│ ├── app/
│ │ ├── [locale]/
│ │ │ ├── about/
│ │ │ ├── admin/
│ │ │ │ ├── downloads/
│ │ │ │ ├── events/
│ │ │ │ ├── results/
│ │ │ │ ├── layout.tsx
│ │ │ │ └── page.tsx
│ │ │ ├── contact/
│ │ │ ├── contest/
│ │ │ ├── download/
│ │ │ ├── home/
│ │ │ ├── level/
│ │ │ ├── login/
│ │ │ ├── result/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ └── api/
│ │   ├── auth/
│ │   │ ├── [...nextauth]/
│ │   │ └── auth.config.ts
│ │   ├── dashboard/
│ │   ├── downloads/
│ │   ├── event/
│ │   └── results/
│ ├── components/
│ │ ├── Footer.tsx
│ │ ├── home/
│ │ │ ├── FAQ.tsx
│ │ │ ├── Hero.tsx
│ │ │ ├── Intro.tsx
│ │ │ ├── KeyServices.tsx
│ │ │ ├── LevelSection.tsx
│ │ │ ├── PosterSection.tsx
│ │ │ └── Testimonial.tsx
│ │ ├── LanguageSwitcher.tsx
│ │ ├── Navbar.tsx
│ │ ├── Pagination.tsx
│ │ └── ui/
│ │   ├── Button.tsx
│ │   ├── ComingSoonPopup.tsx
│ │   ├── ConfirmationModal.tsx
│ │   ├── ContestCard.tsx
│ │   ├── DataCard.tsx
│ │   ├── DownloadCard.tsx
│ │   ├── DropDown.tsx
│ │   ├── FileInput.tsx
│ │   ├── Input.tsx
│ │   ├── LevelCard.tsx
│ │   ├── Loader.tsx
│ │   └── StatCard.tsx
│ ├── data/
│ │ ├── downloads.json
│ │ ├── events.json
│ │ └── results.json
│ ├── i18n/
│ │ ├── navigation.ts
│ │ ├── request.ts
│ │ └── routing.ts
│ ├── lib/
│ │ ├── cloudinary.ts
│ │ ├── dbConnect.ts
│ │ ├── direction.ts
│ │ ├── models/
│ │ │ ├── Download.ts
│ │ │ ├── Events.ts
│ │ │ ├── Result.ts
│ │ │ └── User.ts
│ │ └── validation/
│ ├── middleware.ts
│ └── globals.css
├── messages/
│ ├── en.json
│ └── ur.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Directories Explained:

- **public/** - Static assets

  - `assets/images/` - Website images organized by category
  - `assets/pdf/` - Static PDF resources

- **src/app/[locale]/** - Internationalized routes

  - `admin/` - Admin dashboard and management interfaces
  - `api/` - API route handlers for data operations

- **src/components/** - Reusable UI components

  - `ui/` - Base UI components (Button, Input, FileInput, etc.)
  - `home/` - Homepage-specific components

- **src/lib/** - Business logic and utilities

  - `models/` - MongoDB schemas and models
  - `cloudinary.ts` - Cloudinary configuration
  - `dbConnect.ts` - Database connection utility

- **messages/** - Internationalization files
  - `en.json` - English translations
  - `ur.json` - Urdu translations

## API Endpoints

### Dashboard

- `GET /api/dashboard` - Fetch real-time statistics and analytics

### Downloads Management

- `GET /api/downloads` - Fetch all downloads
- `POST /api/downloads` - Create new download with file upload
- `DELETE /api/downloads` - Delete download and associated file

### Events Management

- `GET /api/event` - Fetch events with optional filtering
- `POST /api/event` - Create new event
- `DELETE /api/event` - Delete event

### Results Management

- `GET /api/results` - Fetch results with optional filtering
- `POST /api/results` - Create new result
- `DELETE /api/results` - Delete result

## Features Implemented

### ✅ File Upload System

- Cloudinary integration for secure file storage
- PDF upload with automatic categorization
- File deletion with Cloudinary cleanup
- Support for multiple download categories

### ✅ Real-time Dashboard

- Live statistics from database
- Recent activity tracking
- Top performing students analytics
- Events and results by category/grade

### ✅ Admin Management

- Complete CRUD operations for events, results, and downloads
- User-friendly interfaces with loading states
- Error handling and success notifications
- Responsive design for all devices

### ✅ Database Integration

- MongoDB with Mongoose ODM
- Structured data models for events, results, and downloads
- Efficient queries with aggregation pipelines

## Development

### Available Scripts

- `dev`: Start development server
- `build`: Create production build
- `start`: Start production server
- `lint`: Run ESLint

### Database Models

#### Event Model

```typescript
{
  eventId: string;
  eventName: string;
  examDate: string;
  city: string;
  category: string;
  grades: string[];
  isPublished: boolean;
  totalParticipants: number;
}
```

#### Result Model

```typescript
{
  resultId: string;
  eventId: string;
  student: {
    fullName: string;
    fatherName: string;
    grade: string;
    institution: {
      name: string;
      campus: string;
    }
  }
  examData: {
    rollNumber: string;
    score: number;
    position: number;
  }
  awards: {
    hasWon: boolean;
    awardName: string;
    awardType: string;
  }
  remarks: string;
  publishedDate: string;
}
```

#### Download Model

```typescript
{
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  downloadUrl: string;
  uploadDate: string;
  grades: string[];
}
```

## Deployment

### Environment Variables for Production

Ensure all environment variables are properly configured in your production environment:

- `MONGO_URI` - Production MongoDB connection string
- `CLOUDINARY_*` - Production Cloudinary credentials
- `NEXTAUTH_*` - Production authentication settings

### Build and Deploy

```bash
npm run build
npm start
```

## Contact Developer

- **Email**: [wamiqzahid319@gmail.com](mailto:wamiqzahid319@gmail.com)
- **WhatsApp**: [+92 312 9821053](https://wa.me/923129821053)
- **Portfolio**: WλM!QΞ://dev

## Legal & Copyright

- © 2025 Wamiq. All rights reserved.
- Licensed to AAZ Nextgen
- Design & Development by WλM!QΞ://dev
- All content is protected intellectual property

```

```
