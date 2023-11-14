import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [buyerLoading, setbuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/buyer/${email}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsBuyer(data.isBuyer);
          setbuyerLoading(false);
        });
    }
  }, [email]);

  return [isBuyer, buyerLoading];
};

export default useBuyer;
