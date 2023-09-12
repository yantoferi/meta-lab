"use client"

import Scene from '@/components/canvas/scene'
import { useReducer, useRef } from 'react'
import { AppContext } from '../utils/context'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function Template({ children }) {
  const parent = useRef()

  // Reducer for global state
  const [task, dispatch] = useReducer(reducer, initialState)

  return (
    <div ref={parent} className='w-full h-screen relative bg-white'>
      <AppContext.Provider value={{task, dispatch}}>
        {children}
        <Scene source={parent} />
        <ToastContainer
          newestOnTop
          position='top-left'
          hideProgressBar
          closeOnClick
          theme='dark'
          style={{zIndex: "10000"}}
        />
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