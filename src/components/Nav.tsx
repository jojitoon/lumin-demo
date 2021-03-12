import React, { FC } from 'react';
import { Text, HStack, Icon, Spacer, Badge } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';

interface INav {
  onOpen: () => void;
  count: number;
}

const Nav: FC<INav> = ({ onOpen, count }) => (
  <HStack w='100%' px={10} py={5} borderBottom='1px' borderColor='gray.200'>
    <HStack>
      <Text fontSize='2xl' letterSpacing={15} mr='10%'>
        LUMIN
      </Text>
      <Text as='a' mr='10%' d={['none', 'block']}>
        Shop
      </Text>
      <Text as='a' mr='10%' d={['none', 'block']}>
        Learn
      </Text>
    </HStack>
    <Spacer />
    <HStack>
      <Text d={['none', 'block']}>Account</Text>
      <Text onClick={onOpen} as='button'>
        <Icon as={MdShoppingCart} w={6} h={6} color='gray.500' />
        <Badge variant='outline' colorScheme='green'>
          {count}
        </Badge>
      </Text>
    </HStack>
  </HStack>
);

export default Nav;
