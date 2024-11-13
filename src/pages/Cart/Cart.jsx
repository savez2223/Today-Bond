import React from 'react';
import CartItems from '../../components/CartItems/CartItems';
import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import LoadPageTop from '../../components/LoadPageTop/LoadPageTop';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
    return (
      <div className="py-12 md:py-20 dark:bg-gray-500">
        <Helmet>
          <title>Cart Items</title>
        </Helmet>
        <LoadPageTop />
        <Container>
          <div className="md:hidden mt-5">
            <SectionHeader heading={"SHOPPING CART"} />
          </div>
          <CartItems />
        </Container>
      </div>
    );
};

export default Cart;