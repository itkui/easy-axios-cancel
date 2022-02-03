import { resolve } from 'path'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript';

const config = defineConfig({
  input: resolve(__dirname, 'src/index.ts'),
  output: [
    {
      file: 'lib/easy-axios-cancel.es.js',
      format: 'es'
    },
    {
      file: 'lib/easy-axios-cancel.umd.js',
      format: 'umd',
      name: 'EasyAxiosCancel'
    },
  ],
  plugins: [
    typescript()
  ]
})

export default config;