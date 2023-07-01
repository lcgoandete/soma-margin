import { 
  Center,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
} from '@chakra-ui/react';

export const Loading2 = ({ loading }) => {
  return (
    <Modal isOpen={loading} size={'full'} >
      <ModalContent bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'>
        <ModalBody>
          <Center mt={'400px'}>
            <Spinner color="blue" size='xl'/>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
