import React from 'react'

const BigLogo = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="h-40 w-44 bg-blue-100 p-8 mt-8 mb-4 rounded-full flex justify-center items-center">
                <img
                    src="/logo.svg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    )
}

export default BigLogo