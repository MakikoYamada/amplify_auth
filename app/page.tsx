"use client";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { NextPage } from "next";
import { Text } from "@chakra-ui/react";
import SignUpForm from "./signup/page";
import SignOutForm from "./signout/page";
import SignInForm from "./signin/page";

export default function Home() {
  //track user auth state
  const [user, setUser] = useState<any>(null);

  const getAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log("error get user auth", error);
    }
  };

  if (user === "SIGNUP") {
    return <SignUpForm setUser={setUser}></SignUpForm>;
  }

  if (user) {
    return <SignOutForm setUser={setUser}></SignOutForm>;
  }

  return <SignInForm setUser={setUser}></SignInForm>;
}
