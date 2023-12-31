import { TextInputStyle } from '@/constants';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, rightIcon = '', ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `${TextInputStyle} focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                className
            }
            ref={input}
        />
    );
});
