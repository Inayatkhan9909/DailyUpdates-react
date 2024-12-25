import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { useToast } from "../../hooks/use-toast"
import GoogleAuth from "../../components/shared/GoogleAuth"
const apiUrl=import.meta.env.VITE_BACKENT_API_URL;

const formSchema = z.object({

  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }),
  email: z.string().min({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
})

const SignUpForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      setLoading(true)
      setErrorMessage(null)

      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      console.log("res "+res)
      const data = await res.json()
      console.log(data)
      if (res.status === 201) {
        setLoading(false)
        toast({ title: "Sign up Successful!" })
        navigate("/sign-in")

      }
      else{
        setLoading(false)
        console.log("data "+data)
        toast({ title:data.message || "Sign up failed! Please try again." })
        return setErrorMessage(data.message || "Sign up failed! Please try again." )
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message || "Signup failed")
      setLoading(false)
      toast({title:error.response.data.message || "Something went wrong!"})
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="font-bold text-2xl sm:text-4xl flex flex-wrap"
          >
            <span className="text-slate-500">Daily</span>
            <span className="text-slate-900">Updates</span>
          </Link>

          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Create a new account
          </h2>

          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome to DailyUpdates, Please provide your details
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="xyz@email.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-blue-500 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign Up</span>
                )}
              </Button>

              <GoogleAuth />
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>

            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
