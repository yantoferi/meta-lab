"use client"

import { useRef, useMemo } from "react"
import { KeyboardControls, View } from "@react-three/drei"
import { XR } from "@react-three/xr"
import { gate } from "../utils/tunnel"

function Views(props) {
  const target = useRef()
  const mapKeys = useMemo(() => [
    { name: "forward", keys: ["w"] },
    { name: "backward", keys: ["s"] },
    { name: "left", keys: ["a"] },
    { name: "right", keys: ["d"] },
    { name: "jump", keys: ["Space"] },
    { name: "pov", keys: ["c"] },
  ], []
  )

  return (
    <>
      <div ref={target} className={props.className} />
      <gate.In>
        <View track={target}>
          <XR referenceSpace="local">
            <KeyboardControls map={mapKeys}>
              {props.children}
            </KeyboardControls>
          </XR>
        </View>
      </gate.In>
    </>
  )
}

export {
  Views,
}