const opportunities = [
  {
    title: "Promise Partnership",
    organization: "Community volunteering",
    category: "Volunteer",
    location: "Saint John",
    type: "Flexible",
    description: "Add a short description of the organization, what volunteers do, and why it may be useful for students.",
    link: "https://example.com"
  },
  {
    title: "UNB Research Opportunities",
    organization: "UNB Saint John",
    category: "Research",
    location: "Saint John",
    type: "Student",
    description: "Use this space for research assistant positions, faculty opportunities, summer research programs, or ways to approach professors.",
    link: "https://www.unb.ca/"
  },
  {
    title: "UNB Work-Study",
    organization: "University of New Brunswick",
    category: "Jobs",
    location: "Saint John",
    type: "Campus",
    description: "Campus employment and work-study information for eligible students.",
    link: "https://www.unb.ca/"
  },
  {
    title: "Scholarship Search",
    organization: "Student funding",
    category: "Scholarship",
    location: "Canada",
    type: "Funding",
    description: "Add scholarship details here, including eligibility, deadline, award amount, and application instructions.",
    link: "https://www.unb.ca/"
  },
  {
    title: "Free Online Certificates",
    organization: "Learning",
    category: "Courses",
    location: "Online",
    type: "Flexible",
    description: "Collect useful courses and certificates that students can complete alongside their studies.",
    link: "https://www.coursera.org/"
  },
  {
    title: "Career Development",
    organization: "UNB Career Development",
    category: "Career",
    location: "Saint John",
    type: "Career",
    description: "Resume help, LinkedIn support, career advising, workshops and employment resources.",
    link: "https://www.unb.ca/career/"
  }
];

const icons = {
  Volunteer: "🤝",
  Research: "🔬",
  Jobs: "💼",
  Scholarship: "🎓",
  Courses: "📚",
  Career: "🌱"
};

const grid = document.getElementById("opportunityGrid");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const categories = document.getElementById("categories");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

const categoryList = [...new Set(opportunities.map(o => o.category))].sort();
const locationList = [...new Set(opportunities.map(o => o.location))].sort();

categoryList.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

locationList.forEach(location => {
  const option = document.createElement("option");
  option.value = location;
  option.textContent = location;
  locationFilter.appendChild(option);
});

const allButton = document.createElement("button");
allButton.className = "category active";
allButton.innerHTML = `<span class="icon">✨</span><span>All</span>`;
allButton.onclick = () => {
  categoryFilter.value = "All";
  render();
  setActiveCategory(allButton);
};
categories.appendChild(allButton);

categoryList.forEach(category => {
  const button = document.createElement("button");
  button.className = "category";
  button.innerHTML = `<span class="icon">${icons[category] || "⭐"}</span><span>${category}</span>`;
  button.onclick = () => {
    categoryFilter.value = category;
    render();
    setActiveCategory(button);
  };
  categories.appendChild(button);
});

function setActiveCategory(active) {
  document.querySelectorAll(".category").forEach(btn => btn.classList.remove("active"));
  active.classList.add("active");
}

function render() {
  const term = search.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedLocation = locationFilter.value;

  const filtered = opportunities.filter(item => {
    const matchesSearch =
      !term ||
      `${item.title} ${item.organization} ${item.category} ${item.location} ${item.description}`
        .toLowerCase()
        .includes(term);

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesLocation =
      selectedLocation === "All" || item.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  grid.innerHTML = "";

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <span class="tag">${icons[item.category] || "⭐"} ${item.category}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <div class="org">${escapeHtml(item.organization)}</div>
      <p>${escapeHtml(item.description)}</p>
      <div class="meta">
        <span>📍 ${escapeHtml(item.location)}</span>
        <span>⏱ ${escapeHtml(item.type)}</span>
      </div>
      <a class="apply" href="${item.link}" target="_blank" rel="noopener">
        View opportunity →
      </a>
    `;

    grid.appendChild(card);
  });

  count.textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"}`;
  empty.style.display = filtered.length ? "none" : "block";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

search.addEventListener("input", render);

categoryFilter.addEventListener("change", () => {
  const active = [...document.querySelectorAll(".category")]
    .find(btn => btn.textContent.toLowerCase().includes(categoryFilter.value.toLowerCase()));
  if (categoryFilter.value === "All") {
    setActiveCategory(allButton);
  } else if (active) {
    setActiveCategory(active);
  }
  render();
});

locationFilter.addEventListener("change", render);

render();
