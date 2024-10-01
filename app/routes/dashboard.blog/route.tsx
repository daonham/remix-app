
import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { auth } from "~/.server/auth";

export async function loader({ request }: LoaderFunctionArgs) {
    await auth.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    // TODO: Fetch blog posts from your database
    const posts = [
        { id: 1, title: "First Blog Post", content: "This is the first post." },
        { id: 2, title: "Second Blog Post", content: "This is the second post." },
    ];

    return json({ posts });
}

export default function BlogAdmin() {
    const { posts } = useLoaderData<typeof loader>();
    const [selectedPost, setSelectedPost] = useState<number | null>(null);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Blog Admin</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Posts</h2>
                    <ul className="space-y-2">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={() => setSelectedPost(post.id)}
                            >
                                {post.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Edit Post</h2>
                    {selectedPost ? (
                        <Form method="post" className="space-y-4">
                            <input type="hidden" name="postId" value={selectedPost} />
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    defaultValue={posts.find(p => p.id === selectedPost)?.title}
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    defaultValue={posts.find(p => p.id === selectedPost)?.content}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Update Post
                            </button>
                        </Form>
                    ) : (
                        <p>Select a post to edit</p>
                    )}
                </div>
            </div>
        </div>
    );
}
