import React, { useState } from "react";
import { addRecipeFirestoreStart } from "../redux/Recipe.Action";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "../CSS/Addyours.scss";

export default function AddYours() {
  // for setting all input values in these objects and then in use state
  const iPersonalDetails = {
    username: "",
    useremail: "",
    recipename: "",
    category: "",
    image: "",
    description: "",
  };
  const iSteps = {};
  const iIngridients = {};

  const [Image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [personalDetails, setPersonalDetails] = useState(iPersonalDetails);
  const [steps, setSteps] = useState(iSteps);
  const [ingridients, setIngridients] = useState(iIngridients);

  // distructuring....
  const { username, useremail, recipename, category, description } =
    personalDetails;
  // const { } = steps;
  // const { } = ingridients;

  // setting values on changing
  const inputChange_PD = (event) => {
    setPersonalDetails({
      ...personalDetails,
      [event.target.name]: event.target.value,
    });
  };

  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  // some of functionality like adding more inputs in ingridients and in steps
  const [stepsInputs, setStepsInputs] = useState(["", ""]);
  const [ingridientsInputs, setIngridientsInputs] = useState(["", ""]);

  // setting errors
  const [minimumStepsError, setMinimumStepsError] = useState(false);
  const [minimumIngridientsError, setMinimumIngridientsError] = useState(false);
  //cannot leave empty more than two steps or ingridients
  const [cantLeaveEmpty_Steps, setCantLeaveEmpty_Steps] = useState(false);
  const [cantLeaveEmpty_Ingridients, setCantLeaveEmpty_Ingridients] =
    useState(false);
  // errors for name email recipe name and category
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [recipeNameError, setRecipeNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  // image error
  const [imageError, setImageError] = useState(false);
  // description error minimum 30 words...
  const [des_Error, setDes_Error] = useState(false);

  // Submit Function
  const submit = async (event) => {
    event.preventDefault();

    if (username !== "") {
      if (useremail !== "") {
        if (recipename !== "") {
          if (category !== "") {
            if (useremail.includes("@") && useremail.includes(".")) {
              if (Image) {
                if (imageUrl) {
                  if (description.length > 100) {
                    if (ingridientsInputs.length > 4) {
                      if (stepsInputs.length > 4) {
                        let values_S = [...stepsInputs];
                        let checkEmpty_S = values_S.filter(
                          (item) => item === ""
                        );
                        if (checkEmpty_S.length <= 1) {
                          let values_I = [...ingridientsInputs];
                          let checkEmpty_I = values_I.filter(
                            (item) => item === ""
                          );
                          if (checkEmpty_I <= 1) {
                            // before setting it in firebase, it's good if we arrange it in manner
                            const final_Data = {
                              user_name: username,
                              user_email: useremail,
                              recipe: {
                                category: category,
                                recipe_name: recipename,
                                steps: { ...steps },
                                ingridients: { ...ingridients },
                              },
                              image_url: imageUrl,
                              description: description,
                            };
                            dispatch(addRecipeFirestoreStart(final_Data));
                            setPersonalDetails({
                              username: "",
                              useremail: "",
                              recipename: "",
                              category: "",
                            });
                            setStepsInputs([""]);
                            setIngridientsInputs([""]);
                            setImageUrl("");
                            setInterval(() => {
                              navigate("/all");
                            }, 3000);
                          } else {
                            setCantLeaveEmpty_Ingridients(true);
                          }
                        } else {
                          setCantLeaveEmpty_Steps(true);
                        }
                      } else {
                        setMinimumStepsError(true);
                      }
                    } else {
                      setMinimumIngridientsError(true);
                    }
                  } else {
                    setDes_Error(true);
                  }
                }
              } else {
                setImageError(true);
              }
            } else {
              setEmailValidateError(true);
            }
          } else {
            setCategoryError(true);
          }
        } else {
          setRecipeNameError(true);
        }
      } else {
        setEmailError(true);
      }
    } else {
      setNameError(true);
    }
  };

  // function for getting image url after storing image
  const image_Change = async (event) => {
    setImage(event.target.files[0]);
    const fileName = `${Date.now()}___${event.target.files[0].name}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, event.target.files[0]);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  // adding Loading
  const { adding_loading, categories } = useSelector((state) => state);
  if (adding_loading) {
    return (
      <div
        className="text-center"
        style={{ marginTop: "40vh", marginLeft: "48vw" }}
      >
        <Triangle
          height="80"
          width="80"
          color="grey"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => {
          navigate("/all");
        }}
        className="btn btn-outline-secondary "
        style={{ position: "absolute", left: "1rem", top: "1rem" }}
      >
        <span className="material-symbols-outlined pt-2 fs-1">
          keyboard_double_arrow_left
        </span>
      </div>
      <div className="container-fluid py-5" style={{ background: "#8ad6ff42" }}>
        <form className="container" onSubmit={submit}>
          <div className=" row d-flex ">
            <h1>----- Add Your Own Recipe -----</h1>
            {/*                                      NAME                                    */}
            <div className="mb-3 col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                name="username"
                value={username}
                className="form-control"
                placeholder="Enter Your Name"
                onChange={inputChange_PD}
                onInput={() => {
                  setNameError(false);
                }}
              />
              {nameError && (
                <p className="text-danger">Please enter your name...</p>
              )}
            </div>

            {/*                                      EMAIL                                    */}
            <div className="mb-3  col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="email" className="form-label">
                Your Email (it's for someone who like your recipe directly
                contact you for it...)
              </label>
              <input
                type="email"
                name="useremail"
                className="form-control"
                placeholder="Enter Your E-mail here..."
                value={useremail}
                onChange={inputChange_PD}
                onInput={() => {
                  setEmailError(false);
                  setEmailValidateError(false);
                }}
              />
              {emailError && (
                <p className="text-danger">Please enter your e-mail...</p>
              )}
              {emailValidateError && (
                <p className="text-danger">
                  Please enter a valid e-mail address...
                </p>
              )}
            </div>

            {/*                                  RECIPE DETAILS                               */}
            <legend className="mt-">About your Recipe</legend>

            {/*                                    RECIPE NAME                                */}
            <div className="mb-3 col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="" className="form-label">
                Recipe Name
              </label>
              <input
                type="text"
                className="form-control"
                name="recipename"
                placeholder="Your Recipe Name"
                value={recipename}
                onChange={inputChange_PD}
                onInput={() => {
                  setRecipeNameError(false);
                }}
              />
              {recipeNameError && (
                <p className="text-danger">Please enter your recipe name...</p>
              )}
            </div>

            {/*                                   RECIPE CATEGORY                              */}
            <div className="mb-3 col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                list="categoryList"
                className="form-control"
                placeholder="Category for your Recipe eg. Snacks,etc"
                value={category}
                onChange={inputChange_PD}
                onInput={() => {
                  setCategoryError(false);
                }}
              />
              {categoryError && (
                <p className="text-danger">
                  Please enter your Recipe Category...
                </p>
              )}
              <datalist id="categoryList">
                {categories.map((item) => (
                  <option value={item} key={item} />
                ))}
              </datalist>
            </div>

            {/*                                     IMAGE                                      */}
            <div className="mb-3 col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="" className="form-label">
                Upload Preview Image
              </label>
              <input
                type="file"
                className="form-control"
                name="Image"
                accept="image/*"
                onChange={image_Change}
                onInput={() => {
                  setImageError(false);
                }}
              />
              {imageError && (
                <p className="text-danger">Please Select an Image...</p>
              )}
            </div>
            {/*                                     DESCRIPTION                                    */}
            <div className="mb-3  col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <textarea
                cols="10"
                rows="5"
                type="file"
                className="form-control"
                name="description"
                placeholder="Type something about your dish, like_ who can eat and who can't...! and what would be the taste..."
                value={description}
                onChange={inputChange_PD}
                onInput={() => {
                  setDes_Error(false);
                }}
              ></textarea>
              {des_Error && (
                <p className="text-danger">
                  Please enter something about your dish...(min.30 words)
                </p>
              )}
            </div>

            {/*                                        INGRIDIENTS                                 */}

            <div className="mb-3  col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="ingridients" className="form-label">
                Ingridients:
              </label>
              {ingridientsInputs.map((input, index) => (
                <div key={index}>
                  <h6 className="d-inline">{`Ingridient ${index + 1}`}</h6>
                  <input
                    name={`ingridient${index + 1}`}
                    value={input}
                    type="text"
                    className="w-75 form-control"
                    onChange={(event) => {
                      // getting all inputs of ingridients
                      const values = [...ingridientsInputs];
                      // setting values of input by their index
                      values[index] = event.target.value;
                      setIngridientsInputs(values);

                      // setting all ingi=ridients one by one...
                      setIngridients({
                        ...ingridients,
                        [event.target.name]: event.target.value,
                      });

                      setMinimumIngridientsError(false);
                      setCantLeaveEmpty_Ingridients(false);
                    }}
                  />
                </div>
              ))}
              {minimumIngridientsError && (
                <p className="text-danger">
                  You've to enter minimum 5 Ingridients
                </p>
              )}
              {cantLeaveEmpty_Ingridients && (
                <p className="text-danger">
                  You can't leave more than one ingridients input field empty...
                </p>
              )}
              <button
                onClick={(event) => {
                  event.preventDefault();

                  let values = [...ingridientsInputs];
                  let empty = values.every((item) => item !== "");
                  if (empty) {
                    setIngridientsInputs([...ingridientsInputs, ""]);
                  }
                }}
              >
                Add more...
              </button>
            </div>

            {/*                                    STEPS                                      */}

            <div className="mb-3  col col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 ">
              <label htmlFor="step" className="form-label">
                Steps:
              </label>
              {stepsInputs.map((input, index) => (
                <div key={index}>
                  <h6 className="d-inline">{`Step ${index + 1}`}</h6>
                  <input
                    name={`step${index + 1}`}
                    value={input}
                    type="text"
                    className="w-100 form-control"
                    onChange={(event) => {
                      // getting all inputs of steps
                      const values = [...stepsInputs];
                      // setting values of input by their index
                      values[index] = event.target.value;
                      setStepsInputs(values);

                      // setting all steps one by one
                      setSteps({
                        ...steps,
                        [event.target.name]: event.target.value,
                      });

                      setCantLeaveEmpty_Steps(false);
                      setMinimumStepsError(false);
                    }}
                  />
                </div>
              ))}
              {minimumStepsError && (
                <p className="text-danger">You've to enter minimum 5 Steps</p>
              )}
              {cantLeaveEmpty_Steps && (
                <p className="text-danger">
                  You can't leave more than one steps input field empty...
                </p>
              )}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  let values = [...stepsInputs];
                  let empty = values.every((item) => item !== "");
                  if (empty) {
                    setStepsInputs([...stepsInputs, ""]);
                  }
                }}
              >
                Add more...
              </button>
            </div>

            <div className="text-center">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
