# Jerome Kuo — Learning Systems Portfolio

Jerome Kuo 的多語個人網站，主題涵蓋學習系統、記憶設計、成長日誌、語言學習、互動遊戲與課程內容。網站也包含以 Supabase 驗證與資料庫支援的內容管理後台。

## 功能

- 多語介面：繁體中文、英文、西班牙文、希伯來文、韓文、法文
- 學習與記憶方法、成長日誌、系統思維等內容頁
- 可操作的吞食蛇、象棋與 2×2 魔術方塊 Demo
- 語言學習測驗、知識文章與規則式聊天工具
- Supabase 驅動的影片、文字與圖片內容管理
- 響應式導覽，以及希伯來文 RTL 排版支援

## 技術架構

```text
Browser
  └─ React Router
      ├─ Public pages / interactive demos
      ├─ LanguageProvider (UI translations)
      └─ Admin pages
           └─ Supabase Auth + PostgreSQL + Storage
```

主要技術：

- Vite 5、React 18、TypeScript
- React Router、TanStack Query
- Tailwind CSS、shadcn/ui、Radix UI、Lucide
- Supabase Auth、Database、Storage
- Vitest、Testing Library、ESLint

## 本機執行

需求：Node.js 22 以上與 npm（目前 Supabase client 相依套件要求 Node.js 22）。

```bash
git clone https://github.com/jjfishjj/jeromekuo.git
cd jeromekuo
npm ci
cp .env.example .env
npm run dev
```

開啟 <http://localhost:8080>。

`.env` 需要填入 Supabase 專案的前端公開設定：

```dotenv
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
```

請勿在任何 `VITE_` 變數中放入 Supabase service-role key 或其他伺服器端祕密；Vite 會把這些值打包進瀏覽器程式碼。

## 常用指令

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動本機開發伺服器 |
| `npm run build` | 建立 production bundle 至 `dist/` |
| `npm run preview` | 本機預覽 production build |
| `npm run lint` | 執行 ESLint |
| `npm test` | 執行 Vitest 測試 |

## Supabase 設定

資料庫 schema 與 RLS policies 位於 [`supabase/migrations`](supabase/migrations)。使用 Supabase CLI 連結目標專案後，可套用 migrations：

```bash
npx supabase link --project-ref YOUR_PROJECT_ID
npx supabase db push
```

後台路徑為 `/admin/login`。登入帳號除了 Supabase Auth user 外，也必須在 `user_roles` 表具有 `admin` role；權限最終由 migrations 內的 RLS policy 控制。

## 部署

### Vercel

1. 匯入這個 GitHub repository。
2. Framework Preset 選擇 **Vite**。
3. Build Command 使用 `npm run build`，Output Directory 使用 `dist`。
4. 在 Project Settings → Environment Variables 加入三個 `VITE_SUPABASE_*` 變數。
5. 部署。repository 內的 `vercel.json` 會把 React Router 路徑導回 `index.html`。

### Netlify

Build command 使用 `npm run build`，Publish directory 使用 `dist`，並設定相同環境變數。`public/_redirects` 會處理 SPA 路由重新整理。

### Lovable

若此 repository 仍連接 Lovable，可在 Lovable 內使用 Share → Publish。原始 README 未保留有效的 Lovable Project ID，因此需先從 Lovable dashboard 找到並確認對應專案。

## 專案結構

```text
src/
├─ components/
│  ├─ admin/       # 後台文字與圖片編輯器
│  ├─ games/       # 三個互動遊戲
│  ├─ language/    # 語言學習互動元件
│  ├─ layout/      # Header、Footer、Layout
│  └─ ui/          # shadcn/ui 基礎元件
├─ data/           # 網站靜態內容與設定
├─ hooks/          # Auth 與 Supabase 內容 hooks
├─ i18n/           # 翻譯與語言狀態
├─ integrations/   # Supabase client 與生成型別
├─ pages/          # 路由頁面
└─ test/           # Vitest 設定與測試
supabase/
└─ migrations/     # Database、Storage 與 RLS migrations
```

## 已知待辦

- 在 `src/data/siteData.ts` 補上正式 Email 與預約網址。
- 以真實作品數據替換部分示例／placeholder 內容。
- 持續擴充後台寫入流程與其他遊戲規則的自動化測試。
- 定期執行 `npm audit` 並評估相依套件升級；不要直接套用可能含 breaking changes 的強制修復。
