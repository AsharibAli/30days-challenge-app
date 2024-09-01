import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DayPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Day {id}</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Welcome to Day {id} of your journey. Todays adventure awaits!
      </p>
      <Link href="/">
        <Button variant="outline">Return to Globe</Button>
      </Link>
    </div>
  )
}