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


function getProducts(){
    const productDivs = document.querySelectorAll('.product');

    // Loop through all products and remove each element
    productDivs.forEach(productDiv => {
        productDiv.remove();
    });
    //figure out what filters we have
    selectedTags = getTags();
    selectedBrand = document.getElementById('brand-select').value;
    //fecth the data
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        //find the container we will put the products in
        const container = document.getElementById('product-container');
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
            
            let tags = [];
            // Check each condition and add corresponding tag if true
            for (let key in product['tags']) {
                if (product['tags'][key]) tags.push(key);
            }
            // Build the tags string
            let tagsHTML = tags.length > 0 ? `<p>Tags: ${tags.join(', ')}</p>` : '';

            // Set the inner HTML with the product details and conditional tags
            // <img src="${product.image}" alt="${product.name}" />
            productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" />
            <p>Brand: ${product.brand}</p>
            ${tagsHTML}
            <p>Bar: ${product.bar}</p>
            `;
            
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
    
};
getProducts();