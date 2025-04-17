import React, { useState } from "react";
import { PostData } from "../..";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };
        PostData("login/", data).then((res) => {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem("token", res.data.access);
                window.location.href = "/";
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
