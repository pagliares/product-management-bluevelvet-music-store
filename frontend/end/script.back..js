// User authentication and registration
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const user = { name, email, password, role };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful. Please login.');
    window.location.href = 'index.html';
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Product management
let products = JSON.parse(localStorage.getItem('products')) || [];
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

function addProduct(event) {
    event.preventDefault();
    const product = {
        id: Date.now(),
        name: document.getElementById('name').value,
        shortDescription: document.getElementById('shortDescription').value,
        fullDescription: document.getElementById('fullDescription').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        mainImage: document.getElementById('mainImage').files[0] ? URL.createObjectURL(document.getElementById('mainImage').files[0]) : '',
        featuredImages: Array.from(document.getElementById('featuredImages').files).map(file => URL.createObjectURL(file)),
        listPrice: parseFloat(document.getElementById('listPrice').value),
        discountPercent: parseFloat(document.getElementById('discountPercent').value),
        enabled: document.getElementById('enabled').checked,
        inStock: document.getElementById('inStock').checked,
        length: parseFloat(document.getElementById('length').value),
        width: parseFloat(document.getElementById('width').value),
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        cost: parseFloat(document.getElementById('cost').value),
        details: getProductDetails(),
        creationTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
    };

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully');
    window.location.href = 'dashboard.html';
}

function getProductDetails() {
    const detailsContainer = document.getElementById('productDetails');
    const detailInputs = detailsContainer.querySelectorAll('input');
    const details = {};
    for (let i = 0; i < detailInputs.length; i += 2) {
        const name = detailInputs[i].value;
        const value = detailInputs[i + 1].value;
        if (name && value) {
            details[name] = value;
        }
    }
    return details;
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.mainImage}" alt="${product.name}" width="50" onerror="this.src='https://via.placeholder.com/50'"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="viewProduct(${product.id})">View</button>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });

    displayPagination();
}

function displayPagination() {
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            displayProducts();
        };
        paginationContainer.appendChild(button);
    }
}

