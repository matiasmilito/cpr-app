import { ActionFunctionArgs } from "@remix-run/node";

import { Authenticator } from "remix-auth";

export type SafeUserSessionSchema = {
  id: number;
  email?: string;
  profile?: string;
};
export const authenticator = new Authenticator<SafeUserSessionSchema>(
  sessionStorage
);

export async function action({ request }: ActionFunctionArgs) {}
