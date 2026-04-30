# CMS Setup Guide

Your Solar Lumina website now includes a complete Content Management System (CMS) at `/admin`.

## Features

The CMS allows you to manage:
- **Products**: Add, edit, delete solar lighting products
- **Testimonials**: Manage customer reviews and ratings
- **FAQs**: Create and organize frequently asked questions

## Setup Instructions

### 1. Create Database Tables

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase-cms-tables.sql`
4. Paste and run the SQL script

This will create:
- `testimonials` table with sample data
- `faqs` table with sample data
- Row Level Security policies
- Public read access for all users
- Authenticated write access for admin users

### 2. Set Up Storage Bucket

1. In Supabase dashboard, go to Storage
2. Click "Create a new bucket"
3. Name it: `product-images`
4. Make it **Public**
5. Click "Create bucket"

**OR** run the SQL script:
1. Go to SQL Editor
2. Copy contents of `supabase-storage-setup.sql`
3. Run the script to create bucket and policies automatically

### 3. Create Admin User

In your Supabase dashboard:

1. Go to Authentication > Users
2. Click "Add User"
3. Create an admin account:
   - Email: admin@solarlumina.com (or your preferred email)
   - Password: (create a strong password)
   - Confirm email: Yes

### 4. Access the CMS

1. Navigate to: `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. You'll be redirected to the CMS dashboard

## CMS Features

### Product Management
- View all products in card format with images
- **Upload product images** directly from your computer
- Images are stored in Supabase Storage
- Add new products with name, category, description, and image
- Edit existing products inline
- Delete products with confirmation
- Categories: Street Lights, Accessories
- Image preview before upload

### Testimonial Management
- View testimonials in card format
- Add customer reviews with name, role, content, and star rating
- Edit testimonials inline
- Delete testimonials with confirmation
- Star ratings from 1-5

### FAQ Management
- View FAQs in expandable format
- Add questions and answers
- Set order index for custom sorting
- Edit FAQs inline
- Delete FAQs with confirmation

## Security

- Authentication required for all CMS operations
- Row Level Security (RLS) enabled on all tables
- Public users can only read content
- Only authenticated users can create, update, or delete content
- Session-based authentication with Supabase Auth

## Usage Tips

1. **Products**: 
   - Click "Upload image" to select a product photo from your computer
   - Supported formats: JPG, PNG, WebP
   - Images are automatically uploaded to Supabase Storage
   - Preview your image before saving
2. **Testimonials**: Keep content concise (2-3 sentences work best)
3. **FAQs**: Order index determines display order (lower numbers appear first)
4. **Logout**: Always logout when finished to secure your session

## Troubleshooting

**Can't login?**
- Verify admin user exists in Supabase Authentication
- Check that email is confirmed
- Ensure Supabase credentials are correct in `.env.local`

**Changes not appearing?**
- Refresh the frontend page
- Check browser console for errors
- Verify RLS policies are set correctly

**Database errors?**
- Ensure `supabase-cms-tables.sql` was run successfully
- Check that all tables exist in Supabase Table Editor
- Verify RLS policies are enabled

**Image upload not working?**
- Verify `product-images` bucket exists in Supabase Storage
- Ensure bucket is set to **Public**
- Check storage policies are configured correctly
- Run `supabase-storage-setup.sql` if needed

## Next Steps

- Customize the CMS styling to match your brand
- Add image upload functionality
- Implement bulk operations
- Add content preview before publishing
- Set up email notifications for new testimonials
