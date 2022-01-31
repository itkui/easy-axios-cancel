import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  return {
    root: process.cwd(),
    build: {
      target: ["esnext", "es2015"],
      outDir: "lib",
      lib: {
        entry: resolve(__dirname, 'src'),
        name: 'easy-axios-cancel',
        formats: ["umd", "es"],
        fileName: (format) => `easy-axios-cancel.${format}.js`
      }
    }
  }
})