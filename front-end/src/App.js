import { ChakraProvider } from '@chakra-ui/react'

import PageRoutes from './pages/PageRoutes';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <PageRoutes />
    </ChakraProvider>
  );
}

export default App;
