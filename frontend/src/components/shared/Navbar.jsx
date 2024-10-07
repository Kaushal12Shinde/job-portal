import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
    const user = false
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-medium">
            Job <span className="text-clrprime">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-[20px]">
          <ul className="flex items-center space-x-[20px]">
            <li><Link to='/'>Home</Link></li>
            <li> <Link to='/jobs'>Jobs</Link></li>
            <li> <Link to='/browse'>Browse</Link></li>
          </ul>
          {
            !user? (
                <div className="flex items-center gap-[10px]">
                    <Link to='/login'><Button variant="outline">Login</Button></Link>
                    <Link to='/signup'><Button className="bg-clrprime">Signup</Button></Link>
                </div>
            ) : (
                <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex items-center gap-[12px]">
                        <Avatar>
                            <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium leading-none">Kaushal Shinde</p>
                            <p className="text-sm text-muted-foreground">Lorem, ipsum dolor.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[12px] my-[6px]">
                        <User2 className="w-[25px]"/>
                        <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex items-center gap-[12px] my-[6px]">
                        <LogOut className="w-[25px]"/>
                        <Button variant="link">Logout</Button>
                    </div>
    
                </PopoverContent>
              </Popover>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
