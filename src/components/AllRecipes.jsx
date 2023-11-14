import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardPlaceholder from "./CardPlaceholder";
import { getAllRecipesFirestoreStart } from "../redux/Recipe.Action";
import { RotatingLines } from "react-loader-spinner";
import "../CSS/AllRecipes.scss";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function AllRecipes() {
  // dispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(getAllRecipesFirestoreStart());
  }, []);

  // getting all data from store
  const { Recipes_Data, searchValue, searchLoading, modal, dataKey } =
    useSelector((state) => state);

  // for storing data
  const [data_S, setData_S] = useState([]);

  // search Handle

  useEffect(() => {
    if (searchValue) {
      let separating_according_Search = Recipes_Data.filter((item) =>
        item.data.recipe.recipe_name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setData_S(separating_according_Search);
    } else {
      setData_S(Recipes_Data);
    }
  }, [searchValue.length, Recipes_Data.length]);

  // placeholderss  ----------
  const getting_data_loading = useSelector(
    (state) => state.getting_data_loading
  );

  if (getting_data_loading) {
    return (
      <div className="container " style={{ marginTop: "6rem" }}>
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
      </div>
    );
  }

  // loading
  if (searchLoading) {
    return (
      <div style={{ position: "absolute", top: "30vh", left: "42%" }}>
        <RotatingLines
          strokeColor="#46beff"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  // this is for modal with added data key , and it is used to delete any recipe if any user want to delete their recipe
  // key will be helpful for deletion
  if (modal) {
    return (
      <>
        <div className="container">
          <div>
            <h1>{dataKey}</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container allRecipes_Maindiv">
        <div className="row d-flex">
          {data_S.length > 0 ? (
            data_S.map((item, index) => (
              <div key={item.id + index} className="card mb-3">
                <div className="row">
                  <div className="col-sm-12 col-12 col-md-4 align-content-center justify-content-center">
                    <img
                      alt="Recipe__Image"
                      src={item.data.image_url}
                      className="card-img-top"
                      style={{ height: "20rem" }}
                    />
                  </div>
                  <div className="card-body col-md-8">
                    <h5 className="card-title">
                      {item.data.recipe.recipe_name}
                    </h5>
                    <p className="card-text">{item.data.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{`By ~${item.data.user_name}`}</small>
                    </p>
                    <Link
                      to={`/recipe/${item.id}`}
                      className="btn btn-outline-dark"
                    >
                      {"Explore Recipe >>>"}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Results Found...</div>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
