import React from 'react'
import { Badge } from './ui/badge'

const LatestJobsCards = () => {
    
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-3 mt-4 flex-wrap'>
            <Badge className="text-clrprime font-medium p-[5px] bg-slate-200 rounded-[4px]">SDE 1</Badge>
            <Badge className="text-clrprime font-medium p-[5px] bg-slate-200 rounded-[4px]">Part Time</Badge>
            <Badge className="text-clrprime font-medium p-[5px] bg-slate-200 rounded-[4px]">12LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCards
