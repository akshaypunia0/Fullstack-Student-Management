import React from 'react'

const Input = ({ placeholder, value, onChange, type, id, name }) => {
    return (
        <div>
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full h-[50px] px-3 py-2 mb-3 border-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-300 text-white"
            />
        </div>
    )
}

export default Input