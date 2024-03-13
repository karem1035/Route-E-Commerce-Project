import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import { Helmet } from 'react-helmet'


export default function Home() {

    return <>
        <Helmet>
            <title>Fresh Cart</title>
        </Helmet>
        <div className='container pb-5'>
            <MainSlider />
            
            <FeaturedProducts />
            
        </div>
    </>
}
