import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

interface props {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean | false;
  type?: 'button' | 'submit';
  bgColor?: string;
  textColor?: string;
}

const Button: React.FC<props> = ({ title, leftIcon, rightIcon, handleClick, isSubmitting, type, bgColor, textColor }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor || 'text-white'}
      ${isSubmitting
          ? 'bg-black/50'
          : bgColor || 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`
      }
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt='left' />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right' />}
    </button>
  )
}

export default Button