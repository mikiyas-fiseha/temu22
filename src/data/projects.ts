export interface ProjectDetailSection {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  type: string;
  location: string;
  year: string;
  heroImage: string;
  tagline: string;
  description: string;
  challenge?: string;
  conceptText: string;
  conceptImage: string;
  spatialStrategyText: string;
  spatialStrategyImage: string;
  materialityText: string;
  materialImages: { name: string; image: string }[];
  detailImages: string[];
  finalViewImage: string;
  pinnedSlides?: {
    label: string;
    caption: string;
    image: string;
  }[];
  specifications: {
    area: string;
    status: string;
    principalArchitect: string;
    materials: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: "addis-residence",
    slug: "addis-residence",
    number: "01",
    title: "ADDIS RESIDENCE",
    category: "Residential Architecture",
    type: "Private Residence",
    location: "Addis Ababa, Ethiopia",
    year: "2026",
    heroImage: "/images/addis_hero.jpg",
    tagline: "A monolithic sanctuary sculpted through light, board-formed concrete, and native basalt stone.",
    description: "A contemporary residence shaped around natural daylight, privacy, and seamless connection to the surrounding Ethiopian topography. Built with board-formed concrete, native basalt stone, and blackened timber.",
    challenge: "Negotiating a steep natural gradient overlooking the city basin while insulating private family quarters from urban acoustics without sacrificing panoramic mountain horizons.",
    conceptText: "The structure emerges as a cluster of interlocking cubic volumes. Solid perimeter walls shield living quarters from direct western glare while dramatic floor-to-ceiling glass reveals intimate interior courtyards.",
    conceptImage: "/images/addis_concept.jpg",
    spatialStrategyText: "Organized along a linear axis of stone-clad water channels, the public entertaining salon transitions into recessed contemplative reading alcoves and floating cantilevered balconies.",
    spatialStrategyImage: "/images/addis_spatial.jpg",
    materialityText: "Raw volcanic stone quarried 40 kilometers north of the capital anchors the plinth, contrasted with smooth warm oak casework and bespoke bronze threshold plates.",
    materialImages: [
      { name: "Board-Formed Concrete", image: "/images/mat_concrete.jpg" },
      { name: "Ethiopian Basalt Stone", image: "/images/mat_stone.jpg" },
      { name: "Smoked Rift Oak", image: "/images/mat_wood.jpg" },
      { name: "Low-Iron Acoustic Glass", image: "/images/mat_glass.jpg" },
    ],
    detailImages: [
      "/images/addis_detail.jpg",
      "/images/addis_spatial.jpg",
      "/images/material_hero.jpg",
    ],
    finalViewImage: "/images/addis_final.jpg",
    pinnedSlides: [
      {
        label: "IMAGE 01",
        caption: "Exterior Facade — Monolithic concrete cantilevers embracing morning sun.",
        image: "/images/addis_exterior.jpg",
      },
      {
        label: "IMAGE 02",
        caption: "Living Pavilion — 6-meter ceiling height with unadorned structural clarity.",
        image: "/images/addis_living.jpg",
      },
      {
        label: "IMAGE 03",
        caption: "Material Detail — Tactile interplay between fluted timber and hand-finished stone.",
        image: "/images/addis_detail.jpg",
      },
      {
        label: "IMAGE 04",
        caption: "Night View — Concealed warm lighting sculpting external massing in twilight.",
        image: "/images/addis_night.jpg",
      },
    ],
    specifications: {
      area: "840 m²",
      status: "Completed",
      principalArchitect: "PROLIQ Studio",
      materials: ["Cast Concrete", "Native Basalt", "Smoked Oak", "Structural Steel"],
    },
  },
  {
    id: "nova-house",
    slug: "nova-house",
    number: "02",
    title: "NOVA HOUSE",
    category: "Private Residence",
    type: "Residential Architecture",
    location: "Addis Ababa, Ethiopia",
    year: "2026",
    heroImage: "/images/nova_hero.jpg",
    tagline: "A pavilion of light and restrained geometry defined by continuous floating roof planes.",
    description: "Designed for an art collector and diplomat, Nova House dissolves boundaries between internal galleried corridors and external landscaped terracing, framing views of the Entoto Ridge.",
    challenge: "Displaying sensitive large-format canvas artworks in naturally lit environments without subjecting them to ultraviolet exposure or thermal fluctuations.",
    conceptText: "Subterranean gallery pockets combine with an elevated glass pavilion. Louvered timber pergolas filter overhead equatorial rays into soft ambient illumination.",
    conceptImage: "/images/nova_concept.jpg",
    spatialStrategyText: "A central courtyard atrium anchors circulation, functioning as a passive cooling chimney that draws cool night mountain breezes through the living spaces.",
    spatialStrategyImage: "/images/nova_spatial.jpg",
    materialityText: "Light travertine cladding sourced regionally paired with brushed bronze window surrounds and warm lime plaster wall finishes.",
    materialImages: [
      { name: "Roman Travertine", image: "/images/mat_stone.jpg" },
      { name: "Brushed Bronze", image: "/images/mat_metal.jpg" },
      { name: "Mineral Lime Plaster", image: "/images/mat_concrete.jpg" },
      { name: "Walnut Cabinetry", image: "/images/mat_wood.jpg" },
    ],
    detailImages: [
      "/images/nova_concept.jpg",
      "/images/addis_living.jpg",
      "/images/nova_spatial.jpg",
    ],
    finalViewImage: "/images/nova_final.jpg",
    specifications: {
      area: "620 m²",
      status: "Under Construction",
      principalArchitect: "PROLIQ Studio",
      materials: ["Honed Travertine", "Brushed Bronze", "Lime Plaster", "Walnut"],
    },
  },
  {
    id: "material-house",
    slug: "material-house",
    number: "03",
    title: "MATERIAL HOUSE",
    category: "Interior Architecture",
    type: "Interior Architecture & Spatial Design",
    location: "Addis Ababa, Ethiopia",
    year: "2025",
    heroImage: "/images/material_hero.jpg",
    tagline: "An exploration in tactile honesty where raw textures dictate spatial rhythm.",
    description: "A complete interior overhaul celebrating raw materiality. Concrete walls remain untouched, balanced by bespoke Japanese-inspired joinery in warm white cedar and blackened steel accents.",
    challenge: "Reframing a rigid existing structural grid into a fluid, tactile domestic sanctuary devoid of decorative ornament.",
    conceptText: "Subtractive design: stripping unnecessary layers down to the core structural skeleton, then introducing hand-finished timber and textured linen elements.",
    conceptImage: "/images/material_concept.jpg",
    spatialStrategyText: "Continuous micro-cement floors unite kitchen, dining, and sunken conversation pit, creating an uninterrupted acoustic and visual landscape.",
    spatialStrategyImage: "/images/material_spatial.jpg",
    materialityText: "Unwaxed oak, raw wool textiles, blackened architectural steel, and custom clay pigment washes on ceilings.",
    materialImages: [
      { name: "Japanese Cedar", image: "/images/mat_wood.jpg" },
      { name: "Blackened Steel", image: "/images/mat_metal.jpg" },
      { name: "Natural Wool", image: "/images/mat_textile.jpg" },
      { name: "Cast Plaster", image: "/images/mat_concrete.jpg" },
    ],
    detailImages: [
      "/images/addis_living.jpg",
      "/images/material_concept.jpg",
      "/images/material_spatial.jpg",
    ],
    finalViewImage: "/images/material_final.jpg",
    specifications: {
      area: "410 m²",
      status: "Completed",
      principalArchitect: "PROLIQ Studio",
      materials: ["Micro-Cement", "Raw Linen", "White Cedar", "Gunmetal"],
    },
  },
  {
    id: "courtyard-house",
    slug: "courtyard-house",
    number: "04",
    title: "COURTYARD HOUSE",
    category: "Architecture",
    type: "Single-Family Residence",
    location: "Addis Ababa, Ethiopia",
    year: "2025",
    heroImage: "/images/courtyard_hero.jpg",
    tagline: "A protected introspective dwelling configured around a meditative stone courtyard and water pool.",
    description: "Reinterpreting traditional courtyard living for contemporary metropolitan life. The perimeter is enclosed by monolithic clay-toned rammed earth and basalt walls, while the interior opens entirely into a lush garden court.",
    challenge: "Balancing strict thermal comfort in fluctuating highland temperatures without relying on energy-intensive mechanical climate control.",
    conceptText: "Thermal massing principles combined with natural cross-ventilation corridors ensure cool mornings and passive warmth retention after dusk.",
    conceptImage: "/images/courtyard_concept.jpg",
    spatialStrategyText: "Every room retains visual axis to the central courtyard water feature, creating an ambient acoustic barrier against urban noise.",
    spatialStrategyImage: "/images/courtyard_spatial.jpg",
    materialityText: "Stabilized rammed earth, reclaimed teak timbers, volcanic flagstones, and hand-troweled lime wash.",
    materialImages: [
      { name: "Rammed Earth", image: "/images/mat_stone.jpg" },
      { name: "Reclaimed Teak", image: "/images/mat_wood.jpg" },
      { name: "Volcanic Flagstone", image: "/images/mat_concrete.jpg" },
      { name: "Reflective Glazing", image: "/images/mat_glass.jpg" },
    ],
    detailImages: [
      "/images/addis_hero.jpg",
      "/images/courtyard_concept.jpg",
      "/images/courtyard_spatial.jpg",
    ],
    finalViewImage: "/images/courtyard_final.jpg",
    specifications: {
      area: "530 m²",
      status: "Completed",
      principalArchitect: "PROLIQ Studio",
      materials: ["Rammed Earth", "Teak", "Volcanic Paving", "Ironmongery"],
    },
  },
];

