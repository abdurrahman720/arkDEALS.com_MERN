import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Advertisement from './Advertisement/Advertisement';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email)

    const { data: ads = [] } = useQuery({
        queryKey: ['ads'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/get-advertisement`);
            const data = res.json();
            return data;
        }
    })


    return (
        <div>
            <Banner isSeller={isSeller}></Banner>
            <Categories></Categories>
            {
                ads?.length>=1 && <Advertisement ads={ads}></Advertisement>
            }
        </div>
    );
};

export default Home;