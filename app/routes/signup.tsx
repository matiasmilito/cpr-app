import { ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { createUser, isExistingEmail } from "~/aicraft.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const name = formData.get("name") || "";
  const lastName = formData.get("lastName") || "";
  const hours = formData.get("hours") || "";
  const role = formData.get("role") || "pilot";
  const password = formData.get("password");

  if (!email) {
    return json({ message: "Email is required" }, { status: 400 });
  }

  if (!password) {
    return json({ message: "Password is required" }, { status: 400 });
  }

  const isExistingUser = await isExistingEmail(email.toString());

  if (isExistingUser) {
    return json({ message: "Email already exists" }, { status: 400 });
  }

  const user = await createUser(
    email.toString(),
    name.toString(),
    lastName.toString(),
    parseInt(hours.toString()),
    password.toString(),
    role.toString()
  );

  if (user) {
    return json({ message: "User created" }, { status: 200 });
  } else {
    return json({ message: "User not created" }, { status: 500 });
  }
}

export default function Signup() {
  const signupFetcher = useFetcher();
  return (
    <div>
      <signupFetcher.Form method="post">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" />
        </label>
        <label>
          Hours
          <input type="number" name="hours" />
        </label>
        <label>
          Role
          <select name="role">
            <option value="pilot">Pilot</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign Up</button>
      </signupFetcher.Form>
    </div>
  );
}
