
# Project Name
Peddy (A pet adoption responsive website).

# Short Descripton
Peddy is a responsive pet adoption website where users can explore and adopt pets by category, including dogs, cats, and rabbits. It dynamically retrieves pet information from an API, offering comprehensive details on the animal, such as breed, age at birth, and cost. Via interactive modals, users may sort pets by price and browse adoption details. They can also include pet photos in a customized area, which adds interest and convenience to the adoption process
# 5 key features of the project
- **Category-Based Pet Display :** Users can browse pets based on categories such as dogs, cats, rabbits, etc. Each category button dynamically loads pets belonging to that specific category using fetch() to retrieve data from an API.
- **Sort by Price :** The project includes a "Sort by Price" feature, which allows users to sort pets within the active category or all available pets based on their price in descending order.
- **Pet Adoption Modal :** When a user initiates the adoption process by clicking on a pet's "Adopt" button, a 	modal appears confirming the adoption. A countdown timer shows, and once completed, the pet is marked as "Adopted."
- **Detailed Pet Information :** For each pet, detailed information such as breed, date of birth, gender, vaccination status, and price is displayed. Users can access this by clicking the "Details" button, which opens a modal with all relevant pet information.
- **Dynamically Adding Pet Images :** Users can add pet images dynamically to a grid layout. The addPets function allows users to click and add an image to the "Your Pets" section, visually simulating a collection of favorite or selected pets.
# ES6 features used
- **Arrow functions :** Example: const navigationToCategories = (id) => { ... }
- **Template literals :** Example: <button id="btn-${pet.category}" ...> ${pet.category} </button>
- **Destructuring :**  Example: then(({ pets }) => { ... })
- **for of, forEach loop** 
- **fetch API** 
- **Promises (.then()):** Example: .then((res) => res.json())
- **async and await :** Example: const loadAdopt = async (petId) => { ... }




## Deployment

To deploy this project run

```bash
  https://peddy-your-fav-pets.netlify.app/
```

