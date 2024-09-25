import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button variant={'outline'}
      size={'lg'}
      className='w-full'
      // onClick={()=>{}}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default Social
