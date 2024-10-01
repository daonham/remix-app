import { Form } from "@remix-run/react";

export default function Logout({ action }: { action: string }) {

    return (
        <Form action={action} method="post" className="flex flex-col gap-4">
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Logout
            </button>
        </Form>
    );
}