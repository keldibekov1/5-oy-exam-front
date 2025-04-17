'use client';

import type { User } from '@/types/user';

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  // async signUp(_: SignUpParams): Promise<{ error?: string }> {
  //   // API so'rov yuborish (hozirgi holatda faqat token generatsiyasi)
  //   const token = generateToken();
  //   localStorage.setItem('custom-auth-token', token);

  //   return {};
  // }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Ijtimoiy autentifikatsiya amalga oshirilmagan' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string, token?: string }> {
    const { email, password } = params;

    // Backendga so'rov yuborish
    const response = await fetch('https://keldibekov.online/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      return { error: data.message || 'Invalid credentials' };
    }

    const token = data.token;
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Parolni tiklash amalga oshirilmagan' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Parolni yangilash amalga oshirilmagan' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
