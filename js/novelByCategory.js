// Novel by Category functionality
const categoryContainer = document.querySelector(".novels-grid");
const filterStatus = document.getElementById("filter-status");
const filterSort = document.getElementById("filter-sort");
const filterViews = document.getElementById("filter-views");
const resetFiltersBtn = document.getElementById("reset-filters");
const paginationBtns = document.querySelectorAll(".pagination-btn");
const currentPageSpan = document.getElementById("current-page");
const totalPagesSpan = document.getElementById("total-pages");

// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category") || "tienihiep";

// Dummy data for novels by category
const categoryNovels = {
  tienihiep: [
    {
      id: 1,
      title: "Ngự Đạo Khuynh Thiên",
      author: "Ngã Thực Cật Tây Hồng Thị",
      category: "Tiên Hiệp",
      status: "ongoing",
      rating: 4.8,
      views: 2300000,
      comments: 15200,
      description:
        "Một tác phẩm tiên hiệp hấp dẫn đầy kỳ trưởng, tu luyện bí ẩn và những cuộc chiến pháp thuật. Theo dõi hành trình trở thành kỳ nhân của nhân vật chính...",
      tags: ["Tiên Hiệp", "Đang Tiến Hành", "Trending"],
    },
    {
      id: 6,
      title: "Vạn Cổ Thần Đế",
      author: "Phi Thiên Cá",
      category: "Tiên Hiệp",
      status: "completed",
      rating: 4.9,
      views: 3200000,
      comments: 18700,
      description:
        "Kinh điển tiên hiệp toàn từ của một thế hệ. Với những bí kíp võ công tối thượng và những vị thần thoại, câu chuyện này sẽ chinh phục bạn...",
      tags: ["Tiên Hiệp", "Hoàn Thành", "Kinh Điển"],
    },
    {
      id: 7,
      title: "Kiếm Đạo Đệ Nhất Tiên",
      author: "Tiêu Cẩn Du",
      category: "Tiên Hiệp",
      status: "completed",
      rating: 4.8,
      views: 2700000,
      comments: 16100,
      description:
        "Một tác phẩm tiên hiệp với tâm điểm là con đường chứng thành thánh của một kiếm khách. Võ công tinh diệu và đế vương thế giới...",
      tags: ["Tiên Hiệp", "Hoàn Thành"],
    },
    {
      id: 8,
      title: "Tâm Nhân Hợp Nhất",
      author: "Ty Sơn Phi Thiên",
      category: "Tiên Hiệp",
      status: "ongoing",
      rating: 4.7,
      views: 2100000,
      comments: 14500,
      description:
        "Tiên hiệp hiện đại với yếu tố lãng mạn. Câu chuyện tình yêu giữa hai kỳ nhân trong thế giới tu luyện...",
      tags: ["Tiên Hiệp", "Đang Tiến Hành"],
    },
    {
      id: 9,
      title: "Đạo Pháp Vô Cùng",
      author: "Vô Cực Danh Sư",
      category: "Tiên Hiệp",
      status: "completed",
      rating: 4.6,
      views: 1980000,
      comments: 13200,
      description:
        "Một hành trình tu luyện đầy thách thức và bí ẩn. Tìm kiếm con đường đạo pháp tối thượng...",
      tags: ["Tiên Hiệp", "Hoàn Thành"],
    },
    {
      id: 10,
      title: "Thần Yêu Phế Vật",
      author: "Hoa Ca Ngoại Sử",
      category: "Tiên Hiệp",
      status: "ongoing",
      rating: 4.5,
      views: 1750000,
      comments: 11800,
      description:
        "Từ một vật phế vô dụng, trở thành thần được mọi người kính sợ. Câu chuyện về sự trỗi dậy...",
      tags: ["Tiên Hiệp", "Đang Tiến Hành"],
    },
    {
      id: 11,
      title: "Bảo Kiếm Phong Thần",
      author: "Kim Lão Pháp Thần",
      category: "Tiên Hiệp",
      status: "completed",
      rating: 4.8,
      views: 2450000,
      comments: 16900,
      description: "Một thanh kiếm bảo bối mang theo sứ mệnh phong thần...",
      tags: ["Tiên Hiệp", "Hoàn Thành"],
    },
    {
      id: 12,
      title: "Tiên Hạ Nhân Gian",
      author: "Phàm Tục Họa Sĩ",
      category: "Tiên Hiệp",
      status: "ongoing",
      rating: 4.4,
      views: 1620000,
      comments: 10500,
      description: "Tiên hiệp hiện đại, giai đoạn hậu thiên cổ...",
      tags: ["Tiên Hiệp", "Đang Tiến Hành"],
    },
  ],
  huyenhuyenz: [
    {
      id: 2,
      title: "Quang Âm Chi Ngoại",
      author: "Nhĩ Căn",
      category: "Huyền Huyễn",
      status: "completed",
      rating: 4.6,
      views: 1800000,
      comments: 12500,
      description:
        "Một bộ truyện huyền huyễn cổ điển với đặc sắc riêng. Câu chuyện xoay quanh những bí mật ẩn giấu...",
      tags: ["Huyền Huyễn", "Hoàn Thành"],
    },
  ],
  vongdu: [
    {
      id: 3,
      title: "Đại Phụng Đả Canh Nhân",
      author: "Mại Báo Tiểu Lang Quân",
      category: "Võng Du",
      status: "ongoing",
      rating: 4.5,
      views: 1500000,
      comments: 10800,
      description: "Câu chuyện về những chiến binh dũng cảm và danh dự...",
      tags: ["Võng Du", "Đang Tiến Hành"],
    },
  ],
  linhdi: [
    {
      id: 4,
      title: "Quỷ Bí Chi Chủ",
      author: "Ái Tiềm Thủy Đích Ô Tặc",
      category: "Linh Dị",
      status: "completed",
      rating: 4.7,
      views: 2100000,
      comments: 14300,
      description: "Một câu chuyện bí ẩn lôi cuốn về thế giới quỷ quái...",
      tags: ["Linh Dị", "Hoàn Thành"],
    },
  ],
  dothi: [
    {
      id: 5,
      title: "Ta Là Thần Hào",
      author: "Vô Danh",
      category: "Đô Thị",
      status: "ongoing",
      rating: 4.4,
      views: 1900000,
      comments: 13100,
      description:
        "Một tác phẩm đô thị hiện đại với những tình tiết gay cấn...",
      tags: ["Đô Thị", "Đang Tiến Hành"],
    },
  ],
};

