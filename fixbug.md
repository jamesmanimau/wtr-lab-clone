# Master Prompt: Perbaikan Repo wtr-lab-clone

Perbaiki isu-isu berikut di repo `wtr-lab-clone` secara berurutan sesuai prioritas. Untuk tiap isu: baca kode di lokasi yang disebut, pahami akar masalahnya, lalu terapkan perbaikan. Jangan ubah behavior di luar yang diminta. Setelah tiap perbaikan, jalankan `go build ./...` (backend) atau `npm run build` (frontend) untuk pastikan tidak ada regresi kompilasi.

---

## 1. [KRITIS] Tidak ada pengecekan admin (broken access control)
**Lokasi:** `backend/internal/router/router.go` (grup `protected`), `backend/internal/handler/novel_handler.go` (Create/Update/Delete), `backend/internal/handler/request_handler.go` (Review), `backend/internal/handler/importer_handler.go` (Import).
**Hasil yang ingin dicapai:** Hanya user dengan `IsAdmin = true` yang bisa create/update/delete novel, import novel, dan approve/reject request. User biasa tetap bisa akses endpoint publik & endpoint miliknya sendiri (votes, requests create, library).
**Cara memperbaiki:**
- Buat `middleware.AdminRequired()` baru di `internal/middleware/auth.go` (atau file baru `admin.go`): ambil `user_id` dari context (hasil `AuthRequired`), query `User`, cek `IsAdmin`, jika false → `403 Forbidden`.
- Di `router.go`, buat sub-grup baru di dalam `protected` khusus admin: `adminGroup := protected.Group("")` lalu `adminGroup.Use(middleware.AdminRequired(db))`, pindahkan route `POST/PUT/DELETE /novels`, `PUT /requests/:id`, `POST /novels/import` ke grup ini.

## 2. [KRITIS] JWT tidak validasi signing method
**Lokasi:** `backend/internal/middleware/auth.go`, fungsi `AuthRequired` dan `OptionalAuth`.
**Hasil yang ingin dicapai:** Token dengan algoritma selain HS256 langsung ditolak, menutup celah algorithm-confusion.
**Cara memperbaiki:** Di dalam callback `jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {...})`, tambahkan pengecekan di baris pertama:
```go
if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
    return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
}
```
Lakukan di kedua fungsi (`AuthRequired` dan `OptionalAuth`).

## 3. [KRITIS] Cookie auth_token tidak secure & token bocor di response body
**Lokasi:** `backend/internal/handler/auth_handler.go`, fungsi `setCookie` dan `Logout`.
**Hasil yang ingin dicapai:** Cookie hanya terkirim lewat HTTPS di production; token JWT tidak lagi diekspos di body JSON (cukup lewat cookie httpOnly).
**Cara memperbaiki:**
- Tambahkan parameter/config `Secure bool` (dari env, misal `COOKIE_SECURE`, default `true` kecuali dev) dan pakai di `c.SetCookie(...)` pada `setCookie` & `Logout` (parameter ke-6).
- Hapus field `"token": token` dari response JSON di `Register` dan `Login`; cukup kirim `"user": {...}`.
- Update `frontend/src/lib/api.ts` (`auth.login`, `auth.register`) supaya tidak lagi mengandalkan field `token` dari response.

## 4. [SEDANG] PasswordHash tanpa proteksi serialisasi
**Lokasi:** `backend/internal/model/user.go`, field `PasswordHash`.
**Hasil yang ingin dicapai:** Hash password tidak akan pernah ikut ter-serialize meski suatu saat ada kode yang `c.JSON(user)` langsung.
**Cara memperbaiki:** Tambahkan tag `json:"-"` pada field: `PasswordHash string \`gorm:"size:255;not null" json:"-"\``.

## 5. [SEDANG] Rate limiting login/register belum ada
**Lokasi:** `backend/internal/router/router.go`, route `/auth/login` & `/auth/register`.
**Hasil yang ingin dicapai:** Mencegah brute force credential.
**Cara memperbaiki:** Tambahkan middleware rate-limit sederhana per-IP (mis. pakai `golang.org/x/time/rate` atau lib `ulule/limiter`) khusus di grup `/auth`, batasi ~5-10 request/menit per IP.

