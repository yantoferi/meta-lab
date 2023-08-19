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

export {
  HomeLight,
}