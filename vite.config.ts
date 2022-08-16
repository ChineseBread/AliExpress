import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import flexBugsFixes from 'postcss-flexbugs-fixes'
import presetEnv from 'postcss-preset-env'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //less配置
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled:true
      }
    },
    postcss:{
      plugins:[
        flexBugsFixes,
        presetEnv({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
            }
        }),
      ]
    }
  },
  //服务器端口
  server:{
    port:3000
  },
  resolve:{
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    //路径别名
    alias:{
      '@utils': path.resolve(__dirname,'src/utils'),
      '@pages': path.resolve(__dirname,'src/pages'),
      '@components':path.resolve(__dirname,'src/components'),
      '@styles':path.resolve(__dirname,'src/styles'),
      '@config':path.resolve(__dirname,'src/config'),
      '@type':path.resolve(__dirname,'src/type'),
      "rc-picker/es/generate/moment": "rc-picker/es/generate/dayjs",
    },
  },
})
