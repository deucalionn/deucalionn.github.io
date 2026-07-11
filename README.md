# deucalionn.github.io

Blog statique (Astro) compatible avec les articles OpenKnowledge : `mermaid`, blocs `html preview`, sources publiées, catégories et tags.

## Développement

```bash
npm install
npm run dev
```

Ouvre http://localhost:4321

## Publier un article

1. Crée un dossier dans `src/content/docs/<slug>/`
2. Ajoute `article.md` (front matter avec `permalink`, `type: post`, `category`, `tags`)
3. Ajoute les sources dans `sources/*.md` (`type: source`, `permalink: /<slug>/sources/<nom>/`)
4. `git push` sur `main` → GitHub Actions déploie sur Pages

## Structure d'un article

```
src/content/docs/mon-article/
  article.md
  sources/
    ma-source.md
```

Les URLs viennent du champ `permalink` dans le front matter, pas du chemin disque.

## Déploiement

Configure GitHub Pages : **Settings → Pages → Source = GitHub Actions**.
