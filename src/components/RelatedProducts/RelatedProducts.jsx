import React from 'react';
import Product from '../Product/Product';
import SectionHeader from '../SectionHeader/SectionHeader';
import useCategory from '../../hooks/useCategory';

const RelatedProducts = ({category}) => {
   const [categoriesWiseProducts] = useCategory(category);
    return (
      <div className="md:mt-10">
        <SectionHeader heading={"Related Products"} />
        <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 md:gap-y-10 pb-10 md:pb-12">
          {categoriesWiseProducts.slice(0,4).map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
};

export default RelatedProducts;