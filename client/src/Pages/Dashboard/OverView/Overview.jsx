import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loader from "../../../Components/Loader";
import { AuthContext } from "../../../Context/AuthProvider";

const Overview = () => {
  const { user } = useContext(AuthContext);

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/profile/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(currentUser);

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="bg-accent text-center max-w-sm mx-auto">
      <h3 className="text-xl">{currentUser.name}</h3>
      <br />
      <h4 className="text-lg">{currentUser.email}</h4>
      <br />
      <h5 className="">{currentUser.role}</h5>
    </div>
  );
};

export default Overview;
