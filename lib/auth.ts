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
export async function signIn(email: string, password: string): Promise<AdminUser> {
  try {
    // First check if user exists in admin_users table
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
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

    if (error) {
      throw new Error('Invalid email or password')
    }

    if (!data.user) {
      throw new Error('Authentication failed')
    }

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set('sb-access-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return {
      id: data.user.id,
      email: data.user.email!,
      role: adminUser.role,
      created_at: adminUser.created_at
    }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

// Get current admin user
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('sb-access-token')?.value
    
    if (!accessToken) {
      return null
    }

    // Get user from Supabase with the access token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)

    if (error || !user) {
      return null
    }

    // Get admin user details
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