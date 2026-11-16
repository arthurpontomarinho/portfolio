# Arthur Marinho — Portfolio

Site estático (HTML/CSS/JS puro, sem frameworks) do meu portfolio de Game UI/UX, VR, voxel art e ilustração.

## Estrutura

```
Portfolio/
├── index.html              ← página do site
├── css/style.css           ← visual (paleta do currículo: cobalto, coral, pêssego)
├── js/main.js              ← grade, filtros, página do projeto, lightbox
├── content/
│   ├── projects.json       ← ✏️ FONTE ÚNICA: perfil + projetos (edite aqui)
│   └── data.js             ← gerado pelo build (não editar)
├── assets/img/<projeto>/   ← imagens otimizadas (geradas, versionadas)
├── scripts/build.py        ← gera assets/ e data.js a partir do acervo
└── acervo/                 ← ORIGINAIS em alta (fora do git)
    ├── Projetos/<Empresa>/<Projeto>/
    ├── 3D/  (Voxel/, low poly)
    ├── Ilustrações/  (Pixel Art/, vetor)
    ├── Curriculo/
    └── Organizar/          ← caixa de entrada para arquivos novos
```

## Fluxo de trabalho

1. Coloque os arquivos originais numa pasta em `acervo/Projetos/<Empresa>/<Projeto>/`.
2. Adicione (ou edite) o projeto em `content/projects.json`:
   - `sources`: pastas do acervo de onde vêm as imagens
   - `cover`: nome do arquivo que deve ser a capa
   - `featured: true`: aparece no mosaico do topo
   - `maxImages`: limite de imagens na galeria (padrão 14)
   - `draft: true`: esconde o projeto
3. Rode o build:

```bash
python3 scripts/build.py
```

4. Abra o site localmente:

```bash
python3 -m http.server 8420
```

e acesse http://localhost:8420

## Publicar (GitHub Pages)

Depois de criar o repositório no GitHub e dar push, em **Settings → Pages** escolha a branch `main` / pasta raiz.
O site fica em `https://<usuario>.github.io/<repo>/`.

## Pendências

- [ ] **Sensorial**: falta a pasta de imagens no acervo (está como `draft`).
- [ ] Conferir anos/clientes em branco em `projects.json`.
- [ ] `acervo/Projetos/Arvore/Hero - cópia` é cópia idêntica de `Hero` (pode apagar, 41 MB).
- [ ] `acervo/Projetos/Freelas/Jogo Pierre` está vazia.
- [ ] Vídeos `.mp4` de `acervo/3D/Voxel` ainda não estão no site.
