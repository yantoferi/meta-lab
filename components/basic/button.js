"use client"

import { useContext } from 'react'
import { AppContext } from '../utils/context'

export default function Button() {
  const myContext = useContext(AppContext)

  return (
    <button type="button" className="absolute left-0 top-0"
      onClick={() => myContext.dispatch({type:'NEXT_STEP', value:'pass'})}
    >
      next
    </button>
  )
}