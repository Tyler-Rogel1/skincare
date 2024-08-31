let applyFiltersBtn = document.querySelector("#filter-btn");
applyFiltersBtn.onclick = function() {

    const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]');
    
    // Create an array to hold the checked values
    let selectedFilters = [];
    
    // Loop through checkboxes and add the checked ones to the array
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedFilters.push(true);
        } else{
            selectedFilters.push(false);
        }
    });
    
    // Now `selectedFilters` holds the values of all checked checkboxes
    console.log('Selected filters:', selectedFilters);
    
    
    getProducts(selectedFilters);
}

// Fetch data from local JSON file and display it
function getProducts(selectedFilters){
    const productDivs = document.querySelectorAll('.product');

    // Loop through the NodeList and remove each element
    productDivs.forEach(productDiv => {
        productDiv.remove();
    });
    // Example: Assign the values to separate variables (optional)
    const [oily, dry, sensitive, comedogenic, acneFighting, antiAging, brightening, uv] = selectedFilters;
    
    // Log individual variables to the console (optional)
    console.log('Oily:', oily);
    console.log('Dry:', dry);
    console.log('Sensitive:', sensitive);
    console.log('Comedogenic:', comedogenic);
    console.log('Acne Fighting:', acneFighting);
    console.log('Anti Aging:', antiAging);
    console.log('Brightening:', brightening);
    console.log('UV:', uv);
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('product-container');
        
        // Loop through each product and create HTML to display it
        data.forEach(product => {
            if (oily == 1 && product.oily == 0) return; 
            if (dry == 1 && product.dry == 0) return;
            if (sensitive == 1 && product.sensitive == 0) return;
            if (comedogenic == 1 && product.comedogenic == 0) return;
            if (acneFighting == 1 && product.acneFighting == 0) return;
            if (antiAging == 1 && product.antiAging == 0) return;
            if (brightening == 1 && product.brightening == 0) return;
            if (uv == 1 && product.uv == 0) return;
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            
            productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>Brand: ${product.brand}</p>
            <p>Type: ${product.type}</p>
            `;
            
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
    
};
