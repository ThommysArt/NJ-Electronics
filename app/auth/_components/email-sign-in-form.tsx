"use client"
 
import React, { useState, useTransition } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, RocketIcon, Link2Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { EmailSignInSchema} from "@/constants/zod"
import { useRouter, useSearchParams } from 'next/navigation'
import { EmailLogin, SignUpAction } from "@/actions/auth";
import { BeatLoader } from "react-spinners";

export const EmailSignInForm = ({mode}: {mode: "sign-in" | "sign-up"}) => {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/home"
    const router = useRouter()

    const form = useForm<z.infer<typeof EmailSignInSchema>>({
        resolver: zodResolver(EmailSignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
      })
  
    function onSubmit(values: z.infer<typeof EmailSignInSchema>) {
      setError("");
      setSuccess("");
  
      startTransition(() => {
        if (mode === "sign-in") {
            SignUpAction(values, callbackUrl )
            .then((data) => {
                if (data?.error) {
                form.reset();
                setError(data?.error);
                }
    
                if (data?.success) {
                form.reset();
                setSuccess(data?.success);
                }
            })
            .catch(() => setError("Something went wrong"))
            .finally(() => {
                router.push(callbackUrl)
                router.refresh()
            })
        } else {
            EmailLogin(values, callbackUrl )
            .then((data) => {
                if (data?.error) {
                form.reset();
                setError(data?.error);
                }
    
                if (data?.success) {
                form.reset();
                setSuccess(data?.success);
                }
            })
            .catch(() => setError("Something went wrong"))
            .finally(() => {
                router.push(callbackUrl)
                router.refresh()
            })
        }
      })
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="********" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {error && (
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-6 w-6" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
            )}
            {success && (
            <Alert>
                <RocketIcon className="h-6 w-6"/>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
            </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
            {isPending===true ? <BeatLoader />: "Submit"}
            </Button>
            {mode === "sign-in" ? (
                <div className="flex gap-2 items-center text-sm text-muted-foreground mt-6">
                    <p>Don't have an Account? </p>
                    <Link href={`/auth/sign-up?callbackUrl=${callbackUrl}`} className="flex items-center text-black dark:text-white hover:underline">Sign Up <Link2Icon /></Link>
                </div>
            ):(
                <div className="flex gap-2 items-center text-sm text-muted-foreground mt-6">
                    <p>Already have an Account? </p>
                    <Link href={`/auth/sign-in?callbackUrl=${callbackUrl}`} className="flex items-center text-black dark:text-white hover:underline">Sign In <Link2Icon /></Link>
                </div>
            )}
        </form>
    </Form>
  )
}
