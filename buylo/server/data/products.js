const products = [
  // CATEGORY 1: Furniture
  {
    id: 1,
    name: "Teak Wood Coffee Table",
    price: 299.99,
    current_quantity: 5,
    category: "Furniture",
    description: "Solid reclaimed teak wood with a clean modern design.",
    image_url: "/products/teak-coffee-table.png",
  },
  {
    id: 2,
    name: "Velvet Accent Chair",
    price: 189.0,
    current_quantity: 3,
    category: "Furniture",
    description: "Emerald green velvet chair with gold-finished legs.",
    image_url: "/products/velvet-accent-chair.png",
  },
  {
    id: 3,
    name: "Minimalist Oak Bookshelf",
    price: 150.0,
    current_quantity: 7,
    category: "Furniture",
    description: "Five-tier open shelving unit made from light oak.",
    image_url: "/products/minimalist-oak-bookshelf.png",
  },

  // CATEGORY 2: Home Decor
  {
    id: 4,
    name: "Minimalist Ceramic Vase",
    price: 45.0,
    current_quantity: 15,
    category: "Home Decor",
    description: "Hand-crafted matte white ceramic vase for dried flowers.",
    image_url: "/products/minimalist-ceramic-vase.png",
  },
  {
    id: 5,
    name: "Linen Throw Pillow",
    price: 35.5,
    current_quantity: 24,
    category: "Home Decor",
    description: "100% organic linen cover with hypoallergenic fill.",
    image_url: "/products/linen-throw-pillow.png",
  },
  {
    id: 6,
    name: "Scented Soy Candle",
    price: 22.0,
    current_quantity: 40,
    category: "Home Decor",
    description: "Sandalwood and Sage scented hand-poured soy wax.",
    image_url: "/products/scented-soy-candle.png",
  },

  // CATEGORY 3: Lighting
  {
    id: 7,
    name: "Matte Black Table Lamp",
    price: 89.0,
    current_quantity: 12,
    category: "Lighting",
    description: "Architectural desk lamp with an adjustable arm.",
    image_url: "/products/matte-black-table-lamp.png"
  },
  {
    id: 8,
    name: "Glass Pendant Light",
    price: 125.0,
    current_quantity: 6,
    category: "Lighting",
    description: "Hand-blown smoked glass globe with brass hardware.",
    image_url: "/products/glass-pendant-light.png"
  },
  {
    id: 9,
    name: "Modern Floor Lamp",
    price: 195.0,
    current_quantity: 4,
    category: "Lighting",
    description: "Arched floor lamp with a linen drum shade.",
    image_url: "/products/modern-floor-lamp.png"
  },

  // CATEGORY 4: Wall Art
  {
    id: 10,
    name: "Abstract Canvas Art",
    price: 120.0,
    current_quantity: 8,
    category: "Wall Art",
    description: "Framed 24x36 abstract painting in earth tones.",
    image_url: "/products/abstract-canvas-art.png"
  },
  {
    id: 11,
    name: "Geometric Wood Wall Decor",
    price: 75.0,
    current_quantity: 10,
    category: "Wall Art",
    description: "Laser-cut geometric pattern made from dark walnut.",
    image_url: "/products/geometric-wood-wall-decor.png"
  },
  {
    id: 12,
    name: "Minimalist Line Sketch",
    price: 55.0,
    current_quantity: 20,
    category: "Wall Art",
    description: "Framed single-line drawing on textured paper.",
    image_url: "/products/minimalist-line-sketch.png"
  },

  // CATEGORY 5: Kitchenware
  {
    id: 13,
    name: "Cast Iron Skillet",
    price: 65.0,
    current_quantity: 18,
    category: "Kitchenware",
    description: "Pre-seasoned 12-inch heavy-duty cast iron skillet.",
    image_url: "/products/cast-iron-skillet.png"
  },
  {
    id: 14,
    name: "Marble Pastry Slab",
    price: 50.0,
    current_quantity: 9,
    category: "Kitchenware",
    description: "Cool-surface white marble slab for rolling dough.",
    image_url: "/products/marble-pastry-slab.png"
  },
  {
    id: 15,
    name: "Ceramic Coffee Pour-Over",
    price: 28.0,
    current_quantity: 30,
    category: "Kitchenware",
    description: "Matte black ceramic dripper for manual coffee brewing.",
    image_url: "/products/ceramic-coffee-pour-over.png"
  }
];

export default products
