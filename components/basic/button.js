"use client"

function Button(props) {
  return (
    <button type="button" className="absolute left-0 top-0 text-black"
      onClick={() => props.clicked('passed')}
    >
      next
    </button>
  )
}

function FpsButton() {
  return (
    <button id="startfps" type="button" className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black z-10'>
      Start
    </button>
  )
}

export {
  Button,
  FpsButton
}