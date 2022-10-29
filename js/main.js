var arr = [];

let row = document.getElementById("myRow");
let toggle = document.querySelector(".toggel-menu");
toggle.addEventListener("click", function () {
  if ($(".nav-side").css("left") == "0px") {
    $("nav").css("transform", "translateX(0px)");
    $(".nav-side").css("left", "240px");
    toggle.innerHTML = `<i class="fa-solid fa-xmark fa-2x"></i>`;
    animations();
  } else {
    $("nav").css("transform", "translateX(-100%)");
    $(".nav-side").css("left", "0px");
    animationsRevers();
    toggle.innerHTML = `<i class="fa fa-align-justify fs-3"></i>`;
  }
});

let search = document.querySelector("#search");
let searchByFirstLetter = document.querySelector("#searchByFirst");
search.addEventListener("input", function () {
  $(".data").css("display", "block");
  getMealsByName(search.value);
});
searchByFirstLetter.addEventListener("input", function () {
  $(".data").css("display", "block");
  getMealsByFirstLetter(searchByFirstLetter.value);
  if (searchByFirstLetter.value == "" || searchByFirstLetter.value == null) {
    getMealsByName("");
  }
});
function getMealsByName(name) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();

  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayMeals(arr);
  });
}

function getMealsByFirstLetter(letter) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayMeals(arr);
  });
}

function displayMeals(arr) {
  let cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-6 col-lg-3 overflow-hidden ">
                    <div class="img-food position-relative" onclick=(getMeal('${arr[i].idMeal}'))>
                        <div class="content-box ">
                            <img src="${arr[i].strMealThumb}" class="img-fluid rounded">
                            <div
                                class="layer position-absolute  d-flex  justify-content-start align-items-center top-100 start-0 end-0 bottom-0 ">
                                <p class="fs-2 ps-2 mb-5">${arr[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
  }
  row.innerHTML = cartoona;
}
//
function getCategories() {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/categories.php`);
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4) {
      arr = JSON.parse(myHttp.response).categories;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayCategories(arr);
  });
}

function displayCategories(arr) {
  let cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-6 col-lg-3 overflow-hidden ">
                    <div class="img-food position-relative">
                        <div class="content-box-cat" onclick=(filterByCategory('${
                          arr[i].strCategory
                        }'))>
                            <img src="${
                              arr[i].strCategoryThumb
                            }" class="img-fluid rounded">
                            <div class="layer position-absolute   text-center top-100 start-0 end-0 bottom-0 ">
                                <div class="info p-2">
                                    <p class="fs-2 m-0 p-0">${
                                      arr[i].strCategory
                                    }</p>
                                    <p class="fs-6 m-0 p-0">${arr[
                                      i
                                    ].strCategoryDescription
                                      .split(" ")
                                      .slice(0, 20)
                                      .join(" ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
  }
  row.innerHTML = cartoona;
}

function getIngradiants() {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayIngradiants(arr);
  });
}

function displayIngradiants(arr) {
  let cartoona = ``;
  for (let i = 0; i < 20; i++) {
    cartoona += `<div class="col-md-6 col-lg-3">
                    <div class="post  text-center" onclick=(filterByIndegriant('${
                      arr[i].strIngredient
                    }'))>
                        <i class="fa-solid fa-bowl-food fa-3x icon-color"></i>
                        <h2 class="text-white">${arr[i].strIngredient}</h2>
                        <p class="text-white fw-lighter">${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                
                </div>`;
  }
  row.innerHTML = cartoona;
}

function filterByCategory(category) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");

      // displayMeals(arr);
      // displayMeals(container);
    }
    displayMeals(arr);
  });
}
function filterByIndegriant(indegriant) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${indegriant}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");

      // displayMeals(arr);
      // displayMeals(container);
    }
    displayMeals(arr);
  });
}
function filterByArea(area) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");

      // displayMeals(arr);
      // displayMeals(container);
    }
    displayMeals(arr);
  });
}

// getIngradiants();

function getArea() {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  myHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      arr = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayArea(arr);
  });
}
function displayArea(arr) {
  let cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-6 col-lg-3">
                    <div class="post text-center shadow rounded"onclick=(filterByArea('${arr[i].strArea}')) >
                        <i class="fa-solid fa-city fa-3x"></i>
                        <h2 class="pt-2 text-white">${arr[i].strArea}</h2>
                    </div>
                </div>`;
  }
  row.innerHTML = cartoona;
}

function getMeal(mealid) {
  $(".loading-container").css("display", "block");
  let myHttp = new XMLHttpRequest();
  let meal = [];
  myHttp.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      meal = JSON.parse(myHttp.response).meals;

      $(".loading-container").fadeOut(100);
      $("body").css("overflowY", "auto");
    }
    displayMeal(meal);
  });
}
// getMeal();