const categoryTitles = {
  tienihiep: {
    title: "Tiên Hiệp",
    description:
      "Khám phá những tác phẩm tiên hiệp kỳ ảo, những câu chuyện về tu luyện và những bí kíp võ công tối thượng",
  },
  huyenhuyenz: {
    title: "Huyền Huyễn",
    description:
      "Những câu chuyện huyền bí, kỳ bí với những nước ngoài thực tế và những nhân vật đặc biệt",
  },
  vongdu: {
    title: "Võng Du",
    description:
      "Những tác phẩm về những hành trình kỳ ảo, những cuộc phiêu lưu đầy rồi rỉ",
  },
  linhdi: {
    title: "Linh Dị",
    description:
      "Những câu chuyện về linh dị, quỷ quái với những khía cạnh bí ẩn không thể giải thích",
  },
  dothi: {
    title: "Đô Thị",
    description:
      "Những tác phẩm đô thị hiện đại, những câu chuyện về con người thành phố",
  },
};

let currentPage = 1;
const itemsPerPage = 6;
let filteredNovels = [];

// Initialize
function init() {
  const categoryData = categoryTitles[categoryParam];
  if (categoryData) {
    document.getElementById("category-title").textContent = categoryData.title;
    document.getElementById("category-description").textContent =
      categoryData.description;
  }

  filteredNovels = [...(categoryNovels[categoryParam] || [])];
  applyFilters();
}

