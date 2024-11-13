import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Loader/Loader";
import DashboardHeader from "../../../components/SectionHeader/DashboardHeader";
import useProducts from "../../../hooks/useProducts";
import TableRow from "./TableRow";

const ListProduct = () => {
  const [products, isLoading, refetch] = useProducts();

  return (
    <>
      <Helmet>
        <title>Poducts List</title>
      </Helmet>
      <DashboardHeader title={"All Products List"} />
      <h2 className="my-5 font-medium">Total Products: {products.length}</h2>
      <div className="mb-8">
        <div className="relative overflow-x-auto  sm:rounded-lg">
          {isLoading ? (
            <Loader height={"h-[50vh]"} />
          ) : (
            <table className="w-full text-center text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Old Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    New Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    refetch={refetch}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
