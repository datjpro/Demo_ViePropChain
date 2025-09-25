// NFT Marketplace JavaScript

// Demo property data
const properties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    type: "residential",
    location: "Đà Nẵng, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    price: 2500000,
    priceETH: 1.2,
    area: 450,
    status: "available",
    owner: "0x742d35cc6cb4c4eb1d48927c89e4c1e74d5ba8d7",
    tokenId: "VP001",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Biệt thự mặt biển sang trọng với view 360° và tiện nghi 5 sao. Thiết kế hiện đại kết hợp với phong cách Á Đông.",
    yearBuilt: 2020,
    bedrooms: 4,
    bathrooms: 3,
    landSize: 600,
    favorite: false,
  },
  {
    id: 2,
    title: "Commercial Office Complex",
    type: "commercial",
    location: "TP.HCM, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2077&q=80",
    price: 5000000,
    priceETH: 2.4,
    area: 1200,
    status: "available",
    owner: "0x8b2f9c7e5a6d4b3c8f9e1a2b3c4d5e6f7g8h9i0j",
    tokenId: "VP002",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Tòa nhà văn phòng thương mại cao cấp tại trung tâm Quận 1. Vị trí đắc địa, thiết kế thông minh, đầy đủ tiện ích.",
    yearBuilt: 2019,
    floors: 15,
    parking: 50,
    landSize: 800,
    favorite: false,
  },
  {
    id: 3,
    title: "Agricultural Land Plot",
    type: "land",
    location: "Cần Thơ, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2122&q=80",
    price: 800000,
    priceETH: 0.38,
    area: 5000,
    status: "available",
    owner: "0x9c3e8f1a4b7d6e2f5c8a1b4e7d0c3f6i9l2o5r8u",
    tokenId: "VP003",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Đất nông nghiệp màu mỡ tại đồng bằng sông Cửu Long. Thích hợp cho canh tác lúa và nuôi tôm cá.",
    soilType: "Phù sa",
    irrigation: "Có hệ thống tưới",
    access: "Đường bê tông",
    landSize: 5000,
    favorite: false,
  },
  {
    id: 4,
    title: "Modern Apartment Complex",
    type: "residential",
    location: "Hà Nội, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 1800000,
    priceETH: 0.86,
    area: 120,
    status: "sold",
    owner: "0xa4b7c1e5f8d2g6h9j3k7m1n4p8q2s5t9v3w7x1y5",
    tokenId: "VP004",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Căn hộ cao cấp trong khu phức hợp hiện đại. Thiết kế thông minh, view thành phố, đầy đủ tiện ích.",
    yearBuilt: 2021,
    bedrooms: 3,
    bathrooms: 2,
    floor: 12,
    favorite: false,
  },
  {
    id: 5,
    title: "Industrial Warehouse",
    type: "industrial",
    location: "Bình Dương, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 3200000,
    priceETH: 1.53,
    area: 2500,
    status: "available",
    owner: "0xb5c8d2f6g9h3i7j1k4l8m2n6o0p4q8r2s6t0u4v8",
    tokenId: "VP005",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Nhà kho công nghiệp hiện đại trong khu công nghiệp. Vị trí thuận lợi cho logistics và sản xuất.",
    yearBuilt: 2018,
    ceilingHeight: 12,
    loadCapacity: 500,
    dockDoors: 8,
    landSize: 3000,
    favorite: false,
  },
  {
    id: 6,
    title: "Shopping Mall Complex",
    type: "commercial",
    location: "Nha Trang, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 8500000,
    priceETH: 4.08,
    area: 3500,
    status: "available",
    owner: "0xc6d9e3f7g1h5i9j3k7l1m5n9o3p7q1r5s9t3u7v1",
    tokenId: "VP006",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Trung tâm thương mại lớn với nhiều cửa hàng, nhà hàng và khu vui chơi giải trí.",
    yearBuilt: 2017,
    floors: 4,
    shops: 120,
    parking: 200,
    landSize: 4000,
    favorite: false,
  },
  {
    id: 7,
    title: "Luxury Mountain Resort",
    type: "commercial",
    location: "Đà Lạt, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    price: 12000000,
    priceETH: 5.75,
    area: 8000,
    status: "available",
    owner: "0xd7e0f4g8h2i6j0k4l8m2n6o0p4q8r2s6t0u4v8w2",
    tokenId: "VP007",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Khu nghỉ dưỡng cao cấp giữa núi rừng Đà Lạt. Bao gồm khách sạn, spa, sân golf và nhiều tiện ích giải trí.",
    yearBuilt: 2016,
    rooms: 120,
    floors: 8,
    amenities: ["Spa", "Golf", "Pool", "Restaurant"],
    landSize: 15000,
    favorite: false,
  },
  {
    id: 8,
    title: "Modern Townhouse",
    type: "residential",
    location: "Hà Nội, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    price: 4200000,
    priceETH: 2.01,
    area: 200,
    status: "available",
    owner: "0xe8f1g5h9i3j7k1l5m9n3o7p1q5r9s3t7u1v5w9x3",
    tokenId: "VP008",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Nhà phố hiện đại 3 tầng trong khu đô thị mới. Thiết kế tối ưu không gian, có sân vườn và gara ô tô.",
    yearBuilt: 2022,
    bedrooms: 4,
    bathrooms: 3,
    floors: 3,
    garage: true,
    garden: true,
    landSize: 120,
    favorite: false,
  },
  {
    id: 9,
    title: "Coastal Land Development",
    type: "land",
    location: "Phú Quốc, Kiên Giang",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 15000000,
    priceETH: 7.19,
    area: 25000,
    status: "available",
    owner: "0xf9g2h6i0j4k8l2m6n0o4p8q2r6s0t4u8v2w6x0y4",
    tokenId: "VP009",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Khu đất ven biển Phú Quốc có tiềm năng phát triển resort và du lịch. Mặt tiền biển dài 500m.",
    beachfront: true,
    frontage: 500,
    zoning: "Du lịch - Nghỉ dưỡng",
    accessibility: "Đường quốc lộ",
    landSize: 25000,
    favorite: false,
  },
  {
    id: 10,
    title: "High-tech Manufacturing Plant",
    type: "industrial",
    location: "Bắc Ninh, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    price: 25000000,
    priceETH: 11.98,
    area: 5000,
    status: "available",
    owner: "0xa0b4c8d2e6f0g4h8i2j6k0l4m8n2o6p0q4r8s2t6",
    tokenId: "VP010",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Nhà máy sản xuất công nghệ cao với dây chuyền tự động. Vị trí thuận lợi gần sân bay Nội Bài.",
    yearBuilt: 2020,
    cleanroom: true,
    automation: "Fully automated",
    capacity: 10000,
    certifications: ["ISO 9001", "ISO 14001"],
    landSize: 8000,
    favorite: false,
  },
  {
    id: 11,
    title: "Historic French Villa",
    type: "residential",
    location: "TP.HCM, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    price: 18000000,
    priceETH: 8.63,
    area: 800,
    status: "sold",
    owner: "0xb1c5d9e3f7g1h5i9j3k7l1m5n9o3p7q1r5s9t3u7",
    tokenId: "VP011",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Biệt thự cổ kiến trúc Pháp được bảo tồn nguyên vẹn. Nằm trong khu vực lịch sử trung tâm Quận 1.",
    yearBuilt: 1925,
    heritage: true,
    bedrooms: 6,
    bathrooms: 4,
    floors: 2,
    balcony: 4,
    landSize: 1000,
    favorite: false,
  },
  {
    id: 12,
    title: "Smart Office Tower",
    type: "commercial",
    location: "Hà Nội, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 45000000,
    priceETH: 21.57,
    area: 15000,
    status: "available",
    owner: "0xc2d6e0f4g8h2i6j0k4l8m2n6o0p4q8r2s6t0u4v8",
    tokenId: "VP012",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Tòa nhà văn phông thông minh 30 tầng với công nghệ IoT và hệ thống quản lý tự động.",
    yearBuilt: 2023,
    floors: 30,
    smartBuilding: true,
    elevator: 8,
    parking: 300,
    helipad: true,
    landSize: 2000,
    favorite: false,
  },
  {
    id: 13,
    title: "Organic Farm Estate",
    type: "land",
    location: "Lâm Đồng, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 3500000,
    priceETH: 1.68,
    area: 50000,
    status: "available",
    owner: "0xd3e7f1g5h9i3j7k1l5m9n3o7p1q5r9s3t7u1v5w9",
    tokenId: "VP013",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Trang trại hữu cơ rộng lớn trên cao nguyên Lâm Đồng. Phù hợp trồng rau, hoa và cây ăn quả.",
    soilType: "Đất đỏ bazan",
    irrigation: "Hệ thống tưới nhỏ giọt",
    certification: "Organic certified",
    greenhouse: 10,
    landSize: 50000,
    favorite: false,
  },
  {
    id: 14,
    title: "Luxury Penthouse",
    type: "residential",
    location: "TP.HCM, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 28000000,
    priceETH: 13.42,
    area: 500,
    status: "available",
    owner: "0xe4f8g2h6i0j4k8l2m6n0o4p8q2r6s0t4u8v2w6x0",
    tokenId: "VP014",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Penthouse cao cấp tầng 45 với view toàn cảnh thành phố. Thiết kế nội thất sang trọng, bể bơi riêng.",
    yearBuilt: 2021,
    floor: 45,
    bedrooms: 5,
    bathrooms: 4,
    privatePool: true,
    terrace: 200,
    skyGarden: true,
    landSize: 0,
    favorite: false,
  },
  {
    id: 15,
    title: "Logistics Hub Complex",
    type: "industrial",
    location: "Đồng Nai, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 35000000,
    priceETH: 16.78,
    area: 20000,
    status: "pending",
    owner: "0xf5g9h3i7j1k5l9m3n7o1p5q9r3s7t1u5v9w3x7y1",
    tokenId: "VP015",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Trung tâm logistics hiện đại với hệ thống kho tự động và bãi đậu container. Kết nối trực tiếp với cảng.",
    yearBuilt: 2019,
    automated: true,
    containerYard: true,
    railAccess: true,
    dockDoors: 50,
    offices: 2000,
    landSize: 30000,
    favorite: false,
  },
  {
    id: 16,
    title: "Boutique Hotel & Spa",
    type: "commercial",
    location: "Hội An, Quảng Nam",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 22000000,
    priceETH: 10.54,
    area: 4000,
    status: "available",
    owner: "0xa6b0c4d8e2f6g0h4i8j2k6l0m4n8o2p6q0r4s8t2",
    tokenId: "VP016",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Khách sạn boutique phong cách truyền thống Việt Nam trong lòng phố cổ Hội An. Bao gồm spa và nhà hàng.",
    yearBuilt: 2018,
    rooms: 45,
    floors: 4,
    heritage: true,
    spa: true,
    restaurant: true,
    pool: true,
    landSize: 1500,
    favorite: false,
  },
  {
    id: 17,
    title: "Tech Startup Campus",
    type: "commercial",
    location: "TP.HCM, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    price: 38000000,
    priceETH: 18.21,
    area: 12000,
    status: "available",
    owner: "0xb7c1d5e9f3g7h1i5j9k3l7m1n5o9p3q7r1s5t9u3",
    tokenId: "VP017",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Khu phức hợp công nghệ với coworking spaces, phòng họp hiện đại và khu vực sự kiện. Thiết kế mở, sáng tạo.",
    yearBuilt: 2022,
    floors: 10,
    coworking: true,
    eventHall: 3,
    cafeteria: 2,
    rooftopGarden: true,
    smartTech: true,
    landSize: 3000,
    favorite: false,
  },
  {
    id: 18,
    title: "Waterfront Condo Project",
    type: "residential",
    location: "Đà Nẵng, Việt Nam",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 6800000,
    priceETH: 3.26,
    area: 150,
    status: "available",
    owner: "0xc8d2e6f0g4h8i2j6k0l4m8n2o6p0q4r8s2t6u0v4",
    tokenId: "VP018",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description:
      "Căn hộ mặt sông Hàn với view panoramic tuyệt đẹp. Nội thất cao cấp, balcony rộng rãi.",
    yearBuilt: 2023,
    floor: 8,
    bedrooms: 3,
    bathrooms: 2,
    riverView: true,
    balcony: 30,
    parking: true,
    landSize: 0,
    favorite: false,
  },
];

