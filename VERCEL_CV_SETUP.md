# Setup Upload CV dengan Supabase Storage

## Masalah
Upload CV bekerja di local tapi gagal di Vercel karena:
- Sebelumnya menggunakan `fs/promises` untuk menyimpan file ke folder `public`
- Vercel adalah serverless platform dengan filesystem **read-only**
- File yang ditulis ke filesystem tidak akan persist

## Solusi
✅ Menggunakan **Supabase Storage** (cloud storage yang gratis dan mudah)

## Langkah Setup Supabase Storage

### 1. Login ke Supabase Dashboard
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda atau buat project baru

### 2. Buat Storage Bucket
1. Di sidebar kiri, klik **Storage**
2. Klik tombol **New bucket**
3. Isi form:
   - **Name**: `portfolio-uploads`
   - **Public bucket**: ✅ **Centang** (agar file bisa diakses publik)
   - **File size limit**: `10 MB`
   - **Allowed MIME types**: Leave empty atau isi: `application/pdf,image/*`
4. Klik **Create bucket**

### 3. Setup Bucket Policies (Agar Public)
1. Pilih bucket **portfolio-uploads**
2. Klik tab **Policies**
3. Klik **New Policy**
4. Pilih template **"Allow public read access"**
5. Atau buat policy manual:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio-uploads' );

-- Allow authenticated uploads (for admin)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'portfolio-uploads' );
```

### 4. Dapatkan Credentials Supabase
1. Di dashboard, klik **Settings** (⚙️) di sidebar
2. Klik **API**
3. Salin 2 values ini:
   - **Project URL**: `https://xxx.supabase.co`
   - **service_role key** (bukan anon key!): `eyJhbG...`

⚠️ **PENTING**: Gunakan **service_role** key, BUKAN **anon** key!

### 5. Update Environment Variables

#### Local (.env.local)
```bash
# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://slfvlqywpgybobxckabz.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Vercel Dashboard
1. Buka project di [Vercel Dashboard](https://vercel.com/dashboard)
2. **Settings** → **Environment Variables**
3. Tambahkan 2 variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` | Production, Preview, Development |

4. Klik **Save**

### 6. Deploy ke Vercel
```bash
git add .
git commit -m "feat: Use Supabase Storage for CV upload"
git push origin main
```

Atau manual redeploy di Vercel Dashboard:
- **Deployments** → klik **Redeploy**

### 7. Test Upload
1. Login ke admin: `https://your-domain.com/admin/cv`
2. Upload file PDF (max 10MB)
3. CV akan tersimpan di Supabase Storage bucket `portfolio-uploads/cv/`

## Struktur File di Supabase

```
portfolio-uploads/
├── cv/
│   ├── 1234567890-abc123.pdf
│   └── 1234567891-def456.pdf
├── blogs/
│   └── ...
└── projects/
    └── ...
```

## Perubahan yang Dilakukan

### File: `src/app/actions/profile.ts`
- ✅ Menggunakan `uploadToSupabase` dari `@/lib/supabase-storage`
- ✅ CV disimpan ke bucket: `portfolio-uploads` folder: `cv`

### File: `src/lib/supabase-storage.ts`
- ✅ Sudah ada fungsi lengkap: `uploadToSupabase`, `deleteFromSupabase`

## Keuntungan Supabase Storage

✅ **Gratis** - 1GB storage gratis (cukup untuk ratusan CV)  
✅ **Fast CDN** - Global edge network  
✅ **Serverless friendly** - Bekerja perfect di Vercel  
✅ **Integrated** - Sudah satu dashboard dengan database  
✅ **Auto backup** - Built-in backup & versioning  
✅ **Easy management** - GUI dashboard untuk manage files  

## Troubleshooting

### Error "Missing NEXT_PUBLIC_SUPABASE_URL"
- Pastikan environment variable sudah ditambahkan
- Restart dev server: `npm run dev`
- Redeploy Vercel setelah menambah env vars

### Error "Upload failed: new row violates row-level security policy"
- Bucket belum public atau policy belum dibuat
- Cek bucket policies di Supabase Dashboard
- Pastikan bucket **portfolio-uploads** sudah ada

### Error "Bucket not found"
- Pastikan nama bucket: `portfolio-uploads` (sesuai di code)
- Cek di Supabase Dashboard → Storage

### File tidak bisa didownload
- Pastikan bucket **Public** 
- Check policy "Allow public read access"
- Verify URL format: `https://xxx.supabase.co/storage/v1/object/public/portfolio-uploads/...`

## View Files di Supabase
1. Dashboard → **Storage** → **portfolio-uploads**
2. Navigate ke folder **cv**
3. Klik file untuk preview atau download
4. Bisa delete file lama secara manual

## Batasan Free Tier
- **Storage**: 1 GB
- **Bandwidth**: 2 GB per month
- **API requests**: 50,000 per month

Untuk portfolio pribadi, ini **lebih dari cukup**! 🎉
