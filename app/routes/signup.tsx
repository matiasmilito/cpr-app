import { ActionFunctionArgs, json } from "@remix-run/node";
import { isExistingEmail } from "~/aicraft.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");

  if (!email) {
    return json({ message: "Email is required" }, { status: 400 });
  }

  const isExistingUser = await isExistingEmail(email.toString());

  if (isExistingUser) {
    return json({ message: "Email already exists" }, { status: 400 });
  }
}
