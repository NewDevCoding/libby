"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/Input"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, useForm, UseFormReturn, SubmitHandler, FieldValues, Path } from "react-hook-form"
import { ZodType } from "zod";
import { FIELD_NAMES, FIELD_TYPES } from "@/app/constants"
import ImageUpload from "./ImageUpload"


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

    const isSignIn = type === "SIGN_IN";
  
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,

    });

    const handleSubmit: SubmitHandler<T> = async (data) => {

    }
  
    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {Object.keys(defaultValues).map((field) => (
                    <FormField
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">{FIELD_NAMES[field.name as keyof typeof Field_NAMES]}</FormLabel>
                    <FormControl>
                        {field.name === "universityCard" ? (
                            <ImageUpload onFileChange={field.onChange}/>
                          ) : (
                            <Input 
                              required 
                              type={
                                FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                              } 
                              {...field}
                              className="form-input"
                              />
                          )}

                        </FormControl>
                    
                    <FormMessage />
                </FormItem>
          )}
        />
                ))}
        <Button type="submit" className="form-btn">{isSignIn ? "Sign in" : "Sign up"}</Button>
      </form>
    </Form>

    <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>

    )
}

export default AuthForm