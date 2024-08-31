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
    const selectedBrand = document.getElementById('brand-select').value;
    if(selectedBrand){
        selectedFilters.push(selectedBrand);
    }
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
    const [acne, dry, sensitive, oily, combination, normal, antiAging, comedogenic, brightening, uv, selectedBrand] = selectedFilters;
    
    // Log individual variables to the console (optional)
    console.log('Acne:', acne);
    console.log('Dry:', dry);
    console.log('Sensitive:', sensitive);
    console.log('Oily:', oily);
    console.log('Combination:', combination);
    console.log('Normal:', normal);
    console.log('Anti Aging:', antiAging);
    console.log('Comedogenic:', comedogenic);
    console.log('Brightening:', brightening);
    console.log('UV:', uv);
    console.log('Selected brand:', selectedBrand);
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('product-container');
        
        // Loop through each product and create HTML to display it
        data.forEach(product => {
            //only show if matches filter
            if (acne && !product.acne) return;
            if (dry && !product.dry) return;
            if (sensitive && !product.sensitive) return;
            if (oily && !product.oily) return; 
            if (combination && !product.combination) return; 
            if (normal && !product.normal) return; 
            if (antiAging && !product.antiAging) return;
            if (comedogenic && !product.comedogenic) return;
            if (brightening && !product.brightening) return;
            if (uv && !product.uv) return;
            if(selectedBrand && selectedBrand !== product.brand) return;
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            
            let tags = [];

            // Check each condition and add corresponding tag if true
            if (product.acne) tags.push('acne');
            if (product.dry) tags.push('dry');
            if (product.oily) tags.push('oily');
            if (product.sensitive) tags.push('sensitive');
            if (product.combination) tags.push('combination');
            if (product.normal) tags.push('normal');
            if (product.antiAging) tags.push('anti-aging');
            if (product.comedogenic) tags.push('comedogenic');
            if (product.brightening) tags.push('brightening');
            if (product.uv) tags.push('uv');

            // Build the tags string
            let tagsHTML = tags.length > 0 ? `<p>Tags: ${tags.join(', ')}</p>` : '';

            // Set the inner HTML with the product details and conditional tags
            // <img src="${product.image}" alt="${product.name}" />
            productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Brand: ${product.brand}</p>
            ${tagsHTML}
            `;
            
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
    
};
