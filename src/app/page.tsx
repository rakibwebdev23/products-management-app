/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { addUserAndToken } from "@/redux/features/auth/auth.slice";
import { toast } from "sonner";

export default function HomePage() {
  const dispatch = useAppDispatch()
  const [loginUserFn, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    const id = toast.loading("Logging in...");
    e.preventDefault();
    try {
      const result = await loginUserFn({ email }).unwrap();
      if (result?.token) {
        dispatch(addUserAndToken({ token: result.token }))
        toast.success("Login successful", { id })
      }
    }
    catch (error) {
      toast.error((error as any)?.data?.message || "Login failed", { id })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Package className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Product Manager</h1>
          <p className="text-muted-foreground">Sign in to manage your products</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button type="submit" className={`${isLoading && "spin-in"} w-full`} >
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Enter your email to receive authentication
        </p>
      </div>
    </div>
  );
}
