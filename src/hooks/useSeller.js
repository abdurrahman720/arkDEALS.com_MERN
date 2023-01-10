import { useEffect, useState } from "react"
const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5001/seller/${email}`)
                .then((response) => response.json())
                .then(data => {
                    console.log(data);
                    setIsSeller(data.isSeller);
                    setIsVerified(data.isVerified)
                    setSellerLoading(false);
            })
        }
    }, [email])
    
    return [isSeller,sellerLoading,isVerified]
}
export default useSeller;