// Application state
let filteredProperties = [...properties];
let currentView = "grid";
let currentProperty = null;
let filters = {
  search: "",
  type: "all",
  location: "all",
  priceRange: [0, 50000000],
  minArea: "",
  maxArea: "",
  sortBy: "newest",
};

// DOM Elements
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("propertyType");
const locationFilter = document.getElementById("location");
const priceMinRange = document.getElementById("priceMin");
const priceMaxRange = document.getElementById("priceMax");
const priceMinDisplay = document.getElementById("priceMinDisplay");
const priceMaxDisplay = document.getElementById("priceMaxDisplay");
const minAreaInput = document.getElementById("areaMin");
const maxAreaInput = document.getElementById("areaMax");
const sortSelect = document.getElementById("sortBy");
const propertiesGrid = document.getElementById("propertiesGrid");
const propertyModal = document.getElementById("propertyModal");
const purchaseModal = document.getElementById("purchaseModal");
const successModal = document.getElementById("successModal");
const viewBtns = document.querySelectorAll(".view-btn");
const applyFiltersBtn = document.getElementById("applyFilters");
const clearFiltersBtn = document.getElementById("clearFilters");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeFilters();
  renderProperties();
  setupEventListeners();
  updateStats();
});

// Initialize filters and UI
function initializeFilters() {
  // Set initial price range
  if (priceMinRange && priceMaxRange) {
    priceMinRange.min = 0;
    priceMinRange.max = 50000000;
    priceMinRange.value = 0;
    priceMaxRange.min = 0;
    priceMaxRange.max = 50000000;
    priceMaxRange.value = 50000000;
    updatePriceDisplay();
  }

  // Populate location filter
  if (locationFilter) {
    const locations = [...new Set(properties.map((p) => p.location))];
    locations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location.toLowerCase().replace(/[^a-z0-9]/g, "");
      option.textContent = location;
      locationFilter.appendChild(option);
    });
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  // Filter controls
  if (typeFilter) {
    typeFilter.addEventListener("change", handleTypeFilter);
  }
  if (locationFilter) {
    locationFilter.addEventListener("change", handleLocationFilter);
  }
  if (priceMinRange) {
    priceMinRange.addEventListener("input", handlePriceRange);
  }
  if (priceMaxRange) {
    priceMaxRange.addEventListener("input", handlePriceRange);
  }
  if (minAreaInput) {
    minAreaInput.addEventListener("input", handleAreaFilter);
  }
  if (maxAreaInput) {
    maxAreaInput.addEventListener("input", handleAreaFilter);
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", handleSort);
  }

  // Apply and clear filter buttons
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", applyFilters);
  }
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
  }

  // View toggle
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", handleViewToggle);
  });

  // Modal close buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeModals);
  });

  // Modal overlay clicks
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", handleOverlayClick);
  });

  // Purchase modal buttons
  const cancelPurchase = document.getElementById("cancelPurchase");
  const confirmPurchase = document.getElementById("confirmPurchase");
  if (cancelPurchase) {
    cancelPurchase.addEventListener("click", closeModals);
  }
  if (confirmPurchase) {
    confirmPurchase.addEventListener("click", handlePurchase);
  }

  // Success modal buttons
  const viewNFTBtn = document.getElementById("viewTransaction");
  const backToMarket = document.getElementById("closeSuccess");
  if (viewNFTBtn) {
    viewNFTBtn.addEventListener("click", handleViewNFT);
  }
  if (backToMarket) {
    backToMarket.addEventListener("click", closeModals);
  }
}

