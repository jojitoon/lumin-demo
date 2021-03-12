import React, { FC } from 'react';
import {
  Box,
  Text,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Center,
  DrawerFooter,
  Divider,
  Select,
} from '@chakra-ui/react';
import CheckoutCard from './CheckoutCard';
import { CartType, IProduct } from '../types';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  currencies: string[];
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
  cart: CartType;
  products: IProduct[];
  currencySymbol?: string;
  decrementItem: (value: number) => void;
  incrementItem: (value: number) => void;
  removeItem: (value: number) => void;
}

const CheckoutDrawer: FC<Props> = ({
  onClose,
  isOpen,
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  cart,
  products,
  currencySymbol = '',
  decrementItem,
  incrementItem,
  removeItem,
}) => {
  const totalValue = Object.entries(cart).reduce((acc, [index, obj]) => {
    const cost = products[Number(index)].price * obj.qty;
    const total = acc + cost;
    return total;
  }, 0);

  return (
    <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='lg'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>
          <Center>
            <Text color='gray.500' fontSize='sm'>
              your cart
            </Text>
          </Center>
          <HStack w='100px' pt={3}>
            <Select
              placeholder='Select currency'
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          </HStack>
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody pt={5}>
          {Object.keys(cart).length ? (
            <VStack>
              {Object.entries(cart).map(([index, obj]) => (
                <CheckoutCard
                  key={index}
                  title={products[Number(index)].title}
                  price={`${currencySymbol}${(
                    products[Number(index)].price * obj.qty
                  ).toLocaleString()}.00`}
                  image={products[Number(index)].image_url}
                  qty={obj.qty}
                  increment={() => incrementItem(Number(index))}
                  decrement={() => decrementItem(Number(index))}
                  remove={() => removeItem(Number(index))}
                />
              ))}
            </VStack>
          ) : (
            <Center>No Item in cart</Center>
          )}
        </DrawerBody>
        <DrawerFooter>
          <VStack w='100%' align='start'>
            <Divider />
            <HStack w='100%' justify='space-between'>
              <Text fontWeight='semibold' pb={8}>
                Subtotal
              </Text>{' '}
              <Text
                pb={
                  8
                }>{`${currencySymbol}${totalValue.toLocaleString()}.00`}</Text>
            </HStack>
            <Box
              as='button'
              lineHeight='1.2'
              transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
              border='1px'
              p='15px'
              w='100%'
              borderRadius='2px'
              fontSize='14px'
              fontWeight='semibold'
              bg='#4b5548'
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
              PROCEED TO CHECKOUT
            </Box>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutDrawer;
