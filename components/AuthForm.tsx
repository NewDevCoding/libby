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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-7-8">
                <FormField
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>

            </form>
        </Form>

    )
}

export default AuthForm