# Bayt An Nur — Déploiement

Le site fonctionne maintenant avec une vraie base de données (Supabase) et de vrais
paiements (Stripe). Voici la procédure complète, dans l'ordre.

## 1. Base de données (Supabase)

1. Crée un projet sur [supabase.com](https://supabase.com) (gratuit).
2. Va dans **SQL Editor** → colle tout le contenu de
   `supabase/migrations/0001_init.sql` → exécute. Ça crée toutes les tables,
   la sécurité (RLS) et les triggers nécessaires.
3. Va dans **Settings → API** → note ton **Project URL** et ta clé **anon public**.

## 2. Variables d'environnement

Copie `.env.example` vers `.env` (pour tester en local) et remplis :

| Variable | Où la trouver |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe → Développeurs → Clés API → clé publique |
| `STRIPE_SECRET_KEY` | Stripe → Développeurs → Clés API → clé secrète |
| `STRIPE_WEBHOOK_SECRET` | voir étape 4 ci-dessous |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (⚠️ secrète, jamais dans `VITE_*`) |
| `PUBLIC_SITE_URL` | l'URL de ton site une fois déployé (ex: `https://baytannur.vercel.app`) |

**Commence en mode test Stripe** (clés `pk_test_...` / `sk_test_...`) — aucun vrai
argent ne circule tant que tu n'es pas passé en mode live dans le dashboard Stripe.

## 3. Déploiement sur Vercel

1. Pousse ce code sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com) → "Add New Project" → importe le dépôt.
3. Dans **Settings → Environment Variables**, ajoute toutes les variables du
   tableau ci-dessus (sauf `PUBLIC_SITE_URL` que tu complèteras après le premier
   déploiement, une fois que tu connais l'URL Vercel).
4. Déploie. Vercel installe les dépendances et build automatiquement — aucune
   installation locale n'est nécessaire.

## 4. Webhook Stripe (à faire après le premier déploiement)

1. Dans le Dashboard Stripe → **Développeurs → Webhooks** → "Ajouter un endpoint".
2. URL : `https://TON-SITE.vercel.app/api/stripe-webhook`
3. Événement à écouter : `checkout.session.completed`
4. Stripe te donne un "Signing secret" (`whsec_...`) → colle-le dans la variable
   Vercel `STRIPE_WEBHOOK_SECRET`, puis redéploie.

## 5. Créer ton compte admin

Vois `supabase/PREMIER_ADMIN.md` — en résumé : inscris-toi normalement sur le
site avec ton email, puis exécute une ligne SQL dans Supabase pour te donner
les droits super-admin.

## 6. Passer en production (vrais paiements)

Quand tu es prêt à accepter de vrais paiements :
1. Dans Stripe, active le **mode Live** et récupère les clés `pk_live_...` / `sk_live_...`.
2. Remplace `VITE_STRIPE_PUBLISHABLE_KEY` et `STRIPE_SECRET_KEY` dans Vercel par ces
   nouvelles clés.
3. Recrée le webhook (étape 4) en mode Live — les webhooks test et live sont séparés
   dans Stripe.
4. Redéploie.
