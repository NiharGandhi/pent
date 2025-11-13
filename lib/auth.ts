import { supabase } from './supabase';
import { hashPassword, comparePassword } from './encryption';

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export async function signUp(username: string, email: string, password: string) {
  try {
    const hashedPassword = hashPassword(password);

    const { data, error } = await supabase
      .from('users')
      .insert([
        { username, email, password_hash: hashedPassword }
      ])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function signIn(username: string, password: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return { data: null, error: 'Invalid username or password' };
    }

    const isValidPassword = comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return { data: null, error: 'Invalid username or password' };
    }

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;
    return { data: userWithoutPassword, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function getUserById(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}
