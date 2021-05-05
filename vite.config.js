import glslPlugin from './glsl-plugin';
export default {
    plugins: [
        glslPlugin()
    ],
    resolve: {
        alias: [{
            find: 'common',
            replacement: '/common'   //不用slash而用./的话地址就会resolve成"@fs/common"
        }]
    }
}