function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        window.location.href = `view-product.html?id=${id}`;
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        window.location.href = `edit-product.html?id=${id}`;
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        const detailsContainer = document.getElementById('productDetails');
        detailsContainer.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.mainImage}" alt="${product.name}" width="200" onerror="this.src='https://via.placeholder.com/200'">
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Short Description:</strong> ${product.shortDescription}</p>
            <p><strong>Full Description:</strong> ${product.fullDescription}</p>
            <p><strong>List Price:</strong> $${product.listPrice.toFixed(2)}</p>
            <p><strong>Discount:</strong> ${product.discountPercent}%</p>
            <p><strong>Enabled:</strong> ${product.enabled ? 'Yes' : 'No'}</p>
            <p><strong>In Stock:</strong> ${product.inStock ? 'Yes' : 'No'}</p>
            <p><strong>Dimensions:</strong> ${product.length}" x ${product.width}" x ${product.height}"</p>
            <p><strong>Weight:</strong> ${product.weight} lbs</p>
            <p><strong>Cost:</strong> $${product.cost.toFixed(2)}</p>
            <p><strong>Creation Time:</strong> ${new Date(product.creationTime).toLocaleString()}</p>
            <p><strong>Update Time:</strong> ${new Date(product.updateTime).toLocaleString()}</p>
            <h4>Product Details:</h4>
            <ul>
                ${Object.entries(product.details).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
            <h4>Featured Images:</h4>
            ${product.featuredImages.map(img => `<img src="${img}" alt="Featured Image" width="100" onerror="this.src='https://via.placeholder.com/100'">`).join('')}
        `;
    } else {
        alert('Product not found');
        window.location.href = 'dashboard.html';
    }
}

function loadEditForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('shortDescription').value = product.shortDescription;
        document.getElementById('fullDescription').value = product.fullDescription;
        document.getElementById('brand').value = product.brand;
        document.getElementById('category').value = product.category;
        document.getElementById('currentMainImage').innerHTML = `<img src="${product.mainImage}" alt="Current Main Image" width="100">`;
        document.getElementById('currentFeaturedImages').innerHTML = product.featuredImages.map(img => `<img src="${img}" alt="Featured Image" width="50">`).join('');
        document.getElementById('listPrice').value = product.listPrice;
        document.getElementById('discountPercent').value = product.discountPercent;
        document.getElementById('enabled').checked = product.enabled;
        document.getElementById('inStock').checked = product.inStock;
        document.getElementById('length').value = product.length;
        document.getElementById('width').value = product.width;
        document.getElementById('height').value = product.height;
        document.getElementById('weight').value = product.weight;
        document.getElementById('cost').value = product.cost;

        const detailsContainer = document.getElementById('productDetails');
        detailsContainer.innerHTML = '';
        Object.entries(product.details).forEach(([key, value]) => {
            const detailDiv = document.createElement('div');
            detailDiv.innerHTML = `
                <input type="text" value="${key}" placeholder="Detail Name">
                <input type="text" value="${value}" placeholder="Detail Value">
                <button type="button" onclick="removeDetail(this)">Remove</button>
            `;
            detailsContainer.appendChild(detailDiv);
        });
    } else {
        alert('Product not found');
        window.location.href = 'dashboard.html';
    }
}

function updateProduct(event) {
    event.preventDefault();
    const productId = parseInt(document.getElementById('productId').value);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            name: document.getElementById('name').value,
            shortDescription: document.getElementById('shortDescription').value,
            fullDescription: document.getElementById('fullDescription').value,
            brand: document.getElementById('brand').value,
            category: document.getElementById('category').value,
            listPrice: parseFloat(document.getElementById('listPrice').value),
            discountPercent: parseFloat(document.getElementById('discountPercent').value),
            enabled: document.getElementById('enabled').checked,
            inStock: document.getElementById('inStock').checked,
            length: parseFloat(document.getElementById('length').value),
            width: parseFloat(document.getElementById('width').value),
            height: parseFloat(document.getElementById('height').value),
            weight: parseFloat(document.getElementById('weight').value),
            cost: parseFloat(document.getElementById('cost').value),
            details: getProductDetails(),
            updateTime: new Date().toISOString()
        };

        const mainImageFile = document.getElementById('mainImage').files[0];
        if (mainImageFile) {
            updatedProduct.mainImage = URL.createObjectURL(mainImageFile);
        }

        const featuredImageFiles = document.getElementById('featuredImages').files;
        if (featuredImageFiles.length > 0) {
            updatedProduct.featuredImages = Array.from(featuredImageFiles).map(file => URL.createObjectURL(file));
        }

        products[productIndex] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product updated successfully');
        window.location.href = 'dashboard.html';
    } else {
        alert('Product not found');
    }
}

function removeDetail(button) {
    button.parentElement.remove();
}

function addDetailField() {
    const detailsContainer = document.getElementById('productDetails');
    const detailDiv = document.createElement('div');
    detailDiv.innerHTML = `
        <input type="text" placeholder="Detail Name">
        <input type="text" placeholder="Detail Value">
        <button type="button" onclick="removeDetail(this)">Remove</button>
    `;
    detailsContainer.appendChild(detailDiv);
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    products.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    displayProducts();
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.shortDescription.toLowerCase().includes(searchTerm) ||
        product.fullDescription.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.mainImage}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="viewProduct(${product.id})">View</button>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();  
    const path = window.location.pathname;

    if (path.includes('index.html')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            login();
        });
    } else if (path.includes('register.html')) {
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            register();
        });
    } else if (path.includes('dashboard.html')) {
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('userInfo').textContent = `Welcome, ${currentUser.name} (${currentUser.role})`;
            document.getElementById('logoutBtn').addEventListener('click', logout);
            document.getElementById('addProductBtn').addEventListener('click', () => {
                if (['admin', 'editor'].includes(currentUser.role)) {
                    window.location.href = 'add-product.html';
                } else {
                    alert('You do not have permission to add products.');
                }
            });
            document.getElementById('sortSelect').addEventListener('change', sortProducts);
            document.getElementById('searchInput').addEventListener('input', searchProducts);
            displayProducts();
        }
    } else if (path.includes('add-product.html')) {
        if (!currentUser || !['admin', 'editor'].includes(currentUser.role)) {
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('addProductForm').addEventListener('submit', addProduct);
            document.getElementById('addDetailBtn').addEventListener('click', addDetailField);
        }
    } else if (path.includes('edit-product.html')) {
        if (!currentUser || !['admin', 'editor', 'salesperson'].includes(currentUser.role)) {
            window.location.href = 'dashboard.html';
        } else {
            loadEditForm();
            document.getElementById('editProductForm').addEventListener('submit', updateProduct);
            document.getElementById('addDetailBtn').addEventListener('click', addDetailField);
        }
    } else if (path.includes('view-product.html')) {
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            loadProductDetails();
        }
    }
});


const PRODUCT_DATA_VERSION = 1; // Increment this when you update the initial product list

function initializeProducts() {
    const storedVersion = localStorage.getItem('productDataVersion');
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    if (!storedVersion || parseInt(storedVersion) < PRODUCT_DATA_VERSION) {
        console.log("Initializing or updating products...");
        
        // Your initial products array here
        const initialProducts = [
            {
                id: 1,
                name: "Led Zeppelin IV Vinyl",
                shortDescription: "Classic rock album on vinyl",
                fullDescription: "Led Zeppelin IV is the fourth studio album by English rock band Led Zeppelin, released on 8 November 1971. It is one of the best-selling albums of all time with more than 37 million copies sold.",
                brand: "Atlantic Records",
                category: "Vinyl Records",
                mainImage: getUnsplashImage(300, 300, "vinyl"),
                featuredImages: [
                    getUnsplashImage(100, 100, "vinyl"),
                    getUnsplashImage(100, 100, "vinyl")
                ],
                listPrice: 29.99,
                discountPercent: 0,
                enabled: true,
                inStock: true,
                length: 12,
                width: 12,
                height: 0.2,
                weight: 0.5,
                cost: 15.00,
                details: {
                    "Release Year": "1971",
                    "Condition": "New",
                    "Speed": "33 1/3 RPM"
                },
                creationTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            },
            {
                id: 2,
                name: "Fender Stratocaster Electric Guitar",
                shortDescription: "Iconic electric guitar",
                fullDescription: "The Fender Stratocaster is a model of electric guitar designed in 1954 by Leo Fender, Bill Carson, George Fullerton, and Freddie Tavares. It is one of the most widely recognized electric guitars in the world.",
                brand: "Fender",
                category: "Musical Instruments",
                mainImage: getUnsplashImage(300, 300, "guitar"),
                featuredImages: [
                    getUnsplashImage(100, 100, "guitar"),
                    getUnsplashImage(100, 100, "guitar")
                ],
                listPrice: 1499.99,
                discountPercent: 10,
                enabled: true,
                inStock: true,
                length: 39.9,
                width: 12.8,
                height: 2.9,
                weight: 7.5,
                cost: 900.00,
                details: {
                    "Body Material": "Alder",
                    "Neck Material": "Maple",
                    "Number of Frets": "22"
                },
                creationTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            },
            // ... (continue for all 25 products, using appropriate categories for each)
        ];

        // Merge existing products with new ones, using product ID as the key
        const mergedProducts = [...storedProducts, ...initialProducts].reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});

        products = Object.values(mergedProducts);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('productDataVersion', PRODUCT_DATA_VERSION.toString());
        
        console.log(`Products initialized/updated to version ${PRODUCT_DATA_VERSION}`);
    } else {
        console.log("Products already up to date.");
        products = storedProducts;
    }

    console.log("Total products:", products.length);
}

// Admin function to reset products
function resetProductsToInitial() {
    if (confirm("Are you sure you want to reset the product list to its initial state? This will delete any custom products.")) {
        localStorage.removeItem('products');
        localStorage.removeItem('productDataVersion');
        initializeProducts();
        displayProducts(); // Assuming this function exists to refresh the product display
    }
}

function getUnsplashImage(width, height, category) {
    return `https://source.unsplash.com/random/${width}x${height}?${category}`;
}