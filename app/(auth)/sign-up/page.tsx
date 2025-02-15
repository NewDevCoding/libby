"use client"

import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validations'
import { University } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <AuthForm 
      type="SIGN_UP" 
      schema={signUpSchema} 
      defaultValues={
      {
        email: '',
        password: '',
        fullName: '',
        universityId: 0,
        universityCard: '',
      }
    }
      onSubmit={signUp}
    />
  )
}

export default page