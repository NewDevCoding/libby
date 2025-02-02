"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, useForm, UseFormReturn, SubmitHandler, FieldValues } from "react-hook-form"
import { ZodType } from "zod";


interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "SIGN_IN" | "SIGN_UP";
  }

const AuthForm = <T extends FieldValues> ({
    type, 
    schema,
    onSubmit, 
    defaultValues, 
    
}: Props<T>) => {
  
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,

    });

    const handleSubmit: SubmitHandler<T> = async (data) => {

    }
  
    return (
        <div></div>
    )
}

export default AuthForm