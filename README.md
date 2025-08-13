# 🏔️ The Wild Oasis - Cabin Booking Website

A modern, full-stack booking website for luxury cabin rentals built with **Next.js 15** and **Supabase**. Experience the beauty of the Italian Dolomites from the comfort of our premium accommodations.

## ✨ Features

- **🏠 Cabin Browsing** - Explore our collection of luxury cabins with detailed information
- **🔍 Smart Filtering** - Filter cabins by guest capacity (1-3, 4-7, 8-12 guests)
- **📱 Responsive Design** - Seamless experience across all devices
- **⚡ Server-Side Rendering** - Lightning-fast page loads with Next.js App Router
- **🔗 Shareable URLs** - Bookmark and share filtered cabin views
- **🎨 Modern UI** - Beautiful design with Tailwind CSS
- **🌙 Image Optimization** - Automatic image optimization with Next.js Image component
- **♿ Accessibility** - WCAG compliant navigation and components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Supabase account

## 🎯 Key Features Explained

### Dynamic Routing & Static Generation

- Uses Next.js `generateStaticParams` for optimal performance
- Pre-renders cabin pages at build time for lightning-fast loading

### URL State Management

- Filter state persists in URL parameters
- Shareable links: `/cabins?capacity=large`
- Browser back/forward button support

### Server Components

- Leverages React Server Components for better performance
- Data fetching happens on the server for faster initial page loads

### Error Handling

- Custom error boundaries for graceful error handling
- Specific 404 pages for missing cabins
- Fallback UI components for better user experience

## 🙏 Acknowledgments

- **Jonas Schmedtmann** - Original course instructor
- **Vercel** - For the amazing deployment platform
- **Supabase** - For the backend-as-a-service
- **Tailwind CSS** - For the utility-first CSS framework

**Built with ❤️ for the Ultimate React Course under Jonas Schmedtmann's guide**
