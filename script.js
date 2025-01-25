document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle")
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")
    const avatarButton = document.querySelector(".avatar")
    const dropdownMenu = document.querySelector(".dropdown-menu")

    function toggleSidebar() {
        sidebar.classList.toggle("visible")
        document.body.classList.toggle("sidebar-open")

        // Crear o remover el overlay
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
        // Aquí puedes agregar la lógica para cerrar sesión
        console.log("Cerrando sesión...")
    })
})

