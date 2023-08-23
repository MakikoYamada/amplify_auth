"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./../src/aws-exports";

try {
  Amplify.configure(awsconfig);
  Amplify.register(Auth);
} catch (error) {
  console.log(error);
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
