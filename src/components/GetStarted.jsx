import React from 'react'
import '../CSS/GetStarted.scss';
import { useDispatch } from 'react-redux';
import { getAllRecipesFirestoreStart } from '../redux/Recipe.Action';
import { useNavigate } from 'react-router-dom';


export default function GetStarted() {

  const navigate =  useNavigate();

  const dispatch = useDispatch();

  return (
    <div>
      <div className='container-fluid containr' id='and'>
        <button className='button' id='btn__' style={{display:'none'}} onClick={() => {
          document.getElementById('and').style.display = 'none';
          navigate('/all');
          dispatch(getAllRecipesFirestoreStart());
        }}> Get Started {'>>'}</button>

        <div id='note'>
          <div className="toast-body" style={{
            width: '60%',
             height: 'auto',
             position:'absolute',
             top:'15vh',left:'20%',
             background:'grey',
             padding:'2rem',
             borderRadius:'20px',
             fontSize:'1.3rem',color:'white'
          }}>
            Please note that dietary preferences and restrictions can vary, so it's always important to consider individual needs when preparing or consuming these dishes.
            <div className="mt-2">
              <button type="button" className="btn btn-outline-danger  mt-3" onClick={() => {
                document.getElementById('btn__').style.display = 'block';
                document.getElementById('note').style.display = 'none';
              }}>Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
