import React from 'react'
import Logo from '../assets/cooo.png'


const Imagecard = () => {
  return (
    <div>
    <div className=' flex justify-center items-center w-[250px] h-[250px] rounded-full shadow-md shadow-cyan-500'>
    <img src={Logo} alt="Logo" className='h-[200px] w-[200px]'/>
    
    </div>
    </div>
  )
}

export default Imagecard