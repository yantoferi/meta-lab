import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './app.module.css'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function Home() {
  return (
    <div className="md:container mx-auto">
      <Link href="/trainfps" className="text-black">To fps tutorial</Link>
      <Views className="w-full h-80">
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </Views>
    </div>
  )
}
