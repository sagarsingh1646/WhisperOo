// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDebounceCallback } from "usehooks-ts";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signUpSchema";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// function page() {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const debounced = useDebounceCallback(setUsername, 500);
//   const { toast } = useToast();
//   const router = useRouter();

//   //zod implementation
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (username) {
//         setIsCheckingUsername(true);
//         setUsernameMessage("");
//         try {
//           const response = await axios.get(
//             `/api/check-username-unique?username=${username}`
//           );
//           setUsernameMessage(response.data.message);
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ?? "Error while checking username"
//           );
//         } finally {
//           setIsCheckingUsername(false);
//         }
//       }
//     };
//     checkUsernameUnique();
//   }, [username]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post<ApiResponse>("/api/signup", data);
//       toast({
//         title: "Success",
//         description: response.data.message,
//       });
//       router.replace(`/verify/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("Error while signup", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast({
//         title: "Signup failed!",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Whisperoo
//           </h1>
//           <p className="mb-4">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="username"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         debounced(e.target.value);
//                       }}
//                     />
//                   </FormControl>
//                   {isCheckingUsername && <Loader2 className="animate-spin" />}
//                   <p
//                     className={`text-sm ${
//                       usernameMessage === "Username is unique"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {usernameMessage}
//                   </p>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="text-center">
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </>
//               ) : (
//                 "Signup"
//               )}
//             </Button>
//             </div>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already a member?{" "}
//             <Link href="/signin" className="text-blue-600 hover:text-blue-800">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;


"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Page() {
  const [username, setUsername] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 500); // Debouncing the input
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Check if username is unique, debounced to avoid rapid API calls
  useEffect(() => {
    let isMounted = true;

    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(""); // Reset message before checking
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`);
          if (isMounted) {
            setUsernameMessage(response.data.message);
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          if (isMounted) {
            setUsernameMessage(axiosError.response?.data.message ?? "Error while checking username");
          }
        } finally {
          if (isMounted) {
            setIsCheckingUsername(false);
          }
        }
      }
    };

    checkUsernameUnique();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [username]);

  // Form submission for signup
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username || form.getValues("username")}`); // Fallback in case username is empty
    } catch (error) {
      console.error("Error during signup", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed!",
        description: errorMessage || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white text-indigo-600 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Whisperoo
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value); // Call debounced function to check username uniqueness
                      }}
                      className="bg-gray-100 border-2 border-indigo-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin text-indigo-600 mt-2" />}
                  <p
                    className={`text-sm mt-2 ${
                      usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      className="bg-gray-100 border-2 border-indigo-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      className="bg-gray-100 border-2 border-indigo-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* Link to sign-in page */}
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/signin" className="text-indigo-600 hover:text-indigo-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;




// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDebounceCallback } from "usehooks-ts";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signUpSchema";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// function Page() {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const debounced = useDebounceCallback(setUsername, 500);
//   const { toast } = useToast();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (username) {
//         setIsCheckingUsername(true);
//         setUsernameMessage("");
//         try {
//           const response = await axios.get(
//             `/api/check-username-unique?username=${username}`
//           );
//           setUsernameMessage(response.data.message);
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ??
//               "Error while checking username"
//           );
//         } finally {
//           setIsCheckingUsername(false);
//         }
//       }
//     };
//     checkUsernameUnique();
//   }, [username]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post<ApiResponse>("/api/signup", data);
//       toast({
//         title: "Success",
//         description: response.data.message,
//       });
//       router.replace(`/verify/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("Error while signup", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast({
//         title: "Signup failed!",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#FAF8F6]">
//       <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Join Whisperoo
//           </h1>
//           <p className="text-gray-500">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="Username"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         debounced(e.target.value);
//                       }}
//                       className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"
//                     />
//                   </FormControl>
//                   {isCheckingUsername && (
//                     <Loader2 className="animate-spin text-yellow-500 mt-2" />
//                   )}
//                   <p
//                     className={`text-sm mt-1 ${
//                       usernameMessage === "Username is unique"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {usernameMessage}
//                   </p>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Email"
//                       {...field}
//                       className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Password"
//                       {...field}
//                       className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </>
//               ) : (
//                 "Sign up"
//               )}
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p className="text-gray-500">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-yellow-500 hover:text-yellow-600">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;


