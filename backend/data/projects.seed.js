// Mirrors frontend/src/data/portfolio.js — content comes from your details file.
// Add real GitHub / live URLs in `links` and re-run `npm run seed`.
export const projectsSeed = [
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
    image: "/projects/dressloop.svg",
    imageIsPlaceholder: true,
    links: { github: "", live: "" },
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
    image: "/projects/worknest.svg",
    imageIsPlaceholder: true,
    links: { github: "", live: "" },
    order: 2,
  },
  {
    slug: "ecommerce-backend",
    title: "E-Commerce Backend",
    subtitle: "Server-side for an e-commerce app",
    kicker: "Backend · REST API",
    summary: "A backend development project focused on server-side functionality for an e-commerce application.",
    stack: ["Node.js", "Express.js", "MongoDB"],
    highlights: ["Backend development project focused on server-side functionality for an e-commerce application."],
    image: "/projects/ecommerce-backend.svg",
    imageIsPlaceholder: true,
    links: { github: "", live: "" },
    order: 3,
  },
];
