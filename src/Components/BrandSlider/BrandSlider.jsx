import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { productsContext } from '../../Context/ProductsContext.js';

export default function BrandSlider() {
    
    let { getAllBrands } = useContext(productsContext);

    const [brands, setBrands] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate();
    function getOut() {
        localStorage.removeItem('userToken');
        navigate('/');
    }

    async function getbrands() {
        setIsLoading(true);
        let res = await getAllBrands();
        if (res?.data?.results > 0) {
            setBrands(res?.data?.data);
        }
        else {
            if(res?.response?.data?.message == 'Expired Token. please login again') getOut();
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getbrands();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return <>
    
    <div className='container'>
        <div className='row py-5 g-5'>
       
        <h2 className='pt-2 text-main'>All Brands</h2>
            {brands?.map((brand) => <Link className='col-md-2 product position-relative ' key={brand._id} to={`/brands/${brand._id}`}>
                <img height={150} className='w-100' src={brand.image} alt="" />
                <h5 className=' text-center '>{brand?.name}</h5>
            </Link>)}
            </div>
            
            </div> 
           
    
    </>
}
