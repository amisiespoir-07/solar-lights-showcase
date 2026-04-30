# Complete CMS Guide - Solar Lumina

## Overview

Your Solar Lumina website now has a **fully database-driven CMS** where you can edit ALL content on every page without touching code.

## What Can Be Edited via CMS

### ✅ All Pages Content
- **Home Page**: Hero title, subtitle, product section titles
- **Street Lights Page**: Page title, description
- **Accessories Page**: Page title, description  
- **Info Page**: Mission, expertise, contact information

### ✅ Dynamic Content
- **Products**: Name, description, category, images, price visibility
- **Testimonials**: Customer reviews with ratings
- **FAQs**: Questions and answers with custom ordering

## CMS Dashboard Structure

Access at: `/admin/login`

### Tab 1: Products
- Upload product images
- Set product name, category, description
- Toggle "Show Price" per product
- Delete products

### Tab 2: Testimonials
- Add customer reviews
- Set star ratings (1-5)
- Customer name and role
- Edit/delete testimonials

### Tab 3: FAQs
- Add questions and answers
- Set display order
- Edit/delete FAQs

### Tab 4: Page Content ⭐ NEW
- **Select any page** from dropdown
- Edit ALL text content on that page
- Organized by sections
- Changes appear immediately

## Page Content Structure

### Home Page (`home`)
**Sections:**
- `hero_title`: Main headline
- `hero_subtitle`: Subheading text
- `products_title`: "Featured Products" heading
- `products_description`: Products section description

### Street Lights Page (`street-lights`)
**Sections:**
- `hero_title`: Page title
- `hero_description`: Page description

### Accessories Page (`accessories`)
**Sections:**
- `hero_title`: Page title
- `hero_description`: Page description

### Info Page (`info`)
**Sections:**
- `hero_title`: "About Solar Lumina"
- `mission_title`: "Our Mission"
- `mission_content`: Mission statement text
- `expertise_title`: "Years of Expertise"
- `expertise_content`: Main expertise paragraph
- `expertise_subcontent`: Secondary expertise paragraph
- `contact_title`: "Contact Us"
- `contact_description`: Contact intro text
- `contact_email`: Email address
- `contact_phone`: Phone number
- `contact_address`: Physical address
- `contact_hours`: Business hours

## How to Edit Content

### Method 1: Via Page Content Manager (Recommended)

1. Login to `/admin`
2. Click **"Page Content"** tab
3. Select page from dropdown (Home, Street Lights, Accessories, Info)
4. Find the content you want to edit
5. Click the **Edit** icon (pencil)
6. Modify the text
7. Click **Save**
8. Refresh your website to see changes

### Method 2: Direct Database Edit

If you prefer SQL:
```sql
UPDATE page_content 
SET content_value = 'Your new text here'
WHERE page_name = 'home' 
AND section_name = 'hero' 
AND content_key = 'title';
```

## Complete Setup Checklist

### ✅ Step 1: Database Setup
Run these SQL scripts in Supabase SQL Editor:

1. `supabase-cms-tables.sql` - Creates testimonials & FAQs tables
2. `supabase-storage-setup.sql` - Sets up image storage
3. `supabase-full-cms.sql` - Creates page_content table with default content

### ✅ Step 2: Storage Setup
- Create `product-images` bucket in Supabase Storage
- Set to **Public**

### ✅ Step 3: Admin User
- Go to Supabase > Authentication > Users
- Create admin user
- Confirm email

### ✅ Step 4: Start Managing
- Login at `/admin/login`
- Start editing content!

## Example: Changing Home Page Hero

**Current:**
- Title: "Light Up Your World"
- Subtitle: "Discover our premium solar lighting solutions..."

**To Change:**

1. Go to Admin > Page Content
2. Select "Home" from dropdown
3. Find "Hero Section"
4. Edit `title` field: Click edit icon
5. Change to: "Solar Power for Everyone"
6. Click Save
7. Edit `subtitle` field
8. Change to: "Affordable, sustainable lighting solutions"
9. Click Save
10. Refresh homepage - see your changes!

