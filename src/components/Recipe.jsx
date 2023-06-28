import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import img from '../Images/card_placeholder_image.jpg'
import '../CSS/Recipe.scss'
import { delete_Start } from '../redux/Recipe.Action';


export default function Recipe() {

  // navigate for back button 
  const navigate = useNavigate();


  // getting id using params of a particular recipe & also destructuring 
  const { id } = useParams();


  // it.s for delete process
  const [deleteRecipe ,setDeleteRecipe] = useState();
  const [ dRError,setDRError] = useState(false);
  // dispatch
  const dispatch = useDispatch();
  // ------------------------------

  // getting data
  const Recipes_Data = useSelector((state) => state.Recipes_Data);

  // for storing data 
  const [data, setData] = useState();

  useEffect(() => {
    let singleRecipeData = Recipes_Data.filter((item) => item.id === id);
    // reason to do this that filter method gives an new array and inside it that item or object is present and
    // i want to use that object so i want it outside of that array... we also used that array but I'm ):
    let singleObject = singleRecipeData.splice(0, 1)[0];
    setData(singleObject);
  }, [id, Recipes_Data])

  return (
    <>
      <div onClick={() => { navigate('/all') }} className='btn btn-outline-secondary ' style={{ position: 'absolute', left: '1rem', top: '1rem' }}>
        <span className="material-symbols-outlined pt-2 fs-1">
          keyboard_double_arrow_left
        </span>
      </div>
      {
        data ? (<div className='container mt-5 pt-3 main_Container'>
          {/* image and description */}
          <div className='row pt-5 image_descriptiondiv'>
            <div className='col-12 col-md-4 '>
              <img alt='Image__' src={data.data.image_url} className='w-100 h-auto' style={{ borderRadius: '10px' }} />
            </div>
            <div className='col-12 col-md-8'>
              <div>
                <h2>{data.data.recipe.recipe_name}</h2>
                <p className='card-text'>{data.data.description}</p>
              </div>
            </div>
          </div>

          {/* info */}
          <div className='row pt-5'>
            <div className='col col-12 col-lg-4'>
            </div>
            <div className='col col-12 col-lg-8'>
              <h3 className='h1'>{`by~ ${data.data.user_name}`}</h3>
              <p>Note* If you have any query to this recipe, feel free to ask by~ mail</p>
              <h3 className='h1'>{`Gmail: ${data.data.user_email}`}</h3>
            </div>
          </div>

          <div className='container'>

            <div className='row mt-5' >

              {/* ingridients */}
              <ul className="list-group col-12 col-lg-4 col-xl-4" style={{ borderRight: '1px solid #10abff', borderRadius: '25px' }}>
                <h4 className='h1 d-inline'>Ingridients:</h4>
                {
                  Object.entries(data.data.recipe.ingridients)
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB, undefined, { numeric: true }))
                    .map(([key, value]) => (
                      <li className="ingrii list-group-item d-flex gap-2 justify-content-between align-items-center" key={key}>
                        <span className="badge bg-secondary">{key}</span>
                        {value}
                      </li>
                    ))
                }
              </ul>

              {/* its for only gapping */}
              <div className='col-1'></div>

              {/* steps */}
              <ul className="list-group col-12 col-lg-7 col-xl-7">
                <h4 className='h1 d-inline'>Steps:</h4>
              
                  <div className="ms-2 me-auto">
                    {
                      Object.entries(data.data.recipe.steps)
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB, undefined, { numeric: true }))
                        .map(([key, value]) => (
                          <li className="stepp list-group-item d-flex gap-2 justify-content-between align-items-center" key={key}>
                            <div className="fw-bold">{`${key}:`}</div>
                            {value}
                          </li>
                        ))
                    }
                  </div>
                
              </ul>
            </div>

            {/* info and deletion */}
            <div className='row mb-5' style={{ marginTop: '10rem', fontFamily: "'Abril Fatface', cursive" }}>
              <h3 style={{ color: '#8ad6ffd2' }} className='h3'>Important Info:</h3>
              <div className='d-flex gap-4'>
                <h6 className='text-secondary h5 pt-2'>IF it's your recipe you can Delete it...</h6>
                <h6 className='text-secondary h5 pt-2'>But you have to enter that KEY which we give you on the time of adding...</h6>
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-outline-danger col-2'>Delete</button>

              </div>
              <h5 className='text-primary h5'>If you Forget it my Mistake... you can send an Delete Request Email by Email you use to add this recipe</h5>
              <h5 className='text-primary h5'>We will check and delete it...</h5>
            </div>
          </div>



          {/* modal of delete------------------- */}
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-light">
                <div className="modal-header">
                  <h5 className="modal-title text-danger" id="staticBackdropLabel">Delete Recipe</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input type="text" value={deleteRecipe} autoFocus placeholder='Enter the Key' onChange={(event)=>{
                    setDeleteRecipe(event.target.value);
                    setDRError(false);
                  }} style={{background:'none',border:'none',outline:'none',borderBottom:'1px grey solid',color:'white'}} />
                  {
                    dRError && <p className='text-danger'>Please Enter the Correct Key...</p>
                  }
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary">Close</button> */}
                  <button type="button" className="btn btn-danger" onClick={()=>{
                    if(deleteRecipe === data.id){
                      dispatch(delete_Start(deleteRecipe));
                      navigate('/all');
                    }else{
                      setDRError(true);
                    }
                  }}  data-bs-dismiss="modal">Delete</button>
                </div>
              </div>
            </div>
          </div>

        </div>) : (<div className='container mt-4'>
          <div className='row pt-5'>
            <div className='col-12 col-md-4 '>
              <img alt='Image__' src={img} className='w-100 h-100' style={{ borderRadius: '10px' }} />
            </div>
            <div className='col-12 col-md-8'>
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
    </>
  )
}



{/* <span className="badge bg-primary rounded-pill">14</span> */ }