// Search functionality
function handleSearch(e) {
  filters.search = e.target.value.toLowerCase();
  applyFilters();
}

// Type filter
function handleTypeFilter(e) {
  filters.type = e.target.value;
  applyFilters();
}

// Location filter
function handleLocationFilter(e) {
  filters.location = e.target.value;
  applyFilters();
}

// Price range filter
function handlePriceRange(e) {
  if (priceMinRange && priceMaxRange) {
    const minVal = parseInt(priceMinRange.value);
    const maxVal = parseInt(priceMaxRange.value);

    // Ensure min is not greater than max
    if (minVal > maxVal) {
      if (e.target === priceMinRange) {
        priceMaxRange.value = minVal;
      } else {
        priceMinRange.value = maxVal;
      }
    }

    filters.priceRange[0] = Math.min(minVal, maxVal);
    filters.priceRange[1] = Math.max(minVal, maxVal);
    updatePriceDisplay();
    // Auto apply filters when price changes
    applyFilters();
  }
}

// Area filter
function handleAreaFilter() {
  filters.minArea = minAreaInput.value ? parseInt(minAreaInput.value) : "";
  filters.maxArea = maxAreaInput.value ? parseInt(maxAreaInput.value) : "";
  applyFilters();
}

// Sort functionality
function handleSort(e) {
  filters.sortBy = e.target.value;
  applyFilters();
}

