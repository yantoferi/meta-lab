"use client"

import { Dialog } from '@headlessui/react'
import { HiXMark } from 'react-icons/hi2'

export default function Modal(props) {
  return (
    <Dialog as='div' className='relative z-20' open={props.open} onClose={() => props.close()}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <Dialog.Panel className='absolute w-11/12 sm:w-8/12 md:w-7/12 lg:w-96 h-64 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 rounded-2xl p-4 flex flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between'>
              <Dialog.Title className="font-bold text-black">Tutorial gerakan</Dialog.Title>
              <button type="button" onClick={() => props.close()}>
                <HiXMark className='w-5 h-5 text-black' />
              </button>
            </div>
            <hr className='my-3' />
            <Dialog.Description className="text-black text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Dialog.Description>
          </div>
          <div className='text-end'>
            <button type="button" className='py-1 px-5 bg-blue-400 rounded-md text-white'>Next</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}