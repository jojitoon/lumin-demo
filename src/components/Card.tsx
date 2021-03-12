import React, { FC } from 'react';
import { Box, Text, VStack, Image, Center } from '@chakra-ui/react';

interface ICard {
  title: string;
  price: string;
  image?: any;
  inCart?: boolean;
  addToCart: () => void;
}

const Card: FC<ICard> = ({ title, price, image, inCart, addToCart }) => {
  return (
    <Box pb={5}>
      <VStack>
        <Center h='250px'>
          <Image boxSize={'50%'} objectFit='contain' src={image} alt={title} />
        </Center>
        <Text h={['36px', 'auto']} textAlign='center'>
          {title}
        </Text>
        <Text py={3}>From {price}</Text>
        <Box
          onClick={addToCart}
          as='button'
          lineHeight='1.2'
          transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
          border='1px'
          py={['12px', '15px']}
          px={['15px', '30px']}
          borderRadius='2px'
          fontSize={['12px', '14px']}
          fontWeight='semibold'
          bg={'#4b5548'}
          color='#fff'
          _hover={{ bg: 'rgba(75,85,72,0.8)' }}
          _active={{
            bg: 'rgba(75,85,72,0.8)',
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}>
          Add to Cart
        </Box>
      </VStack>
    </Box>
  );
};

export default Card;
