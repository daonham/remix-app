import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";

import { sessionStorage } from "~/.server/auth/session";

interface User {
    userId: number;
    username: string;
}

export const auth = new Authenticator<User>(sessionStorage, {
    throwOnError: true,
});

const formStrategy = new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    invariant(email, "Email is required");
    invariant(password, "Password is required");

    if (email !== "daonham95@gmail.com" || password !== "123456") {
        throw new AuthorizationError("Invalid email or password");
    }

    return { username: "daonham95@gmail.com", userId: 1 };
});

auth.use(formStrategy, "login");
