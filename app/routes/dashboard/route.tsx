import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { auth } from "~/.server/auth";
import Logout from "./logout";

export async function action({ request }: ActionFunctionArgs) {
    const url = new URL(request.url);
    const actionType = url.searchParams.get("action");

    if (actionType === "logout") {
        await auth.logout(request, { redirectTo: "/login" });
    }
}

export async function loader({ request }: LoaderFunctionArgs) {
    return await auth.isAuthenticated(request, {
        failureRedirect: "/login",
    });
}

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1>Dashboard</h1>
            <Outlet />
            <Logout action="/dashboard?action=logout" />
        </div>
    );
}
