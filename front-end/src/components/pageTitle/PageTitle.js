import { Center, Heading } from "@chakra-ui/react";

export const PageTitle = ({ title }) => {
  return (
    <Center>
      <Heading my="8">{ title }</Heading>
    </Center>
  );
}