// Clear filters function
function clearFilters() {
  // Reset all filter values
  if (searchInput) searchInput.value = "";
  if (typeFilter) typeFilter.value = "";
  if (locationFilter) locationFilter.value = "";
  if (priceMinRange) priceMinRange.value = 0;
  if (priceMaxRange) priceMaxRange.value = 50000000;
  if (minAreaInput) minAreaInput.value = "";
  if (maxAreaInput) maxAreaInput.value = "";
  if (sortSelect) sortSelect.value = "newest";

  // Reset filter state
  filters = {
    search: "",
    type: "all",
    location: "all",
    priceRange: [0, 50000000],
    minArea: "",
    maxArea: "",
    sortBy: "newest",
  };

  updatePriceDisplay();
  applyFilters();
}

// View toggle
function handleViewToggle(e) {
  currentView = e.target.dataset.view;
  viewBtns.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  if (currentView === "list") {
    propertiesGrid.classList.add("list-view");
  } else {
    propertiesGrid.classList.remove("list-view");
  }
}

// Apply all filters
function applyFilters() {
  console.log("Applying filters:", filters);

  filteredProperties = properties.filter((property) => {
    // Search filter
    if (
      filters.search &&
      !property.title.toLowerCase().includes(filters.search) &&
      !property.location.toLowerCase().includes(filters.search)
    ) {
      return false;
    }

    // Type filter
    if (
      filters.type !== "all" &&
      filters.type &&
      property.type !== filters.type
    ) {
      return false;
    }

    // Location filter
    if (filters.location !== "all" && filters.location) {
      const propertyLocationKey = property.location
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      if (propertyLocationKey !== filters.location) {
        return false;
      }
    }

    // Price filter
    if (
      property.price < filters.priceRange[0] ||
      property.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Area filter
    if (filters.minArea && property.area < filters.minArea) {
      return false;
    }
    if (filters.maxArea && property.area > filters.maxArea) {
      return false;
    }

    return true;
  });

  console.log("Filtered properties:", filteredProperties.length);

  // Apply sorting
  sortProperties();
  renderProperties();
  updateStats();
}

// Sort properties
function sortProperties() {
  switch (filters.sortBy) {
    case "price-low":
      filteredProperties.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProperties.sort((a, b) => b.price - a.price);
      break;
    case "area-small":
      filteredProperties.sort((a, b) => a.area - b.area);
      break;
    case "area-large":
      filteredProperties.sort((a, b) => b.area - a.area);
      break;
    case "newest":
      filteredProperties.sort(
        (a, b) => (b.yearBuilt || 0) - (a.yearBuilt || 0)
      );
      break;
    case "oldest":
      filteredProperties.sort(
        (a, b) => (a.yearBuilt || 0) - (b.yearBuilt || 0)
      );
      break;
    default:
      // No sorting
      break;
  }
}

// Update price display
function updatePriceDisplay() {
  if (priceMinDisplay && priceMaxDisplay && priceMinRange && priceMaxRange) {
    const minValue = parseInt(priceMinRange.value);
    const maxValue = parseInt(priceMaxRange.value);
    priceMinDisplay.textContent = formatPriceShort(minValue);
    priceMaxDisplay.textContent = formatPriceShort(maxValue);
  }
}

// Format price for display (short version)
function formatPriceShort(price) {
  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1) + "B₫";
  } else if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + "M₫";
  } else if (price >= 1000) {
    return (price / 1000).toFixed(0) + "K₫";
  } else {
    return price + "₫";
  }
}