## Example: Updating Contact Info

1. Go to Admin > Page Content
2. Select "Info" from dropdown
3. Find "Contact Section"
4. Edit `email`: your-email@company.com
5. Edit `phone`: +1 (555) 999-8888
6. Edit `address`: Your actual address
7. Edit `hours`: Your business hours
8. Save all changes
9. Refresh Info page

## Example: Adding a Product

1. Go to Admin > Products
2. Click "Add Product"
3. Click upload area to select image
4. Fill in:
   - Name: "Solar Panel 200W"
   - Category: Accessories
   - Description: "High-efficiency solar panel"
   - Show Price: ☐ (unchecked)
5. Click Save
6. Product appears on website immediately

## Database Schema

### page_content Table
```
- id: Auto-increment
- page_name: 'home', 'street-lights', 'accessories', 'info'
- section_name: 'hero', 'mission', 'expertise', 'contact', etc.
- content_key: 'title', 'description', 'content', etc.
- content_value: The actual text content
- content_type: 'text' (for future expansion)
- updated_at: Timestamp
```

### products Table
```
- id: Auto-increment
- name: Product name
- description: Product description
- category: 'Street Lights' or 'Accessories'
- image_url: Path to image
- show_price: Boolean (true/false)
- created_at: Timestamp
```

### testimonials Table
```
- id: Auto-increment
- name: Customer name
- role: Customer role/title
- content: Review text
- rating: 1-5 stars
- created_at: Timestamp
```

### faqs Table
```
- id: Auto-increment
- question: FAQ question
- answer: FAQ answer
- order_index: Display order (lower = first)
- created_at: Timestamp
```

## Benefits of This System

1. **No Code Changes**: Edit everything via web interface
2. **Instant Updates**: Changes appear immediately
3. **Version Control**: All changes tracked in database
4. **Multi-User**: Multiple admins can manage content
5. **Secure**: Authentication required for all edits
6. **Scalable**: Add unlimited content
7. **Organized**: Content grouped by page and section
8. **Flexible**: Easy to add new pages/sections

## Tips & Best Practices

### Content Writing
- Keep titles concise (under 60 characters)
- Write descriptions in 2-3 sentences
- Use active voice
- Focus on benefits, not features

### Images
- Use high-quality product photos
- Recommended size: 800x800px minimum
- Formats: JPG, PNG, WebP
- Keep file size under 500KB for fast loading

### SEO
- Include keywords in titles and descriptions
- Write unique content for each page
- Keep meta descriptions under 160 characters

### Testing
- Always preview changes before publishing
- Test on mobile and desktop
- Check all links work
- Verify images load correctly

## Troubleshooting

**Content not updating?**
- Clear browser cache (Ctrl+Shift+R)
- Check you saved changes in CMS
- Verify database connection

**Images not showing?**
- Check image uploaded to Supabase Storage
- Verify bucket is public
- Check image URL is correct

**Can't login to CMS?**
- Verify admin user exists in Supabase
- Check email is confirmed
- Reset password if needed

**Database errors?**
- Ensure all SQL scripts ran successfully
- Check RLS policies are enabled
- Verify table structure matches schema

## Future Enhancements

Potential additions:
- Rich text editor for content
- Image gallery management
- Blog post system
- Newsletter management
- Analytics dashboard
- Multi-language support
- Content scheduling
- Draft/publish workflow

## Support

For issues or questions:
1. Check this guide first
2. Review `CMS_UPDATES.md` for recent changes
3. Check Supabase logs for errors
4. Verify environment variables are set

## Summary

You now have complete control over your website content through an intuitive CMS. No coding required - just login, edit, and publish!

**Key URLs:**
- Admin Login: `/admin/login`
- Home Page: `/`
- Street Lights: `/street-lights`
- Accessories: `/accessories`
- Info: `/info`

**Happy content managing! 🎉**
