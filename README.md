# Arthur Marinho — Portfolio

Site estático (HTML/CSS/JS puro) recriado a partir do design original
"Portfolio Arthur Marinho - Standalone.html" — mesmo layout, textos e estilo
(Archivo, roxo `#6b30ec`, fundo pontilhado, cards com sombra dura).

Publicado em: https://arthurpontomarinho.github.io/portfolio/

## Páginas

`#jogos` · `#apps` · `#arte` · `#sobre` · `#contato` · detalhe de projeto em `#p/<slug>` (ex.: `#p/boys`).

## Estrutura

```
Portfolio/
├── index.html              ← todas as páginas (Jogos, Apps, Arte, Sobre, Contato)
├── css/style.css           ← design system + estilos do design original
├── css/site.css            ← ajustes do site estático (imagens, zoom, mobile)
├── js/app.js               ← navegação entre páginas, detalhe do projeto, zoom, formulário
├── content/
│   ├── projects.json       ← ✏️ textos e imagens dos projetos (páginas de detalhe)
│   └── data.js             ← gerado pelo build (não editar)
├── assets/
│   ├── orig/               ← imagens que já estavam no design original
│   ├── art/                ← imagens do acervo que completam as grades de Arte
│   ├── img/<slug>/         ← galerias dos projetos (geradas do acervo)
│   ├── fonts/              ← Archivo (woff2)
│   └── sobre-foto.jpg
├── curriculo-arthur-marinho.pdf
├── scripts/build.py        ← gera assets/img e data.js a partir do acervo
└── acervo/                 ← ORIGINAIS em alta (fora do git)
```

## Editar projetos

1. Edite `content/projects.json` (textos `meta`, `lead`, `role`, `tags`; pastas `sources`;
   `cover` = arquivo do acervo que abre a galeria; `process` = pastas para "Processo de design").
2. Rode o build e abra localmente:

```bash
python3 scripts/build.py
```

```bash
python3 -m http.server 8420
```

3. Ao trocar CSS/JS, aumente o `?v=N` dos links no `index.html` (evita cache do navegador).
4. `git add -A && git commit -m "..." && git push` — o GitHub Pages atualiza em ~1 min.

## Pendências

- [ ] `curriculo-arthur-marinho.pdf` é o currículo antigo (2021) — trocar pela versão atual.
- [ ] Contato: ArtStation e Itch.io do original não tinham link; trocados por Behance e Tumblr.
- [ ] Mad Brains: o card diz "puzzle autoral", mas o acervo/Tumblr descrevem um jogo de arena com zumbis (Mazari).
- [ ] Projetos do acervo fora do design: Bosch, GFT, Unipar, Move Fever, Sensorial, protótipos pessoais.
