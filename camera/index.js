import { initWebGL } from "common";
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
const gl = initWebGL(vertex, fragment);
