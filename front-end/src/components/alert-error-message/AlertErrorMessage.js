import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

export const AlertErrorMessage = ({ errorMessage }) => {
  return (
    <Alert mx="auto" my="15px" w="500px" status="error">
      <AlertIcon />
      <AlertTitle>Error:</AlertTitle>
      <AlertDescription>{ errorMessage }</AlertDescription>
    </Alert>
  );
}