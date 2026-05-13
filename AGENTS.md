# AGENTS.md

## Quick start

```zsh
git submodule update --init --recursive  # after clone
hugo server                              # dev server at http://localhost:1313
hugo                                     # build to ./public
hugo new content posts/my-post.md        # new post (uses Hugo defaults, no local archetypes)
```

## Repo facts

- **Framework**: [Hugo](https://gohugo.io/) static site, **PaperMod** theme (git submodule to `adityatelange/hugo-PaperMod`, min Hugo v0.146.0 per theme.toml).
- **Config**: `hugo.toml` (not `config.toml`). `markup.goldmark.renderer.unsafe = true` (raw HTML in markdown allowed). `baseURL = "https://chenzhuoji.github.io/"`.
- **Theme submodule is dirty** – uncommitted local modifications exist in `themes/PaperMod`. Do not update the submodule without checking what changed first.
- **No `.gitignore`** – `public/` was previously tracked and deleted; avoid re-committing build output.
- **No CI, no Makefile, no test/lint commands**.
- **Language**: `zh-cn`.
- **No content currently** – `content/` is empty; `archetypes/` does not exist.