## 6. [FUNGSIONAL] Sistem tiket/chapter premium belum berjalan
**Lokasi:** `backend/internal/handler/chapter_handler.go` (`Get`), model `Chapter.IsLocked`/`TicketCost`, model `TicketTransaction`.
**Hasil yang ingin dicapai:** Chapter dengan `IsLocked = true` hanya bisa diakses user yang sudah bayar tiket (atau punya cukup saldo `Tickets` di `User`); pembayaran tercatat sebagai `TicketTransaction` dan tidak bisa dobel-bayar untuk chapter yang sama.
**Cara memperbaiki:**
- Di `Get`, setelah fetch chapter: jika `chapter.IsLocked`, cek user login (dari `OptionalAuth`/`AuthRequired`), cek apakah sudah ada `TicketTransaction` dengan `RefType="chapter", RefID=chapter.ID, UserID=userID` → jika belum, cek `user.Tickets >= chapter.TicketCost`, jika cukup lakukan transaksi DB (kurangi `Tickets`, buat `TicketTransaction` type `spend`), jika tidak cukup return `402`/`403` dengan pesan jelas.
- Bungkus proses potong-tiket dalam `db.Transaction(...)` untuk hindari race condition (double-spend saat request paralel).

## 7. [DOKUMENTASI] Instruksi README tidak bisa dijalankan apa adanya
**Lokasi:** `README.md` bagian "Local Development"; file yang hilang: `backend/.env.example`, `frontend/.env.example`.
**Hasil yang ingin dicapai:** `cp backend/.env.example .env` dan `cp frontend/.env.example .env.local` benar-benar berhasil dijalankan sesuai README.
**Cara memperbaiki:** Buat `backend/.env.example` (isi sama seperti `.env.example` root, sesuaikan path) dan `frontend/.env.example` (isi minimal `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`). Root `.env.example` boleh tetap ada untuk docker-compose.

## 8. [DEVOPS] Binary seed tidak ter-build ke image Docker
**Lokasi:** `backend/Dockerfile`.
**Hasil yang ingin dicapai:** `docker compose exec backend ./seed` berhasil dijalankan sesuai instruksi README.
**Cara memperbaiki:** Di stage builder, tambahkan build kedua: `RUN CGO_ENABLED=0 GOOS=linux go build -o /seed ./cmd/seed`, lalu di stage final tambahkan `COPY --from=builder /seed /seed`.

## 9. [MINOR] Dead code & konsistensi
**Lokasi:** `backend/internal/model/user.go` (`Session`), `backend/migrations/`.
**Hasil yang ingin dicapai:** Tidak ada model tak terpakai; migration file selaras dengan skema `AutoMigrate` aktual.
**Cara memperbaiki:** Hapus model `Session` jika memang tidak dipakai (atau implementasikan session-based auth jika memang direncanakan), dan sinkronkan file di `backend/migrations/` dengan struct model terbaru, atau beri catatan jelas di README bahwa migrations folder hanya referensi, sumber kebenaran adalah `AutoMigrate`.

## 10. [MINOR] Tidak ada test otomatis
**Lokasi:** seluruh `backend/` dan `frontend/`.
**Hasil yang ingin dicapai:** Ada test dasar untuk jalur kritis: auth (login/register), admin middleware (poin #1), dan ticket unlock (poin #6).
**Cara memperbaiki:** Tambahkan `_test.go` di `internal/handler` pakai `httptest` + in-memory/test Postgres (atau sqlite driver GORM untuk unit test), minimal cover: user biasa ditolak di endpoint admin, JWT alg selain HS256 ditolak, chapter locked tidak bisa diakses tanpa cukup tiket.

---

**Urutan eksekusi disarankan:** 1 → 2 → 3 → 6 → 4 → 5 → 7 → 8 → 9 → 10.
