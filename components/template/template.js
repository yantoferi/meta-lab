"use client"

import Scene from '@/components/canvas/scene'
import { useReducer, useRef } from 'react'
import { AppContext } from '../utils/context'

export default function Template({ children }) {
  const parent = useRef()

  // Reducer for global state
  const [task, dispatch] = useReducer(reducer, initialState)

  return (
    <div ref={parent} className='w-full h-screen relative bg-white'>
      <AppContext.Provider value={{task, dispatch}}>
        {children}
        <Scene source={parent} />
      </AppContext.Provider>
    </div>
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        step: [...state.step, action.value]
      }
  
    default:
      break;
  }
}

const initialState = {
  step: [],
}