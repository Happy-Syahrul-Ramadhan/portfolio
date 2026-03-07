# 🚀 Quick Setup - Supabase Storage untuk CV Upload

## ⚡ Langkah Cepat (5 Menit)

### 1️⃣ Buat Storage Bucket di Supabase
```
1. Buka: https://supabase.com/dashboard
2. Pilih project Anda (yang sama dengan database)
3. Klik "Storage" di sidebar
4. Klik "New bucket"
5. Name: portfolio-uploads
6. ✅ Centang "Public bucket"
7. Klik "Create bucket"
```

### 2️⃣ Dapatkan Service Role Key
```
1. Di dashboard, klik Settings (⚙️)
2. Klik "API"
3. Salin:
   - Project URL: https://xxx.supabase.co
   - service_role key (BUKAN anon key!)
```

### 3️⃣ Update .env.local
Buka file `.env.local` dan ganti `YOUR_SERVICE_ROLE_KEY_HERE` dengan service_role key yang Anda salin:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://slfvlqywpgybobxckabz.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx..."
```

### 4️⃣ Test di Local
```bash
npm run dev
```
Buka: http://localhost:3000/admin/cv
Upload CV untuk test

### 5️⃣ Deploy ke Vercel
```
1. Vercel Dashboard → Settings → Environment Variables
2. Tambahkan 2 variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
3. Save & Redeploy
```

## ✅ Selesai!

File yang sudah diupdate:
- ✅ src/app/actions/profile.ts → Menggunakan Supabase Storage
- ✅ src/app/admin/cv/CVClient.tsx → UI updated
- ✅ .env.local → Tambah Supabase credentials

## 📝 Notes
- Bucket name: `portfolio-uploads`
- CV disimpan di folder: `cv/`
- Max file size: 10MB
- Format: PDF only

## ❓ Troubleshooting
**Error "Missing SUPABASE_SERVICE_ROLE_KEY"**
→ Pastikan sudah update .env.local dengan service_role key

**Error "Bucket not found"**  
→ Pastikan bucket `portfolio-uploads` sudah dibuat di Supabase

**Upload gagal**
→ Pastikan bucket di-set sebagai Public

Baca dokumentasi lengkap: VERCEL_CV_SETUP.md
