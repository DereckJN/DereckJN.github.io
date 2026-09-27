/*
 * Traducciones del portafolio.
 *
 * El español vive en index.html (es la fuente de verdad y lo que ven los buscadores).
 * main.js guarda ese texto original al cargar, así que aquí solo hace falta:
 *   - "en": la traducción de cada clave data-i18n del HTML
 *   - "es"/"en" para los textos que solo existen en JavaScript (meta, toasts)
 *
 * Para agregar un texto traducible:
 *   1. En index.html:  <p data-i18n="seccion.clave">Texto en español</p>
 *   2. Aquí, en I18N.en: "seccion.clave": "English text"
 */
window.I18N = {
  // Textos que no están en el HTML
  scriptOnly: {
    es: {
      "meta.title": "Dereck Jara Núñez · Full-Stack Developer",
      "meta.description": "Portafolio de Dereck Jara Núñez, desarrollador full-stack (.NET 9, Vue 3, MySQL, Azure). Experiencia migrando un monolito a microservicios en Ópticas DRmax.",
      "toast.copied": "Correo copiado",
      "toast.copyFail": "No se pudo copiar; el correo quedó seleccionado"
    },
    en: {
      "meta.title": "Dereck Jara Núñez · Full-Stack Developer",
      "meta.description": "Portfolio of Dereck Jara Núñez, full-stack developer (.NET 9, Vue 3, MySQL, Azure). Experience migrating a monolith to microservices at Ópticas DRmax.",
      "toast.copied": "Email copied",
      "toast.copyFail": "Couldn't copy; the email is selected instead"
    }
  },

  en: {
    "skip": "Skip to content",
    "navLabel": "Sections",
    "themeLabel": "Toggle light or dark theme",
    "nav.exp": "Experience",
    "nav.arch": "Architecture",
    "nav.stack": "Stack",
    "nav.acad": "Academic projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Portfolio · Software Engineering",
    "hero.role": "Full-Stack Developer · .NET 9 · Vue 3 · MySQL · Azure",
    "hero.lede": "I build business systems end to end, from the database schema to the user interface. At Ópticas DRmax I worked on the management system for an optical retail chain and on its migration from a monolith to microservices, where I also reviewed and merged the whole team's code.",
    "hero.cv": "View résumé (PDF)",
    "hero.cvHref": "assets/CV_Dereck_Jara_Nunez_EN.pdf",

    "ticket.label": "Profile summary",
    "ticket.title": "Work order",
    "ticket.profile": "Profile",
    "ticket.status": "Status",
    "ticket.available": "Available",
    "ticket.data": "Data",
    "ticket.langs": "Languages",
    "ticket.langsVal": "Spanish native · English B1",
    "ticket.grad": "Graduation",
    "ticket.gradVal": "UTN · 2027 (expected)",
    "ticket.location": "Location",
    "ticket.foot": "Generated with jsbarcode, the library I used to print lab orders",

    "tray.eyebrow": "Career path",
    "tray.title": "Order tracking",
    "tray.s1": "Networking Technician",
    "tray.s2": "Started at UTN",
    "tray.s3": "Full-stack academic projects",
    "tray.s4when": "Jul – Oct 2026",
    "tray.s5": "B.Sc. in Software Engineering",
    "tray.s5when": "2027 (expected)",

    "exp.eyebrow": "Professional experience",
    "exp.title": "From monolith to microservices",
    "exp.lede": "Two production systems for an optical retail chain in Costa Rica: patients, appointments, eye exams, lab orders, SAP-integrated billing, and customer service.",
    "exp.when": "July 2026 – October 2026",
    "exp.role": "Full-Stack Developer · De facto tech lead of the microservices ecosystem",
    "exp.st1": "total commits across both systems",
    "exp.st2": "team pull requests reviewed and merged",
    "exp.st3": "lines added in my own commits",
    "exp.st4": ".NET 9 microservices with Clean Architecture",

    "p1.kind": "Monolith · Jul – Sep 2026",
    "p1.desc": "Complete management system built with .NET 9 + Vue 3 on Azure by a team of 6 developers. I was the project's second-largest contributor.",
    "p1.n1": "<b>142</b> commits",
    "p1.n2": "<b>+16K</b> lines",
    "p1.n3": "<b>19</b> issues",
    "p1.l1": "<b>Clinical records</b> end to end: domain entity, service, REST API, Vue component, and RBAC permissions.",
    "p1.l2": "Reusable <b>Reports module</b> with branch filtering, paginated preview, and Excel export (ClosedXML, capped at 50,000 rows).",
    "p1.l3": "<b>Visual tracking and auditing</b> of lab orders: checkpoints on the patient record and a log covering the 3 status cascades from shipping manifests and the 5 direct status changes.",
    "p1.l4": "Intermediate manifest statuses, GAM branch classification, and batch approval with printing in multiple formats.",
    "p1.l5": "Fixed a production bug caused by accent encoding in MySQL.",

    "p2.kind": "Microservices · Jul – Sep 2026",
    "p2.desc": "Monorepo of 7 microservices that replaces the monolith incrementally. Besides writing code, I reviewed and merged the whole team's PRs.",
    "p2.n1": "<b>589</b> direct commits",
    "p2.n2": "<b>+123K</b> lines",
    "p2.n3": "<b>3,300+</b> files",
    "p2.l1": "<b>Multitenancy</b> by <code>empresa_id</code> using EF Core global query filters, rolled out to Tickets, Patients, and Sales, with tenant-isolation tests.",
    "p2.l2": "<b>RBAC permissions standardization</b> with a <code>[RequierePermiso]</code> attribute and startup validation.",
    "p2.l3": "<b>Customer service (SAC) module</b> built from scratch: Kanban inbox, case timeline, attachments, and hierarchical catalogs.",
    "p2.l4": "<b>\"Friends & Family\" referral program</b>: coupon engine, public landing page, and CRM dashboard with reports.",
    "p2.l5": "Parallel batch generation of lab orders, which eliminated request timeouts.",

    "arch.eyebrow": "Architecture",
    "arch.title": "How the system was migrated",
    "arch.lede": "We used the <i>strangler fig</i> pattern: each module moves from the monolith to its own service while the system stays in production. A gateway routes each request to whichever service handles it now.",
    "arch.diagramLabel": "OpticaSystemGLD → strangler fig → YARP API Gateway → 7 microservices",
    "arch.mono": ".NET 9 monolith<br>Clean Architecture · 4 layers<br>~70 MySQL tables<br>29 controllers · 55 entities",
    "arch.gw": "<b>API Gateway</b> · YARP · shared JWT",
    "arch.shared": "Optica.Shared: contracts, events, and tenancy · idempotent SQL scripts as the single source of truth for the schema",

    "chart.title": "Where I worked in the ecosystem",
    "chart.sub": "Files touched in my own commits, by service (approx.)",
    "chart.fe": "Frontend",
    "chart.be": "Backend / data",

    "dom.eyebrow": "By business domain",
    "dom.title": "Feature highlights",
    "dom.lab": "Lab",
    "dom.lab1": "External orders and requests with printouts identical to the legacy system",
    "dom.lab2": "ACEP integration for frame measurements, with auditing and per-company validation",
    "dom.lab3": "Manifest deactivation with an event ledger instead of hard deletes",
    "dom.sac": "Customer service",
    "dom.sac1": "SAC cases with a Kanban board by branch and agent",
    "dom.sac2": "Separate permissions for Call Center and SAC agents",
    "dom.sac3": "Migrated \"Gestiones\" into Tickets, with automatic reassignment when merging duplicate patients",
    "dom.sales": "Sales & billing",
    "dom.sales1": "Split payments and taxes resolved from SAP Business One",
    "dom.sales2": "Customer autofill from the tax authority (Costa Rica and El Salvador)",
    "dom.sales3": "Lens prescription validation at checkout",
    "dom.pat": "Patients",
    "dom.pat1": "Migrated the general-medicine clinical record",
    "dom.pat2": "Redesigned the eye-exam form with a dynamic configuration panel",
    "dom.pat3": "Duplicate patient merging",
    "dom.auth": "Auth & RBAC",
    "dom.auth1": "Migrated 52 Call Center agent accounts to production, verifying each one's assigned branch",
    "dom.auth2": "Per-service permission catalog",
    "dom.auth3": "Startup checks that catch invalid configurations",
    "dom.qa": "Quality",
    "dom.qa1": "Multitenant isolation tests the team uses as the reference for new services",
    "dom.qa2": "Fixed flaky time-zone tests (UTC vs. Costa Rica time)",
    "dom.qa3": "Docs as code: CLAUDE.md, ADRs, and design specs",

    "adr.eyebrow": "Architecture decisions",
    "adr.title": "Decisions I helped make",
    "adr.lede": "Each decision was recorded as an Architecture Decision Record (ADR), versioned alongside the code.",
    "adr.a1t": "Multitenancy strategy",
    "adr.a1": "Isolation by <code>empresa_id</code> with EF Core global filters, backed by <code>TenantIsolationTests</code>.",
    "adr.a2t": "RBAC permission taxonomy",
    "adr.a2": "Led the migration of the Auth and HR services from ad-hoc roles to a standardized permission catalog.",
    "adr.a3t": "One database per service",
    "adr.a3": "Per-service data ownership and removal of foreign keys inherited from the monolith.",
    "adr.a4t": "Gestiones moves to Tickets",
    "adr.a4": "The Gestiones (case management) module becomes owned by the Tickets service.",

    "stack.eyebrow": "Tools",
    "stack.title": "Tech stack",
    "stack.data": "Data",
    "stack.d3": "Idempotent SQL scripts",
    "stack.d4": "Stored procedures",
    "stack.devops": "DevOps & process",

    "acad.title": "Academic projects",
    "acad.a1": "Tech retail system with 5 modules: products, inventory, billing, digital signature, and users. It uses a Factory/DAL/BLL architecture, a 20-table schema with stored procedures, live exchange rates from the Central Bank of Costa Rica (BCCR) API, PDF invoices with QuestPDF, and logging with log4net.",
    "acad.a2": "Restaurant ordering web app. I implemented full CRUD for Combos across all 4 layers of an N-layer architecture, using the repository and service patterns so the module could be tested in isolation, and fixed bugs in the shared layout.",
    "acad.a3": "Support ticket management. I designed the schema and endpoints for creating, tracking, and resolving tickets, with a responsive UI for staff handling several tickets at once.",
    "acad.a4st": "Scrum · Requirements engineering · Risk",
    "acad.a4": "Sprint 2 Scrum deliverables (backlogs, retrospective, and risk log) and pre-feasibility and feasibility studies for an ordering platform.",

    "edu.eyebrow": "Background",
    "edu.title": "Education & certifications",
    "edu.e1": "B.Sc. in Software Engineering",
    "edu.e1s": "Universidad Técnica Nacional · 2023 – 2027 (expected)",
    "edu.e2": "Networking Technician (secondary technical degree)",

    "foot.eyebrow": "Contact",
    "foot.title": "Looking for a full-stack developer?",
    "foot.write": "Send an email",
    "foot.note": "Figures come from each repository's Git history (July – September 2026)."
  }
};
