import { useEffect, useState } from "react";
const useVerified = (email) => {
  const [isVerified, setVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://ark-deals-server.vercel.app/profile/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setVerified(data.verified);
          setVerifyLoading(false);
        });
    }
  }, [email]);

  return [isVerified, verifyLoading];
};
export default useVerified;
