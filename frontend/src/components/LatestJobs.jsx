import React from 'react'
import LatestJobsCards from './LatestJobsCards'

const LatestJobs = () => {
  const latestJobList = [1,2,3,4,5,6,7,8]
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-3xl font-bold text-center'>Latest & Top Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          latestJobList.slice(0,6).map((card,index)=>(
            <LatestJobsCards/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestJobs
