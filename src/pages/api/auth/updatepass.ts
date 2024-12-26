import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const confirPassword = formData.get("confirPassword")?.toString();
  const password = formData.get("password")?.toString();
  console.log(password)

  if ((!confirPassword || !password) || (confirPassword !== password)) {
    return new Response("confirPassword and password are required and they have to be equal", { status: 400 });
  }
  const { data, error } = await supabase.auth.updateUser({
    password: password
  })
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/login");
};