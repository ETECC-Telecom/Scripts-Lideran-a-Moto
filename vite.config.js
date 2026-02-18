import { defineConfig } from 'vite';

export default defineConfig({
  // O ponto antes da barra faz os caminhos ficarem relativos (./)
  // Isso corrige o erro de MIME type e 404 no mobile/GitHub Pages
  base: './', 
  build: {
    outDir: 'docs', // Faz o build ir para a pasta docs automaticamente
  },
});