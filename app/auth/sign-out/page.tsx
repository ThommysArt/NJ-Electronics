"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { SignOutAction } from "@/actions/auth";


export default function SignUpPage() {
  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle className="flex text-center justify-center items-center text-2xl font-bold space-x-3">
            <LockClosedIcon className="h-6 w-6 mr-3"/>
            Sign Out
          </CardTitle>
          <CardDescription>Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" variant="destructive" onClick={SignOutAction}>Sign Out</Button>
        </CardFooter>
      </form>
    </Card>
  )
}