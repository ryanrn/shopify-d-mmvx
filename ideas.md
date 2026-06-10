# DØMMVX Hero Section — Brainstorm de Design

## Contexto
Hero Section fullscreen (100vh) para a marca DØMMVX, inspirada em Balenciaga, Rick Owens, Helmut Lang e Maison Margiela. O drop é de uma jaqueta vinho. Estética brutalista, minimalista, editorial de moda de luxo.

---

<response>
## Ideia 1: "Void Architecture" — Brutalismo Espacial

<probability>0.07</probability>

<idea>

**Design Movement:** Brutalismo Digital + Arquitetura Deconstructivista (Zaha Hadid meets Helmut Lang)

**Core Principles:**
1. O vazio como elemento de design — grandes áreas de preto absoluto criam tensão visual
2. Tipografia como arquitetura — letras são estruturas, não apenas texto
3. Assimetria radical — nada está centralizado, tudo flutua com intenção
4. Escassez visual = exclusividade percebida

**Color Philosophy:**
- Preto profundo (#0A0A0A) como "canvas infinito" — representa o vazio antes da criação
- Branco (#F5F5F5) usado apenas para tipografia principal — contraste máximo, impacto brutal
- Cinza metálico (#4A4A4A) para elementos secundários — sugere materialidade industrial
- Vinho escuro (#3D0F0F) como accent mínimo — apenas em linhas divisórias e micro-detalhes

**Layout Paradigm:**
- Split assimétrico 65/35 — lado esquerdo dominado por tipografia gigante, lado direito pela imagem
- Grid invisível com 12 colunas, mas elementos "quebram" o grid intencionalmente
- Espaço negativo extremo entre elementos — mínimo 120px entre blocos
- Elementos posicionados com offsets que criam tensão visual (texto levemente fora do alinhamento esperado)

**Signature Elements:**
1. Linha vertical brutalista de 1px que divide a tela — animada com fade-in lento
2. Contador de unidades com tipografia monospace industrial (estilo painel de aeroporto)
3. Micro-texto rotacionado 90° na lateral esquerda ("DROP 001 — LIMITED EDITION")

**Interaction Philosophy:**
- Hover revela informação oculta — como descobrir segredos em uma galeria
- Cursor personalizado minimalista (crosshair fino)
- Elementos reagem ao mouse com parallax sutil (2-5px de deslocamento)

**Animation:**
- Entrada: letras do "DØMMVX" aparecem uma a uma com 80ms de delay entre elas, de baixo para cima
- Imagem: fade-in com scale de 1.02 para 1.0 (3s, ease-out)
- Linha divisória: cresce de 0 para 100% da altura em 1.5s
- Contador: números "rolam" como um odômetro mecânico

**Typography System:**
- Display: "Monument Extended" ou similar — ultra-bold, condensed, tracking +0.3em
- Body: "Neue Haas Grotesk" / "Helvetica Neue" — light weight, tracking +0.15em
- Accent: "JetBrains Mono" — para contador e dados técnicos
- Hierarquia: Display 8-12vw, Subtitle 1.2rem, Body 0.75rem

</idea>
</response>

---

<response>
## Ideia 2: "Editorial Noir" — Revista de Moda Cinematográfica

<probability>0.06</probability>

<idea>

**Design Movement:** Editorial de Moda Noir + Cinema Neo-Expressionista (Wong Kar-wai meets Rick Owens)

**Core Principles:**
1. Cada frame é uma fotografia editorial — composição cinematográfica
2. Texto e imagem competem por atenção — tensão proposital
3. Camadas de profundidade — elementos sobrepostos criam dimensionalidade
4. Tempo como elemento de design — revelação progressiva

**Color Philosophy:**
- Preto (#0A0A0A) como "escuridão cinematográfica" — o fundo de um set de filmagem
- Off-white (#E8E4E0) para tipografia — mais quente que branco puro, evoca papel de revista vintage
- Vinho profundo (#4A1520) como glow sutil atrás da imagem — luz de bastidor
- Cinza grafite (#2A2A2A) para superfícies elevadas — cards e overlays

**Layout Paradigm:**
- Composição em "Z" — olho percorre: logo top-left → imagem center-right → CTA bottom-left
- Imagem sangra para fora do container (overflow hidden com 10% cortado)
- Texto sobrepõe parcialmente a imagem — criando profundidade de camadas
- Margens assimétricas: left 8%, right 4% — cria movimento direcional

**Signature Elements:**
1. Overlay de grain/noise sutil (opacity 3%) sobre toda a seção — textura de filme analógico
2. Borda fina (#4A1520) ao redor da imagem com 8px de gap — como uma moldura de galeria
3. Indicador "EXCLUSIVE" com animação de pulse lento — como um heartbeat

**Interaction Philosophy:**
- A imagem respira — scale oscila entre 1.0 e 1.01 em loop infinito (8s)
- Hover na imagem remove o grain overlay — revela clareza
- Scroll suave dispara parallax com velocidades diferentes por camada

**Animation:**
- Entrada: fade-in global de 0.8s, seguido por slide-up do texto (400ms, staggered)
- Imagem: clip-path reveal da esquerda para direita (1.2s, cubic-bezier)
- Grain: animação de posição do background (loop infinito, 0.5s)
- Contador: typewriter effect — números aparecem um a um

**Typography System:**
- Display: "Cormorant Garamond" Italic Bold — elegância editorial, serif dramático
- Headlines: "Oswald" ou "Bebas Neue" — condensed sans-serif para contraste
- Body: "Inter" Light — neutralidade moderna
- Accent: "Space Mono" — dados e informações técnicas
- Hierarquia: Display 6-9vw, Headlines 2rem, Body 0.8rem

</idea>
</response>

---

<response>
## Ideia 3: "Raw Concrete" — Materialidade Industrial

<probability>0.09</probability>

<idea>

**Design Movement:** Brutalismo Material + Design Industrial Japonês (Tadao Ando meets Comme des Garçons)

**Core Principles:**
1. Materialidade digital — superfícies que parecem ter peso e textura
2. Geometria pura — retângulos, linhas, ângulos de 90°, sem curves
3. Informação como ornamento — dados técnicos são o decorativo
4. Silêncio visual — o que NÃO está lá é tão importante quanto o que está

**Color Philosophy:**
- Preto absoluto (#0A0A0A) — o vazio, a ausência
- Cinza concreto (#1C1C1C) para superfícies — evoca concreto aparente
- Branco cirúrgico (#FAFAFA) — preciso, limpo, sem calor
- Vinho oxidado (#5C1A1A) — como ferrugem nobre, usado em 1-2 elementos apenas

**Layout Paradigm:**
- Grid rígido de 8 colunas com gutters de 2px (visíveis como linhas sutis)
- Layout em "L" invertido — texto ocupa coluna vertical esquerda, imagem preenche o restante
- Todos os elementos alinhados a uma baseline grid de 8px
- Zero border-radius em qualquer elemento — brutalismo puro

**Signature Elements:**
1. Grid lines visíveis (opacity 5%) como guias de construção — estética de blueprint
2. Números de edição estampados como "marca d'água" (opacity 8%) — "001/050"
3. Barra de progresso linear no topo — indica scroll ou tempo restante do drop

**Interaction Philosophy:**
- Interações são "mecânicas" — cliques produzem feedback instantâneo sem ease
- Hover adiciona borda de 1px — como selecionar um objeto em software de design
- Elementos se movem em incrementos de 4px — nunca smooth, sempre grid-snapped

**Animation:**
- Entrada: sem fade — elementos aparecem instantaneamente com 200ms de delay staggered (brutalismo = sem suavidade)
- Imagem: sem animação de entrada, apenas parallax no scroll (translateY -20px)
- Contador: atualiza com "flash" — opacity 0 por 50ms, depois 1 (como display digital)
- Linha divisória: aparece de cima para baixo, 800ms, linear (não ease)

**Typography System:**
- Display: "Archivo Black" ou "Anton" — grotesque ultra-bold, sem serifa, máximo impacto
- Body: "IBM Plex Sans" — industrial, técnica, germânica
- Data: "IBM Plex Mono" — monospace para dados, contadores, códigos
- Hierarquia: Display 10-14vw (sim, gigante), Body 0.7rem (sim, minúsculo) — contraste extremo
- Tracking: +0.4em no display, +0.2em no body — espaçamento como respiração

</idea>
</response>

---

## Decisão

**Selecionada: Ideia 1 — "Void Architecture" (Brutalismo Espacial)**

Justificativa: Esta abordagem captura perfeitamente a essência da DØMMVX como marca de luxo independente. O brutalismo espacial com tipografia arquitetônica e vazio intencional cria a sensação de exclusividade e escassez que o brief demanda. A assimetria radical diferencia completamente de lojas Shopify genéricas, e o uso do vazio como elemento de design reflete a filosofia de marcas como Maison Margiela e Helmut Lang.
