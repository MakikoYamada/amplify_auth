import {
  VStack,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon } from "@chakra-ui/icons";
import { Auth } from "aws-amplify";
import React, { useState } from "react";

// const firstSignIn = async (
//   username: string,
//   password: string,
//   newPassword: string
// ) => {
//   console.log("try to sign in ...");
//   Auth.signIn(username, password).then((user) => {
//     if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
//       const { requiredAttributes } = user.challengeParam;
//       //the array of required attributes,eg["email,"phone_number]
//       Auth.completeNewPassword(
//         user, //the cognito user object
//         newPassword //the new password
//       ).then((user) => {
//         //at this time the user is logged in if no MFA required
//         console.log(user);
//       });
//     }else{
//         //other situations
//     }
//   })
//   .catch((e) =>{
//     console.log(e)
//   })
// };

const SignInForm = ({ setUser }: { setUser: any }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const signIn = async (username: string, password: string) => {
    console.log("sign in ...", username, password);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      const authenticated = await Auth.currentAuthenticatedUser();
      console.log(authenticated);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="5xl"
      height="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        py={12}
        px={12}
        borderWidth={1}
        borderRadius={"lg"}
        spacing={4}
        alignItems={"flex-start"}
      >
        <Text fontSize={30}>Welcome</Text>
        <InputGroup>
          <InputLeftElement>{<EmailIcon></EmailIcon>}</InputLeftElement>
          <Input
            placeholder="Email"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftElement>{<ViewIcon></ViewIcon>}</InputLeftElement>
          <Input
            placeholder="Password"
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
          ></Input>
        </InputGroup>
        <Button
          width={"100%"}
          colorScheme="teal"
          onClick={async () => {
            signIn(name, pass);
          }}
        >
          Sign In
        </Button>
        <Button
          width={"100%"}
          colorScheme="orange"
          onClick={async () => {
            setUser("SIGNUP");
          }}
        >
          Create an Account
        </Button>
      </VStack>
    </Box>
  );
};

export default SignInForm;
