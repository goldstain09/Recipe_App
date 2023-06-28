import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/AllRecipes.scss'
import img from '../Images/card_placeholder_image.jpg'

export default function Category() {

  // navigate
  const navigate = useNavigate();

  // getting data using use SElector
  const { category, categoryLoading, Recipes_Data } = useSelector((state) => state);

  // separated data
  const [categoryData, setCategoryData] = useState([]);

  // separating the selected category data from all data 
  useEffect(() => {
    let separated = Recipes_Data.filter((item) => item.data.recipe.category === category);
    setCategoryData(separated);
  }, [Recipes_Data.length > 0, category])



  if (categoryLoading) {
    return (<div style={{ position: 'absolute', left: '40%', top: '35vh' }}>
      <MutatingDots
        height="100"
        width="100"
        color="grey"
        secondaryColor='black'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>)
  }

  return (
    <>
      <div className='container mt-5 pt-5 allRecipes_Maindiv'>
        <div className='row d-flex'>
          <div onClick={() => { navigate('/all') }} className='btn btn-outline-secondary' style={{ position: 'absolute', left: '1rem', top: '1rem', width: 'auto' }}>
            <span class="material-symbols-outlined pt-2 fs-1">
              keyboard_double_arrow_left
            </span>
          </div>
          {
            categoryData.length > 0 ? categoryData.map((item, index) => (
              <div className="card mb-3" key={item.id + index}>
                <div className='row'>
                  <div className='col-sm-12 col-12 col-md-4 align-content-center justify-content-center'>
                    <img alt='IMage__' src={item.data.image_url} className="card-img-top" style={{ height: '20rem' }} />
                  </div>
                  <div className="card-body col-md-8">
                    <h5 className="card-title">{item.data.recipe.recipe_name}</h5>
                    <p className="card-text">{item.data.description}</p>
                    <p className="card-text"><small className="text-muted">{`By ~${item.data.user_name}`}</small></p>
                    <Link to={`/recipe/${item.id}`} className='btn btn-outline-dark'>Explore Recipe...</Link>
                  </div>
                </div>
              </div>
            )) : (<div className='container mt-4'>
            <div className='row pt-5'>
              <div className='col-12 col-md-4 '>
                <img alt='IMage__' src={img} className='w-100 h-100' style={{ borderRadius: '10px' }} />
              </div>
              <div className='col-12 col-md-8 placeholder-glow'>
                <div style={{ marginTop: '7rem' }}>
                  <span className='placeholder col-6'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                </div>
              </div>
            </div>
            <div className='row pt-5'>
              <div className='col-12 col-md-4 '>
                <img alt='IMage__' src={img} className='w-100 h-100' style={{ borderRadius: '10px' }} />
              </div>
              <div className='col-12 col-md-8 placeholder-glow'>
                <div style={{ marginTop: '7rem' }}>
                  <span className='placeholder col-6'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                </div>
              </div>
            </div>
            <div className='row pt-5'>
              <div className='col-12 col-md-4 '>
                <img alt='IMage__' src={img} className='w-100 h-100' style={{ borderRadius: '10px' }} />
              </div>
              <div className='col-12 col-md-8 placeholder-glow'>
                <div style={{ marginTop: '7rem' }}>
                  <span className='placeholder col-6'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-4'></span>
                  <span className='placeholder col-5'></span>
                  <span className='placeholder col-7'></span>
                  <span className='placeholder col-10'></span>
                </div>
              </div>
            </div>
          </div>)
          }

        </div>
      </div>

    </>
  )
}
