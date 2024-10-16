let compactViewToggle = document.querySelector("#compact-view");
compactViewToggle.onclick = function() { 
    getProducts();
}



let applyFiltersBtn = document.querySelector("#filter-btn");
applyFiltersBtn.onclick = function() { 
    getProducts();
}

function getTags() {
    return {
        acne: document.getElementById("acne").checked,
        dry: document.getElementById("dry").checked,
        sensitive: document.getElementById("sensitive").checked,
        oily: document.getElementById("oily").checked,
        combination: document.getElementById("combination").checked,
        normal: document.getElementById("normal").checked,
        all: document.getElementById("all").checked,
        antiAging: document.getElementById("anti-aging").checked,
        hyperpigmentation: document.getElementById("hyperpigmentation").checked,
        rosacea: document.getElementById("rosacea").checked,
        erythema: document.getElementById("erythema").checked,
        darkCircles: document.getElementById("dark-circles").checked,
        brightening: document.getElementById("brightening").checked,
        spf: document.getElementById("spf").checked,
        cleansers: document.getElementById("cleansers").checked,
        serums: document.getElementById("serums").checked,
        masks: document.getElementById("masks").checked,
        moisturizers: document.getElementById("moisturizers").checked,
        exfoliants: document.getElementById("exfoliants").checked,
        mists: document.getElementById("mists").checked,
        eyeCreams: document.getElementById("eye-creams").checked
    };
}

function displayProducts(data){
    //find the container we will put the products in
    const container = document.getElementById('product-container');
    //figure out what filters we have
    selectedTags = getTags();
    selectedBrand = document.getElementById('brand-select').value;
    // Loop through each product and create HTML to display it
    // console.log("selectedTags",selectedTags);
    data.forEach(product => {
        //only show if matches filter
        for (const tag in selectedTags) {
            if (!product.tags[String(tag)] && selectedTags[tag]) return;
        }
        if(selectedBrand && selectedBrand !== 'ALL' && selectedBrand !== product.brand) return;

        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        // If we are not in compact view then show all the details on large cards
        if (!compactViewToggle.checked) {
            let tags = [];
            // Check each condition and add corresponding tag if true
            for (let key in product['tags']) {
                if (product['tags'][key]) tags.push(key);
            }
            // Build the tags string
            let tagsHTML = tags.length > 0 ? `<p>Tags: ${tags.join(', ')}</p>` : '';

            // Set the inner HTML with the product details and conditional tags
            // <img src="${product.image}" alt="${product.name}" />
            productDiv.classList.add('full');
            productDiv.classList.remove('compact');
            productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" class="full-image"/>
            <p>Brand: ${product.brand}</p>
            ${tagsHTML}
            <p>Bar: ${product.bar}</p>
            `;  
        // else we are in compact view so show just the image, name and brand in small cards
        } else {
            productDiv.classList.add('compact');
            productDiv.classList.remove('full');
            productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="compact-image"/>
            <div class="compact-details">
            <h2>${product.name}</h2>
            <p>${product.brand}</p>
            </div>
            `;  
        }
        
        productDiv.addEventListener('click', () => {
            focusProduct(product);
        })
        container.appendChild(productDiv);
    });
}
function focusProduct(product) {
    // Create a modal container
    overlay.style.display = 'flex';
    const modal = document.querySelector('#focus-product');
    let tags = [];
    // Check each condition and add corresponding tag if true
    for (let key in product['tags']) {
        if (product['tags'][key]) tags.push(key);
    }
    // Build the tags string
    let tagsHTML = tags.length > 0 ? `<p><strong>Tags:</strong> ${tags.join(', ')}</p>` : '';
    // Add content to the modal (expanded product view)
    modal.innerHTML = `
            <span class="close-button">&times;</span>
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" />
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Bar:</strong> ${product.bar}</p>
            ${tagsHTML}
    `;

    // Add event listener to close the modal when clicking the close button
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Close the modal when clicking outside of the content
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
}
function clearProducts(){
    const productDivs = document.querySelectorAll('.product');

    // Loop through all products and remove each element
    productDivs.forEach(productDiv => {
        productDiv.remove();
    });
}
function getProducts(){
    clearProducts();
    //fetch the data
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
    
};
getProducts();