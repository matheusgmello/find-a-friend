import { OptionsProps } from '@/models/interfaces/Select'
import React, { ClassAttributes, SelectHTMLAttributes } from 'react'

interface SelectComponentProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    ClassAttributes<HTMLSelectElement> {
  selectLabel: string
  name: string
  id: string
  className: string
  label?: string
  labelClassName?: string
  options: OptionsProps[]
}
export const SelectComponent: React.FC<SelectComponentProps> = React.forwardRef(
  function (
    {
      id,
      name,
      selectLabel,
      className,
      options,
      label,
      labelClassName,
      ...props
    },
    ref,
  ) {
    return (
      <div className="flex flex-col gap-3 max-sm:w-full text-xs font-medium">
        <label
          className={`text-sm opacity-70 font-light ${labelClassName}`}
          htmlFor={id}
        >
          {label}
        </label>
        <select
          className={`${className} disabled:cursor-not-allowed disabled:opacity-60 `}
          ref={ref}
          {...props}
          name={name}
          id={id}
        >
          {options.map((option) => {
            return (
              <option
                className="text-lg font-bold cursor-pointer focus:opacity-80"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  },
)

SelectComponent.displayName = 'SelectComponent'
