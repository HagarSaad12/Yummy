/// <reference types="../@types/jquery" />
// HTML ELEMENTS
let barBtn=document.querySelector('#barBtn');
let closeBtn=document.querySelector('#closeBtn');
let searchName=document.querySelector('#searchName');
let rowData=document.querySelector('#rowData');
let nameImg=document.querySelectorAll('.nameImg');
let titleImg=document.querySelectorAll('.titleImg');
let searchFirstLetter=document.querySelector('#searchFirstLetter');
let categ=document.querySelector('#categories');
let search=document.querySelector('#search');
let searchcomponent=document.querySelector('#searchcomponent');
let area=document.querySelector('#area');
 
let ingredients=document.querySelector('#ingredients');
 
 
 
let contact=document.querySelector('#contact');
let contactsection=document.querySelector('.contact');
 
  
// APP VARIABLES
// aside

let optionsIcon = document.getElementById("options-icon");
let menuWidth = $('.menu').outerWidth()
$('.option').click(function () {
	if ($('aside').css('left') == '0px') {
		$('aside').animate({ left: `-${menuWidth}` });
		optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');

		$(".menu a").animate({
			top: 200
		}, 100)

	}
	else {
		$('aside').animate({ left: `0px` });
		optionsIcon.children[0].classList.replace('fa-bars', 'fa-x');

		$(".menu a").animate({
			top: 0
		}, 350)

	}
});

