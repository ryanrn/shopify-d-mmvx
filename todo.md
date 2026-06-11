

## Integração Shopify (jbakjn-af)

- [x] Registrar commerceRouter em server/routers.ts
- [x] Exportar SHOPIFY_STORE_DOMAIN e SHOPIFY_STOREFRONT_API_ACCESS_TOKEN em env.ts
- [x] Descobrir produtos existentes na loja via MCP
- [x] Criar e publicar produto Jaqueta Vinho DROP 001 (4 variantes P/M/G/GG)
- [x] Verificar catálogo com pnpm shopify:probe
- [x] Envolver app com CartProvider
- [x] Wire ProductDetails com dados reais do produto + variantes
- [x] Wire botões ADQUIRIR/ADICIONAR À SACOLA com useCart()
- [x] Adicionar drawer de carrinho + ícone na nav com contador
- [x] Rodar testes vitest (commerce + smoke + cart flow) e validar no navegador


## Lookbook + Admin (gate de senha)

- [x] Criar tabela site_settings (gate ativo + hash de senha) no schema
- [x] db helpers para ler/atualizar site_settings
- [x] Procedures: siteConfig.status (público), unlock (público), adminGet/setGate (admin)
- [x] Página Lookbook (/lookbook) placeholder editorial brutalista
- [x] Link Lookbook na navegação
- [x] Gate de senha global: bloqueia site público quando ativo
- [x] Painel Admin (/admin) protegido por login/role admin
- [x] Toggle ativar/desativar proteção + definir senha no Admin
- [x] Testes vitest para procedures de gate (7 testes passando)
- [x] Validar no navegador (Lookbook + tela de acesso admin) + checkpoint
