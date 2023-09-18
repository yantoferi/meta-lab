"use client"

import dynamic from "next/dynamic"

const Bottle = dynamic(() => import("@/components/asset/bottle").then(mod => mod.Bottle))

export default function Experices(props) {
  return (
    <>
      {props.step?.length === 2 && <Bottle />}
    </>
  )
}