declare module '*.glsl' {
    const content: any;
    export default content;
}
declare module 'common' {
    const initWebGL: (vertex: any, fragment: any, canvasSelector?: string) => {
        gl: WebGLRenderingContext;
        program: WebGLProgram;
    }
    const ui: {
        setupUI: () => {},
        updateUI: () => {},
        setupSlider: (selector: string, {

        }) => {},
        setupInput: (selector: string, {

        }) => {},
        makeSlider: () => {},
        makeCheckbox: () => {}
    }
    const transform: {
        translation: (tx: number, ty: number, tz: number) => number[],
        multiply: (m1: number[], m2: number[]) => number[],
        inverse: (m1: number[]) => number[],
        transpose: (m1: number[]) => number[],
        xRotation: (angleInRadians: number) => number[],
        yRotation: (angleInRadians: number) => number[],
        perspective: (fieldOfViewInRadians, aspect, near, far) => number[]
    }
    export {
        initWebGL, ui, transform
    }
}