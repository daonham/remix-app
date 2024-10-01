// app/routes/login.tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { AuthorizationError } from "remix-auth";
import { auth } from "~/.server/auth";

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-semibold">Login</h1>
                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </div>
                    {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    >
                        Sign In
                    </button>

                    <div className="text-sm text-gray-500">
                        <p>Username: <span className="font-semibold">daonham95@gmail.com</span></p>
                        <p>Password: <span className="font-semibold">123456</span></p>
                    </div>
                </Form>
            </div>
        </div>
    );
}


export async function action({ request }: ActionFunctionArgs) {
    try {
        return await auth.authenticate("login", request, {
            successRedirect: "/dashboard",
            throwOnError: true,
        });
    } catch (error) {
        console.log('error', error);
        if (error instanceof Response) return error;
        if (error instanceof AuthorizationError) {
            return json({ error: error.message }, { status: 401 });
        }
        return json({ error: error?.message || "Unknown error" }, { status: 500 });
    }
}


export async function loader({ request }: LoaderFunctionArgs) {
    return await auth.isAuthenticated(request, {
        successRedirect: "/dashboard",
    });
}