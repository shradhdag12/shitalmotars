# SHITAL MOTORS - Used Cars Buying & Selling

Full-stack production automotive application for **Shital Motors**.

## Overview
- **Customer Portal**: Browse quality available used cars, search & filter by Brand, Model, Price Range, Fuel, Transmission, Body Type, Year, KM & Owner. Interactive photo galleries, wishlist, vehicle enquiry form, direct phone call (`tel:`) and dynamic WhatsApp contact integrations, car rental services, airport pickup, outstation options.
- **Admin Dashboard**: Secure JWT admin login, statistical analytics cards (Total Vehicles, Available, Sold, New Stock, Enquiries), vehicle management table with responsive mobile view, 3-step Add/Edit Vehicle form with drag-and-drop image uploader & main cover image picker, Mark Sold/Available status manager, Enquiry tracker, and Excel/PDF export capabilities.
- **Localization & Themes**: Built-in Marathi (मराठी) / English language toggle and Dark / Light visual themes (default dark with automotive gold accents).

---

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, React Router v6, Axios, xlsx, jspdf
- **Backend**: Node.js, Express.js, Mongoose / MongoDB, JWT, BcryptJS, Multer
- **Database**: MongoDB (with automatic in-memory fallback if local MongoDB service is offline)

---

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm run setup
   ```

2. **Seed Initial Inventory & Admin Account**:
   ```bash
   npm run seed
   ```

3. **Run Application (Client + Server concurrently)**:
   ```bash
   npm run dev
   ```

- **Frontend URL**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Default Admin Credentials**:
  - Email: `admin@shitalmotors.com`
  - Password: `admin123`
