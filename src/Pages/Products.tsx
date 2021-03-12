import React, { useEffect, useState } from 'react';
import { Box, VStack, useDisclosure, SimpleGrid } from '@chakra-ui/react';
import CheckoutDrawer from '../components/CheckoutDrawer';
import { useQuery } from '@apollo/client';
import { GET_CURRENCIES, GET_PRODUCTS } from '../queries';
import getSymbolFromCurrency from 'currency-symbol-map';
import { CartType, IProduct } from '../types';
import Card from '../components/Card';
import Banner from '../components/Banner';
import Nav from '../components/Nav';

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<CartType>({});

  const {
    loading: loadingCurrency,
    error: currencyError,
    data: currencyData,
  } = useQuery(GET_CURRENCIES);

  const { loading, error, data: productData } = useQuery(GET_PRODUCTS, {
    variables: {
      currency: selectedCurrency,
    },
  });

  useEffect(() => {
    if (!loadingCurrency && currencyData?.currency?.length && !currencyError) {
      setCurrencies(currencyData.currency);
    }
    console.log(currencyData);
  }, [currencyData, loadingCurrency, currencyError]);

  useEffect(() => {
    if (!loading && productData?.products?.length && !error) {
      setProducts(productData.products);
    }
    console.log(productData);
  }, [productData, loading, error]);

  const addToCart = (index: number, price: number) => {
    if (cart[index]) {
      incrementItem(index);
    } else {
      setCart((prev) => ({ ...prev, [index]: { qty: 1, price } }));
    }
    onOpen();
  };

  const incrementItem = (index: number) => {
    setCart((prev) => {
      const data = { ...prev };
      data[index].qty += 1;
      return data;
    });
  };

  const decrementItem = (index: number) => {
    setCart((prev) => {
      const data = { ...prev };
      const curr = data[index];
      if (curr.qty > 1) {
        curr.qty -= 1;
      } else {
        delete data[index];
      }
      return data;
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => {
      const data = { ...prev };
      delete data[index];
      return data;
    });
  };

  const currencySymbol = getSymbolFromCurrency(selectedCurrency);

  return (
    <Box>
      <VStack>
        <Nav onOpen={onOpen} count={Object.keys(cart).length} />
        <Banner />
        <Box bg='#e2e6e2' w='100%' minH='80vh' py={[10, 20]} px={[3, 5]}>
          <SimpleGrid columns={[2, null, 3]} spacing={[3, 5]}>
            {products.map((product, i) => (
              <Card
                key={product.id}
                price={`${currencySymbol}${product.price.toLocaleString()}.00`}
                image={product.image_url}
                title={product.title}
                inCart={!!cart[i]}
                addToCart={() => addToCart(i, product.price)}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
      <CheckoutDrawer
        isOpen={isOpen}
        onClose={onClose}
        currencies={currencies}
        setSelectedCurrency={setSelectedCurrency}
        selectedCurrency={selectedCurrency}
        cart={cart}
        products={products}
        currencySymbol={currencySymbol}
        incrementItem={incrementItem}
        decrementItem={decrementItem}
        removeItem={removeItem}
      />
    </Box>
  );
};

export default Products;
