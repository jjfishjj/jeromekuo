# 聯絡表單部署設定

聯絡頁透過 Vercel Serverless Function `api/contact.ts` 驗證並處理表單，再使用 Resend 寄送到網站管理者指定的收件信箱。瀏覽器端不會接觸郵件 API key，也不會把表單寫入網站資料庫。

## 必要設定

1. 在 Resend 建立 API key，並驗證你有權使用的寄件網域。
2. 建立 Upstash Redis 資料庫，取得 REST URL 和可寫入的 Standard REST token；不要使用 Read Only token，因為限流需要更新 Redis 狀態。
3. 在 Vercel 專案的 **Settings → Environment Variables** 為 Production、Preview（如需）新增：
   - `RESEND_API_KEY`：Resend API key。
   - `CONTACT_TO_EMAIL`：接收聯絡訊息的信箱。
   - `CONTACT_FROM_EMAIL`：Resend 已驗證網域下的寄件者，例如 `Website <contact@example.com>`。
   - `UPSTASH_REDIS_REST_URL`：Upstash Redis REST URL。
   - `UPSTASH_REDIS_REST_TOKEN`：Upstash Redis 可寫入的 Standard REST token。
4. 重新部署 Vercel 專案。請勿加上 `VITE_` 前綴，亦不要提交任何真實 key。

環境變數名稱也列於 `.env.example`。本機若要測試 Vercel Functions，可先安裝 Vercel CLI、使用 `vercel dev`，並透過 Vercel 環境變數或未提交的 `.env.local` 提供以上值；單獨執行 Vite 開發伺服器不會啟動 `api/` Functions。

## 隱私與防濫用

- 訊息只在處理期間交由函式與 Resend，表單程式不會另存到 Supabase 或瀏覽器儲存空間；郵件服務與收件信箱仍會依其政策處理郵件。為執行共享限流，函式會把 Vercel client IP 的 SHA-256 雜湊識別碼送到 Upstash Redis，不會把原始 IP 當作限流識別碼。
- 頁面會提醒使用者不要提交密碼或敏感健康、財務資料。若需正式隱私政策，請另行建立網站政策頁。
- API 驗證同源請求、欄位長度、電子郵件格式與允許主題，使用隱藏 honeypot 欄位，並只讀取 Vercel 的 `x-vercel-forwarded-for` client IP，不以一般 `x-forwarded-for` 作為 fallback。Upstash Redis 以共享狀態限制同一 IP 每 10 分鐘最多 5 次，並限制全站每小時最多 20 封；超過上限會回覆 `429`。若 IP 缺失、Upstash 未設定、Redis 請求失敗或 SDK 回報 timeout，API 會 fail closed，不會寄信。全站上限可限制分散式濫用對郵件服務的影響，但不等同完整 DDoS 防護。
- 如網站改部署到 Netlify 或其他平台，需移植相同驗證規則為該平台的 Serverless Function；目前 `api/contact.ts` 是 Vercel 執行入口。

## 本機驗證

```bash
npx vitest run src/test/contact-api.test.ts
npm run build
```

建置與單元測試不會真的寄出電子郵件。上線前請在 Vercel Preview 設定有效的 Resend 寄件者和測試收件信箱，再從網站送出一封測試訊息。
