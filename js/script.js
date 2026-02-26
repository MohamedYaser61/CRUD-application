
(() => {
    const STORAGE_KEY = "products";
    const state = {
        products: [],
        deleteId: null,
        charts: {
            status: null,
            category: null
        }
    };

    const elements = {
        searchInput: document.getElementById("searchInput"),
        statusFilter: document.getElementById("statusFilter"),
        categoryFilter: document.getElementById("categoryFilter"),
        sortBy: document.getElementById("sortBy"),
        tbody: document.getElementById("tbody"),
        totalCount: document.getElementById("totalCount"),
        activeCount: document.getElementById("activeCount"),
        completedCount: document.getElementById("completedCount"),
        resultsCount: document.getElementById("resultsCount"),
        emptyState: document.getElementById("emptyState"),
        openCreateModal: document.getElementById("openCreateModal"),
        emptyStateCta: document.getElementById("emptyStateCta"),
        productForm: document.getElementById("productForm"),
        productModalTitle: document.getElementById("productModalTitle"),
        productName: document.getElementById("productName"),
        productPrice: document.getElementById("productPrice"),
        productCategory: document.getElementById("productCategory"),
        productStatus: document.getElementById("productStatus"),
        productDescription: document.getElementById("productDescription"),
        productIndex: document.getElementById("productIndex"),
        confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),
        loadingOverlay: document.getElementById("loadingOverlay"),
        toast: document.getElementById("actionToast"),
        toastTitle: document.getElementById("toastTitle"),
        toastMessage: document.getElementById("toastMessage"),
        toastTime: document.getElementById("toastTime"),
        statusChart: document.getElementById("statusChart"),
        categoryChart: document.getElementById("categoryChart")
    };

    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
    const toastInstance = new bootstrap.Toast(elements.toast, { delay: 2500 });

    const createId = () => `prd_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const setLoading = (isLoading) => {
        elements.loadingOverlay.classList.toggle("active", isLoading);
    };

    const loadProducts = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Auto-load seed data if localStorage is empty
            if (typeof SeedData !== 'undefined') {
                state.products = SeedData.generateRandomDemoData(12);
                saveProducts();
                console.log('✓ Demo data loaded successfully');
            } else {
                state.products = [];
            }
            return;
        }

        const parsed = JSON.parse(stored);
        state.products = parsed.map((product) => ({
            id: product.id || createId(),
            name: product.name || "",
            price: Number(product.price) || 0,
            category: product.category || "General",
            status: product.status || "active",
            description: product.description || "",
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            createdBy: product.createdBy,
            avatar: product.avatar
        }));
        saveProducts();
    };

    const saveProducts = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
    };

    const resetDemoData = () => {
        if (typeof SeedData === 'undefined') {
            showToast("Error", "Seed data module not available.");
            return;
        }
        
        if (confirm("Reset to demo data? This will replace all current products.")) {
            setLoading(true);
            state.products = SeedData.generateRandomDemoData(12);
            saveProducts();
            updateUI();
            setTimeout(() => {
                setLoading(false);
                showToast("Reset Complete", "Demo data has been restored.");
            }, 800);
        }
    };

    const showToast = (title, message) => {
        elements.toastTitle.textContent = title;
        elements.toastMessage.textContent = message;
        elements.toastTime.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        toastInstance.show();
    };

    const openCreate = () => {
        elements.productModalTitle.textContent = "New Product";
        elements.productForm.reset();
        elements.productStatus.value = "active";
        elements.productIndex.value = "";
        productModal.show();
    };

    const openEdit = (productId) => {
        const product = state.products.find((item) => item.id === productId);
        if (!product) return;

        elements.productModalTitle.textContent = "Update Product";
        elements.productName.value = product.name;
        elements.productPrice.value = product.price;
        elements.productCategory.value = product.category;
        elements.productStatus.value = product.status;
        elements.productDescription.value = product.description;
        elements.productIndex.value = product.id;
        productModal.show();
    };

    const openDelete = (productId) => {
        state.deleteId = productId;
        confirmModal.show();
    };

    const handleDelete = () => {
        if (!state.deleteId) return;
        state.products = state.products.filter((product) => product.id !== state.deleteId);
        saveProducts();
        state.deleteId = null;
        updateUI();
        showToast("Deleted", "Product removed successfully.");
        confirmModal.hide();
    };

    const collectFilters = () => ({
        query: elements.searchInput.value.trim().toLowerCase(),
        status: elements.statusFilter.value,
        category: elements.categoryFilter.value,
        sort: elements.sortBy.value
    });

    const getFilteredProducts = () => {
        const filters = collectFilters();
        let list = [...state.products];

        if (filters.query) {
            list = list.filter((product) => product.name.toLowerCase().includes(filters.query));
        }

        if (filters.status !== "all") {
            list = list.filter((product) => product.status === filters.status);
        }

        if (filters.category !== "all") {
            list = list.filter((product) => product.category.toLowerCase() === filters.category.toLowerCase());
        }

        list.sort((a, b) => {
            switch (filters.sort) {
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return list;
    };

    const updateSummary = () => {
        const total = state.products.length;
        const active = state.products.filter((item) => item.status === "active").length;
        const pending = state.products.filter((item) => item.status === "pending").length;
        const completed = state.products.filter((item) => item.status === "completed").length;

        elements.totalCount.textContent = total;
        elements.activeCount.textContent = active;
        elements.completedCount.textContent = pending + completed;
    };

    const updateCategoryFilter = () => {
        const categories = [...new Set(state.products.map((item) => item.category))];
        const current = elements.categoryFilter.value;
        elements.categoryFilter.innerHTML = `<option value="all">All Categories</option>` +
            categories.map((category) => `<option value="${category}">${category}</option>`).join("");
        elements.categoryFilter.value = categories.includes(current) ? current : "all";
    };

    const updateCharts = () => {
        if (!window.Chart) return;

        const activeCount = state.products.filter((item) => item.status === "active").length;
        const pendingCount = state.products.filter((item) => item.status === "pending").length;
        const completedCount = state.products.filter((item) => item.status === "completed").length;
        const categoryMap = {};
        state.products.forEach((item) => {
            categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
        });

        if (state.charts.status) state.charts.status.destroy();
        if (state.charts.category) state.charts.category.destroy();

        state.charts.status = new Chart(elements.statusChart, {
            type: "doughnut",
            data: {
                labels: ["Active", "Pending", "Completed"],
                datasets: [{
                    data: [activeCount, pendingCount, completedCount],
                    backgroundColor: ["#3cc9a3", "#6c9bd1", "#f2b43d"],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: { color: "#f8fafc" }
                    }
                }
            }
        });

        state.charts.category = new Chart(elements.categoryChart, {
            type: "bar",
            data: {
                labels: Object.keys(categoryMap),
                datasets: [{
                    label: "Products",
                    data: Object.values(categoryMap),
                    backgroundColor: "#f2b43d",
                    borderRadius: 12
                }]
            },
            options: {
                scales: {
                    x: { ticks: { color: "#f8fafc" }, grid: { color: "rgba(148, 163, 184, 0.1)" } },
                    y: { ticks: { color: "#f8fafc" }, grid: { color: "rgba(148, 163, 184, 0.1)" } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    };

    const renderTable = () => {
        const filtered = getFilteredProducts();
        elements.resultsCount.textContent = `${filtered.length} results`;

        if (state.products.length === 0) {
            elements.emptyState.classList.remove("d-none");
            elements.tbody.innerHTML = "";
            return;
        }

        elements.emptyState.classList.add("d-none");

        if (filtered.length === 0) {
            elements.tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted py-4">No matching products found.</td>
                </tr>`;
            return;
        }

        elements.tbody.innerHTML = filtered.map((product) => {
            let badgeClass;
            if (product.status === "completed") badgeClass = "badge-completed";
            else if (product.status === "pending") badgeClass = "badge-pending";
            else badgeClass = "badge-active";
            
            return `
                <tr>
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.category}</td>
                    <td><span class="badge-status ${badgeClass}">${product.status}</span></td>
                    <td>${product.description}</td>
                    <td class="action-btns">
                        <button class="btn btn-outline-light btn-sm me-2" data-action="edit" data-id="${product.id}">Edit</button>
                        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${product.id}">Delete</button>
                    </td>
                </tr>`;
        }).join("");
    };

    const updateUI = () => {
        updateSummary();
        updateCategoryFilter();
        renderTable();
        updateCharts();
    };

    // Expose reset function globally for button access
    window.resetDemoData = resetDemoData;

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = elements.productName.value.trim();
        const price = Number(elements.productPrice.value);
        const category = elements.productCategory.value.trim();
        const status = elements.productStatus.value;
        const description = elements.productDescription.value.trim();

        if (!name || !category || !description || Number.isNaN(price)) {
            showToast("Missing info", "Please fill in all required fields.");
            return;
        }

        const existingId = elements.productIndex.value;
        if (existingId) {
            const index = state.products.findIndex((item) => item.id === existingId);
            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    name,
                    price,
                    category,
                    status,
                    description
                };
                showToast("Updated", "Product updated successfully.");
            }
        } else {
            state.products.unshift({
                id: createId(),
                name,
                price,
                category,
                status,
                description
            });
            showToast("Created", "Product added successfully.");
        }

        saveProducts();
        updateUI();
        productModal.hide();
    };

    const bindEvents = () => {
        elements.openCreateModal.addEventListener("click", openCreate);
        elements.emptyStateCta.addEventListener("click", openCreate);
        elements.productForm.addEventListener("submit", handleSubmit);
        elements.confirmDeleteBtn.addEventListener("click", handleDelete);

        [elements.searchInput, elements.statusFilter, elements.categoryFilter, elements.sortBy]
            .forEach((control) => control.addEventListener("input", updateUI));

        elements.tbody.addEventListener("click", (event) => {
            const actionButton = event.target.closest("button[data-action]");
            if (!actionButton) return;
            const productId = actionButton.getAttribute("data-id");
            if (actionButton.dataset.action === "edit") {
                openEdit(productId);
            }
            if (actionButton.dataset.action === "delete") {
                openDelete(productId);
            }
        });
    };

    const init = () => {
        setLoading(true);
        loadProducts();
        bindEvents();
        updateUI();
        setTimeout(() => setLoading(false), 500);
    };

    init();
})();
