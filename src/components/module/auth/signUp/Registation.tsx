"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import signUp from "../../../../../public/signup.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "../authValidation";
import React from "react";

const Registation = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(signupValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    // try {
    //   const res = await loginUser(data);
    //   setIsLoading(true);
    //   if (res?.success) {
    //     toast.success(res?.message);
    //     if (redirect) {
    //       router.push(redirect);
    //     } else {
    //       router.push("/");
    //     }
    //   } else {
    //     toast.error(res?.message);
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
  };

  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-6xl ">
          <div className="border-2 rounded-2xl border-amber-800">
            <div className="w-full flex flex-col md:flex-row">
              {/* FORM CLOUMN - LEFT SIDE */}
              <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                  {/* HEADING TEXT */}
                  <div className="text-center mb-8">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-slate-400">
                      Sign up & Login to access to your account
                    </p>
                  </div>

                  {/* FORM */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >

                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="auth-input-label ml-1">
                              Full Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                  type="name"
                                  {...field}
                                  value={field.value || ""}
                                  id="name"
                                  name="name"
                                  required
                                  className=""
                                  placeholder="Inpute your full name"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />


                      {/* Number */}
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="auth-input-label ml-1">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  value={field.value || ""}
                                  id="number"
                                  name="number"
                                  required
                                  className=""
                                  placeholder="Inpute your phone number"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />


                      {/* Full address */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="auth-input-label ml-1">
                              Full Address
                            </FormLabel>
                            <FormControl>
                                <Input
                                  type="address"
                                  {...field}
                                  value={field.value || ""}
                                  id="address"
                                  name="address"
                                  required
                                  className=""
                                  placeholder="Inpute your full address"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="auth-input-label ml-1">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MailIcon className="auth-input-icon" />

                                <Input
                                  type="email"
                                  {...field}
                                  value={field.value || ""}
                                  id="email"
                                  name="email"
                                  required
                                  className="input"
                                  placeholder="johndoe@gmail.com"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="auth-input-label">
                                Password
                              </FormLabel>
                            </div>
                            <FormControl>
                              <div className="relative">
                                <LockIcon className="auth-input-icon" />

                                <Input
                                  type={showPassword ? "text" : "password"}
                                  {...field}
                                  id="password"
                                  name="password"
                                  value={field.value || ""}
                                  className="input pr-10"
                                  placeholder="Enter your password"
                                />

                                {/* Eye Icon Button */}
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-400 focus:outline-none p-1 transition-colors"
                                  aria-label={
                                    showPassword
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                >
                                  {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <Link href="/" className="auth-link">
                      Already have an account?{" "}
                      <span className="font-semibold text-yellow-800">
                        Login
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* FORM ILLUSTRATION - RIGHT SIDE */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-6  from-slate-800/20 to-transparent">
                <div>
                  <Image
                    src={signUp}
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-medium text-cyan-400">
                      Connect anytime, anywhere
                    </h3>

                    <div className="mt-4 flex justify-center gap-4">
                      <span className="auth-badge">Free</span>
                      <span className="auth-badge">Easy Setup</span>
                      <span className="auth-badge">Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registation;
