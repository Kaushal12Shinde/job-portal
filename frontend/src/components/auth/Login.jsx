import React, {useState} from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'


const Login = () => {

  const host = 'http://localhost:8000/api/v1/user'

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(store =>  store.auth);

  const [input, setInput] = useState({
    email:'',
    password:'',
    role:''
  });

  const changeEventHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value}); 
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email',input.email);
    formData.append('password',input.password);
    formData.append('role',input.role);

    try{
      dispatch(setLoading(true));
      const res = await axios.post(`${host}/login`,formData,{
        headers: {
          "Content-Type":"application/json"
        },
        withCredentials:true,
      });

      if(res.data.status){
        navigate("/");
        console.log(res.data.message);
      }
    } 
    catch(error){
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
    <Navbar/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={submitHandler} className='max-w-[550px] border border-clrprime/50 rounded-2xl p-4 my-10'>
       <h1 className='font-bold text-xl mb-5'>Login</h1>
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
         <Label>Password</Label>
         <Input
           type="password"
           name="password"
           value={input.password}
            onChange={changeEventHandler}
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
       </div>
       <div className='max-w-[300px] mx-auto'>
       {
          loading ?
            <Button type="submit" className='w-full my-4 bg-clrprime'><Loader2 className='mr-2  h-4 w-4'/> Please Wait</Button> 
            : 
            <Button type="submit" className='w-full my-4 bg-clrprime'>Login</Button>
       }
       </div>
       <p className='text-center mb-0'>Don't have an account? <Link className='text-clrprime underline' to='/signup'>Sign Up</Link> </p>
      </form>  
    </div>
   </div>
  )
}

export default Login