import glslPlugin from './glsl-plugin';
const { resolve } = require('path')
export default {
    plugins: [
        glslPlugin()
    ],
    resolve: {
        alias: [{
            find: 'common',
            replacement: '/common'   //不用slash而用./的话地址就会resolve成"@fs/common"
        }]
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                drawTriangle: resolve(__dirname, 'draw-triangle/index.html'),
                camera: resolve(__dirname, 'camera/index.html')
            }
        }
    }
}