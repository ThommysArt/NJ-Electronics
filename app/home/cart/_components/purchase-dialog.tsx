import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react'
import { checkout } from '@/actions/cart'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
})

export const PurchaseDialog = ({cartId}: {cartId: string}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await checkout(cartId, values.phoneNumber)
    console.log(values.phoneNumber)
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
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Purchase</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
