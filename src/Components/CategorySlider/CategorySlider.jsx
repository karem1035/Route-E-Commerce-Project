import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import { productsContext } from '../../Context/ProductsContext.js';

export default function CategorySlider() {

    let { getAllCategories, categories, setCategories } = useContext(productsContext);

    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate();
    function getOut() {
        localStorage.removeItem('userToken');
        navigate('/');
    }

    async function getCategories() {
        setIsLoading(true);
        let res = await getAllCategories();
        if (res?.data?.results > 0) {
            setCategories(res?.data?.data);
        }
        else {
            if(res?.response?.data?.message == 'Expired Token. please login again') getOut();
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if(categories === null){
            getCategories();
        }
    }, []);

    const settings = {
        dots: true,
        infinity: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 5,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            },
        ]
    }


    if (isLoading) {
        return <Loader />
    }

    return <>
          
            <div className='container'>
        <div className='row py-5 g-3'>
       
       
            {categories?.map((category) => <Link className='col-md-3 product pb-2 position-relative' key={category._id} >
                <img height={350} className='w-100' src={category.image} alt="" />
                <h5 className=' text-center me-1'>{category?.name}</h5>
            </Link>)}
            </div>
            
            </div> 
           
            
       
       
            
            
          
     
    </>
}
