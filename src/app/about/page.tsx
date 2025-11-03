import AboutHeader from '@/components/About/AboutHeader'
import SecondSession from '@/components/About/SecondSession'
import StarsOnInstagram from '@/components/About/StarsOnInstagram'
import React from 'react'

const page = () => {
  return ( 
    <div className='text-gray-900 '>
      <AboutHeader />
      <SecondSession />
      <StarsOnInstagram />
    </div>
  )
}

export default page