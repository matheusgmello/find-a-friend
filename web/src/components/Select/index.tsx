import { OptionsProps } from '@/models/interfaces/Select'
import * as Select from '@radix-ui/react-select'
import { CaretDown } from 'phosphor-react'
import { ComponentProps } from 'react'
import * as Label from '@radix-ui/react-label'

interface SelectComponentProps extends ComponentProps<typeof Select.Root> {
  selectLabel: string
  name: string
  id: string
  className: string
  label?: string
  labelClassName?: string
  options: OptionsProps[]
}

export function SelectComponent({
  id,
  name,
  selectLabel,
  className,
  options,
  label,
  labelClassName,
  ...props
}: SelectComponentProps) {
  return (
    <Select.Root {...props} required name={name}>
      <div className="flex flex-col gap-3 max-sm:w-full text-xs font-medium">
        {label && (
          <Label.Root className={labelClassName} htmlFor={id}>
            {label}
          </Label.Root>
        )}

        <Select.Trigger
          name={name}
          id={id}
          className={`${className} disabled:cursor-not-allowed disabled:opacity-60 `}
        >
          <Select.Value placeholder={name} />
          <Select.Icon>
            <CaretDown size={16} weight="bold" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-blue-900 px-4 py-2 w-fit rounded-md flex justify-center items-center">
            <Select.Viewport>
              <Select.Group className="rounded-2xl">
                <Select.Label className="text-sm opacity-70 font-light">
                  {selectLabel}
                </Select.Label>
                {options.map((option) => {
                  return (
                    <Select.Item
                      key={option.value}
                      className="cursor-pointer focus:opacity-80"
                      value={String(option.value)}
                    >
                      <Select.ItemText className="text-lg font-bold">
                        {option.label}
                      </Select.ItemText>
                    </Select.Item>
                  )
                })}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  )
}
