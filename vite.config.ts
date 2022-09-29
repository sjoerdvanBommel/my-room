import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), CustomHmr()],
})

function CustomHmr() {
  return {
    name: 'custom-hmr',
    enforce: 'post' as const,
    // HMR
    handleHotUpdate({ file, server }) {
      server.ws.send({
        type: 'full-reload',          
        path: '*'
      });
    },
  }
}