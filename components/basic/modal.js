"use client"

import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { HiXMark } from 'react-icons/hi2'

export default function Modal(props) {
  return (
    <Dialog as='div' className='relative' open={props.open} onClose={() => props.close()} style={{ zIndex: 10000 }}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <Dialog.Panel className='absolute w-11/12 sm:max-w-md h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 rounded-2xl p-4 flex flex-col justify-between'>
          <div className='grow'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className="font-bold text-black">{props.step?.length < 2? "Tutorial gerakan karakter":"Tutorial interaksi objek"}</Dialog.Title>
              <button type="button" onClick={() => props.close()}>
                <HiXMark className='w-5 h-5 text-black' />
              </button>
            </div>
            <hr className='my-3' />
            <div className='overflow-y-scroll h-48'>
              {(props.vrModal && props.keys) && <div className="h-44 relative">
                <Image src="/images/controllers.jpg" alt='Gambar layout controller' fill />
              </div>}
              <table className='table-auto w-full text-black'>
                <thead className='bg-[#f9f9f9] font-medium'>
                  <tr>
                    <td align='center' className='p-1 w-2/5'>Key</td>
                    <td align='center' className='p-1 w-3/5'>Kendali</td>
                  </tr>
                </thead>
                <tbody>
                  {props.keys?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='w-28'>
                          <div className='h-8 min-w-fit px-2 flex items-center justify-center text-black font-medium'>
                            {item.key}
                          </div>
                        </td>
                        <td className='text-sm'>{item.ket}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='text-end'>
            <button type="button" className='py-1 px-5 bg-blue-400 rounded-md text-white'>Next</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}