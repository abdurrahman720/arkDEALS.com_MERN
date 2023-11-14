import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/admin/${email}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsAdmin(data.isAdmin);
          setAdminLoading(false);
        });
    }
  }, [email]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
