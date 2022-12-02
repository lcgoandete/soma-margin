import { useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { PageTitle } from '../../components/pageTitle/PageTitle';

import logo from '../../assets/images/soma-logo.png';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Center, Image } from '@chakra-ui/react';
export const Home = () => {
  const { isValidToken } = useAuthentication();
  
  useEffect(() => {
    (async () => {
      await isValidToken();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Header />
      <PageTitle title="Soma Consignados Ltda." />
      <Center height='40vh'>
        <Image src={ logo } alt='logo da empresa' />
      </Center>
    </>
  );
}
