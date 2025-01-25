document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle")
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")
    const avatarButton = document.querySelector(".avatar")
    const dropdownMenu = document.querySelector(".dropdown-menu")
    const addProductBtn = document.getElementById("addProductBtn")
    const productsTableBody = document.querySelector(".products-table tbody")
    const productList = document.getElementById("productList")
    const selectedProducts = document.getElementById("selectedProducts")
    const saleTotal = document.getElementById("saleTotal")
    const completeSaleBtn = document.getElementById("completeSale")
    const productSearch = document.getElementById("productSearch")
    const searchButton = document.getElementById("searchButton")

    function toggleSidebar() {
        sidebar.classList.toggle("visible")
        document.body.classList.toggle("sidebar-open")

        if (sidebar.classList.contains("visible")) {
            const overlay = document.createElement("div")
            overlay.id = "sidebar-overlay"
            overlay.style.position = "fixed"
            overlay.style.top = "0"
            overlay.style.left = "0"
            overlay.style.width = "100%"
            overlay.style.height = "100%"
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
            overlay.style.zIndex = "999"
            document.body.appendChild(overlay)

            overlay.addEventListener("click", toggleSidebar)
        } else {
            const overlay = document.getElementById("sidebar-overlay")
            if (overlay) {
                overlay.removeEventListener("click", toggleSidebar)
                overlay.remove()
            }
        }
    }

    function toggleDropdown() {
        dropdownMenu.classList.toggle("show")
        avatarButton.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"))
    }

    menuToggle.addEventListener("click", toggleSidebar)
    avatarButton.addEventListener("click", toggleDropdown)

    // Cerrar el dropdown al hacer clic fuera de él
    document.addEventListener("click", (event) => {
        if (!avatarButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show")
            avatarButton.setAttribute("aria-expanded", "false")
        }
    })

    // Ajustar el diseño en la carga inicial y al cambiar el tamaño de la ventana
    function adjustLayout() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("visible")
            mainContent.style.marginLeft = "var(--sidebar-width)"
            document.body.classList.remove("sidebar-open")
        } else {
            mainContent.style.marginLeft = "0"
        }
    }

    window.addEventListener("resize", adjustLayout)
    adjustLayout() // Llamar a la función al cargar la página

    // Manejar el clic en el botón "Cerrar sesión"
    const logoutButton = document.querySelector(".dropdown-item")
    logoutButton.addEventListener("click", () => {
        console.log("Cerrando sesión...")
    })

    // Datos de ejemplo para los productos
    const products = [
        {
            id: 1,
            name: "Producto 1",
            price: 19.99,
            category: "Electrónica",
            stock: 50,
            image: "https://via.placeholder.com/50",
        },
        { id: 2, name: "Producto 2", price: 29.99, category: "Ropa", stock: 100, image: "https://via.placeholder.com/50" },
        { id: 3, name: "Producto 3", price: 9.99, category: "Hogar", stock: 75, image: "https://via.placeholder.com/50" },
    ]

    // Función para renderizar los productos en la tabla
    function renderProducts() {
        productsTableBody.innerHTML = ""
        products.forEach((product) => {
            const row = document.createElement("tr")
            row.innerHTML = `
          <td><img src="${product.image}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.category}</td>
          <td>${product.stock}</td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-edit" data-id="${product.id}">Editar</button>
              <button class="btn btn-delete" data-id="${product.id}">Eliminar</button>
            </div>
          </td>
        `
            productsTableBody.appendChild(row)
        })
    }

    // Renderizar los productos iniciales
    renderProducts()

    // Manejar el clic en el botón "Agregar Nuevo Producto"
    addProductBtn.addEventListener("click", () => {
        console.log("Agregar nuevo producto")
        // Aquí puedes implementar la lógica para abrir un modal o formulario para agregar un nuevo producto
    })

    // Manejar los clics en los botones de editar y eliminar
    productsTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-edit")) {
            const productId = event.target.getAttribute("data-id")
            console.log(`Editar producto con ID: ${productId}`)
            // Aquí puedes implementar la lógica para editar el producto
        } else if (event.target.classList.contains("btn-delete")) {
            const productId = event.target.getAttribute("data-id")
            console.log(`Eliminar producto con ID: ${productId}`)
            // Aquí puedes implementar la lógica para eliminar el producto
        }
    })

    // Función para renderizar los productos en la lista de ventas
    function renderSalesProducts(productsToRender) {
        productList.innerHTML = ""
        productsToRender.forEach((product) => {
            const li = document.createElement("li")
            li.innerHTML = `
          <div class="product-info">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
              <span class="product-name">${product.name}</span>
              <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
          </div>
          <button class="add-to-sale" data-id="${product.id}">Agregar</button>
        `
            productList.appendChild(li)
        })
    }

    // Renderizar todos los productos inicialmente
    renderSalesProducts(products)

    // Array para almacenar los productos seleccionados
    let selectedProductsArray = []

    // Función para actualizar el total de la venta
    function updateSaleTotal() {
        const total = selectedProductsArray.reduce((sum, product) => sum + product.price * product.quantity, 0)
        saleTotal.textContent = `$${total.toFixed(2)}`
    }

    // Función para renderizar los productos seleccionados
    function renderSelectedProducts() {
        selectedProducts.innerHTML = ""
        selectedProductsArray.forEach((product) => {
            const li = document.createElement("li")
            li.innerHTML = `
          ${product.name} - $${product.price.toFixed(2)} x ${product.quantity}
          <button class="remove-from-sale" data-id="${product.id}">Eliminar</button>
        `
            selectedProducts.appendChild(li)
        })
        updateSaleTotal()
    }

    // Manejar el clic en el botón "Agregar" en la lista de productos
    productList.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-sale")) {
            const productId = Number.parseInt(event.target.getAttribute("data-id"))
            const product = products.find((p) => p.id === productId)
            const existingProduct = selectedProductsArray.find((p) => p.id === productId)

            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                selectedProductsArray.push({ ...product, quantity: 1 })
            }

            renderSelectedProducts()
        }
    })

    // Manejar el clic en el botón "Eliminar" en la lista de productos seleccionados
    selectedProducts.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-from-sale")) {
            const productId = Number.parseInt(event.target.getAttribute("data-id"))
            selectedProductsArray = selectedProductsArray.filter((p) => p.id !== productId)
            renderSelectedProducts()
        }
    })

    // Manejar el clic en el botón "Completar Venta"
    completeSaleBtn.addEventListener("click", () => {
        const customerName = document.getElementById("customerName").value
        const saleDate = document.getElementById("saleDate").value
        const paymentMethod = document.getElementById("paymentMethod").value

        if (!customerName || !saleDate || !paymentMethod) {
            alert("Por favor, complete todos los campos del formulario de venta.")
            return
        }

        if (selectedProductsArray.length === 0) {
            alert("Por favor, agregue al menos un producto a la venta.")
            return
        }

        const saleData = {
            customerName,
            saleDate,
            paymentMethod,
            products: selectedProductsArray,
            total: Number.parseFloat(saleTotal.textContent.replace("$", "")),
        }

        console.log("Venta completada:", saleData)
        // Aquí puedes implementar la lógica para procesar la venta (por ejemplo, enviarla a un servidor)

        // Limpiar el formulario y los productos seleccionados después de completar la venta
        document.getElementById("salesForm").reset()
        selectedProductsArray = []
        renderSelectedProducts()
    })

    // Función para filtrar productos en la búsqueda
    function filterProducts(searchTerm) {
        return products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Manejar la búsqueda de productos
    function handleSearch() {
        const searchTerm = productSearch.value.trim()
        const filteredProducts = filterProducts(searchTerm)
        renderSalesProducts(filteredProducts)
    }

    // Evento para la búsqueda al presionar Enter
    productSearch.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    })

    // Evento para la búsqueda al hacer clic en el botón
    searchButton.addEventListener("click", handleSearch)
})

