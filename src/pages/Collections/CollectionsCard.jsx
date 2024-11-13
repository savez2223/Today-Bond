import React from 'react';
import { Link } from 'react-router-dom';

const CollectionsCard = ({item}) => {
    return (
      <div>
        <Link to={`/category/${item.sub_category}`}>
          <div className="relative max-w-96 h-96 bg-cover bg-center bg-no-repeat hover:shadow-xl transition-transform transform  group rounded-xl">
            <div
              className="absolute inset-0 w-full h-full rounded-xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-b from-transparent via-transparent to-gray-900 transition-transform group-hover:opacity-100 rounded-xl">
              <h2 className="card_effect text-white text-lg md:text-2xl xl:text-3xl font-semibold  translate-y-2 group-hover:-translate-y-4 capitalize">
                {item.sub_category}
              </h2>
              <p
                className="card_effect text-white hover:text-amber-500 text-sm md:text-base font-medium mt-2  translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 "
              >
                Explore More
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
};

export default CollectionsCard;