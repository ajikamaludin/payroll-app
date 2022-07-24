import React from 'react'

export function Modal({ isOpen, toggleModal = () => {}, children }) {
    return (
        <div
            className={`overflow-y-auto overflow-x-hidden bg-opacity-50 dark:bg-opacity-50 bg-gray-500 dark:bg-gray-400 fixed flex right-0 left-0 top-0 z-50 justify-center items-center h-full md:inset-0 ${
                isOpen ? 'visible' : 'hidden'
            }`}
        >
            <div className={`md:relative fixed bottom-0 md:px-4 w-full max-w-lg h-auto`}>
                <div className="relative overflow-y-auto max-h-screen bg-white rounded-b-none rounded-t-lg md:rounded-lg shadow dark:bg-gray-800 pb-10 md:pb-0 ">
                    <div className="flex justify-end p-2">
                        <button
                            type="button"
                            onClick={() => toggleModal()}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className="pt-2 p-6 text-gray-500 dark:text-gray-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}