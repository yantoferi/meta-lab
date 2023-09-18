"use client"

function TrainLight() {
  return (
    <>
      <ambientLight color="white" intensity={1.5} />
      {/* <directionalLight color="white" intensity={2.5} position={[2, 5, 3]} castShadow /> */}
    </>
  )
}

function SimulationLight() {
  return (
    <>
      <ambientLight color="white" intensity={1.5} />
    </>
  )
}

export {
  TrainLight,
  SimulationLight
}