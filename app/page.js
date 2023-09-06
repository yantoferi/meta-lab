import Link from 'next/link'

export default function Home() {
  return (
    <div className="md:container mx-auto">
      <div>
        <Link href="/trainfps" className="text-black">To fps tutorial</Link>
      </div>
      <div>
        <Link href="/trainvr" className="text-black">To vr tutorial</Link>
      </div>
    </div>
  )
}
