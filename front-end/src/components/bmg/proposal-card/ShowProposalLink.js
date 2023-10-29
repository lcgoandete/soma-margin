import { Box, Button } from "@chakra-ui/react";

export const ShowProposalLink = (props) => {
  const { color, data, link} = props;
  
  const showProposalLink = () => {
    if (data) {
      return(
        <Box my="4" mx="auto" w="650px" align="center">
          <Button
            size='md'
            height='48px'
            width='200px'
            border='2px'
            borderColor={ color }
            colorScheme={ color }
          >
            <a href={ link } target="_blank" rel="noopener noreferrer">
              Digitar Proposta
            </a>
          </Button>
        </Box>
      );
    }
  }

  return showProposalLink();
}