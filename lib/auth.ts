// lib/auth.ts
import { supabase, supabaseAdmin } from './supabase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

// Sign in function
export async function signIn(email: string, password: string): Promise<{ user: User; session: Session; adminData: { role: string; created_at: string; } }> {
  try {
    // First check if user exists in admin_users table
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('role, created_at')
      .eq('email', email)
      .single()

    if (adminError || !adminUser) {
      throw new Error('Invalid email or password')
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error || !data.user || !data.session) {
      throw new Error('Invalid email or password')
    }

    // IMPORTANT: Return the user, session, and admin data instead of setting cookies here.
    return { 
      user: data.user, 
      session: data.session,
      adminData: {
        role: adminUser.role,
        created_at: adminUser.created_at
      }
    }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error // Re-throw the error to be caught by the API route
  }
}
// Get current admin user by validating the access token
export async function getAdminUser(accessToken: string | undefined): Promise<AdminUser | null> {
  try {
    if (!accessToken) {
      return null
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)

    if (error || !user || !user.email) {
      return null
    }

    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (adminError || !adminUser) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      role: adminUser.role,
      created_at: adminUser.created_at
    }
  } catch (error) {
    console.error('Get admin user error:', error)
    return null
  }
}

// Sign out function
export async function signOut(): Promise<void> {
  try {
    const cookieStore = cookies()
    
    // Clear cookies
    cookieStore.delete('sb-access-token')
    cookieStore.delete('sb-refresh-token')

    // Sign out from Supabase
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

// Middleware helper to check authentication
export async function checkAuth(request: NextRequest): Promise<AdminUser | null> {
  try {
    const accessToken = request.cookies.get('sb-access-token')?.value
    
    if (!accessToken) {
      return null
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)

    if (error || !user) {
      return null
    }

    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (adminError || !adminUser) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      role: adminUser.role,
      created_at: adminUser.created_at
    }
  } catch (error) {
    console.error('Check auth error:', error)
    return null
  }
}