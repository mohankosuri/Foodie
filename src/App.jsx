import React,{useState} from 'react';
import Todoform from './component/Todoform';
import TodoEditingform from './component/TodoEditingform';
import { InputText } from 'primereact/inputtext';
 
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import ProductsDemo from './component/Grid';
import CircularDemo from './component/Carousal';
import Chef from './assets/ch.png'

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

 
 import { Button } from 'primereact/button';
import Example from './component/Example';
import Logo from './assets/test.png'
import Imagecard from './component/Imagecard';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import FoodCard from './component/FoodCard';


const App = () => {

  const[show,setShow]=useState(false)
  const [date, setDate] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];


  return (
    <div>
<Navbar/>

<Hero/>
<div className='mt-[100px] flex flex-wrap space-x-2 p-2'>
<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>
<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>
<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>
<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>

<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>

<div>
<FoodCard
        imageSrc={Chef}
        title="Chicken Curry"
        description="This is a simple card with an image and a description using React and Tailwind CSS."
      />
</div>



</div>
   
 {/*<Example/>
    
   <div className='flex justify-end'>
   <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} />
        </div>
  <button className='bg-black text-white py-2 px-4 rounded-md m-[20px]' onClick={()=>setShow(!show)}>Add To</button>
    
   </div>
    <div className='flex justify-center items-center'>

   
     
     {show? <Todoform/>:<ProductsDemo/>}
    </div>*/}

     
 
    
    </div>
  );
}

export default App;
