let input = document.querySelector("#input");
let button = document.querySelector("#button");
let display = document.querySelector(".hero");
let recipecontainer = document.querySelector(".recipecontainer");
let closebutton = document.querySelector("#closebutton");
let recipecontent = document.querySelector("#recipecontent");
let logo = document.querySelector(".logo");

button.addEventListener("click", function () {
  fetchmeal();
});

logo.addEventListener("click", () => {
  window.location.reload();
});
let fetchmeal = async () => {
  if (input.value.trim() === "") {
    alert("Input field is Empty!!");
    return;
  }
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
  );
  let response = await data.json();

  display.innerHTML = "";
  response.meals.forEach((meal) => {
    console.log(meal);

    let mealcard = document.createElement("div");
    mealcard.classList.add("mealcard");
    mealcard.innerHTML = `<img src = ${meal.strMealThumb}>
 <h3> ${meal.strMeal}</h3>
 <p>${meal.strArea} Dish</p>
 <P> Category-${meal.strCategory}</p>
  `;

    let viewrecipebutton = document.createElement("button");
    viewrecipebutton.classList.add("viewrecipebutton");
    viewrecipebutton.textContent = "View Recipe";
    mealcard.appendChild(viewrecipebutton);
    display.appendChild(mealcard);

    viewrecipebutton.addEventListener("click", () => {
      openpopup(meal);
    });
  });
};

let showingredents = (meal) => {
  let ingredentlist = "";
  for (let i = 1; i <= 20; i++) {
    let ingredent = meal[`strIngredient${i}`];
    if (ingredent) {
      let mesurment = meal[`strMeasure${i}`];
      ingredentlist += `<li>${mesurment} ${ingredent}</li>`;
    } else {
      break;
    }
  }
  return ingredentlist;
};

let openpopup = (meal) => {
  recipecontent.innerHTML = `
<h2>${meal.strMeal}</h2>
<p>Ingredents: </p>
<ul>${showingredents(meal)} 
</ul>
<p>${meal.strInstructions}</p>
`;
  recipecontainer.style.display = "block";
};
let closepopup = () => {
  recipecontainer.style.display = "none";
};
closebutton.addEventListener("click", () => {
  closepopup();
});
