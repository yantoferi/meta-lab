import Link from 'next/link'

export default function Home() {
  return (
    <div className="md:container mx-auto">
      <Link href="/trainfps" className="text-black">To fps tutorial</Link>
    </div>
  )
}
