const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uvOffset;

  void main() {
    vUv = uv + uvOffset;
    #ifdef USE_INSTANCING
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
    #else
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    #endif
  }
`

const fragmentShader = `
  uniform sampler2D texture1;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(texture1, vUv);
  }
`


export {
    fragmentShader,
    vertexShader
}