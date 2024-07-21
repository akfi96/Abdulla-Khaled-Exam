var rowMeals = document.getElementById("rowMeals");
rowMeals.innerHTML = ""


var myHttp = new XMLHttpRequest();
var startMeals = [];

myHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=`);
myHttp.send();

myHttp.addEventListener("load", function(){
    startMeals = JSON.parse(myHttp.response).meals;
    for (i=0 ; i < startMeals.length ; i++){
        rowMeals.innerHTML += `<div class="col-md-3">
                <div class="rounded-2 overflow-hidden meal position-relative" onclick='mealDetails("${startMeals[i].strMeal}")'>
                    <img class="w-100" src="${startMeals[i].strMealThumb}" alt="">
                    <div class="meal-name d-flex align-items-center">
                        <p class="fs-2 fw-semibold ps-3 mealName">${startMeals[i].strMeal}</p>
                    </div>
                </div>
            </div>`
    }
    
});
// ///////////////////////////////// main functions & filters /////////////////////////////////////////////////////////////////

var searchByName = function(){
    var mealName = document.getElementById("byNameInput").value;
    console.log(mealName);
    var mealNameArr = [];
    var mealNameHttp = new XMLHttpRequest();

    mealNameHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    mealNameHttp.send();

    mealNameHttp.addEventListener("load", function(){
    mealNameArr = JSON.parse(mealNameHttp.response).meals;
    for(i=0 ; i < mealNameArr.length; i++){
        rowMeals.innerHTML += `<div class="col-md-3">
                    <div class="rounded-2 overflow-hidden meal position-relative" onclick='mealDetails("${mealNameArr[i].strMeal}")'>
                        <img class="w-100" src="${mealNameArr[i].strMealThumb}" alt="">
                        <div class="meal-name d-flex align-items-center">
                            <p class="fs-2 fw-semibold ps-3 mealName">${mealNameArr[i].strMeal}</p>
                        </div>
                    </div>
                </div>`
    }
})
};
var searchByFirstLetter = function(){
    var firstLetter = "b"
    var firstLetterHttp = new XMLHttpRequest();

    firstLetterHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    firstLetterHttp.send();

    firstLetterHttp.addEventListener("load", function(){
    console.log(JSON.parse(firstLetterHttp.response).meals);
})
};
var allCategory = function(){
    rowMeals.innerHTML = ""

    var categoryHttp = new XMLHttpRequest();

    categoryHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/categories.php`)
    categoryHttp.send();

    categoryHttp.addEventListener("load", function(){
    console.log(JSON.parse(categoryHttp.response).categories);
    categoryMeals = JSON.parse(categoryHttp.response).categories;

    for (i=0 ; i < categoryMeals.length ; i++){
        var description = categoryMeals[i].strCategoryDescription;
        var descriptionSplit = description.split(" ", 20);
        var descriptionJoin = descriptionSplit.join(" ");

        rowMeals.innerHTML += `<div class="col-md-3">
                <div class="rounded-2 overflow-hidden meal-cat position-relative" onclick='filterCategory("${categoryMeals[i].strCategory}")' >
                    <img class="w-100" src="${categoryMeals[i].strCategoryThumb}" alt="">
                    <div class="meal-name text-center">
                        <p class="fs-2 fw-semibold ps-3">${categoryMeals[i].strCategory}</p>
                        <p>${descriptionJoin}</p>
                    </div>
                </div>
            </div>`
    }
})
};
var allArea = function(){
    rowMeals.innerHTML = ""

    var areaHttp = new XMLHttpRequest();

    areaHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    areaHttp.send();

    areaHttp.addEventListener("load", function(){
    console.log(JSON.parse(areaHttp.response).meals);
    areaMeals = JSON.parse(areaHttp.response).meals;
    for (i=0 ; i < areaMeals.length ; i++){
        rowMeals.innerHTML += `<div class="col-md-3">
    <div class="text-center text-white" onclick='filterArea("${areaMeals[i].strArea}")'>
        <i class="fa-solid fa-house-laptop fs-1"></i>
        <h2>${areaMeals[i].strArea}</h2>
    </div>
</div>`
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
};
var allIngredient = function(){
    rowMeals.innerHTML = ""
    
    var ingredientHttp = new XMLHttpRequest();

    ingredientHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    ingredientHttp.send();

    ingredientHttp.addEventListener("load", function(){
    console.log(JSON.parse(ingredientHttp.response).meals);
    ingredientMeals = JSON.parse(ingredientHttp.response).meals;
    for (i=0 ; i < 20 ; i++){
        var description = ingredientMeals[i].strDescription;
        var descriptionSplit = description.split(" ", 20);
        var descriptionJoin = descriptionSplit.join(" ");

        rowMeals.innerHTML += `<div class="col-md-3">
                <div class="text-center text-white" onclick='filterIngredient("${ingredientMeals[i].strIngredient}")'>
                    <i class="fa-solid fa-drumstick-bite fs-1"></i>
                    <h2>${ingredientMeals[i].strIngredient}</h2>
                    <p>${descriptionJoin}</p>
                </div>
            </div>`
    }
})
};
var filterCategory = function(x){
    rowMeals.innerHTML = ""
    
    var filterCategoryHttp = new XMLHttpRequest();
    var startMeals = [];

    filterCategoryHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`);
    filterCategoryHttp.send();

    filterCategoryHttp.addEventListener("load", function(){
        startMeals = JSON.parse(filterCategoryHttp.response).meals;
        for (i=0 ; i < 20 ; i++){
            rowMeals.innerHTML += `<div class="col-md-3">
                    <div class="rounded-2 overflow-hidden meal position-relative" onclick='mealDetails("${startMeals[i].strMeal}")'>
                        <img class="w-100" src="${startMeals[i].strMealThumb}" alt="">
                        <div class="meal-name d-flex align-items-center">
                            <p class="fs-2 fw-semibold ps-3 mealName">${startMeals[i].strMeal}</p>
                        </div>
                    </div>
                </div>`
        }
    })
};
var filterArea = function(x){
    rowMeals.innerHTML = ""
    
    var filterAreaHttp = new XMLHttpRequest();
    var startMeals = [];

    filterAreaHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`);
    filterAreaHttp.send();

    filterAreaHttp.addEventListener("load", function(){
        startMeals = JSON.parse(filterAreaHttp.response).meals;
        for (i=0 ; i < 20 ; i++){
            rowMeals.innerHTML += `<div class="col-md-3">
                    <div class="rounded-2 overflow-hidden meal position-relative" onclick='mealDetails("${startMeals[i].strMeal}")'>
                        <img class="w-100" src="${startMeals[i].strMealThumb}" alt="">
                        <div class="meal-name d-flex align-items-center">
                            <p class="fs-2 fw-semibold ps-3 mealName">${startMeals[i].strMeal}</p>
                        </div>
                    </div>
                </div>`
        }
    })
};
var filterIngredient = function(x){
    rowMeals.innerHTML = ""
    
    var filterIngredientHttp = new XMLHttpRequest();
    var startMeals = [];

    filterIngredientHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`);
    filterIngredientHttp.send();

    filterIngredientHttp.addEventListener("load", function(){
        startMeals = JSON.parse(filterIngredientHttp.response).meals;
        for (i=0 ; i < 20 ; i++){
            rowMeals.innerHTML += `<div class="col-md-3">
                    <div class="rounded-2 overflow-hidden meal position-relative" onclick='mealDetails("${startMeals[i].strMeal}")'>
                        <img class="w-100" src="${startMeals[i].strMealThumb}" alt="">
                        <div class="meal-name d-flex align-items-center">
                            <p class="fs-2 fw-semibold ps-3 mealName">${startMeals[i].strMeal}</p>
                        </div>
                    </div>
                </div>`
        }
    })
};
var mealDetails = function(x){
    var detailsHttp = new XMLHttpRequest();

    detailsHttp.open("GET", `https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    detailsHttp.send();

    detailsHttp.addEventListener("load", function(){
    console.log(JSON.parse(detailsHttp.response).meals);
    var mealDetail = JSON.parse(detailsHttp.response).meals;
    var image = mealDetail[0].strMealThumb
    console.log(image);
    var name = mealDetail[0].strMeal
    console.log(name);
    var instructions = mealDetail[0].strInstructions
    console.log(instructions);
    var area = mealDetail[0].strArea
    console.log(area);
    var category = mealDetail[0].strCategory
    console.log(category);
    var youtube = mealDetail[0].strYoutube
    console.log(youtube);
    var source = mealDetail[0].strSource
    console.log(source);
    // tags loop
    var tags = mealDetail[0].strTags
    console.log(tags);
    if(tags != null ){
        var arr = tags.split(", ")
        tagsContainer = ""
        for(i=0; i<arr.length; i++){
            tagsContainer += `<p class="bg-danger-subtle rounded-3 p-2">${arr[i]}</p>`
        }
        console.log(tagsContainer);
    }else{
        tagsContainer = `<p></p>`;
        console.log(tagsContainer);}
    var bigContainer = document.getElementById("bigContainer");
    bigContainer.innerHTML = `<div class="row text-white my-5">
            <div class="col-md-4">
                <img src="${image}" alt="" class="w-100 rounded-3">
                <h2>${name}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${instructions}</p>
                <h2>Area : ${area}</h2>
                <h2>Category : ${category}</h2>
                <h2>Recipes :</h2>
                <div class="d-flex flex-wrap text-black gap-3">
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                    <p class="bg-info-subtle rounded-3 p-2">Lorem, ipsum dolor.</p>
                </div>
                <h2>Tags :</h2>
                <div class="d-flex text-black gap-2">
                    ${tagsContainer}
                </div>
                <a href="${source}" class="btn btn-success">Source</a> <a href="${youtube}" class="btn btn-danger">Youtube</a>
            </div>
            </div>`;
    }
)};
var searchPage = function(){
    var bigContainer = document.getElementById("bigContainer")
    bigContainer.innerHTML = `<div class="row my-5">
            <div class="col-md-6">
                <input type="text" id="byNameInput" onkeyup="searchByName()" class="w-100 inputDeco p-1 rounded-2 text-white" placeholder="Search by Name">
            </div>
            <div class="col-md-6">
                <input type="text" id="byLetterInput" class="w-100 inputDeco p-1 rounded-2 text-white" maxlength="1" placeholder="Search by First letter">
            </div>
        </div>
        <div class="row g-4 py-5" id="rowMeals">
        </div>`


}
// ///////////////////////////////// click events ///////////////////////////////////////////////////////////////////////////

var ingredientMe = document.getElementById("ingredientMe");
ingredientMe.addEventListener("click", function(){allIngredient()});

var areaMe = document.getElementById("areaMe");
areaMe.addEventListener("click", function(){allArea()});

var categoryMe = document.getElementById("categoryMe");
categoryMe.addEventListener("click", function(){allCategory()});

var searchMe = document.getElementById("searchMe");
searchMe.addEventListener("click", function(){searchPage()});