import supabase from './client';
import { executeQuery } from '../utils';

export const Signup = async (email, password, metadata) =>
  executeQuery(
    supabase.auth.signUp({
      email,
      password,
      data: metadata,
    })
  );

export const Login = async (email, password) =>
  executeQuery(
    supabase.auth.signIn({
      email,
      password,
    })
  );

export const Logout = async () => executeQuery(supabase.auth.signOut());

export const UpdateUser = async (user, metadata) =>
  executeQuery(supabase.auth.update(user, metadata));

export const SendVerificationEmail = async (email) =>
  executeQuery(supabase.auth.api.sendMagicLinkEmail(email));

export const ResetPassword = async (email) =>
  executeQuery(supabase.auth.api.resetPasswordForEmail(email));

export const UpdatePassword = async (email, password) =>
  executeQuery(supabase.auth.api.updateUser(email, { password }));

export const GetCurrentUser = async () => executeQuery(supabase.auth.user());

export const GetSession = async () => executeQuery(supabase.auth.getSession());

export const checkEmailVerification = async () => {
  try {
    const user = await GetCurrentUser();
    return user && user.email_confirmed_at ? true : false;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

export const checkUserSession = async () => {
  try {
    const session = await GetSession();
    return session ? true : false;
  } catch (error) {
    console.error('Error checking user session:', error);
    return false;
  }
};
