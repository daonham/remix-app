import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "About" },
        { name: "description", content: "About page" },
    ];
};

export const loader = async () => {
    // fetch a fake api
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    return {
        posts,
    };
};

export default function About() {
    const { posts } = useLoaderData<typeof loader>();

    return <ul className="list-disc">{posts.map((post: any) => <li className="text-blue-500 hover:text-blue-600" key={post.id}>{post.title}</li>)}</ul>;
}
