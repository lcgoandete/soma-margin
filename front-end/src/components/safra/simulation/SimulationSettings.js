import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";

import { Loading } from "../../loading/Loading";
import { useSimulationSettings } from "../../../hooks/banks/safra/useSimulationSettings";

export const SimulationSettings = () => {
  const [taxaJurosSefaz, setTaxaJurosSefaz] = useState(0);
  const [taxaJurosPM, setTaxaJurosPM] = useState(0);
  const [taxaJurosSpprev, setTaxaJurosSpprev] = useState(0);
  const [taxaJurosPrefSP, setTaxaJurosPrefSP] = useState(0);
  const { getSimulationSettings } = useSimulationSettings();
  
  useEffect(() => {
    (async () => {
      const response = await getSimulationSettings()
      setTaxaJurosSefaz(response.taxaJurosSefaz);
      setTaxaJurosPM(response.taxaJurosPM);
      setTaxaJurosSpprev(response.taxaJurosSpprev);
      setTaxaJurosPrefSP(response.taxaJurosPrefSP);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const toast = useToast();
  const { setSimulationSettings, loading } = useSimulationSettings();

  const setSimulationSetting = async () => {
    const result = await setSimulationSettings({ taxaJurosSefaz, taxaJurosPM, taxaJurosSpprev, taxaJurosPrefSP });
    
    if (result.errorMessage) {
      toast({
        title: 'error',
        description: `${result.errorMessage}`,
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: 'Sucesso',
        description: 'Taxa de juros registrada com sucesso!',
        status: 'success',
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
  }
  
  return (
    <FormControl mx="auto" mb="4" p="15px" w="950px" border="1px" borderRadius="10px" borderColor="gray.200" align='left'>
      <SimpleGrid columns={4} spacing={2}>
        <Box w="225px">
          <FormLabel htmlFor="taxaJurosSefaz">Taxa de juros Sefaz:</FormLabel>
          <NumberInput
            defaultValue={1.0}
            precision={2}
            step={0.01}
            min={1.0}
            max={5.0}
            id="taxaJurosSefaz"
            name="taxaJurosSefaz"
            value={ taxaJurosSefaz }
            onChange={(valueString) => setTaxaJurosSefaz(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box w="225px">
          <FormLabel htmlFor="taxaJurosPM">Taxa de juros PM:</FormLabel>
          <NumberInput
            defaultValue={1.0}
            precision={2}
            step={0.01}
            min={1.0}
            max={5.0}
            id="taxaJurosPM"
            name="taxaJurosPM"
            value={ taxaJurosPM }
            onChange={(valueString) => setTaxaJurosPM(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box w="225px">
          <FormLabel htmlFor="taxaJurosSpprev">Taxa de juros Spprev:</FormLabel>
          <NumberInput
            defaultValue={1.0}
            precision={2}
            step={0.01}
            min={1.0}
            max={5.0}
            id="taxaJurosSpprev"
            name="taxaJurosSpprev"
            value={ taxaJurosSpprev }
            onChange={(valueString) => setTaxaJurosSpprev(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box w="225px">
          <FormLabel htmlFor="taxaJurosPrefSP">Taxa de juros Pref. São Paulo:</FormLabel>
          <NumberInput
            defaultValue={1.0}
            precision={2}
            step={0.01}
            min={1.0}
            max={5.0}
            id="taxaJurosPrefSP"
            name="taxaJurosPrefSP"
            value={ taxaJurosPrefSP }
            onChange={(valueString) => setTaxaJurosPrefSP(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </SimpleGrid>
      <Button mt="4" colorScheme='blue' onClick={ (event) => setSimulationSetting(event) }>
        Salvar
        { loading && <Loading /> }
      </Button>
    </FormControl>
  );
}
