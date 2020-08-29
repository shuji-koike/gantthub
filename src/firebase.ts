import firebase from "firebase/app";
import React, { useState, useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase/functions";
import "./index.css";
import { firebaseConfig } from "./config";

export const app = firebase.initializeApp(firebaseConfig);

export type AuthError = firebase.auth.Error | undefined;
export type AuthUser = firebase.User | null | undefined;

interface LoginData {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginData) {
  const { user } = await app.auth().signInWithEmailAndPassword(email, password);
  return user;
}

export function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider().addScope("repo");
  return firebase.auth().signInWithRedirect(provider);
}

export async function logout() {
  await app.auth().signOut();
}

export const UserContext = React.createContext<AuthUser>(
  app.auth().currentUser
);

export function useAuth() {
  const [user, setAuthUser] = useState<AuthUser>();
  const [error, setAuthError] = useState<AuthError>();
  useEffect(() => app.auth().onAuthStateChanged(setAuthUser, setAuthError), [
    setAuthUser,
    setAuthError,
  ]);
  return {
    user,
    error,
  };
}
