import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo"
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-10 justify-between">
          <div className="">
            <Link to={"/"}>
              <Logo w={90} h={50}/>
            </Link>
          </div>
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type='text'
                placeholder='search for product here'
                className='outline-none w-full '
              />
              <div className="text-lg min-w-[50px] h-8 bg-red-600 rounded-r-full text-white  flex justify-center items-center">
                <LuSearch/>
              </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="text-3xl cursor-pointer">
              <FaRegCircleUser/>
            </div>
            <div className="text-2xl relative">
              <span><FaShoppingCart/></span>
              <div>
                <span className="text-xs bg-red-600 text-white  w-5 h-5 flex items-center justify-center rounded-full p-1 absolute -top-2 -right-3">0</span>
              </div>
            </div>
            <div>
              <Link to={"/Login"} className="text-sm text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700">Login</Link>
            </div>
          </div>
      </div>

      
    </header>
  )
}

export default Header