///////////////////////////////////////////////////change it to query
//switching navbar tabs
search.addEventListener("click", function () {
  searchcomponent.classList.replace('d-none','d-block');
  rowData.innerHTML='';
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
categ.addEventListener("click", function () {
   
   getCategoriesData();
	$('aside').animate({ left: `-${menuWidth}` })
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
area.addEventListener("click", function () {
	getArea();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
ingredients.addEventListener("click", function () {
	getIngredients();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
contact.addEventListener("click", function () {
  // contactsection.classList.replace('d-none','d-block');
  searchcomponent.classList.replace('d-block','d-none');
  getContacts();
  validationName();
  validationInputs();
	$('aside').animate({ left: `-${menuWidth}` });
	optionsIcon.children[0].classList.replace('fa-x', 'fa-bars');
});
searchName.addEventListener('keyup',function(){
  getMealByName(searchName.value);
})
searchFirstLetter.addEventListener('keyup',function(){
getMealByFirstLetter(searchFirstLetter.value);
})

// FUNCTIONS
 
// function get meal by name
async function getMealByName(mealn){
   
    let meal =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealn}`);
    let mealData=await meal.json();
    console.log(mealData);
    displayDataByName(mealData);
}
getMealByName('fish');
let rowSearch=document.querySelector('#rowSearch');
function displayDataByName(data){
     rowSearch.innerHTML='';
     var container='';
     for(i=0;i<data.meals.length;i++){
          container+=`
          <div class="col-lg-3">
          <div class="parent col" onclick="getMealDetails(${data.meals[i].idMeal})">
            <img class="nameImg" src="${data.meals[i].strMealThumb}"/>
            <div class="black-layer">
              <h1 class="titleImg fs-4">${data.meals[i].strMeal}</h1>
            </div>
          </div>
        </div>
        
          `
     }
     rowSearch.innerHTML=container;
}
// function get data by firstLetter
async function getMealByFirstLetter(mealL){
   
  let mealLetter =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealL}`);
    let mealLData=await mealLetter.json();
    console.log(mealLData);
    displayDataByFirstLetter(mealLData);
}
// function display data by first letter
function displayDataByFirstLetter(data){
    
  var container='';
  for(i=0;i<data.meals.length;i++){
       container+=`
       <div class="col-lg-3 col">
       <div class="parent" onclick="getMealDetails(${data.meals[i].idMeal})">
         <img class="nameImg" src="${data.meals[i].strMealThumb}"/>
         <div class="black-layer">
           <h1 class="titleImg fs-4">${data.meals[i].strMeal}</h1>
         </div>
       </div>
     </div>
      `
  }
  rowSearch.innerHTML=container;
} 
// get meal by id
async function getMealDetails(mealID) {
  rowData.innerHTML = ""
	let mealDetails =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
	let result = await mealDetails.json();
   console.log(result);   
	displayMealDetails(result.meals[0]);
}
// // getMealDetails();
function displayMealDetails(mealInfo) { 
  searchcomponent.classList.replace('d-block','d-none');
  rowData.innerHTML='';
  
	let ingredients = ``;
	for (let i = 1; i <= 20; i++) {
		if (mealInfo[`strIngredient${i}`]) {
			ingredients += `<li class="alert alert-info m-2 p-1">${mealInfo[`strMeasure${i}`]} ${mealInfo[`strIngredient${i}`]}</li>`
		}
	}
	let tags = mealInfo.strTags?.split(",")
	if (!tags) tags = []
	let tagsStr = ''
	for (let i = 0; i < tags.length; i++) {
		tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
	}
	let box = `
				<div class="col-lg-4">
                    <img src="${mealInfo.strMealThumb}" class="w-100 border border-2 rounded-3 border-info" alt="meal thumbnail">
                    <h1 class="text-white pt-2 text-center mt-3 mb-5">${mealInfo.strMeal}</h1>
				</div>
                <div class="col-lg-8 text-white">
                    <h2 class="d-inline-flex me-2">Instructions</h2>
                    <p class="small">${mealInfo.strInstructions}</p>
                    <h3>Area: <span class="fw-light h3">${mealInfo.strArea}</span></h3>
                    <h3>Category: <span class="fw-light h3">${mealInfo.strCategory}</span></h3>
                    <h3>Recipes</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
					${ingredients}
                    </ul>
                    <h3>Tags: </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
					${tagsStr}
                    </ul>
					<hr>
                    <a href="${mealInfo.strSource}" target="_blank" class="mb-5 btn btn-success me-3">Source</a>
                    <a href="${mealInfo.strYoutube}" target="_blank" class="mb-5 btn btn-danger ">Youtube</a>
                </div>
				`

        rowData.innerHTML += box
        // document.getElementById("mealDetailsList").classList.replace('d-none','d-block');
}
// /////////////////////////////////
// func to display meals on category
async function getCategoriesMeal(categoryName) {
  rowData.innerHTML = ""
	let mealDetails =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
	let result = await mealDetails.json();
   console.log(result);
   displayCategoriesMeal(result.meals);
}

// func to display categories meal
function displayCategoriesMeal(category){
  rowData.innerHTML='';
  let container='';
  for(i=0;i<category.length;i++){
    container+=`
    <div class="col-lg-3">
    <div class="parent col" onclick="getMealDetails(${category[i].idMeal})">
    <img class="nameImg" src="${category[i].strMealThumb}"/>
    <div class="black-layer">
      <h1 class="titleImg fs-4">${category[i].strMeal}</h1>
    </div>
  </div>
    </div>
    `
  }
  rowData.innerHTML=container;
}
// get categories data
async function getCategoriesData(){
  rowData.innerHTML = ""
    let category =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categoryData=await category.json();
    console.log(categoryData);
    displayCategoryData(categoryData);
}
//display categories data
function displayCategoryData(data){
    rowData.innerHTML=''
    var container='';
    for(i=0;i<data.categories.length;i++){
         container+=`
         <div class="col-lg-3" class="col">
         <div class="parent overflow-hidden position-relative rounded-2 cursor-pointer" onclick="getCategoriesMeal('${data.categories[i].strCategory}')">
           <img class="nameImg" src="${data.categories[i].strCategoryThumb}"/>
           <div class="black-layer overflow-hidden  position-absolute text-center text-black p-2 d-flex flex-column">
             <h1 class="titleImg fs-5">${data.categories[i].strCategory}</h1>
             <p class="">${data.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
           </div>
         </div>
       </div>
        `
    }
    rowData.innerHTML=container;
}
// func the get areas data
async function getArea(){
  rowData.innerHTML = ""
    let area =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    console.log(area);
    let areaData=await area.json();
    console.log(areaData);
    displayAreasData(areaData);
}
 
// func the display areas data
function displayAreasData(data){
  rowData.innerHTML='';
    var container='';
    for(i=0;i<data.meals.length;i++){
         container+=`
         <div class="col-lg-3">
         <div class="parent text-white text-center" onclick="getAreasMeal('${data.meals[i].strArea}')">
           <i class="fa-solid fa-house-laptop fs-1"></i>
            <h3>${data.meals[i].strArea}</h3>
            
         </div>
       </div>

    `
    }
    rowData.innerHTML=container;
}
async function getAreasMeal(areaName) {
  rowData.innerHTML = ""
 let area =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
 let areaData = await area.json();
  console.log(areaData);
  displayareaMealDetails(areaData.meals);
 
 
}
  
// getCategoriesMeal('Seafood');
// func to display area meal details
function displayareaMealDetails(area){ 
  rowData.innerHTML='';
 let container='';
 for(i=0;i<area.length;i++){
   container+=`
   <div class="col-lg-3">
   <div class="parent col" onclick="getMealDetails(${area[i].idMeal})">
   <img class="nameImg" src="${area[i].strMealThumb}"/>
   <div class="black-layer">
     <h1 class="titleImg fs-4">${area[i].strMeal}</h1>
   </div>
 </div>
   </div>
   `
 }
 rowData.innerHTML=container;

}
// function to get ingredients of meal
async function getIngredients(){
  rowData.innerHTML = ""
  let ingredient =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  console.log(ingredient);
  let ingredientData=await ingredient.json();
  displayIngredientsData(ingredientData.meals.slice(0,20));
}
// getIngredients();
// function to display ingredient data
function displayIngredientsData(data){
  rowData.innerHTML='';
  var container='';
  for(i=0;i<data.length;i++){
       container+=`
       <div class="col-lg-3">
       <div class="parent h-100 text-white text-center" onclick="getIngredientsMeal('${data[i].strIngredient}')">
          <i class="fa-solid fa-drumstick-bite fs-1"></i>
          <h3>${data[i].strIngredient}</h3>
          <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
          
       </div>
     </div>

  `
  }
  rowData.innerHTML=container;
}
async function getIngredientsMeal(ingredName) {
  rowData.innerHTML = ""
 let ingred =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredName}`);
 let ingredData = await ingred.json();
  console.log(ingredData);
  displayingredientMealDetails(ingredData.meals);
 
}
 
 
 
// func to display area meal details
function displayingredientMealDetails(data){ 
  rowData.innerHTML='';
 let container='';
 for(i=0;i<data.length;i++){
   container+=`
   <div class="col-lg-3">
   <div class="parent col" onclick="getMealDetails(${data[i].idMeal})">
   <img class="nameImg" src="${data[i].strMealThumb}"/>
   <div class="black-layer">
     <h1 class="titleImg fs-4">${data[i].strMeal}</h1>
   </div>
 </div>
   </div>
   `
 }
 rowData.innerHTML=container;

}
 
// contact
function getContacts(){
  rowData.innerHTML='';
 
  rowData.innerHTML=`
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row row5 g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
  </div>
  `
  var nameInput=document.querySelector('#nameInput');
  var nameAlert=document.querySelector('#nameAlert');
  var emailInput=document.querySelector('#emailInput');
  var emailAlert=document.querySelector('#emailAlert');
  var phoneInput=document.querySelector('#phoneInput');
  var phoneAlert=document.querySelector('#phoneAlert');
  var ageInput=document.querySelector('#ageInput');
  var ageAlert=document.querySelector('#ageAlert');
  var passwordInput=document.querySelector('#passwordInput');
  var passwordAlert=document.querySelector('#passwordAlert');
  var repasswordInput=document.querySelector('#repasswordInput');
  var repasswordAlert=document.querySelector('#repasswordAlert');
  var submitBtn=document.querySelector('#submitBtn');
  nameInput.addEventListener('keyup',function(){
    validationName();
    validationInputs();
  
  })
  ageInput.addEventListener('keyup',function(){
    validationAge();
    validationInputs();
  
  })
  phoneInput.addEventListener('keyup',function(){
    validationPhone();
    validationInputs();
  })
  emailInput.addEventListener('keyup',function(){
    validationEmail();
    validationInputs();
  })
  passwordInput.addEventListener('keyup',function(){
    validationPassword();
    validationInputs();
  })
  repasswordInput.addEventListener('keyup',function(){
    validationrepassword();
    validationInputs();
  })


}
// EVENTS
$('.loader').fadeOut(500, function () {
    $('.loadingScreen').slideUp(500, function () {
        $('body').css('overflow', 'auto')
    });

});
 
 
 
 
//    validation ////////////////
function validationName(){
  var regex=/^[A-Z][a-z]{3,8}$/;
  var validateName=$('#nameInput').val();
  if(regex.test(validateName)==true){
      nameInput.classList.add('is-valid');
      nameInput.classList.remove('is-invalid');
      nameAlert.classList.add('d-none');
      return true;
  }
  else{
      nameInput.classList.add('is-invalid');
      nameInput.classList.remove('is-valid');
      nameAlert.classList.remove('d-none');
      return false;
  }
 
}
function validationEmail(){
  var regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var validateEmail=emailInput.value;
  if(regex.test(validateEmail)==true){
      emailInput.classList.add('is-valid');
      emailInput.classList.remove('is-invalid');
     emailAlert.classList.add('d-none');
      return true;
  }
  else{
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
     emailAlert.classList.remove('d-none');
      return false;
  }
  
}
function validationPhone(){
  var regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  var validatePhone=phoneInput.value;
  if(regex.test(validatePhone)==true){
      phoneInput.classList.add('is-valid');
      phoneInput.classList.remove('is-invalid');
     phoneAlert.classList.add('d-none');
      return true;
  }
  else{
      phoneInput.classList.add('is-invalid');
      phoneInput.classList.remove('is-valid');
     phoneAlert.classList.remove('d-none');
      return false;
  }
 
}
function validationAge(){
  var regex=/^\S[0-9]{0,3}$/;
  var validateAge=ageInput.value;
  if(regex.test(validateAge)==true){
      ageInput.classList.add('is-valid');
      ageInput.classList.remove('is-invalid');
     ageAlert.classList.add('d-none');
      return true;
  }
  else{
      ageInput.classList.add('is-invalid');
      ageInput.classList.remove('is-valid');
     ageAlert.classList.remove('d-none');
      return false;
  }
   
}
function validationPassword(){
  var regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
  var validatePassword=passwordInput.value;
  if(regex.test(validatePassword)==true){
      passwordInput.classList.add('is-valid');
      passwordInput.classList.remove('is-invalid');
     passwordAlert.classList.add('d-none');
      return true;
  }
  else{
      passwordInput.classList.add('is-invalid');
      passwordInput.classList.remove('is-valid');
      passwordAlert.classList.remove('d-none');
      return false;
  }
   
}
function validationrepassword(){
  if  (repasswordInput.value == passwordInput.value){
    repasswordInput.classList.add('is-valid');
    repasswordInput.classList.remove('is-invalid');
    repasswordAlert.classList.add('d-none');
    return true;
  }
  else{
    repasswordInput.classList.add('is-invalid');
    repasswordInput.classList.remove('is-valid');
    repasswordAlert.classList.remove('d-none');
    return false;
  }
   
}
function validationInputs(){
  if(validationName()&&validationEmail()&&validationPhone()
  &&validationAge()&&validationPassword()&&validationrepassword()){
    submitBtn.removeAttribute("disabled")
    // clearInputs();
  }
  else {
    submitBtn.setAttribute("disabled", true)
  }
}
 
 
 
