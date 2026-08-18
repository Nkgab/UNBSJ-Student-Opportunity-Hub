const opportunities = [
  {
    title: "Promise Partnership",
    organization: "Promise Partnership",
    category: "Volunteer",
    location: "Saint John",
    type: "Mentoring",
    description: "Mentor school students and contribute to youth development.",
    link: "https://www.instagram.com/promisepartnership/"
  },
  {
    title: "Swim with a Mission",
    organization: "Swim with a Mission",
    category: "Volunteer",
    location: "Saint John",
    type: "Youth & Water Safety",
    description: "Help teach young people water safety and swimming skills.",
    link: "https://www.instagram.com/swam.saintjohn/"
  },
  {
    title: "Saint John Newcomers",
    organization: "Saint John Newcomers Centre",
    category: "Volunteer",
    location: "Saint John",
    type: "Community",
    description: "Support newcomers and contribute to community inclusion.",
    link: "https://www.instagram.com/sjnewcomerscentre/"
  },
  {
    title: "PRUDE Inc.",
    organization: "PRUDE Inc.",
    category: "Volunteer",
    location: "Saint John",
    type: "Community & DEI",
    description: "Get involved with diversity, equity and inclusion initiatives.",
    link: "https://prudeinc.org/"
  },
  {
    title: "Sexual Violence New Brunswick",
    organization: "SVNB",
    category: "Volunteer",
    location: "New Brunswick",
    type: "Community Support",
    description: "Explore volunteer opportunities and training with SVNB.",
    link: "https://svnb.ca/en/volunteer/"
  },
  {
    title: "Horizon Health Network",
    organization: "Horizon Health Network",
    category: "Volunteer",
    location: "New Brunswick",
    type: "Healthcare",
    description: "Healthcare volunteering opportunities in New Brunswick. Best for students interested in healthcare.",
    link: "https://careers.horizonnb.ca/en/volunteering/"
  },
  {
    title: "Social Pediatrics NB",
    organization: "Social Pediatrics NB",
    category: "Volunteer",
    location: "New Brunswick",
    type: "Healthcare & Community",
    description: "Explore opportunities to support children, youth and community health.",
    link: "https://www.nbsocialpediatrics.com/"
  },
  {
    title: "UNB Community Volunteering Club",
    organization: "UNB Saint John",
    category: "Volunteer",
    location: "Saint John",
    type: "Fundraising & Community",
    description: "Fundraising and community support opportunities through the student club.",
    link: "https://www.instagram.com/volunteeringunbsj/"
  },
  {
    title: "Saint John Cares",
    organization: "Saint John Cares Inc.",
    category: "Volunteer",
    location: "Saint John",
    type: "Community",
    description: "Find ways to help others and get involved in the local community.",
    link: "https://www.stjohnscares.org/ways-to-help-others.html"
  },
  {
    title: "Volunteer Success",
    organization: "Volunteer Search Engine",
    category: "Volunteer",
    location: "Online",
    type: "Search Tool",
    description: "Search for volunteer opportunities using a volunteer opportunity platform.",
    link: "https://volunteersuccess.com/"
  },
  {
    title: "Greater Saint John Volunteer Connector",
    organization: "Greater Saint John Volunteer Connector",
    category: "Volunteer",
    location: "Saint John",
    type: "Search Tool",
    description: "Find volunteer opportunities across Greater Saint John.",
    link: "https://gsjvolunteer.ca/"
  },
  {
    title: "Be There Certificate",
    organization: "Be There Certificate",
    category: "Certificates",
    location: "Online",
    type: "Certificate",
    description: "A certificate option focused on building skills for supporting others.",
    link: "https://betherecertificate.org/"
  },
  {
    title: "Seeds of Change",
    organization: "Sexual Violence New Brunswick",
    category: "Certificates",
    location: "New Brunswick",
    type: "Training",
    description: "Bystander training. The source document notes discounted or free options for UNB students.",
    link: "https://svnb.ca/"
  },
  {
    title: "DEI Training",
    organization: "PRUDE Inc.",
    category: "Certificates",
    location: "Saint John",
    type: "Training",
    description: "Explore diversity, equity and inclusion training opportunities.",
    link: "https://prudeinc.org/"
  },
  {
    title: "Courses & Learning",
    organization: "Add your curated courses here",
    category: "Courses",
    location: "Online",
    type: "Learning",
    description: "Add online and local courses, learning platforms and experiences as you curate them.",
    link: "https://www.coursera.org/"
  },
  {
    title: "Jobs & Internships",
    organization: "Add curated student opportunities here",
    category: "Jobs",
    location: "Canada",
    type: "Career",
    description: "Use this section for student jobs, internships and work opportunities.",
    link: "https://www.unb.ca/"
  },
  {
    title: "Scholarships & Awards",
    organization: "Add curated funding opportunities here",
    category: "Scholarships",
    location: "Canada",
    type: "Funding",
    description: "Use this section for scholarships, awards and funding opportunities.",
    link: "https://www.unb.ca/"
  },
  {
    title: "Leadership & Campus Opportunities",
    organization: "UNB Saint John",
    category: "Leadership",
    location: "Saint John",
    type: "Leadership",
    description: "Add campus leadership roles, student societies and other ways to get involved.",
    link: "https://www.unb.ca/saintjohn/"
  },
  {
    title: "Career & Academic Resources",
    organization: "UNB",
    category: "Career",
    location: "Saint John",
    type: "Resource",
    description: "Add resume, LinkedIn, academic, career and professional development resources.",
    link: "https://www.unb.ca/"
  }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const location = document.getElementById("location");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

const icons = {
  Volunteer: "🤝",
  Certificates: "📜",
  Courses: "🎓",
  Jobs: "💼",
  Scholarships: "🏆",
  Leadership: "🌱",
  Career: "📚"
};

const categories = [...new Set(opportunities.map(o => o.category))].sort();
const locations = [...new Set(opportunities.map(o => o.location))].sort();

categories.forEach(c => category.add(new Option(c, c)));
locations.forEach(l => location.add(new Option(l, l)));

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    category.value = button.dataset.category;
    render();
    window.scrollTo({ top: document.querySelector(".opportunity-header").offsetTop - 25, behavior: "smooth" });
  });
});

function render() {
  const term = search.value.trim().toLowerCase();
  const selectedCategory = category.value;
  const selectedLocation = location.value;

  const results = opportunities.filter(o => {
    const searchable = `${o.title} ${o.organization} ${o.category} ${o.location} ${o.type} ${o.description}`.toLowerCase();
    return (!term || searchable.includes(term))
      && (selectedCategory === "All" || o.category === selectedCategory)
      && (selectedLocation === "All" || o.location === selectedLocation);
  });

  grid.innerHTML = "";

  results.forEach(o => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <span class="tag">${icons[o.category] || "⭐"} ${escapeHtml(o.category)}</span>
      <h3>${escapeHtml(o.title)}</h3>
      <div class="org">${escapeHtml(o.organization)}</div>
      <p>${escapeHtml(o.description)}</p>
      <div class="meta">
        <span>📍 ${escapeHtml(o.location)}</span>
        <span>✦ ${escapeHtml(o.type)}</span>
      </div>
      <a class="apply" href="${o.link}" target="_blank" rel="noopener">Apply / Learn More →</a>
    `;
    grid.appendChild(card);
  });

  count.textContent = `${results.length} ${results.length === 1 ? "opportunity" : "opportunities"}`;
  empty.style.display = results.length ? "none" : "block";
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
category.addEventListener("change", render);
location.addEventListener("change", render);

render();
