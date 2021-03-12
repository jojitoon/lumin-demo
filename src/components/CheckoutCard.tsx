import React, { FC } from 'react';
import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  IconButton,
  ButtonGroup,
  HStack,
  CloseButton,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface Props {
  title: string;
  price: string;
  image: string;
  qty: number;
  increment: () => void;
  decrement: () => void;
  remove: () => void;
}

const CheckoutCard: FC<Props> = ({
  title,
  price,
  image,
  increment,
  decrement,
  qty,
  remove,
}) => {
  return (
    <Box p={5} pos='relative' shadow='md' flex='1' w='100%' borderWidth='1px'>
      <CloseButton
        as='button'
        size='sm'
        pos='absolute'
        top='0'
        right='0'
        onClick={remove}
      />
      <Stack direction={['column', 'row']} justify='space-between' pt={2}>
        <VStack w='100%' align='start'>
          <Text pb={8}>{title}</Text>
          <Spacer />
          <HStack w='100%' justify='space-between'>
            <ButtonGroup size='sm' isAttached variant='outline'>
              <IconButton
                aria-label='Add to cart'
                icon={<MinusIcon />}
                onClick={decrement}
              />
              <Button disabled mr='-px'>
                {qty}
              </Button>
              <IconButton
                aria-label='remove from cart'
                icon={<AddIcon />}
                onClick={increment}
              />
            </ButtonGroup>
            <Spacer />
            <Text>{price}</Text>
            <Spacer />
          </HStack>
        </VStack>
        <Image
          pt={[5, 2]}
          boxSize='100px'
          objectFit='cover'
          src={image}
          alt={title}
        />
      </Stack>
    </Box>
  );
};

export default CheckoutCard;
