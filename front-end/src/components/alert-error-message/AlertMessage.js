import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

export const AlertMessage = ({ status, alertTitle, message }) => {
  return (
    <Alert status={ status } mx="auto" my="15px" w="500px">
      <AlertIcon />
      <AlertTitle>{ alertTitle }</AlertTitle>
      <AlertDescription>{ message }</AlertDescription>
    </Alert>
  );
}