export const HORIZONTAL_GALLERY_ITEMS = [
  {
    id: "h1",
    tag: "ARCHITECTURE",
    title: "MONOLITHIC SCALE",
    subtitle: "Cantilevered concrete structure framing horizon",
    image: "/images/addis_hero.jpg",
  },
  {
    id: "h2",
    tag: "INTERIOR",
    title: "VOLUMETRIC CALM",
    subtitle: "Double-height living space with soft diffused light",
    image: "/images/addis_living.jpg",
  },
  {
    id: "h3",
    tag: "MATERIAL",
    title: "EARTH & STONE",
    subtitle: "Chiseled basalt masonry and honed volcanic flagstone",
    image: "/images/mat_stone.jpg",
  },
  {
    id: "h4",
    tag: "LIGHT",
    title: "SHADOW PLAY",
    subtitle: "Raked louvers casting timed geometric daylight patterns",
    image: "/images/nova_concept.jpg",
  },
  {
    id: "h5",
    tag: "FURNITURE",
    title: "CUSTOM JOINERY",
    subtitle: "Architectural casework tailored in solid smoked oak",
    image: "/images/material_concept.jpg",
  },
];

export const MATERIAL_SHOWCASE = [
  {
    name: "CONCRETE",
    role: "Structural Honesty",
    aspect: "tall",
    description: "Board-formed, raw and pigmented concrete celebrating tectonic grain and permanence.",
    image: "/images/mat_concrete.jpg",
  },
  {
    name: "WOOD",
    role: "Warmth & Tactility",
    aspect: "wide",
    description: "Ethically harvested rift oak and warm cedar aged with organic beeswax finishes.",
    image: "/images/mat_wood.jpg",
  },
  {
    name: "STONE",
    role: "Topographical Anchor",
    aspect: "tall",
    description: "Native Ethiopian basalt, honed travertine, and chiseled limestone slabs.",
    image: "/images/mat_stone.jpg",
  },
  {
    name: "GLASS",
    role: "Aperture & Horizon",
    aspect: "wide",
    description: "Ultra-clear low-iron acoustic glazing establishing continuous outdoor dialogue.",
    image: "/images/mat_glass.jpg",
  },
  {
    name: "METAL",
    role: "Precision & Contrast",
    aspect: "tall",
    description: "Blackened structural steel, hand-patinated bronze hardware, and architectural zinc.",
    image: "/images/mat_metal.jpg",
  },
  {
    name: "TEXTILE",
    role: "Acoustic Softness",
    aspect: "square",
    description: "Raw Belgian linen, handspun Ethiopian cotton, and natural wool tapestries.",
    image: "/images/mat_textile.jpg",
  },
];
