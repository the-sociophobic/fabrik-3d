const LowerPartGeometry = () =>
  <bufferGeometry>
    <bufferAttribute
      attach='attributes-position'
      array={new Float32Array([
        .5,  .5,  .5,
        .5,  .5, -.5,
        -.5,  .5, -.5,
        -.5,  .5,  .5,
        .5, -.5,  .5,
        .5, -.5, -.5,
        -.5, -.5, -.5,
        -.5, -.5,  .5,
      ])}
      count={8}
      itemSize={3}
    />
    <bufferAttribute
      attach='index'
      array={new Uint16Array([
        0, 4, 5,
        0, 5, 1,
        1, 5, 6,
        1, 6, 2,
        2, 6, 7,
        2, 7, 3,
        3, 7, 0,
        7, 4, 0,
        4, 6, 5,
        4, 7, 6,
      ])}
      count={30}
      itemSize={1}
    />
  </bufferGeometry>


const UpperPartGeometry = () =>
  <bufferGeometry>
    <bufferAttribute
      attach='attributes-position'
      array={new Float32Array([
         .5, .5,  .5,
         .5, .5, -.5,
        -.5, .5, -.5,
        -.5, .5,  .5,
      ])}
      count={4}
      itemSize={3}
    />
    <bufferAttribute
      attach='index'
      array={new Uint16Array([
        0, 1, 2,
        0, 2, 3,
      ])}
      count={6}
      itemSize={1}
    />
    <bufferAttribute
      attach='attributes-uv'
      array={new Float32Array([
        .25,   0,
        .25, .25,
          0, .25,
          0,   0,
      ])}
      count={4}
      itemSize={2}
    />
  </bufferGeometry>


export {
  LowerPartGeometry,
  UpperPartGeometry
}
