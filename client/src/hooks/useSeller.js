import { useEffect, useState } from "react";
const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/seller/${email}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsSeller(data.isSeller);

          setSellerLoading(false);
        });
    }
  }, [email]);

  return [isSeller, sellerLoading];
};
export default useSeller;
