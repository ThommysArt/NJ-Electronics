import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PasskeySignInForm from "@/app/auth/_components/passkey-sign-in-form";
import { LockClosedIcon, PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmailSignInForm } from "../_components/email-sign-in-form";

export default function page() {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-center justify-center items-center text-2xl font-bold space-x-3">
          <LockClosedIcon className="h-6 w-6 mr-3"/>
          Authentication
        </CardTitle>
        <CardDescription className="max-w-sm text-center"> Use Apple Face ID, Fingerprint or your email credentials to sign in.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email">
          <TabsList>
            <TabsTrigger value="email">
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="passkey">
              <PersonIcon className="mr-2 h-4 w-4" />
              Passkey
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <EmailSignInForm mode="sign-in" />
          </TabsContent>
          <TabsContent value="passkey">
            <PasskeySignInForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
