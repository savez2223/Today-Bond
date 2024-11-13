import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "../../../components/SectionHeader/DashboardHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const ListUsers = () => {
    const [axiosSecure] = useAxiosSecure();
  const { data: users = [], isLoading,isError } = useQuery({
    queryKey:["users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("user");
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch category products");
      }
    }
  });
  console.log(users);
  return (
    <div>
      <Helmet>
        <title>Users List</title>
      </Helmet>
      <DashboardHeader title={"All Users List"} />
      <h2 className="my-5 font-medium">Total Users: {users.length}</h2>
      <div className="mb-8">
        <div className="relative overflow-x-auto  sm:rounded-lg">
          {isLoading ? (
            <Loader height={"h-[50vh]"} />
          ) : (
            <table className="w-full text-center text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}.
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
