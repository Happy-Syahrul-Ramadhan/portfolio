# Setup Cloudinary untuk Portfolio

Panduan lengkap untuk mengintegrasikan Cloudinary sebagai image storage portfolio Anda.

## Keuntungan Cloudinary

✅ **25GB bandwidth gratis/bulan** (10x lebih besar dari Supabase)  
✅ **25GB storage gratis** (25x lebih besar dari Supabase)  
✅ **CDN global** dengan 300+ lokasi  
✅ **Automatic image optimization** (WebP, AVIF, quality tuning)  
✅ **On-the-fly transformations** (resize, crop, effects)  
✅ **Built-in image processing** tanpa perlu tools tambahan  

## 1. Setup Cloudinary Account

Anda sudah punya API credentials:
- **API Key**: `397963268281761`
- **API Secret**: `ghk9C1U8UkDAdwEYjdgpbixGPG4`

Yang masih diperlukan adalah **Cloud Name**:

1. **Login ke Cloudinary Dashboard**
   - Buka https://cloudinary.com/console
   - Login dengan akun Anda

2. **Dapatkan Cloud Name**
   - Di dashboard utama, lihat bagian **Account Details**
   - Copy **Cloud name** Anda (contoh: `dxxxxx` atau `my-portfolio`)

## 2. Update Environment Variables

Tambahkan ke file `.env` Anda:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="397963268281761"
CLOUDINARY_API_SECRET="ghk9C1U8UkDAdwEYjdgpbixGPG4"
```

**⚠️ PENTING**: Jangan commit file `.env` ke Git! Pastikan `.env` ada di `.gitignore`

## 3. Restart Development Server

```bash
# Stop server (Ctrl+C)
# Lalu restart
npm run dev
```

## 4. Test Upload

1. Login ke admin dashboard: `/login`
2. Buat blog atau project baru
3. Upload gambar
4. Gambar akan otomatis ter-upload ke Cloudinary dan ter-optimasi

## Struktur Folder di Cloudinary

Upload akan tersimpan dengan struktur:
```
portfolio/
├── general/        # Upload umum
├── blogs/          # Thumbnail blog
├── projects/       # Thumbnail project
└── profile/        # Avatar profile
```

Anda bisa lihat semua file di: https://cloudinary.com/console/media_library

## Fitur Automatic Optimization

Semua gambar yang di-upload otomatis:
- ✅ Dikompresi dengan quality optimal
- ✅ Dikonversi ke WebP untuk browser modern
- ✅ Fallback ke JPEG/PNG untuk browser lama
- ✅ Lazy loading ready
- ✅ Responsive image support

**Hasilnya**: Loading 30-70% lebih cepat dibanding gambar original!

## Image Transformations (Opsional)

Cloudinary bisa resize/crop gambar on-the-fly tanpa merubah original:

### Contoh Penggunaan:

```typescript
import { getOptimizedImageUrl } from "@/lib/cloudinary"

// Resize ke width 800px
const imageUrl = getOptimizedImageUrl(publicId, 800)

// Resize ke 800x600
const imageUrl = getOptimizedImageUrl(publicId, 800, 600)
```

### URL Parameters:

Anda juga bisa langsung modifikasi URL:
```
// Original
https://res.cloudinary.com/your-cloud/image/upload/v1234567890/portfolio/general/image.jpg

// Resize width 800px, auto quality, auto format
https://res.cloudinary.com/your-cloud/image/upload/w_800,q_auto,f_auto/v1234567890/portfolio/general/image.jpg

