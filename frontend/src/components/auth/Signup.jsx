import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const host = 'http://localhost:8000/api/v1/user'
  const [input, setInput] = useState({
    fullname:'',
    email:'',
    password:'',
    phoneNumber:'',
    role:'',
    file:'',
  });

  const changeEventHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value}); 
  }

  const changeFileHandler = (e) =>{
    setInput({...input, file:e.target.files?.[0]});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{

      const formData = new FormData();
      formData.append('fullname',input.fullname);
      formData.append('email',input.email);
      formData.append('password',input.password);
      formData.append('phoneNumber',input.phoneNumber);
      formData.append('role',input.role);
      // if(input.file){
      //   formData.append('file',input.file);
      // }
      const response = await axios.post(`${host}/register`,formData,{
        headers: {
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });

      console.log(response);
    } 
    catch{
      alert('Error');
    }
  }

  return (
    <div>
     <Navbar/>
     <div className='flex items-center justify-center max-w-7xl mx-auto'>
       <form onSubmit={submitHandler} className='max-w-[550px] border border-clrprime/50 rounded-2xl p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
        <div  className='my-2'>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Kaushal Shinde"
          />
        </div>
        <div className='my-2'>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="kaushalshinde@gmail.com"
          />
        </div>
        <div className='my-2'>
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            type="number"
          />
        </div>
        <div className='my-2'>
          <Label>Password</Label>
          <Input
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            type="password"
            placeholder="******"
          />
        </div>

        <div className='my-2 flex items-center  justify-between gap-6'>
          <RadioGroup defaultValue="student" className="flex items-center gap-4 my-2">
            <div className="flex items-center space-x-2">
              <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className= "cursor-pointer"
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className= "cursor-pointer"
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>
          <div className='flex items-center gap-2'>
            <Label>Profile</Label>
            <Input 
              accept='image/*'
              type="file"
              onChange={changeFileHandler}
              placeholder="Upload Profile"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className='max-w-[300px] mx-auto'>
          <Button type="submit" className='w-full my-4 bg-clrprime'>Sign Up</Button>
        </div>
        <p className='text-center mb-0'>Already have an account? <Link className='text-clrprime underline' to='/login'>Login</Link> </p>
       </form>  
     </div>
    </div>
  )
}

export default Signup
