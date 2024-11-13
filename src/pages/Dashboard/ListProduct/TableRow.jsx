import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";
import UpdateModal from "../../../components/Modal/UpdateModal";

const TableRow = ({ product, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  /* delete product func */
  const modalHandler = async (id) => {
    try {
      await axiosSecure.delete(`/deleteproduct/${id}`);
      refetch();
      toast.success("Product Deleted successfully");
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th>
        <div className="flex justify-center items-center py-1">
          <img className="w-9 rounded-lg" src={product.image} alt="" />
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product.name}
      </th>
      <td className="px-6 py-4">{product.category}</td>
      <td className="px-6 py-4">{product.sub_category}</td>
      <td className="px-6 py-4">${product.old_price}</td>
      <td className="px-6 py-4">${product.new_price}</td>
      <td className="px-6 py-4">
        <div className="flex justify-center items-center gap-x-4">
          <button onClick={openModal}>
            <FaRegTrashAlt className="w-5 h-5 hover:text-cyan-500" />
            <DeleteModal
              isOpen={isOpen}
              closeModal={closeModal}
              modalHandler={modalHandler}
              id={product.id}
            />
          </button>
          <button onClick={() => setIsUpdateModalOpen(true)}>
            <FaRegEdit className="w-5 h-5 hover:text-cyan-500" />
            <UpdateModal
              isOpen={isUpdateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              refetch={refetch}
              id={product.id}
              product={product}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