function displayMeal(meal) {
  let recipes = ``;
  for (let i = 1; i <= 40; i++) {
    if (meal[0][`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-2 alert-success rounded">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal[0].strTags?.split(",");
  let tag = ``;
  for (let i = 0; i < tags?.length; i++) {
    tag += `<li class="my-3 mx-1 p-2 alert-success rounded">${tags[i]}</li>`;
  }
  let cartoona = `<div class="col-md-4 text-center text-white">
                    <img src="${meal[0].strMealThumb}" class="w-100" alt="" srcset="">
                    <p class="pt-3 fs-2">${meal[0].strMeal}</p>
                </div>
                <div class="col-md-8">
                    <div class="content text-white">
                        <h2>Instructions</h2>
                        <p>${meal[0].strInstructions}
                        </p>
                        <h5>Area : <span>${meal[0].strArea}</span></h5>
                        <h5>Category : <span>${meal[0].strCategory}</span></h5>
                        <h2>Recipes :</h2>
                        <ul class="d-flex p-0 flex-wrap" id="recipes">
                            
                        </ul>
                        <h2>Tags :</h2>
                        <ul class="d-flex p-0 flex-wrap" id="tags">
                            
                        </ul>
                        <h2>

                        <a class="btn btn-success" target="_blank" href="${meal[0].strSource}">Source</a>
                        <a class="btn video ms-2 text-white" target="_blank" href="${meal[0].strYoutube}">Youtube</a>

                    </div>
                </div>`;
  row.innerHTML = cartoona;
  document.getElementById("recipes").innerHTML = recipes;

  document.getElementById("tags").innerHTML = tag;
}
function displayContact() {
  let cartoona = `<div class="container w-75 mx-auto mb-2 bg-black text-center">
                    <h2 class="text-light mb-2">Contact Us...</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control shadow mb-2 " id="name"
                                    placeholder="Enter Your Name">
                                <div class="alert alert-danger mt-1 d-none" id="alertName" role="alert">
                                    Special Characters and Numbers not allowed
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control shadow mb-2 " id="email"
                                    placeholder="Enter Email">
                                <div class="alert alert-danger mt-1 d-none" id="alertEmail" role="alert">
                                    Enter valid email. *Ex: xxx@yyy.zzz
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mt-1">
                                <input type="text" class="form-control shadow mb-2 " id="phone"
                                    placeholder="Enter Phone">
                                <div class="alert alert-danger mt-1 d-none" id="alertPhone" role="alert">
                                    Enter valid Phone Number
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mt-1">
                                <input type="text" class="form-control shadow mb-2 " id="age" placeholder="Enter Age">
                                <div class="alert alert-danger mt-1 d-none" id="alertAge" role="alert">
                                    Enter valid age
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mt-1">
                                <input type="text" class="form-control shadow mb-2 " id="password"
                                    placeholder="Enter Password">
                                <div class="alert alert-danger mt-1 d-none" id="alertPass" role="alert">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mt-1">
                                <input type="text" class="form-control shadow mb-2 " id="Repassword"
                                    placeholder="Enter RePassword">
                                <div class="alert alert-danger mt-1 d-none" id="alertRePass" role="alert">
                                    Enter valid Repassword
                                </div>
                            </div>
                        </div>


                    </div>
                    <button type="submit" disabled="true" id="submit"
                        class="btn btn-outline-danger mt-3">Submit</button>

                </div>`;

  row.innerHTML = cartoona;
}
function animations() {
  $("nav ul .item1").animate(
    { paddingTop: "25px", opacity: "1" },
    200,
    function () {
      $("nav ul .item2").animate(
        { paddingTop: "25px", opacity: "1" },
        300,
        function () {
          $("nav ul .item3").animate(
            { paddingTop: "25px", opacity: "1" },
            400,
            function () {
              $("nav ul .item4").animate(
                { paddingTop: "25px", opacity: "1" },
                500,
                function () {
                  $("nav ul .item5").animate(
                    { paddingTop: "25px", opacity: "1" },
                    600
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

function animationsRevers() {
  $("nav ul .item1").animate(
    { paddingTop: "80px", opacity: "0" },
    100,
    function () {
      $("nav ul .item2").animate(
        { paddingTop: "80px", opacity: "0" },
        200,
        function () {
          $("nav ul .item3").animate(
            { paddingTop: "80px", opacity: "0" },
            300,
            function () {
              $("nav ul .item4").animate(
                { paddingTop: "80px", opacity: "0" },
                400,
                function () {
                  $("nav ul .item5").animate(
                    { paddingTop: "80px", opacity: "0" },
                    500
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

// getMealsByName("");

$("nav ul .item1").click(function () {
  $(".search").css("display", "block");
  $(".data").css("display", "none");
});

$("nav ul .item2").click(function () {
  $(".search").css("display", "none");
  getCategories();
  $(".data").css("display", "block");
});
$("nav ul .item3").click(function () {
  $(".search").css("display", "none");
  getArea();
  $(".data").css("display", "block");
});
$("nav ul .item4").click(function () {
  $(".search").css("display", "none");
  getIngradiants();
  $(".data").css("display", "block");
});
$("nav ul .item5").click(function () {
  $(".search").css("display", "none");

  displayContact();
  validate();

  $(".data").css("display", "block");
});

// getCategories();
getMealsByName("");
function validate() {
  let inputName = document.getElementById("name");
  let inputEmail = document.getElementById("email");
  let inputPhone = document.getElementById("phone");
  let inputAge = document.getElementById("age");
  let inputPass = document.getElementById("password");
  let inputRePass = document.getElementById("Repassword");
  let alertName = document.getElementById("alertName");
  let alertEmail = document.getElementById("alertEmail");
  let alertPhone = document.getElementById("alertPhone");
  let alertAge = document.getElementById("alertAge");
  let alertPass = document.getElementById("alertPass");
  let alertRePass = document.getElementById("alertRePass");

  inputName.addEventListener("input", function () {
    if (regexName(inputName) == true) {
      inputName.classList.remove("is-invalid");
      inputName.classList.add("is-valid");
      alertName.classList.replace("d-block", "d-none");
    } else {
      inputName.classList.remove("is-valid");
      inputName.classList.add("is-invalid");
      alertName.classList.replace("d-none", "d-block");
    }
  });

  inputEmail.addEventListener("input", function () {
    if (regexEmail(inputEmail) == true) {
      inputEmail.classList.remove("is-invalid");
      inputEmail.classList.add("is-valid");
      alertEmail.classList.replace("d-block", "d-none");
    } else {
      inputEmail.classList.remove("is-valid");
      inputEmail.classList.add("is-invalid");
      alertEmail.classList.replace("d-none", "d-block");
    }
  });
  inputAge.addEventListener("input", function () {
    if (regexAge(inputAge) == true) {
      inputAge.classList.remove("is-invalid");
      inputAge.classList.add("is-valid");
      alertAge.classList.replace("d-block", "d-none");
    } else {
      inputAge.classList.remove("is-valid");
      inputAge.classList.add("is-invalid");
      alertAge.classList.replace("d-none", "d-block");
    }
  });
  inputPhone.addEventListener("input", function () {
    if (regexPhone(inputPhone)) {
      inputPhone.classList.remove("is-invalid");
      inputPhone.classList.add("is-valid");
      alertPhone.classList.replace("d-block", "d-none");
    } else {
      inputPhone.classList.remove("is-valid");
      inputPhone.classList.add("is-invalid");
      alertPhone.classList.replace("d-none", "d-block");
    }
  });

  inputPass.addEventListener("input", function () {
    if (regexPass(inputPass)) {
      inputPass.classList.remove("is-invalid");
      inputPass.classList.add("is-valid");
      alertPass.classList.replace("d-block", "d-none");
    } else {
      inputPass.classList.remove("is-valid");
      inputPass.classList.add("is-invalid");
      alertPass.classList.replace("d-none", "d-block");
    }
  });
  inputRePass.addEventListener("input", function () {
    if (inputPass.value == inputRePass.value) {
      inputRePass.classList.remove("is-invalid");
      inputRePass.classList.add("is-valid");
      alertRePass.classList.replace("d-block", "d-none");
      validate();
    } else {
      inputRePass.classList.remove("is-valid");
      inputRePass.classList.add("is-invalid");
      alertRePass.classList.replace("d-none", "d-block");
      validate();
    }
  });
  if (
    regexName(inputName) == true &&
    regexEmail(inputEmail) == true &&
    regexPhone(inputPhone) == true &&
    regexAge(inputAge) == true &&
    regexPass(inputPass) == true &&
    inputPass.value == inputRePass.value
  ) {
    document.getElementById("submit").removeAttribute("disabled");
  } else {
    document.getElementById("submit").setAttribute("disabled", "true");
  }
}

function regexName(inputName) {
  let regex = /^[a-z0-9]{1,18}$/i;
  return regex.test(inputName.value);
}
function regexEmail(inputEmail) {
  let regex = /^[a-z0-9]{3,30}@(gmail|yahoo).com$/i;

  return regex.test(inputEmail.value);
}
function regexAge(inputAge) {
  let regex = /^[1-9]{1,3}$/i;

  return regex.test(inputAge.value);
}
function regexPhone(inputPhone) {
  let regex = /^01(1|2|0|5)[0-9]{8}$/i;

  return regex.test(inputPhone.value);
}
function regexPass(inputPass) {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

  return regex.test(inputPass.value);
}
