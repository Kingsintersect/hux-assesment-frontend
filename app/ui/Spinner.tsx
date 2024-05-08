import React from 'react'
import { SVGProps } from 'react';

declare module 'react' {
    interface SVGProps<T> {
        circle?: React.SVGProps<SVGCircleElement>;
    }
}
const Spinner = () => {
    return (
        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm8-5.291a7.962 7.962 0 01-4 5.291V20c4.418 0 8-3.582 8-8h-4zM12 4a7.962 7.962 0 015.291 2H20C20 3.582 15.418 0 10 0v4z"></path>
        </svg>
    )
}

export default Spinner



export const SvgSpinner = ({ size = 24, color = '#000', thickness = 2 }) => {
    return (

        <div className='p-3 rounded-full border-4 border-orange-500 border-r-blue-700 animate-spin'></div>
    );
};

