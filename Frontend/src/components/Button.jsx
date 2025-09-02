import React from 'react'

const Button = ({text, type, className, onClick}) => {

    const style = `w-[40%] px-4 py-2 ${className} text-white rounded-md hover:bg-blue-700 transition font-semibold shadow `
    return (
        <div>
            <button
                className={style}
                type={type}
                onClick={onClick}
            >
                {text}
            </button>

        </div>
    )
}

export default Button