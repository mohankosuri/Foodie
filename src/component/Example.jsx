import React, { useState, useEffect } from 'react';

const Example = () => {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    const value = await fetch('https://fakestoreapi.com/products/1');
    const data1 = await value.json();

    console.log("data is", data1);

    setData([data1]); // Wrap the single object in an array since you are using map()

    console.log(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <ul key={item.id}>
          <li>{item.title}</li>
          <li>{item.price}</li>
          <li>{item.description}</li> 
        </ul>
      ))}
    </div>
  );
};

export default Example;
