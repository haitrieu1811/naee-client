'use client'

import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'

import { Input } from '@/components/ui/input'

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement>

const InputPassword = (props: InputPasswordProps) => {
  const [type, setType] = useState<'password' | 'text'>('password')

  const handleToggle = () => {
    if (type === 'password') setType('text')
    else setType('password')
  }

  return (
    <div className='relative'>
      <Input type={type} className='pr-10' {...props} />
      <div role='button' className='absolute right-2 top-1/2 -translate-y-1/2' onClick={handleToggle}>
        {type === 'password' ? <EyeOff size={18} /> : <Eye size={20} />}
      </div>
    </div>
  )
}

export default InputPassword