// Render properties grid
function renderProperties() {
  if (filteredProperties.length === 0) {
    propertiesGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Không tìm thấy tài sản</h3>
        <p>Thử thay đổi bộ lọc để xem thêm tài sản khác</p>
      </div>
    `;
    return;
  }

  propertiesGrid.innerHTML = filteredProperties
    .map(
      (property) => `
    <div class="property-card" onclick="showPropertyDetail(${
      property.id
    })" data-id="${property.id}">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <span class="property-status ${property.status}">${getStatusText(
        property.status
      )}</span>
        <button class="property-favorite ${
          property.favorite ? "active" : ""
        }" onclick="toggleFavorite(event, ${property.id})">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      
      <div class="property-content">
        <span class="property-type">${getTypeText(property.type)}</span>
        <h3 class="property-title">${property.title}</h3>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${property.location}</span>
        </div>
        
        <div class="property-details">
          <div class="detail-item">
            <div class="label">Diện tích</div>
            <div class="value">${property.area} m²</div>
          </div>
          <div class="detail-item">
            <div class="label">Token ID</div>
            <div class="value">${property.tokenId}</div>
          </div>
        </div>
        
        <div class="property-price">
          <div>
            <div class="price-main">${formatPrice(property.price)}</div>
            <div class="price-crypto">${property.priceETH} ETH</div>
          </div>
        </div>
        
        <div class="property-actions">
          <button class="btn btn-buy ${
            property.status === "sold" ? "btn-secondary" : "btn-primary"
          }" 
                  onclick="handleBuyClick(event, ${property.id})" 
                  ${property.status === "sold" ? "disabled" : ""}>
            <i class="fas ${
              property.status === "sold" ? "fa-check" : "fa-shopping-cart"
            }"></i>
            ${property.status === "sold" ? "Đã bán" : "Mua ngay"}
          </button>
          <button class="btn btn-view" onclick="showPropertyDetail(${
            property.id
          })">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Show property detail modal
