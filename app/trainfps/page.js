import dynamic from 'next/dynamic'
import styles from '../app.module.css'
import Contents from './contents'
import Button from '@/components/basic/button'

const Views = dynamic(() => import("@/components/canvas/views"), {
  loading: () => (
    <div className={styles['custom-loader']}></div>
  )
})

export default function TrainFps() {
  return (
    <>
      <Button />
      <Views className="w-full h-full">
        <Contents />
      </Views>
    </>
  )
}