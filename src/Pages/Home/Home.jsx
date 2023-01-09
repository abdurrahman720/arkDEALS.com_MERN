import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Advertisement from './Advertisement/Advertisement';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {

    const { data: ads = [] } = useQuery({
        queryKey: ['ads'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/get-advertisement`);
            const data = res.json();
            return data;
        }
    })
    console.log(ads);

    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            {
                ads?.length>=1 && <Advertisement ads={ads}></Advertisement>
            }
        </div>
    );
};

export default Home;