function showPropertyDetail(id) {
  currentProperty = properties.find((p) => p.id === id);
  if (!currentProperty) return;

  const modalBody = propertyModal.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="property-detail-content">
      <div class="detail-image">
        <img src="${currentProperty.image}" alt="${currentProperty.title}">
      </div>
      
      <div class="detail-info">
        <h2>${currentProperty.title}</h2>
        <div class="detail-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${currentProperty.location}</span>
        </div>
        <div class="detail-price">${formatPrice(currentProperty.price)} (${
    currentProperty.priceETH
  } ETH)</div>
        
        <div class="detail-specs">
          <div class="spec-item">
            <div class="label">Diện tích</div>
            <div class="value">${currentProperty.area} m²</div>
          </div>
          <div class="spec-item">
            <div class="label">Trạng thái</div>
            <div class="value">${getStatusText(currentProperty.status)}</div>
          </div>
          ${
            currentProperty.yearBuilt
              ? `
          <div class="spec-item">
            <div class="label">Năm xây</div>
            <div class="value">${currentProperty.yearBuilt}</div>
          </div>
          `
              : ""
          }
          ${
            currentProperty.bedrooms
              ? `
          <div class="spec-item">
            <div class="label">Phòng ngủ</div>
            <div class="value">${currentProperty.bedrooms}</div>
          </div>
          `
              : ""
          }
          ${
            currentProperty.bathrooms
              ? `
          <div class="spec-item">
            <div class="label">Phòng tắm</div>
            <div class="value">${currentProperty.bathrooms}</div>
          </div>
          `
              : ""
          }
          ${
            currentProperty.floors
              ? `
          <div class="spec-item">
            <div class="label">Số tầng</div>
            <div class="value">${currentProperty.floors}</div>
          </div>
          `
              : ""
          }
        </div>
        
        <div class="nft-info">
          <h4><i class="fas fa-certificate"></i> Thông tin NFT</h4>
          <div class="nft-details">
            <div class="nft-row">
              <span class="label">Token ID:</span>
              <span class="value">${currentProperty.tokenId}</span>
            </div>
            <div class="nft-row">
              <span class="label">Contract Address:</span>
              <span class="value">${currentProperty.contractAddress}</span>
            </div>
            <div class="nft-row">
              <span class="label">Owner:</span>
              <span class="value">${currentProperty.owner}</span>
            </div>
            <div class="nft-row">
              <span class="label">Blockchain:</span>
              <span class="value">Ethereum</span>
            </div>
          </div>
        </div>
        
        <p>${currentProperty.description}</p>
        
        <div class="property-actions">
          <button class="btn btn-primary btn-large ${
            currentProperty.status === "sold" ? "btn-secondary" : ""
          }" 
                  onclick="showPurchaseModal(${currentProperty.id})" 
                  ${currentProperty.status === "sold" ? "disabled" : ""}>
            <i class="fas ${
              currentProperty.status === "sold"
                ? "fa-check"
                : "fa-shopping-cart"
            }"></i>
            ${currentProperty.status === "sold" ? "Đã bán" : "Mua NFT này"}
          </button>
          <button class="btn btn-secondary btn-large" onclick="toggleFavorite(event, ${
            currentProperty.id
          })">
            <i class="fas fa-heart ${
              currentProperty.favorite ? "text-red-500" : ""
            }"></i>
            ${currentProperty.favorite ? "Bỏ yêu thích" : "Yêu thích"}
          </button>
        </div>
      </div>
    </div>
  `;

  showModal(propertyModal);
}

// Show purchase modal
function showPurchaseModal(id) {
  if (id) {
    currentProperty = properties.find((p) => p.id === id);
  }

  if (!currentProperty || currentProperty.status === "sold") return;

  const gasPrice = 0.005; // ETH
  const platformFee = currentProperty.price * 0.025; // 2.5%
  const totalPrice = currentProperty.price + platformFee;
  const totalETH = currentProperty.priceETH + gasPrice;

  const modalBody = purchaseModal.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="purchase-summary">
      <div class="property-preview">
        <img src="${currentProperty.image}" alt="${currentProperty.title}">
        <div class="property-info">
          <h4>${currentProperty.title}</h4>
          <p><i class="fas fa-map-marker-alt"></i> ${
            currentProperty.location
          }</p>
          <p><strong>Token ID:</strong> ${currentProperty.tokenId}</p>
        </div>
      </div>
      
      <div class="price-breakdown">
        <div class="price-row">
          <span>Giá tài sản:</span>
          <span>${formatPrice(currentProperty.price)}</span>
        </div>
        <div class="price-row">
          <span>Phí platform (2.5%):</span>
          <span>${formatPrice(platformFee)}</span>
        </div>
        <div class="price-row">
          <span>Gas fee:</span>
          <span>${gasPrice} ETH</span>
        </div>
        <hr style="border-color: var(--border-color); margin: 12px 0;">
        <div class="price-row total">
          <span>Tổng cộng:</span>
          <span>${formatPrice(totalPrice)} (${totalETH.toFixed(3)} ETH)</span>
        </div>
      </div>
      
      <div class="wallet-balance">
        <i class="fas fa-wallet"></i>
        <div>Số dư ví: 5.24 ETH</div>
        <small>Đủ để thực hiện giao dịch</small>
      </div>
      
      <div class="purchase-actions">
        <button class="btn btn-secondary" id="cancelPurchase">
          <i class="fas fa-times"></i>
          Hủy
        </button>
        <button class="btn btn-primary" id="confirmPurchase">
          <i class="fas fa-credit-card"></i>
          Xác nhận mua
        </button>
      </div>
    </div>
  `;

  // Re-attach event listeners
  document
    .getElementById("cancelPurchase")
    .addEventListener("click", closeModals);
  document
    .getElementById("confirmPurchase")
    .addEventListener("click", handlePurchase);

  hideModal(propertyModal);
  showModal(purchaseModal);
}

