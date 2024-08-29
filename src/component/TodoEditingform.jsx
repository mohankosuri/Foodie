import React, { useState,useRef ,useEffect,createContext} from 'react';


 const TodoContext=createContext()

const TodoEditingform = ({ children }) => {
  const [todo, setTodo] = useState('');
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const inputRef=useRef(null)


  const currentref=useRef(0)



  
   

  const values=[]

  useEffect(() => {
     inputRef.current.focus()


  }, []);

  const handleSubmit = (e) => {
   
    e.preventDefault();
    setShow(true);
    // Add the current todo value to the items array
    setItems([...items, todo]);

    values.push(...items,todo)


    console.log(values)

    const g= values.length

    console.log(g)
    // Clear the input field
    setTodo('');
  };

  return (
    <div className='bg-slate-600 p-[50px]'>

    <TodoContext.Provider value={{ values,items }}>
      {children}
    </TodoContext.Provider>
    
      <form onSubmit={handleSubmit} className=''>
        <div className='flex space-x-2'>
          <div>{show && <div>{items.map((item, index) => <div key={index}>{item}</div>)}</div>}</div>
          <input 
            onChange={(e) => setTodo(e.target.value)} 
            value={todo} 
            placeholder="Enter todo"
            ref={inputRef}
          />
          <button type='submit' className='bg-black text-white py-1 px-4 rounded-md'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TodoEditingform;
