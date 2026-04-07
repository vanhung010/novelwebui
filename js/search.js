// Search functionality
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchQuery = document.getElementById("search-query");
const resultsCount = document.getElementById("results-count");
const resultsContainer = document.getElementById("results-container");
const noResults = document.getElementById("no-results");
const filterCategory = document.getElementById("filter-category");
const filterStatus = document.getElementById("filter-status");
const filterSort = document.getElementById("filter-sort");
const resetFiltersBtn = document.getElementById("reset-filters");
const paginationBtns = document.querySelectorAll(".pagination-btn");
const currentPageSpan = document.getElementById("current-page");
const totalPagesSpan = document.getElementById("total-pages");

// Dummy data for novels
const allNovels = [
  {
    id: 1,
    title: "Ngự Đạo Khuynh Thiên",
    author: "Ngã Thực Cật Tây Hồng Thị",
    category: "tienihiep",
    status: "ongoing",
    rating: 4.8,
    views: 2300000,
    description: "Một tác phẩm tiên hiệp hấp dẫn đầy kỳ trưởng và bí ẩn...",
  },
  {
    id: 2,
    title: "Quang Âm Chi Ngoại",
    author: "Nhĩ Căn",
    category: "huyenhuyenz",
    status: "completed",
    rating: 4.6,
    views: 1800000,
    description: "Một bộ truyện huyền huyễn đầy kịch tính và những bất ngờ...",
  },
  {
    id: 3,
    title: "Đại Phụng Đả Canh Nhân",
    author: "Mại Báo Tiểu Lang Quân",
    category: "vongdu",
    status: "ongoing",
    rating: 4.5,
    views: 1500000,
    description: "Câu chuyện về những chiến binh dũng cảm và danh dự...",
  },
  {
    id: 4,
    title: "Quỷ Bí Chi Chủ",
    author: "Ái Tiềm Thủy Đích Ô Tặc",
    category: "linhdi",
    status: "completed",
    rating: 4.7,
    views: 2100000,
    description: "Một câu chuyện bí ẩn lôi cuốn về thế giới quỷ quái...",
  },
  {
    id: 5,
    title: "Ta Là Thần Hào",
    author: "Vô Danh",
    category: "dothi",
    status: "ongoing",
    rating: 4.4,
    views: 1900000,
    description: "Một tác phẩm đô thị hiện đại với những tình tiết gay cấn...",
  },
  {
    id: 6,
    title: "Vạn Cổ Thần Đế",
    author: "Phi Thiên Cá",
    category: "tienihiep",
    status: "completed",
    rating: 4.9,
    views: 3200000,
    description:
      "Kinh điển tiên hiệp toàn từ với những bí kíp võ công tối thượng...",
  },
];

let currentPage = 1;
const itemsPerPage = 6;
let filteredNovels = [...allNovels];

// Get category display name
function getCategoryName(categoryId) {
  const categories = {
    tienihiep: "Tiên Hiệp",
    huyenhuyenz: "Huyền Huyễn",
    vongdu: "Võng Du",
    dothi: "Đô Thị",
    khohuyenz: "Khoa Huyễn",
    linhdi: "Linh Dị",
    ngontinh: "Ngôn Tình",
    quantruong: "Quan Trường",
  };
  return categories[categoryId] || categoryId;
}

// Get status display name
function getStatusName(status) {
  return status === "completed" ? "Hoàn Thành" : "Đang Tiến Hành";
}

// Render novels
function renderNovels() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredNovels.slice(startIndex, endIndex);

  if (paginated.length === 0) {
    resultsContainer.style.display = "none";
    noResults.style.display = "block";
    updatePagination();
    return;
  }

  resultsContainer.style.display = "grid";
  noResults.style.display = "none";

  resultsContainer.innerHTML = paginated
    .map(
      (novel) => `
    <div class="novel-card" onclick="goToDetail(${novel.id})">
      <div class="novel-cover" style="background-color: #cbd5e1">${novel.id}</div>
      <div class="novel-info">
        <h3 class="novel-title">${novel.title}</h3>
        <p class="novel-author">${novel.author}</p>
        <p class="novel-description">${novel.description}</p>
        <div class="novel-meta">
          <span class="novel-category">${getCategoryName(novel.category)}</span>
          <span class="novel-status">${getStatusName(novel.status)}</span>
          <span class="novel-rating">⭐ ${novel.rating}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  updateCount();
  updatePagination();
}

// Update results count
function updateCount() {
  const count = filteredNovels.length;
  document.getElementById("count").textContent = count;
  resultsCount.textContent = `Tìm thấy ${count} kết quả`;
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

// Filter novels
function applyFilters() {
  let category = filterCategory.value;
  let status = filterStatus.value;
  let sort = filterSort.value;

  filteredNovels = allNovels.filter((novel) => {
    const categoryMatch = !category || novel.category === category;
    const statusMatch = !status || novel.status === status;
    return categoryMatch && statusMatch;
  });

  // Apply sorting
  if (sort === "latest") {
    filteredNovels.sort((a, b) => b.id - a.id);
  } else if (sort === "popular") {
    filteredNovels.sort((a, b) => b.views - a.views);
  } else if (sort === "rating") {
    filteredNovels.sort((a, b) => b.rating - a.rating);
  }

  currentPage = 1;
  renderNovels();
}

// Search functionality
function performSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    searchQuery.textContent = "";
    filteredNovels = [...allNovels];
  } else {
    searchQuery.textContent = `"${searchInput.value}"`;
    filteredNovels = allNovels.filter(
      (novel) =>
        novel.title.toLowerCase().includes(query) ||
        novel.author.toLowerCase().includes(query) ||
        novel.description.toLowerCase().includes(query),
    );
  }

  currentPage = 1;
  applyFilters();
}

// Event listeners
searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performSearch();
});

filterCategory.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);
filterSort.addEventListener("change", applyFilters);

resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterCategory.value = "";
  filterStatus.value = "";
  filterSort.value = "relevance";
  searchQuery.textContent = "";
  filteredNovels = [...allNovels];
  currentPage = 1;
  renderNovels();
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

// Go to detail page
function goToDetail(novelId) {
  window.location.href = `detail.html?id=${novelId}`;
}

// Initial render
renderNovels();
