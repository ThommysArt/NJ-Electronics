import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, RocketIcon, Link2Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import React from 'react'
import { checkout } from '@/actions/cart'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Spinner } from '@/components/icons/spinner'

const formSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
})

export const PurchaseDialog = ({cartId}: {cartId: string}) => {
  const [loading , setLoading] = useState(false)
  const [success , setSuccess] = useState<string | undefined>("")
  const [error , setError] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await checkout(cartId, values.phoneNumber)
      setSuccess("Order placed successfully")
    } catch (error) {
      setError("Failed to place order")
    } finally {
      setLoading(false)
    }
  }
    
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Purchase</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogDescription>
            Please give us your contact information to confirm your order and get daily updates.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} disabled={loading} />
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
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose><Button variant="outline" disabled={loading}>Cancel</Button></DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Spinner />}
                {loading ? 'Purchasing' : 'Purchase'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
