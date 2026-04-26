# Supabase Setup Guide

This guide will help you set up Supabase for your Solar Lights Showcase application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details:
   - Name: solar-lights-showcase (or your preferred name)
   - Database Password: (create a strong password)
   - Region: (choose the closest to your users)
5. Click "Create new project"

## Step 2: Get Your API Keys

1. Once your project is created, go to Project Settings (gear icon)
2. Click on "API" in the left sidebar
3. Copy the following values:
   - Project URL (under "Project URL")
   - anon/public key (under "Project API keys")

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

## Step 4: Create the Database Table

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the entire contents of `supabase-setup.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the query

This will:
- Create the `products` table
- Enable Row Level Security
- Set up policies for public read access
- Insert 30 sample products using your marketing images

## Step 5: Upload Marketing Images to Supabase Storage (Optional)

If you want to host images on Supabase instead of locally:

1. In Supabase dashboard, go to "Storage"
2. Create a new bucket called "product-images"
3. Make it public
4. Upload your marketing images from the `marketing_images` folder
5. Update the `image_url` in the products table to use Supabase URLs

## Step 6: Run Your Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application with Supabase integration.

## Features Implemented

- Product data fetched from Supabase database
- First 30 marketing images displayed
- Click on any product to open a modal with full details
- Modal works on both mobile and desktop
- Click outside modal or X button to close
- No prices shown - users contact via WhatsApp for info
- Smooth animations and transitions
- Category filtering (All, Street Lights, Accessories)

## Troubleshooting

If products don't load:
1. Check that your `.env.local` file has the correct credentials
2. Verify the SQL script ran successfully in Supabase
3. Check browser console for any errors
4. Ensure Row Level Security policies are set correctly
