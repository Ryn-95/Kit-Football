# Déploiement KIT FOOTBALL

## Images des Maillots

Les images des maillots (dossier `public/maillots/`) ne sont **pas** incluses dans le repository GitHub car elles sont trop volumineuses (320+ MB).

### Pour le déploiement sur Vercel:

1. Les images doivent être présentes localement dans `public/maillots/`
2. Lors du déploiement, Vercel uploadera automatiquement tout le contenu du dossier `public/`
3. Le site utilisera automatiquement ces images une fois déployé

### Structure actuelle:
- **1000 dossiers** de maillots dans `public/maillots/`
- Chaque dossier contient 5-30 images du maillot
- Le système de catalogue scanne automatiquement ces dossiers au build

### Prix configurés:
- **Maillots Fan Edition**: 29€
- **Maillots Player Edition**: 34€

### SEO optimisé:
- Sitemap dynamique avec tous les maillots
- Métadonnées enrichies
- Schema.org pour Google
- Contenu SEO sur la page d'accueil
- Plus de 1000 pages de produits indexables

## Commandes de déploiement:

```bash
# Build local
npm run build

# Déployer sur Vercel
vercel --prod

# Ou via Git (push automatique)
git push origin main
```

## Note importante:
Les images sont déjà présentes localement. Vercel les déploiera automatiquement lors du prochain push ou déploiement manuel.
