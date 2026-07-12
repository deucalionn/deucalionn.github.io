# [deucalionn.github.io](http://deucalionn.github.io)

## Développement

```bash
npm install
npm run dev
```

[http://localhost:4321](http://localhost:4321)

```bash
npm run build
```

## Contenu

Les articles sont dans `src/content/docs/`. Pour les conventions de rédaction (structure, graphiques, sources), voir [AGENTS.md](./AGENTS.md).

## Déploiement

Build local puis push sur la branche `gh-pages` :

```bash
npm run deploy
```

Configuration GitHub Pages (une fois) : **Settings → Pages → Deploy from branch → `gh-pages` / (root)**.

Le code source reste sur `main` ; seul le HTML généré (`dist/`) part sur `gh-pages`.
