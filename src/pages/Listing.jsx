import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Listing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/records");
      setTableData(response.data.records);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="max-w-full overflow-x-auto">
      {isLoading ? (
        <img className="mx-auto block" src="/loader.gif" alt="loader" />
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-start">Name</th>
              <th className="py-2 px-4 border-b text-start">Edit</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((el, idx) => {
              return (
                <tr key={el._id}>
                  <td className="py-2 px-4 border-b">{el.name}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={"/" + el._id}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Listing;
