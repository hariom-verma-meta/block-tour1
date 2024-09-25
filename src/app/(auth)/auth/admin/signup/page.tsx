"use client";
import {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/navigation";
import instance from "@/utils/axios";

export default function Page () {
  const [name, setName] = useState( "" );
  const [email, setEmail] = useState( "" );
  const [password, setPassword] = useState( "" );
  const [loading, setLoading] = useState( false ); 
  const router = useRouter();

  const handleSignup = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setLoading( true ); 

    try {
      const response = await instance.post(
        "/auth/admin/signup",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if ( response.status === 200 ) {
        toast.success( "Signup successful" );
        
        setTimeout( () => {
          router.push( "/auth/admin/login" );
        }, 1000 );
      } else {
        toast.error( "Signup failed" );
      }
    } catch ( error ) {
      toast.error( "An error occurred during signup" );
    } finally {
      setLoading( false );
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[35rem] p-8 space-y-4 bg-[#0A090F] rounded-3xl shadow-md border border-[#2b2934]">
        <div className="text-center">
          <img
            src="/asset/Block-logo.svg"
            alt="Cluster Protocol"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-2xl font-extrabold text-white">
            Create Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <span className="text-sm text-neutral-400">Name</span>
              <input
                name="name"
                type="text"
                value={name}
                onChange={( e ) => setName( e.target.value )}
                className="appearance-none mt-1 rounded-md bg-[#0A090F] relative block w-full px-3 py-2 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                placeholder="Enter your Name"
              />
            </div>

            <div>
              <span className="text-sm text-neutral-400">Email Address</span>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={( e ) => setEmail( e.target.value )}
                autoComplete="email"
                required
                className="appearance-none mt-1 rounded-md bg-[#0A090F] relative block w-full px-3 py-2 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <span className="text-sm text-neutral-400">Password</span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={( e ) => setPassword( e.target.value )}
                className="appearance-none mt-1 bg-[#0A090F] rounded-md relative block w-full px-3 py-2 border border-[#46454a] placeholder-gray-500 focus:outline-none sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-neutral-400"
              >
                Agree to the{" "}
                <a href="#" className="text-sm text-neutral-400 underline">
                  Terms & Privacy Policy
                </a>
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-neutral-400 hover:text-white underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-neutral-800 bg-[#F6911D] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/admin/login"
            className="font-medium text-white hover:text-gray-300 underline"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
