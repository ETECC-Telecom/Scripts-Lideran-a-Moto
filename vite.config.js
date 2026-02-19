import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // O ponto antes da barra faz os caminhos ficarem relativos (./)
  // Isso corrige o erro de MIME type e 404 no mobile/GitHub Pages
  base: '/Scripts-Lideran-a-Moto/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o PWA automaticamente quando há código novo
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.svg'],
      manifest: {
        name: 'Scripts Liderança Moto',
        short_name: 'LiderançaMoto',
        description: 'Vistoria técnica de frotas de motocicletas',
        theme_color: '#212529', // Cor do Bootstrap Dark
        background_color: '#212529',
        display: 'standalone', // Faz o app parecer um aplicativo nativo (sem barra de URL)
        start_url: '.',
        icons: [
          {
            src: 'logo.svg', // Use sua logo nova!
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'docs', // Faz o build ir para a pasta docs automaticamente
  },
});