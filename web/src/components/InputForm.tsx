import { Eye, EyeSlash } from 'phosphor-react'
import React, { ClassAttributes, InputHTMLAttributes, useState } from 'react'

interface InputFormProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ClassAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}
export const InputForm: React.FC<InputFormProps> = React.forwardRef(function (
  { label, errorMessage, placeholder, className, type, ...props },
  ref,
) {
  const [isPasswordShow, setIsPasswordShow] = useState(false)

  function handleChangePassword() {
    setIsPasswordShow((state) => !state)
  }
  return (
    <div className="flex flex-col gap-2 select-none">
      <label className="font-semibold text-blue-900" htmlFor={label}>
        {label}
      </label>
      {type === 'password' ? (
        <div className="w-full h-min relative">
          <input
            ref={ref}
            id={label}
            className={`bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold ${className}`}
            type={!isPasswordShow ? type : 'text'}
            placeholder={!isPasswordShow ? placeholder : label}
            {...props}
          />
          {!isPasswordShow ? (
            <EyeSlash
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={handleChangePassword}
            />
          ) : (
            <Eye
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              size={24}
              onClick={handleChangePassword}
            />
          )}
        </div>
      ) : (
        <input
          ref={ref}
          id={label}
          className="bg-blue-10 text-blue-900 border border-blue-50 p-4 rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
          type={type}
          placeholder={placeholder}
          {...props}
        />
      )}
      {errorMessage && (
        <p className="font-semibold text-red-400 ">{errorMessage}</p>
      )}
    </div>
  )
})

InputForm.displayName = 'InputForm'