// Handle purchase confirmation
function handlePurchase() {
  if (!currentProperty) return;

  // Show loading state
  const confirmBtn = document.getElementById("confirmPurchase");
  const originalHTML = confirmBtn.innerHTML;
  confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
  confirmBtn.disabled = true;

  // Simulate transaction processing
  setTimeout(() => {
    // Update property status
    currentProperty.status = "sold";

    // Update the properties array
    const propertyIndex = properties.findIndex(
      (p) => p.id === currentProperty.id
    );
    if (propertyIndex !== -1) {
      properties[propertyIndex] = currentProperty;
    }

    // Show success modal
    hideModal(purchaseModal);
    showSuccessModal();

    // Re-render properties to reflect changes
    applyFilters();

    // Reset button
    confirmBtn.innerHTML = originalHTML;
    confirmBtn.disabled = false;
  }, 2000);
}

// Show success modal
function showSuccessModal() {
  const modalBody = successModal.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="success-icon">
      <i class="fas fa-check-circle"></i>
    </div>
    <h3>Giao dịch thành công!</h3>
    <p>Chúc mừng! Bạn đã sở hữu thành công NFT <strong>${
      currentProperty.tokenId
    }</strong> - ${currentProperty.title}. 
    NFT đã được chuyển vào ví của bạn.</p>
    
    <div class="nft-info">
      <div class="nft-row">
        <span class="label">Transaction Hash:</span>
        <span class="value">0x${Math.random().toString(16).substr(2, 64)}</span>
      </div>
      <div class="nft-row">
        <span class="label">Block Number:</span>
        <span class="value">${
          Math.floor(Math.random() * 1000000) + 18000000
        }</span>
      </div>
    </div>
    
    <div class="success-actions">
      <button class="btn btn-primary" id="viewNFT">
        <i class="fas fa-eye"></i>
        Xem NFT
      </button>
      <button class="btn btn-secondary" id="backToMarket">
        <i class="fas fa-arrow-left"></i>
        Quay lại
      </button>
    </div>
  `;

  // Re-attach event listeners
  document.getElementById("viewNFT").addEventListener("click", handleViewNFT);
  document
    .getElementById("backToMarket")
    .addEventListener("click", closeModals);

  showModal(successModal);
}

// Handle view NFT
function handleViewNFT() {
  closeModals();
  // In a real app, this would navigate to the user's NFT collection
  showNotification("Đang chuyển đến bộ sưu tập NFT của bạn...", "info");
}

// Toggle favorite
function toggleFavorite(event, id) {
  event.stopPropagation();
  const property = properties.find((p) => p.id === id);
  if (property) {
    property.favorite = !property.favorite;
    renderProperties();
    showNotification(
      property.favorite ? "Đã thêm vào yêu thích" : "Đã bỏ khỏi yêu thích",
      "success"
    );
  }
}

// Handle buy button click
function handleBuyClick(event, id) {
  event.stopPropagation();
  if (event.target.disabled) return;
  showPurchaseModal(id);
}

// Modal functions
function showModal(modal) {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideModal(modal) {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

function closeModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    hideModal(modal);
  });
}

function handleOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModals();
  }
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function getTypeText(type) {
  const types = {
    residential: "Nhà ở",
    commercial: "Thương mại",
    industrial: "Công nghiệp",
    land: "Đất nền",
  };
  return types[type] || type;
}

function getStatusText(status) {
  const statuses = {
    available: "Có sẵn",
    sold: "Đã bán",
    pending: "Đang giao dịch",
  };
  return statuses[status] || status;
}

function updateStats() {
  const totalProperties = properties.length;
  const availableProperties = properties.filter(
    (p) => p.status === "available"
  ).length;
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalValue / totalProperties;

  // Update stats in hero section
  const stats = document.querySelectorAll(".stat-item h3");
  if (stats.length >= 3) {
    stats[0].textContent = totalProperties;
    stats[1].textContent = availableProperties;
    stats[2].textContent = formatPrice(avgPrice).replace("₫", "").trim() + "₫";
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas ${
      type === "success"
        ? "fa-check-circle"
        : type === "error"
        ? "fa-exclamation-circle"
        : "fa-info-circle"
    }"></i>
    <span>${message}</span>
  `;

  // Add notification styles if not exist
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-color);
        padding: 16px 20px;
        border-radius: var(--border-radius-sm);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
      }
      .notification-success { border-left: 4px solid var(--success-color); }
      .notification-error { border-left: 4px solid var(--danger-color); }
      .notification-info { border-left: 4px solid var(--accent-color); }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // ESC to close modals
  if (e.key === "Escape") {
    closeModals();
  }

  // Ctrl/Cmd + F to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "f") {
    e.preventDefault();
    searchInput.focus();
  }
});