// Render novels
function renderNovels() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredNovels.slice(startIndex, endIndex);

  categoryContainer.innerHTML = paginated
    .map(
      (novel) => `
    <div class="novel-card-large" onclick="goToDetail(${novel.id})">
      <div class="novel-cover-large" style="background-color: ${getRandomGradient()}">${novel.id}</div>
      <div class="novel-info-large">
        <h3 class="novel-title">${novel.title}</h3>
        <p class="novel-author">${novel.author}</p>
        <p class="novel-description">${novel.description}</p>
        <div class="novel-stats">
          <span class="stat">⭐ ${novel.rating}</span>
          <span class="stat">👁 ${(novel.views / 1000000).toFixed(1)}M lượt xem</span>
          <span class="stat">💬 ${(novel.comments / 1000).toFixed(1)}K bình luận</span>
        </div>
        <div class="novel-meta-tags">
          ${novel.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <button class="btn-read-novel">Đọc Truyện</button>
      </div>
    </div>
  `,
    )
    .join("");

  updatePagination();
}

// Get random gradient color
function getRandomGradient() {
  const gradients = [
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
  totalPagesSpan.textContent = totalPages || 1;
  currentPageSpan.textContent = currentPage;

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= totalPages;
}

// Apply filters
function applyFilters() {
  let status = filterStatus.value;
  let sort = filterSort.value;
  let views = filterViews.value;

  let filtered = categoryNovels[categoryParam] || [];

  // Filter by status
  if (status) {
    filtered = filtered.filter((novel) => novel.status === status);
  }

  // Filter by views
  if (views === "trending") {
    filtered = filtered.filter((novel) => novel.views > 2000000);
  } else if (views === "new") {
    filtered = filtered.filter((novel) => novel.id > 10);
  } else if (views === "hottest") {
    filtered = filtered.filter((novel) => novel.rating >= 4.7);
  }

  // Apply sorting
  if (sort === "popular") {
    filtered.sort((a, b) => b.views - a.views);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "updated") {
    filtered.sort((a, b) => b.id - a.id);
  } else if (sort === "views") {
    filtered.sort((a, b) => b.views - a.views);
  } else {
    filtered.sort((a, b) => b.id - a.id); // Latest
  }

  filteredNovels = filtered;
  currentPage = 1;

  // Update stats
  const allNovels = categoryNovels[categoryParam] || [];
  document.getElementById("total-novels").textContent =
    allNovels.length.toLocaleString();
  document.getElementById("completed-novels").textContent = allNovels
    .filter((n) => n.status === "completed")
    .length.toLocaleString();
  document.getElementById("ongoing-novels").textContent = allNovels
    .filter((n) => n.status === "ongoing")
    .length.toLocaleString();

  renderNovels();
}

// Event listeners
filterStatus.addEventListener("change", applyFilters);
filterSort.addEventListener("change", applyFilters);
filterViews.addEventListener("change", applyFilters);

resetFiltersBtn.addEventListener("click", () => {
  filterStatus.value = "";
  filterSort.value = "latest";
  filterViews.value = "";
  applyFilters();
});

// Pagination
document.querySelector(".prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderNovels();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.querySelector(".next-btn").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderNovels();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Login/Signup buttons
document.querySelector(".btn-login").addEventListener("click", () => {
  window.location.href = "login.html";
});

document.querySelector(".btn-signup").addEventListener("click", () => {
  window.location.href = "register.html";
});

// Search button
document.querySelector(".search-bar button").addEventListener("click", () => {
  const query = document.querySelector(".search-bar input").value;
  if (query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
});

// Go to detail page
function goToDetail(novelId) {
  window.location.href = `detail.html?id=${novelId}`;
}

// Initial load
init();
