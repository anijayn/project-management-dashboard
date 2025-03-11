"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterCredentials } from "@/lib/types";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().optional(),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const registerHandler = async (data: RegisterCredentials) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Registration failed");
      }
      // After successful registration, sign in
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      router.push("/dashboard");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {errors.root && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name (optional)
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="w-full p-2 border rounded-md"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-200"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
