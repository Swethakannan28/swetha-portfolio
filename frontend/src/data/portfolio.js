// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Everything below comes from
// Swetha_Kannan_Portfolio_Content.pdf — nothing has been invented.
// The phone number is intentionally NOT included anywhere.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Swetha Kannan",
  firstName: "SWETHA",
  lastName: "KANNAN",
  roles: ["Full Stack Developer"],
  tagline: "Turning ideas into responsive, functional, and user-friendly web applications.",
  intro:
    "Computer Science and Engineering graduate skilled in React.js, Node.js, Express.js and MongoDB. Seeking an entry-level Software Developer or Full Stack Developer role.",
  email: "swethakannan.try@gmail.com",
  linkedin: "https://www.linkedin.com/in/swetha-kannan-333053258",
  linkedinLabel: "linkedin.com/in/swetha-kannan-333053258",
  location: "Tiruchirappalli, Tamil Nadu",
  timezone: "Asia/Kolkata",
  // Replace frontend/public/Swetha_Kannan_Resume.pdf with your real resume.
  resume: "/Swetha_Kannan_Resume.pdf",
  // PLACEHOLDER: add your GitHub profile URL here (it was not in your details file).
  github: "https://github.com/Swethakannan28",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const about = {
  statement:
    "I build responsive, functional and user-friendly web applications — from the React interface to the REST API and the database behind it.",
  body: [
    "I graduated from SRM TRP Engineering College in May 2026. Through internships and practical projects I have worked with REST APIs, JWT authentication, CRUD operations and responsive UI development.",
    "Alongside code I enjoy visual work — video editing in Adobe Premiere Pro, image editing in Photoshop, and UI design in Figma and Canva.",
  ],
  open:
    "Open to entry-level software development opportunities, professional collaborations and freelance projects in website development and video editing.",
  facts: [
    { value: 2, label: "Internships" },
    { value: 2, label: "Featured projects" },
    { value: 4, label: "Trainings & workshops" },
    { value: 2, label: "Languages spoken" },
  ],
  languages: ["English", "Tamil"],
};

export const skills = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Redux"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { group: "Database", items: ["MongoDB"] },
  { group: "Developer Tools", items: ["Git", "GitHub", "Postman"] },
  {
    group: "Creative & Design",
    items: [
      "Adobe Premiere Pro — Video Editing",
      "Adobe Photoshop — Image Editing & Graphic Design",
      "Figma — UI Design",
      "Canva — Creative Design",
    ],
  },
];

export const marqueeSkills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Redux", "JWT",
  "REST APIs", "JavaScript", "Git", "GitHub", "Postman", "Figma", "Premiere Pro",
];

export const experience = [
  {
    role: "Full Stack MERN Intern",
    company: "WHY TAP Global Services",
    points: [
      "Worked on full-stack web development using MongoDB, Express.js, React.js and Node.js.",
      "Developed responsive user interfaces and integrated frontend applications with RESTful backend APIs.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Codebind Technologies",
    points: [
      "Developed a responsive web-based Business Management System using HTML and CSS.",
      "Implemented secure form handling, database storage workflows and user-friendly interface components.",
    ],
  },
];

export const education = [
  {
    title: "B.E. Computer Science and Engineering",
    place: "SRM TRP Engineering College, Tiruchirappalli",
    when: "May 2026",
    result: "CGPA 7.8",
  },
  {
    title: "HSC",
    place: "A.K.K.V Aarunadu MHSS, Trichy",
    when: "May 2022",
    result: "59.8%",
  },
  {
    title: "SSLC",
    place: "A.K.K.V Aarunadu MHSS, Trichy",
    when: "April 2020",
    result: "78",
  },
];

export const training = [
  { title: "Web Development Implant Training", org: "Codebind Technologies" },
  { title: "Android App Development Workshop", org: "Codebind Technologies" },
  { title: "Web Application Workshop", org: "SRISHTI 2K24, PSG College of Technology" },
  { title: "Placement Aptitude Training", org: "Codebind Technologies" },
];

// Achievements are drawn ONLY from facts in the details file.
// No awards, ranks or certificates have been invented. Add real ones here later.
export const achievements = [
  {
    title: "Graduated B.E. Computer Science and Engineering, 2026",
    detail: "SRM TRP Engineering College — CGPA 7.8, May 2026.",
  },
  {
    title: "Completed two industry internships",
    detail: "Full Stack MERN Intern at WHY TAP Global Services and Web Development Intern at Codebind Technologies.",
  },
  {
    title: "Built two featured projects",
detail: "DressLoop and WorkNest — spanning full-stack application development.",
  },
  {
    title: "Took part in the SRISHTI 2K24 Web Application Workshop",
    detail: "Hosted at PSG College of Technology.",
  },
  {
    title: "Completed four trainings and workshops with Codebind Technologies and SRISHTI 2K24",
    detail: "Web Development Implant Training, Android App Development Workshop, Placement Aptitude Training and the Web Application Workshop.",
  },
];

export const projects = [
  {
slug: "dressloop",
title: "DressLoop",
subtitle: "MERN Rental Dress Application",
kicker: "Full-stack · Rental platform",
summary:
"A responsive full-stack dress rental platform with JWT authentication and role-based access, built on the MERN stack.",
stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
highlights: [
"Responsive full-stack dress rental platform with JWT authentication and role-based access.",
"Dress and category CRUD, image uploads, wishlist, reviews, cart and checkout.",
"Date-based rental availability, rental duration validation, order management, cancellation and status tracking.",
],
image: "/projects/dressloop/dressloop-home.png",
imageIsPlaceholder: false,
links: {
github: "https://github.com/Swethakannan28/DressLoop",
live: "",
},
screenshots: [
"/projects/dressloop/dressloop-admin.png",
"/projects/dressloop/dressloop-home.png",
"/projects/dressloop/dressloop-dresses.png",
"/projects/dressloop/dressloop-shop.png",
],
order: 1,
},

{
slug: "worknest",
title: "WorkNest",
subtitle: "Employee Management System",
kicker: "Full-stack · Admin dashboard",
summary:
"An employee management system with role-based admin and employee authentication, profile management and an admin dashboard.",
stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
highlights: [
"Role-based admin and employee authentication and authorization.",
"Employee CRUD, profile management, profile image upload, form validation and admin dashboard.",
],
image: "/projects/worknest/worknest-dashboard.png",
imageIsPlaceholder: false,
links: {
github: "https://github.com/Swethakannan28/WorkNest-Employee-Management-System",
live: "",
},
screenshots: [
"/projects/worknest/worknest-add.png",
"/projects/worknest/worknest-dashboard.png",
"/projects/worknest/worknest-employee.png",
"/projects/worknest/worknest-profile.png",
],
order: 2,
},

  
];

export const getProject = (slug, list = projects) => list.find((p) => p.slug === slug);
