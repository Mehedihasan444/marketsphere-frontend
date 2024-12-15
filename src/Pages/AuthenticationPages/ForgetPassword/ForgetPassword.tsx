import { FormEvent, useState } from "react";
import { useForgetPasswordMutation } from "../../../Redux/Features/Auth/authApi";
import { message } from "antd";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [forgetPassword] = useForgetPasswordMutation();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {

            const res = await forgetPassword(email);
            if (res?.data?.success) {
                message.success(res.data.message);
            } else if (res.error) {
                if ('data' in res.error) {
                    // For FetchBaseQueryError, safely access the `data` property
                    const errorMessage = (res.error.data as { message?: string })?.message || "Error occurred.";
                    message.error(errorMessage);
                } else if ('message' in res.error) {
                    // For SerializedError, handle the `message` property
                    message.error(res.error.message || "Error occurred.");
                } else {
                    // Handle unknown error types
                    message.error("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.log(error);
            message.error("An unknown error occurred.");
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we will send you a link to reset your
                        password.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send Reset Link
                        </button>
                    </div>


                </form>

                {/* Back to Login Link */}
                <div className="text-center text-sm">
                    <a
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}
export default ForgetPassword;