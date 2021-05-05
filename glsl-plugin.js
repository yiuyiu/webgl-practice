const fileRegex = /\.glsl$/
function compileFileToJS(src){
    return `export default \`${src}\``
}
export default function myPlugin() {
  return {
    name: 'transform-shader-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src),
          map: null // provide source map if available
        }
      }
    }
  }
}