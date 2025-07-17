import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = "https://xszkyrwopyftlqtstysh.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY!
const jwtSecret = process.env.JWT_SECRET!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Sign-in error:", error)
    throw new Error(error.message)
  }

  if (data.session) {
    cookies().set("supabase-auth-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.session.expires_in,
      path: "/",
    })
  }

  return data.user
}

export async function signOut() {
  cookies().delete("supabase-auth-token")
  await supabase.auth.signOut()
  redirect("/blog/login")
}

export async function getSession() {
  const token = cookies().get("supabase-auth-token")?.value
  if (!token) return null

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    console.error("Error getting user session:", error)
    return null
  }

  return data.user
}

export async function getAdminUser() {
  const user = await getSession()
  if (!user) return null

  const { data, error } = await supabase.from("admin_users").select("*").eq("email", user.email).single()

  if (error || !data) {
    console.error("Error fetching admin user details:", error)
    return null
  }

  return data
}

export async function requireAuth(request: NextRequest) {
  const user = await getAdminUser()
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = "/blog/login"
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
