import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categories_Start, category_Start, search_Start } from '../redux/Recipe.Action';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.scss'

export default function NavBar() {




    // dispatch
    const dispatch = useDispatch();
    // navigate
    const navigate = useNavigate();

    // getting  data for categories
    const Recipes_Data = useSelector((state) => state.Recipes_Data);

    // getting same category again and again becoz one category have more recipes so 
    const [categoriesAll, setCategoriesAll] = useState([]);
    useEffect(() => {
        const categories = [];
        Recipes_Data.forEach(item => {
            if (!categories.includes(item.data.recipe.category)) {
                categories.push(item.data.recipe.category);
            }
        });
        setCategoriesAll(categories);
        dispatch(categories_Start(categories));

    }, [Recipes_Data.length > 0])




    // for storing input value
    const [inputValue, setInputValue] = useState('');
    // error
    const [inputValueError, setInputValueError] = useState(false);
    // search button
    const search = (event) => {
        event.preventDefault();
        if (inputValue.length > 0) {
            dispatch(search_Start(inputValue));
        } else {
            setInputValueError(true);
        }
    }






    return (
        <>
            <header>
                <div className="container-fluid d-grid gap-3 align-items-center main-container" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div className="accordion d-flex gap-5 " id="accordionExample">
                        <div className="accordion-item w-75">
                            <h2 className="accordion-header " id="headingOne">
                                <button className="accordion-button" style={{ outline: 'none' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Categories...
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {
                                        categoriesAll ? categoriesAll.map((category, index) => (
                                            <button onClick={() => {
                                                // I can also do this with params but i thought it will looks better if there is loading effect in category
                                                dispatch(category_Start(category));
                                                navigate(`/category`);
                                            }} className='btn m-2' key={index}>
                                                {
                                                    category
                                                }
                                            </button>
                                        ))
                                            : (<div>
                                                <h1>Loading...</h1>
                                            </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-25'>
                            <button className='add_BTN' style={{ border: 'none', background: 'none', outline: 'none' }} onClick={() => { navigate('/addyours') }}>
                                <span className="material-symbols-outlined " style={{ fontSize: '4rem', color: '#8AD6FF' }}>
                                    app_registration
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="align-items-center form_div">
                        <form className="w-100 me-1 d-flex gap-3 searchBAR_div" onSubmit={search}>
                            <input
                                type="search"
                                className="form-control ms-1 ms-sm-2 ms-md-3 ms-lg-4 ms-xl-5"
                                placeholder="Search Any Dish you like..."
                                aria-label="Search"
                                value={inputValue}
                                onInput={(event) => {
                                    setInputValue(event.target.value);
                                    setInputValueError(false);
                                }}
                            />
                            <button type='submit' className=' btn btn-outline-success'>
                                <span className="material-symbols-outlined pt-2" style={{ fontSize: '3rem' }}>
                                    menu_book
                                </span>
                            </button>

                        </form>
                        {
                            inputValueError && <p className='text-danger ms-1 ms-sm-2 ms-md-3 ms-lg-4 ms-xl-5 fs-5'>Please type something...</p>
                        }
                    </div>
                </div>
            </header>

            {/*                   off canvass                  */}
            <h1 className='h1'>Recipes...</h1>
            <button className="btn offcanvas_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <span className="material-symbols-outlined pt-2" style={{ fontSize: '2rem' }}>
                    menu
                </span>
            </button>

            <div className="offcanvas offcanvas-start" style={{ backdropFilter: 'blur(10px)', background: '' }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{ color: '#46beff', fontFamily: "'Lobster', cursive" }}>Recipes...</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        {/* search bar */}
                        <div className="align-items-center ">
                            <form className="w-100 me-1 d-flex gap-3 offCanvas_search" onSubmit={search}>
                                <input
                                    type="search"
                                    className="form-control ms-1 ms-sm-2 ms-md-3 ms-lg-4 ms-xl-5"
                                    placeholder="Search Any Dish you like..."
                                    aria-label="Search"
                                    value={inputValue}
                                    onInput={(event) => {
                                        setInputValue(event.target.value);
                                        setInputValueError(false);
                                    }}
                                />
                                <button type='submit' className=' btn btn-outline-success' data-bs-dismiss="offcanvas" aria-label="Close">
                                    <span className="material-symbols-outlined pt-2" >
                                        menu_book
                                    </span>
                                </button>

                            </form>
                            {
                                inputValueError && <p className='text-danger ms-1 ms-sm-2 ms-md-3 ms-lg-4 ms-xl-5 fs-5'>Please type something...</p>
                            }
                        </div>

                        {/* categories */}
                        <div className="accordion d-flex gap-5 " id="accordionExample">
                            <div className="accordion-item w-75">
                                <h2 className="accordion-header " id="headingOne">
                                    <button className="accordion-button" style={{ outline: 'none' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Categories...
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {
                                            categoriesAll ? categoriesAll.map((category, index) => (
                                                <button onClick={() => {
                                                    // I can also do this with params but i thought it will looks better if there is loading effect in category
                                                    dispatch(category_Start(category));
                                                    navigate(`/category`);
                                                }} className='btn m-2' key={index}>
                                                    {
                                                        category
                                                    }
                                                </button>
                                            ))
                                                : (<div>
                                                    <h1>Loading...</h1>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-25'>
                                <button className='add_BTN' style={{ border: 'none', background: 'none', outline: 'none' }} onClick={() => { navigate('/addyours') }}>
                                    <span className="material-symbols-outlined " style={{ fontSize: '4rem', color: '#8AD6FF' }}>
                                        app_registration
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}


