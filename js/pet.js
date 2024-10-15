const navigationToCategories = (id) => {
    return document.getElementById(id).addEventListener('click', () => {
        window.location.href = '#best-friend';
    });
};
const view = navigationToCategories('View');

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
}

const loadCategories = () => { 
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((pet) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${pet.category}" onclick ="displayCategoryPets('${pet.category}')" class="btn btn-md category-btn flex gap-2 justify-center items-center border border-icon-border md:w-[150px] md:h-[60px] md:text-xl"> 
         <img src="${pet.category_icon}" class="w-4 h-4 md:w-6 md:h-6" alt="">
         ${pet.category}
        </button>
      `
        categoriesContainer.append(buttonContainer);
    });
}

const displayCategoryPets = (id) => {
    const spinner = document.getElementById("spinner");
    const petsContainer = document.getElementById("pets");
    const addPetPhoto = document.getElementById("add-pets");
    const sortButton = document.getElementById("sort-button");
    
    petsContainer.style.display = "none";
    addPetPhoto.style.display = "none";
    spinner.style.display = "block";

    const activeBtn = document.getElementById(`btn-${id}`);
    removeActiveClass();
    activeBtn.classList.add("active");
    
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            spinner.style.display = "none";

            if (data.data.length == 0) {
                petsContainer.classList.remove("grid");
                petsContainer.style.display = "block";
                petsContainer.innerHTML = `
                <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center py-4">
                    <img src="images/error.webp" /> 
                    <h2 class="text-center text-xl md:text-2xl font-bold">No Information Available</h2>
                    <p class="text-gray-500 text-center w-1/2">We're sorry, but there’s currently no information available for this pet. Please check back later or explore our other pets who are eagerly waiting for a loving home!</p>
                </div>`;
                addPetPhoto.style.display = "grid";
                if (sortButton) {
                    sortButton.disabled = true;
                }
            } else {
                petsContainer.classList.add("grid");
                petsContainer.style.display = "grid";
                addPetPhoto.style.display = "grid";
                activeCategoryPets = data.data; 
                activeCategory = id; 
                if (sortButton) {
                    sortButton.disabled = false;
                }
                displayPets(activeCategoryPets);
            }
        })
        .catch((error) => console.log(error))
    }, 2000); 
};
// global variables for sorting all pets and active category
let allPetsPrice = []; 
let activeCategoryPets = [];
let activeCategory = null;

const resetActiveCategory = () => {
    activeCategory = null;
}

const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        allPetsPrice = data.pets; 
        displayPets(allPetsPrice);
    })
    .catch((error) => console.log(error))
}

const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";
    pets.forEach((pets) => {
        const card = document.createElement('div');
        card.classList = "border border-gray-200 p-4 space-y-3 rounded-md h-fit";
        card.innerHTML = `
            <div class="min-h-[100px] w-full">
                <img src="${pets.image}" alt="" class="rounded-xl w-full h-full object-cover">
            </div>
            <h2 class="font-bold text-xl">${pets.pet_name}</h2>
            <div class="flex gap-2 justify-start items-center">
                <img src="https://img.icons8.com/?size=80&id=35oo0tJZ03jT&format=png" alt="" class="w-5 h-5">
                ${pets.breed ? `<p class="text-gray-500">Breed: ${pets.breed}</p>` : `<p class="text-gray-500">Breed: Normal Breed</p>`}
            </div>
            <div class="flex gap-2 justify-start items-center">
                <img src="https://img.icons8.com/?size=48&id=5VOqBjvi7siv&format=png" alt="" class="w-5 h-5">
                ${pets.date_of_birth ? `<p class="text-gray-500">Birth: ${pets.date_of_birth}</p>` : `<p class="text-gray-500">Birth: Not available</p>`}
            </div>
            <div class="flex gap-2 justify-start items-center">
                <img src="https://img.icons8.com/?size=24&id=skdvszUmNlnQ&format=png" alt="" class="w-6 h-6">
                ${pets.gender ? `<p class="text-gray-500">Gender: ${pets.gender}</p>` : `<p class="text-gray-500">Gender: Not available</p>`}
            </div>
            <div class="flex gap-2 border-b pb-2 justify-start items-center">
                <img src="https://img.icons8.com/?size=50&id=aTrWEDlg4xEW&format=png" alt="" class="w-6 h-6">
                ${pets.price ? `<p class="text-gray-500">Price: ${pets.price}$ </p>` : `<p class="text-gray-500">Price: To be announced</p>`}
            </div>
            <div class="grid grid-cols-3 py-2 gap-3">
                <button class="btn border border-icon-border hover:border-footer-btn" onclick="addPets('${pets.image}')"> <img src="https://img.icons8.com/?size=24&id=3RR8QoUJMAri&format=png" class="w-4 h-4"></button>
                <button onclick="loadAdopt(${pets.petId})" class="btn text-footer-btn hover:bg-footer-btn hover:text-white border border-icon-border">Adopt</button>
                <button onclick="loadDetails(${pets.petId})" class="btn text-footer-btn hover:bg-footer-btn hover:text-white border border-icon-border">Details</button>
            </div>
        `;
        petsContainer.appendChild(card);
    });
}

const loadAdopt = async (petId) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAdopt(data.petData, petId);
}

const displayAdopt = (data, petId) => {
    const adoptContainer = document.getElementById("modal-content-2");
    adoptContainer.innerHTML = `
     <div class="space-y-3 rounded-md flex flex-col justify-center items-center">
            <div class="h-10 w-10">
                <img src="https://img.icons8.com/?size=64&id=gYa2nXkjQ5iV&format=png" alt="" class="w-full h-full object-cover">
            </div>
            <h2 class="font-bold text-2xl">Congrats</h2>
            <h2 class="font-bold text-xl">${data.pet_name} adoption is started as your pet</h2>
        </div>
    `;

    document.getElementById("customModal-2").showModal();
    startCountdown(petId);
}

const startCountdown = (petId) => {
    let counter = 3;
    const countdownDisplay = document.getElementById('countdown-display');
    countdownDisplay.innerText = counter;

    const interval = setInterval(() => {
        counter--;
        if (counter >= 1) {
            countdownDisplay.innerText = counter;
        }
        if (counter <= 0) {
            clearInterval(interval); 
            document.getElementById("customModal-2").close();
            const adoptButton = document.querySelector(`button[onclick="loadAdopt(${petId})"]`);
            adoptButton.innerText = "Adopted";
            adoptButton.disabled = true;
        }
    }, 1000);
};

const loadDetails = async (petId) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData);
}
const displayDetails = (data) => {
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `
     <div class="space-y-3 rounded-md">
            <div class="min-h-[150px] w-full">
                <img src="${data.image}" alt="" class="rounded-xl w-full h-full object-cover">
            </div>
            <h2 class="font-bold text-xl">${data.pet_name}</h2>
            <div class ="flex px-1 justify-between">
                            <div>
                 <div class="flex gap-2 justify-start items-center">
                    <img src="https://img.icons8.com/?size=80&id=35oo0tJZ03jT&format=png" alt="" class="w-5 h-5">
                    ${data.breed ? `<p class="text-gray-500">Breed: ${data.breed}</p>` : `<p class="text-gray-500">Breed: Normal Breed</p>`}
                </div>
                <div class="flex gap-2 justify-start items-center">
                    <img src="https://img.icons8.com/?size=24&id=skdvszUmNlnQ&format=png" alt="" class="w-6 h-6">
                    ${data.gender ? `<p class="text-gray-500">Gender: ${data.gender}</p>` : `<p class="text-gray-500">Gender: Not available</p>`}
                </div>           
                <div class="flex gap-2 justify-start items-center">
                    <img src="https://img.icons8.com/?size=24&id=skdvszUmNlnQ&format=png" alt="" class="w-6 h-6">
                    ${data.vaccinated_status ? `<p class="text-gray-500">Vaccinated: ${data.vaccinated_status}</p>` : `<p class="text-gray-500">Vaccinated: Not</p>`}
                </div>
            </div>
            <div>
                <div class="flex gap-2 justify-start items-center">
                    <img src="https://img.icons8.com/?size=48&id=5VOqBjvi7siv&format=png" alt="" class="w-5 h-5">
                    ${data.date_of_birth ? `<p class="text-gray-500">Birth: ${data.date_of_birth}</p>` : `<p class="text-gray-500">Birth: Not available</p>`}
                </div>
                <div class="flex gap-2 pb-2 justify-start items-center">
                    <img src="https://img.icons8.com/?size=50&id=aTrWEDlg4xEW&format=png" alt="" class="w-6 h-6">
                    ${data.price ? `<p class="text-gray-500">Price: ${data.price}$ </p>` : `<p class="text-gray-500">Price: To be announced</p>`}
                </div>
            </div>
            </div>
            <div class= "space-y-3 border-t pt-4">
                <h2 class="font-bold text-xl">Details Information</h2>
                ${data.pet_details ? `<p class="text-gray-500">Gender: ${data.pet_details}</p>` : `<p class="text-gray-500">Gender: Not available</p>`}
            </div>
        </div>
    `
    document.getElementById("customModal").showModal();

};

const sortByPrice = () => {
    let sortedPets;
    
    if (activeCategory) {
        sortedPets = activeCategoryPets.slice().sort((a, b) => b.price - a.price);
    } else {
        sortedPets = allPetsPrice.slice().sort((a, b) => b.price - a.price);
    }

    displayPets(sortedPets); 
};

const createSort = () => {
    const sortElement = document.createElement('div');
    sortElement.innerHTML = `
        <div class="flex justify-between items-center md:container mx-auto my-4 md:my-10 px-4">
            <h2 class="font-bold text-xl">Best Deal For you</h2>
            <button id= "sort-button" onclick="sortByPrice()" class="btn bg-green text-white">Sort by Price</button>
        </div>
    `;
    const sortDiv = document.getElementById('create-sort');
    sortDiv.appendChild(sortElement);
};

const addPets = (image) => {
    const addPets = document.getElementById('add-pets')
    const photo = document.createElement('div')
    photo.classList = "border border-gray-200 rounded-xl p-2"
    photo.innerHTML= `
        <img src="${image}" alt="" class="border border-gray-200 rounded-xl">
    `
    addPets.appendChild(photo)
}

loadCategories();
loadPets();
createSort();