# Project Guidelines & Rules for Agent

These rules MUST be followed by any AI agent working on this repository (`faikenesalbayrak/oalbayrak`):

1. **User Communication & Technical Level:**
   - The user using this repository does not have a background in Git or technical version control terminology (e.g., git history, commit, push, pull, branch, merge).
   - ALWAYS explain what you are doing in plain, simple, friendly, and step-by-step Turkish without using raw git jargon.

2. **Deployment & Branching Strategy:**
   - This repository is connected to the user's son's Vercel account.
   - Any commit pushed to the `main` branch automatically deploys to live at `orhanalbayrak.com`.
   - All production releases MUST go to `main`.
   - **For major or risky changes:** Create a separate working branch first. Explicitly and politely explain to the user why a separate workspace/branch is being created, what it does, and how it will be safely merged into `main` after verification.

3. **End of Task Confirmation:**
   - Upon completing any task/fix/feature, ALWAYS ask the user explicitly:
     *"İşimiz bitti, orhanalbayrak.com sitesinde yeni versiyonun canlıya çıkması için değişiklikleri kaydedip yayınlayayım (commit & push) mı?"*

4. **Local Development & Preview:**
   - When previewing or testing changes locally, use `localhost:3000` (or `npm run dev` / `pnpm dev` equivalent).