// Crop ke square 500x500
https://res.cloudinary.com/your-cloud/image/upload/w_500,h_500,c_fill/v1234567890/portfolio/general/image.jpg
```

**Transformations tersedia**:
- `w_XXX` - Width
- `h_XXX` - Height  
- `c_fill` - Crop & fill
- `c_scale` - Scale
- `c_limit` - Limit max size
- `q_auto` - Auto quality
- `f_auto` - Auto format (WebP/AVIF)
- `e_blur:300` - Blur effect
- `e_grayscale` - Grayscale
- Dan masih banyak lagi...

## Monitoring Usage

Pantau penggunaan Cloudinary:
1. Dashboard → **Reports** → **Usage**
2. Lihat **Storage**, **Bandwidth**, dan **Transformations**
3. Free tier sangat generous untuk portfolio personal

### Free Tier Limits:
- ✅ 25GB Storage
- ✅ 25GB Bandwidth/bulan
- ✅ 25,000 transformations/bulan
- ✅ 25 credits/bulan

**Untuk portfolio**: Sangat cukup! Bisa handle ribuan gambar.

## Troubleshooting

### Error: "Must supply cloud_name"
- Pastikan `CLOUDINARY_CLOUD_NAME` ada di `.env`
- Restart development server

### Error: "Invalid API key"
- Cek `CLOUDINARY_API_KEY` di `.env` sudah benar
- Copy ulang dari dashboard jika perlu

### Error: "Upload failed: signature"
- Cek `CLOUDINARY_API_SECRET` sudah benar
- Pastikan tidak ada spasi atau karakter tersembunyi

### Upload berhasil tapi gambar tidak muncul
- Cek Media Library di dashboard Cloudinary
- Pastikan URL yang di-return valid
- Cek network tab browser untuk error CORS

### Gambar blur atau kualitas rendah
- Cloudinary secara otomatis optimasi quality
- Jika terlalu agresif, edit `cloudinary.ts`:
  ```typescript
  transformation: [
    { quality: "auto:best" }, // Ganti dari "auto:good"
    { fetch_format: "auto" },
  ]
  ```

## Migrasi dari Local Storage

Jika sebelumnya pakai local storage (`/public/uploads/`):

### Opsi 1: Upload Manual
1. Buka Cloudinary Dashboard → Media Library
2. Upload files dari `public/uploads/` ke folder `portfolio/general`
3. Update database URLs

### Opsi 2: Bulk Upload via API (Advanced)
```bash
# Install cloudinary CLI
npm install -g cloudinary-cli

# Upload folder
cld uploader upload_dir public/uploads portfolio/general
```

## Tips & Best Practices

### 1. Organizer Folder dengan Baik
```
portfolio/
├── blogs/          # Blog thumbnails
├── projects/       # Project images
├── profile/        # Avatar & profile pics
└── general/        # Misc uploads
```

### 2. Naming Convention
Cloudinary otomatis generate unique ID, tapi gunakan descriptive folder:
- ✅ `portfolio/blogs/tech-review-2024.jpg`
- ❌ `portfolio/img123.jpg`

### 3. Delete Old Images
Hapus gambar yang tidak dipakai untuk save storage:
```typescript
import { deleteFromCloudinary } from "@/lib/cloudinary"

await deleteFromCloudinary("portfolio/general/old-image")
```

### 4. Use Transformations
Jangan upload multiple sizes! Pakai transformations:
- ✅ Upload 1 image, transform on-the-fly
- ❌ Upload thumb.jpg, medium.jpg, large.jpg

### 5. Enable Auto Format
Biarkan `f_auto` enabled - Cloudinary otomatis serve WebP untuk Chrome, AVIF untuk Safari, dan fallback JPEG untuk browser lama.

## Security

### API Key Protection
- ✅ `CLOUDINARY_API_KEY` dan `CLOUDINARY_API_SECRET` hanya di server-side
- ✅ Jangan expose di client-side code
- ✅ Upload hanya via API route (`/api/upload`)

### Signed Uploads (Opsional)
Untuk keamanan ekstra, enable signed uploads di `cloudinary.ts`:
```typescript
cloudinary.uploader.upload_stream({
  folder: folder,
  resource_type: "auto",
  signed: true, // Tambahkan ini
})
```

## Performance Tips

### 1. Lazy Loading
```tsx
<img 
  src={imageUrl} 
  loading="lazy" 
  alt="Description"
/>
```

### 2. Responsive Images
```tsx
<img 
  src={cloudinaryUrl}
  srcSet={`
    ${getOptimizedImageUrl(publicId, 400)} 400w,
    ${getOptimizedImageUrl(publicId, 800)} 800w,
    ${getOptimizedImageUrl(publicId, 1200)} 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
/>
```

### 3. Blur Placeholder (LQIP)
```tsx
// Generate thumbnail blur untuk loading state
const blurUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_50,e_blur:1000,f_auto,q_auto/${publicId}`
```

---

**Selesai!** 🎉 

Portfolio Anda sekarang menggunakan Cloudinary dengan:
- ⚡ Loading 30-70% lebih cepat
- 🌍 CDN global 300+ lokasi
- 📦 25GB storage & bandwidth gratis
- 🎨 Automatic image optimization

Selamat menikmati performance boost! 🚀
