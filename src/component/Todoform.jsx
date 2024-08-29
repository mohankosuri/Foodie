import React from 'react';

const Todoform = () => {
    const books = [
        { name: "hello", description: "kajshjads" },
        { name: "hello1", description: "kajshjads" },
        { name: "hello2", description: "kajshjads" },
        { name: "hello3", description: "kajshjads" }
    ];

    return (
        <div className='flex justify-center items-center'>
            <div className='bg-orange-300 w-[500px] p-4'>
                {books.map((book, index) => (
                    <div key={index} className='mb-2 bg-black text-white p-4'>
                        <h3 className='font-bold'>{book.name}</h3>
                        <p>{book.description}</p>
                        <div className='flex justify-end space-x-4'>
                            <button>submit</button>
                            <button>edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todoform;
