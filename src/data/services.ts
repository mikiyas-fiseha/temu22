export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  previewImage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    id: "architecture",
    title: "ARCHITECTURE",
    shortDesc: "End-to-end architectural design, building envelope engineering, and site synthesis.",
    fullDesc: "We design architectural interventions that respond intimately to topography, microclimate, and cultural context. Our commissions span high-end private residences, cultural institutions, and monolithic pavilions engineered with timeless permanence.",
    deliverables: [
      "Site Analysis & Solar Masterplanning",
      "Conceptual Massing & Volumetric Modeling",
      "Permitting Documentation & Structural Coordination",
      "Comprehensive Construction Detailing",
      "Site Superintending & Craftsperson Supervision"
    ],
    previewImage: "/images/addis_hero.jpg",
  },
  {
    number: "02",
    id: "interior-design",
    title: "INTERIOR DESIGN",
    shortDesc: "Holistic interior architecture, custom joinery, materiality curations, and tactile ambiance.",
    fullDesc: "Interiors conceived as seamless extensions of architectural form. We orchestrate proportions, acoustic qualities, bespoke joinery, and tactile materiality to evoke quiet sanctuary and effortless everyday ritual.",
    deliverables: [
      "Spatial Layout & Circulation Refinement",
      "Bespoke Casework & Joinery Design",
      "Tactile Material Palette Specification",
      "Architectural Lighting Typology",
      "Furniture, Art & Object Procurement"
    ],
    previewImage: "/images/material_hero.jpg",
  },
  {
    number: "03",
    id: "3d-visualization",
    title: "3D VISUALIZATION",
    shortDesc: "Photorealistic spatial renderings, atmospheric cinematic studies, and light simulation.",
    fullDesc: "Visualizations treated as artistic photography before construction begins. We simulate nuanced daylight transitions, material textures, and weather atmospheres to evaluate design choices and convey spatial emotion.",
    deliverables: [
      "Atmospheric High-Resolution CGI Stills",
      "Diurnal Solar & Shadow Light Studies",
      "Material & Texture Micro-Detail Renders",
      "Cinematic Motion Tours & Virtual Walkthroughs",
      "Editorial Presentation Artwork"
    ],
    previewImage: "/images/addis_concept.jpg",
  },
  {
    number: "04",
    id: "space-planning",
    title: "SPACE PLANNING",
    shortDesc: "Strategic volumetric efficiency, natural circulation hierarchies, and lifestyle zoning.",
    fullDesc: "Resolving programmatic complexities with intuitive clarity. We analyze how bodies move through volumes, ensuring effortless transitions between communal expansiveness and solitary contemplation.",
    deliverables: [
      "Programmatic Density Analysis",
      "Human Circulation Flow Mapping",
      "Acoustic & Privacy Zoning",
      "Storage & Concealed Systems Optimization",
      "Adaptive Future Flexibility Planning"
    ],
    previewImage: "/images/nova_hero.jpg",
  },
  {
    number: "05",
    id: "design-consultation",
    title: "DESIGN CONSULTATION",
    shortDesc: "Strategic architectural advisory, feasibility studies, and historic site adaptation.",
    fullDesc: "Expert advisory for clients, developers, and institutions embarking on ambitious spatial endeavors. We provide critical assessments of land potential, materiality viability, and design direction before major capital commitments.",
    deliverables: [
      "Land & Topographical Feasibility Appraisals",
      "Material Sourcing & Regional Supply Chain Audits",
      "Adaptive Reuse & Historic Context Evaluation",
      "Peer Review of Architectural Schemes",
      "Sustainability & Passive Climate Strategy"
    ],
    previewImage: "/images/courtyard_hero.jpg",
  },
];
