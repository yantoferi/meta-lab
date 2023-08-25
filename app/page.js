import Link from "next/link"
import Interface from "./view/interface"

export default function Home() {
  return (
    <>
      <h1 className="text-white">Hello 3d</h1>
      <div>
        <Link href="/tfps">Tutorial FPS</Link>
        <br />
        <Link href="/tvr">Tutorial VR</Link>
      </div>
      <Interface />
    </>
  )
}
