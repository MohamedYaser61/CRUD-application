/**
 * seed.js - Dynamic Demo Data Generator
 * Generates realistic mock data for the ProductHub CRUD application
 */

const SeedData = (() => {
    // Realistic product templates
    const productTemplates = {
        Electronics: [
            { name: "Wireless Earbuds Pro", basePrice: 129, desc: "Premium noise-canceling wireless earbuds with 30-hour battery life" },
            { name: "Smart Watch Ultra", basePrice: 399, desc: "Advanced fitness tracking with heart rate monitor and GPS" },
            { name: "4K Webcam", basePrice: 89, desc: "Professional streaming webcam with auto-focus and HDR" },
            { name: "Mechanical Keyboard RGB", basePrice: 159, desc: "Cherry MX switches with customizable RGB lighting" },
            { name: "USB-C Hub 7-in-1", basePrice: 49, desc: "Multi-port adapter with HDMI, SD card reader, and USB 3.0" },
            { name: "Portable SSD 1TB", basePrice: 119, desc: "Ultra-fast external storage with USB-C 3.2 Gen 2" },
            { name: "Wireless Mouse Pro", basePrice: 79, desc: "Ergonomic design with 6 programmable buttons and 16000 DPI" },
            { name: "HD Monitor 27-inch", basePrice: 329, desc: "IPS panel with 144Hz refresh rate and HDR400" },
            { name: "Laptop Stand Aluminum", basePrice: 39, desc: "Adjustable ergonomic stand for MacBook and laptops" },
            { name: "Bluetooth Speaker Portable", basePrice: 59, desc: "Waterproof outdoor speaker with 20-hour playtime" }
        ],
        Furniture: [
            { name: "Ergonomic Office Chair", basePrice: 299, desc: "Lumbar support with breathable mesh and adjustable armrests" },
            { name: "Standing Desk Adjustable", basePrice: 449, desc: "Electric height-adjustable desk with memory presets" },
            { name: "Bookshelf Oak Wood", basePrice: 189, desc: "5-tier modern bookshelf with open shelving design" },
            { name: "L-Shaped Desk", basePrice: 379, desc: "Spacious corner desk with cable management system" },
            { name: "Task Light LED", basePrice: 45, desc: "Dimmable desk lamp with touch controls and USB charging" },
            { name: "Monitor Arm Dual", basePrice: 89, desc: "Gas spring monitor mount for two screens up to 32 inches" },
            { name: "Cable Management Box", basePrice: 24, desc: "Organizer box for hiding power strips and cables" },
            { name: "Footrest Ergonomic", basePrice: 35, desc: "Adjustable angle footrest with massage texture" }
        ],
        Clothing: [
            { name: "Cotton T-Shirt Classic", basePrice: 29, desc: "100% organic cotton crew neck tee in premium quality" },
            { name: "Slim Fit Jeans", basePrice: 79, desc: "Stretch denim with modern fit and reinforced stitching" },
            { name: "Hoodie Fleece", basePrice: 59, desc: "Soft fleece pullover with kangaroo pocket and drawstring hood" },
            { name: "Running Shoes Athletic", basePrice: 119, desc: "Lightweight mesh sneakers with responsive cushioning" },
            { name: "Backpack Travel", basePrice: 89, desc: "Water-resistant laptop backpack with USB charging port" },
            { name: "Winter Jacket Insulated", basePrice: 149, desc: "Weatherproof puffer jacket with down alternative fill" },
            { name: "Baseball Cap Adjustable", basePrice: 25, desc: "Cotton twill cap with embroidered logo and snapback closure" },
            { name: "Leather Belt Classic", basePrice: 39, desc: "Full-grain leather belt with reversible buckle" }
        ],
        HomeDecor: [
            { name: "Wall Art Canvas Set", basePrice: 89, desc: "3-piece modern abstract art prints with wooden frames" },
            { name: "Table Lamp Ceramic", basePrice: 65, desc: "Minimalist bedside lamp with linen shade and dimmer" },
            { name: "Throw Pillow Set", basePrice: 45, desc: "4-pack decorative cushions with removable covers" },
            { name: "Area Rug Modern", basePrice: 159, desc: "Soft geometric pattern rug for living room or bedroom" },
            { name: "Wall Mirror Round", basePrice: 79, desc: "Large circular mirror with black metal frame" },
            { name: "Plant Pot Ceramic Set", basePrice: 35, desc: "Set of 3 indoor planters with drainage holes and saucers" },
            { name: "Curtains Blackout", basePrice: 49, desc: "Thermal insulated window panels in multiple colors" },
            { name: "Storage Basket Woven", basePrice: 29, desc: "Handmade basket with handles for organizing" }
        ],
        Sports: [
            { name: "Yoga Mat Premium", basePrice: 39, desc: "Extra thick non-slip exercise mat with carrying strap" },
            { name: "Dumbbell Set Adjustable", basePrice: 199, desc: "5-52.5 lb weight range with quick-change dial system" },
            { name: "Resistance Bands Set", basePrice: 29, desc: "5-level resistance bands with handles and door anchor" },
            { name: "Jump Rope Speed", basePrice: 19, desc: "Weighted handles with ball bearings for smooth rotation" },
            { name: "Exercise Ball 65cm", basePrice: 25, desc: "Anti-burst stability ball with pump included" },
            { name: "Foam Roller High Density", basePrice: 35, desc: "Muscle massage roller for post-workout recovery" },
            { name: "Water Bottle Insulated", basePrice: 29, desc: "32oz stainless steel bottle keeps drinks cold for 24 hours" },
            { name: "Gym Bag Duffel", basePrice: 45, desc: "Spacious sports bag with shoe compartment and wet pocket" }
        ],
        Kitchen: [
            { name: "Blender High-Speed", basePrice: 119, desc: "1500W motor with 10 speed settings and pulse function" },
            { name: "Air Fryer 6-Quart", basePrice: 99, desc: "Digital touchscreen with 8 preset cooking programs" },
            { name: "Coffee Maker Programmable", basePrice: 79, desc: "12-cup drip coffee maker with auto-brew feature" },
            { name: "Knife Set Professional", basePrice: 149, desc: "8-piece German stainless steel knives with wooden block" },
            { name: "Cutting Board Bamboo", basePrice: 29, desc: "Large chopping board with juice groove and handles" },
            { name: "Mixing Bowl Set", basePrice: 35, desc: "Stainless steel nesting bowls with non-slip bases" },
            { name: "Food Storage Containers", basePrice: 39, desc: "Glass meal prep containers with airtight lids" },
            { name: "Kitchen Scale Digital", basePrice: 25, desc: "Precise gram and ounce measurements with tare function" }
        ]
    };

    const statuses = ["active", "pending", "completed"];
    
    const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Skylar", "Drew"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

    // Placeholder avatar services
    const avatarServices = [
        (id) => `https://i.pravatar.cc/150?img=${id}`,
        (id) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
        (id) => `https://api.dicebear.com/7.x/personas/svg?seed=${id}`
    ];

    /**
     * Generate a random date within the last N days
     */
    const randomDate = (daysBack = 90) => {
        const now = new Date();
        const pastDate = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
        return pastDate.toISOString();
    };

    /**
     * Generate a random realistic product object
     */
    const generateProduct = (index) => {
        const categories = Object.keys(productTemplates);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const templates = productTemplates[category];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        // Add price variation (±20%)
        const priceVariation = 0.8 + Math.random() * 0.4;
        const finalPrice = Math.round(template.basePrice * priceVariation * 100) / 100;
        
        // Random status with weighted distribution: 50% active, 30% pending, 20% completed
        const statusRand = Math.random();
        const status = statusRand < 0.5 ? "active" : statusRand < 0.8 ? "pending" : "completed";
        
        // Random person for metadata
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const avatarService = avatarServices[Math.floor(Math.random() * avatarServices.length)];
        
        return {
            id: `prd_${Date.now()}_${index}_${Math.floor(Math.random() * 10000)}`,
            name: template.name,
            price: finalPrice,
            category: category,
            status: status,
            description: template.desc,
            createdAt: randomDate(90),
            updatedAt: randomDate(30),
            createdBy: `${firstName} ${lastName}`,
            avatar: avatarService(index + Math.floor(Math.random() * 100))
        };
    };

    /**
     * Generate multiple random products
     * @param {number} count - Number of products to generate (default: 12)
     * @returns {Array} Array of product objects
     */
    const generateRandomDemoData = (count = 12) => {
        const products = [];
        const usedNames = new Set();
        
        let attempts = 0;
        const maxAttempts = count * 3;
        
        while (products.length < count && attempts < maxAttempts) {
            const product = generateProduct(products.length);
            
            // Ensure unique product names
            if (!usedNames.has(product.name)) {
                usedNames.add(product.name);
                products.push(product);
            }
            
            attempts++;
        }
        
        // Sort by creation date (newest first)
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return products;
    };

    /**
     * Get a predefined set of demo data (fallback if generation fails)
     */
    const getStaticDemoData = () => {
        return [
            {
                id: "prd_demo_001",
                name: "Wireless Earbuds Pro",
                price: 129.99,
                category: "Electronics",
                status: "active",
                description: "Premium noise-canceling wireless earbuds with 30-hour battery life",
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: "Alex Johnson",
                avatar: "https://i.pravatar.cc/150?img=1"
            },
            {
                id: "prd_demo_002",
                name: "Ergonomic Office Chair",
                price: 299.00,
                category: "Furniture",
                status: "pending",
                description: "Lumbar support with breathable mesh and adjustable armrests",
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: "Jordan Smith",
                avatar: "https://i.pravatar.cc/150?img=2"
            },
            {
                id: "prd_demo_003",
                name: "Yoga Mat Premium",
                price: 39.99,
                category: "Sports",
                status: "completed",
                description: "Extra thick non-slip exercise mat with carrying strap",
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: "Taylor Williams",
                avatar: "https://i.pravatar.cc/150?img=3"
            }
        ];
    };

    // Public API
    return {
        generateRandomDemoData,
        getStaticDemoData
    };
})();
