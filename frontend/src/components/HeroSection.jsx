import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <div className='text-center flex flex-col gap-5 my-10'>
        <span className='mx-auto py-2 px-4 rounded-full bg-slate-100 tracking-wide text-clrprime font-medium'>No. 1 Job Hunt Websites</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br />Get Your <span className='text-clrprime'>Dream Job</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, deleniti. Lorem ipsum dolor sit.</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 items-center gap-4 mx-auto rounded-full">
            <input 
                type="text"
                placeholder='Find Your Jobs'
                className='outline-none border-none w-full'
            />
            <Button className="rounded-r-full bg-clrprime"> 
                <Search className='w-5 h-5'/>
            </Button>
        </div>
    </div>
  )
}

export default HeroSection
