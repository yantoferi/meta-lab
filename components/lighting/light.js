function HomeLight() {
  return (
    <>
      <ambientLight color="white" intensity={3} />
      <directionalLight color="white" intensity={2} position={[-4, 5, -2]} shadow-mapSize={2048} shadow-bias={0.001} castShadow>
        <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50, 0.05, 2000]} />
      </directionalLight>
    </>
  )
}

function TutorLighting() {
  return (
    <>
      <ambientLight color="white" intensity={1.3} />
      <directionalLight color="whitesmoke" intensity={3} position={[-3, 7, -5]} castShadow shadow-mapSize={2048} shadow-bias={0.001}>
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.05, 2000]} />
      </directionalLight>
    </>
  )
}

export {
  HomeLight,
  TutorLighting,
}