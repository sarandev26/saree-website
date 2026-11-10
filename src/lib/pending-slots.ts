export interface PendingSlot {
  id: string;
  file: string;
  alias?: string;
  ratio: string;
  title: string;
  prompt: string;
}

export const PENDING_SLOTS: PendingSlot[] = [
  // HERITAGE (6)
  {
    id: "H-07",
    file: "heritage-07.webp",
    alias: "H-07.webp",
    ratio: "2:3",
    title: "Pulling Real Zari",
    prompt:
      "Close-up vertical editorial photograph of an Indian artisan skillfully spinning and guiding gleaming 24k gold-electroplated pure silver zari wire onto vintage wooden bobbins, showing the metallic sheen of the micro-wire reflecting warm workshop light, with wooden spindles softly blurred in the background. Premium Indian fashion documentary editorial photograph, 85mm lens at f/2.2, shallow depth of field, true-to-life fabric texture with dazzling metallic wire reflection and wood grain, natural skin texture, warm film-like colour grading, luxury magazine quality, natural hands, no text, no logos, no watermark. 2:3 vertical aspect ratio.",
  },
  {
    id: "H-08",
    file: "heritage-08.webp",
    alias: "H-08.webp",
    ratio: "2:3",
    title: "Natural Pigment Dye",
    prompt:
      "Vertical atmospheric photograph of skeins of pure hand-spun mulberry silk yarn hanging on bamboo poles in an outdoor courtyard drying after being dyed with natural indigo and saffron pigments, soft breeze rippling the lustrous threads, warm midday sunlight. Premium Indian fashion documentary editorial photograph, 85mm lens at f/2.2, shallow depth of field, true-to-life fabric texture with raw silk sheen, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 2:3 vertical aspect ratio.",
  },
  {
    id: "H-09",
    file: "heritage-09.webp",
    alias: "H-09.webp",
    ratio: "16:9",
    title: "The Silk Story Showcase",
    prompt:
      "Wide-angle 16:9 atmospheric documentary photograph of an authentic Indian sericulture silk atelier. Baskets of golden-yellow mulberry silk cocoons rest on woven reed mats, alongside gleaming hand-spun golden raw silk skeins and wooden spinning charkhas under soft morning window light. Premium Indian fashion documentary editorial photograph, 35mm lens at f/2.8, soft natural light, true-to-life texture with tactile silk cocoons and golden yarn, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 16:9 widescreen aspect ratio.",
  },
  {
    id: "H-10",
    file: "heritage-10.webp",
    alias: "H-10.webp",
    ratio: "2:3",
    title: "Organic Cocoons",
    prompt:
      "Vertical macro photograph of golden and ivory pure mulberry silk cocoons piled naturally on a handcrafted dark bamboo winnowing tray, with a few delicate single silk filaments catching soft side light. Premium Indian fashion documentary editorial photograph, 85mm lens at f/2.8, shallow depth of field, true-to-life texture of wild organic cocoons, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 2:3 vertical aspect ratio.",
  },
  {
    id: "H-11",
    file: "heritage-11.webp",
    alias: "H-11.webp",
    ratio: "2:3",
    title: "Golden Raw Skeins",
    prompt:
      "Vertical photograph of an artisan woman gently holding a skein of lustrous golden-yellow raw 2-ply mulberry silk yarn in her hands, showing the silky luster and supple hand-reeled texture under diffused natural light. Premium Indian fashion documentary editorial photograph, 85mm lens at f/2.0, shallow depth of field, true-to-life texture of liquid golden silk filament, natural hands, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 2:3 vertical aspect ratio.",
  },
  {
    id: "H-12",
    file: "heritage-12.webp",
    alias: "H-12.webp",
    ratio: "2:3",
    title: "Artisan Silk Touch",
    prompt:
      "Vertical close-up photograph of graceful hands gently stroking and draping a luxurious length of finished pure mulberry silk fabric, showing its liquid drape, subtle slub grain, and soft folds under warm studio sunlight. Premium Indian fashion documentary editorial photograph, 85mm lens at f/2.0, shallow depth of field, true-to-life fabric texture with fluid drape, natural skin, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 2:3 vertical aspect ratio.",
  },

  // FIRST LIGHT (4)
  {
    id: "F-01",
    file: "firstlight-01.webp",
    alias: "F-01.webp",
    ratio: "16:9",
    title: "First Light Sunrise Saffron",
    prompt:
      "Cinematic wide 16:9 photograph of a graceful 25-year-old South Asian woman draped in an earthy Saffron-Gold handloom silk saree, standing on a historic stone rooftop at the golden hour of dawn, looking out over the misty awakening horizon, golden morning rays illuminating the shimmering zari border. Premium Indian fashion editorial photograph, 35mm lens at f/2.0, soft golden sunrise light, true-to-life fabric texture with glowing silk drape, warm film-like colour grading, luxury magazine quality, correct saree drape with neat pleats and pallu over the left shoulder, no text, no logos, no watermark. 16:9 widescreen aspect ratio.",
  },
  {
    id: "F-02",
    file: "firstlight-02.webp",
    alias: "F-02.webp",
    ratio: "16:9",
    title: "First Light Emerald Twilight",
    prompt:
      "Cinematic wide 16:9 photograph of an elegant 26-year-old South Asian woman wearing an Emerald Green silk saree with antique gold zari border, walking through an ancient heritage stone courtyard filled with hundreds of warm glowing terracotta oil lamps (diyas) at deep twilight. Premium Indian fashion editorial photograph, 35mm lens at f/2.0, warm candlelight and blue hour glow, true-to-life fabric texture, warm film-like colour grading, luxury magazine quality, correct saree drape, no text, no logos, no watermark. 16:9 widescreen aspect ratio.",
  },
  {
    id: "F-03",
    file: "firstlight-03.webp",
    alias: "F-03.webp",
    ratio: "16:9",
    title: "First Light Crimson Window",
    prompt:
      "Cinematic wide 16:9 photograph of a radiant bride wearing a rich Crimson Red Banarasi brocade silk saree and heirloom gold jewellery, standing beside a grand carved jharokha arched palace window as early morning sunbeams illuminate the crimson silk and gold floral jaal. Premium Indian fashion editorial photograph, 35mm lens at f/2.0, soft morning window light, true-to-life fabric texture with dense zari brocade, warm film-like colour grading, luxury magazine quality, correct saree drape, no text, no logos, no watermark. 16:9 widescreen aspect ratio.",
  },
  {
    id: "F-04",
    file: "firstlight-04.webp",
    alias: "F-04.webp",
    ratio: "16:9",
    title: "First Light Monsoon Chiffon",
    prompt:
      "Cinematic wide 16:9 photograph of a carefree 24-year-old South Asian woman wearing a lightweight Royal Blue pure chiffon saree with fine silver selvedge, standing on an open marble terrace with gentle breeze billowing the translucent pallu as soft monsoon clouds gather in the sky. Premium Indian fashion editorial photograph, 35mm lens at f/2.0, diffused overcast daylight, true-to-life fabric texture with billowing chiffon fluidity, warm film-like colour grading, luxury magazine quality, correct saree drape, no text, no logos, no watermark. 16:9 widescreen aspect ratio.",
  },

  // LATEST TRENDS (3)
  {
    id: "L-01",
    file: "trends-card.webp",
    alias: "L-01.webp",
    ratio: "4:5",
    title: "Latest Trends Twirl",
    prompt:
      "Editorial fashion photograph of an energetic 24-year-old South Asian woman in a dynamic mid-twirl motion on heritage stone stairs, wearing a modern Coral Georgette pre-pleated saree that flares gracefully around her, paired with a contemporary sleeveless blouse in soft afternoon light. Premium Indian fashion editorial photograph, 85mm lens at f/1.8, motion elegance, shallow depth of field, true-to-life fabric texture with fluid georgette movement, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 4:5 vertical aspect ratio.",
  },
  {
    id: "L-02",
    file: "trends-small-01.webp",
    alias: "L-02.webp",
    ratio: "3:4",
    title: "Latest Trends Chanderi Portrait",
    prompt:
      "Close portrait of a charming 25-year-old South Asian woman with side-swept hair and delicate pearl studs, wearing a Sunshine Yellow Chanderi silk saree with subtle gold weft checks, smiling warmly in soft natural window daylight. Premium Indian fashion editorial photograph, 85mm lens at f/1.8, shallow depth of field, natural skin texture, true-to-life fabric texture, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 3:4 vertical aspect ratio.",
  },
  {
    id: "L-03",
    file: "trends-small-02.webp",
    alias: "L-03.webp",
    ratio: "3:4",
    title: "Latest Trends Pleats & Juttis",
    prompt:
      "Fashion editorial crop focusing from waist to feet, showing the crisp, perfectly aligned front pleats of a pastel sage linen saree, delicate metallic border selvedge, and elegant embroidered ivory velvet juttis on a warm sandstone courtyard floor. Premium Indian fashion editorial photograph, 85mm lens at f/2.0, shallow depth of field, true-to-life fabric and shoe texture, warm film-like colour grading, luxury magazine quality, no text, no logos, no watermark. 3:4 vertical aspect ratio.",
  },

  // TESTIMONIALS (6)
  {
    id: "P-01",
    file: "testimonial-01.webp",
    alias: "P-01.webp",
    ratio: "1:1",
    title: "Customer Ananya R.",
    prompt:
      "Authentic square portrait of a smiling 26-year-old South Asian woman with loose hair, wearing an ivory organza saree with delicate floral embroidery and small gold studs, radiant genuine smile in a sunlit wedding garden setting. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, soft natural daylight, warm film grading, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "P-02",
    file: "testimonial-02.webp",
    alias: "P-02.webp",
    ratio: "1:1",
    title: "Customer Dr. Meera V.",
    prompt:
      "Authentic square portrait of a distinguished, graceful 52-year-old South Asian woman with silver-streaked hair tied in a chic bun and pearl necklace, wearing an elegant Royal Blue pure Kanjivaram silk saree with gold border, smiling warmly in a library setting. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, warm interior light, luxury magazine quality, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "P-03",
    file: "testimonial-03.webp",
    alias: "P-03.webp",
    ratio: "1:1",
    title: "Customer Priyanka K.",
    prompt:
      "Authentic square portrait of a cheerful 31-year-old South Asian woman with wavy hair, wearing a mustard yellow Chanderi silk saree with subtle gold buttis, holding a small bouquet of tuberoses with a happy natural expression in a boutique. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, warm soft light, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "P-04",
    file: "testimonial-04.webp",
    alias: "P-04.webp",
    ratio: "1:1",
    title: "Customer Shweta S.",
    prompt:
      "Authentic square portrait of a sophisticated 42-year-old South Asian woman with elegant bob haircut and delicate gold hoops, wearing a wine-coloured Banarasi silk saree, smiling warmly in a contemporary sunlit home terrace. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, soft natural daylight, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "P-05",
    file: "testimonial-05.webp",
    alias: "P-05.webp",
    ratio: "1:1",
    title: "Customer Tanvi M.",
    prompt:
      "Authentic square portrait of an energetic 25-year-old South Asian woman with laughing eyes and pearl earrings, wearing a pastel lavender chiffon saree, joyful candid expression at an evening outdoor reception with glowing fairy lights in the bokeh. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, warm ambient lighting, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "P-06",
    file: "testimonial-06.webp",
    alias: "P-06.webp",
    ratio: "1:1",
    title: "Customer Ritu B.",
    prompt:
      "Authentic square portrait of a serene 35-year-old South Asian woman with soft braided crown hairstyle, wearing a sage green linen-silk saree with gold zari border, gentle welcoming smile in a sun-drenched courtyard. Premium editorial portrait, 85mm lens at f/1.8, natural skin texture, soft morning light, no text, no logos. 1:1 square aspect ratio.",
  },

  // INSTAGRAM (6)
  {
    id: "I-01",
    file: "insta-01.webp",
    alias: "I-01.webp",
    ratio: "1:1",
    title: "Insta Flat-lay Silk Stack",
    prompt:
      "Instagram aesthetic square flat-lay photograph of a neat stack of luxurious folded handloom silk sarees in shades of crimson, emerald, saffron, and blush pink, accessorized with brass temple bells, fragrant fresh white jasmine strings, and antique brass scissors on a weathered rustic teakwood table. Premium Indian fashion editorial photograph, soft diffused natural daylight, true-to-life textile textures, warm film-like grade, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "I-02",
    file: "insta-02.webp",
    alias: "I-02.webp",
    ratio: "1:1",
    title: "Insta Bangles & Pallu",
    prompt:
      "Instagram aesthetic square close-up photograph of an Indian woman's wrist adorned with stacked antique gold and glass green bangles, hand resting gently on a vibrant magenta Kanjivaram silk saree with rich real gold zari borders, warm sunlight casting delicate shadows. Premium Indian fashion editorial photograph, 85mm lens at f/2.0, shallow depth of field, true-to-life zari texture, warm film-like grade, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "I-03",
    file: "insta-03.webp",
    alias: "I-03.webp",
    ratio: "1:1",
    title: "Insta Coffee & Linen",
    prompt:
      "Instagram aesthetic square candid photograph of a woman wearing a relaxed rust-orange handloom linen saree seated at a sunlit outdoor marble bistro table, with a ceramic coffee mug and vintage fountain pen resting on an open journal, dappled greenery in background. Premium Indian fashion editorial photograph, 50mm lens at f/2.0, warm morning sunlight, natural linen slub texture, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "I-04",
    file: "insta-04.webp",
    alias: "I-04.webp",
    ratio: "1:1",
    title: "Insta Loom in Action",
    prompt:
      "Instagram aesthetic square atmospheric close-up of a traditional wooden pit loom in motion, showing taut gold zari weft threads being interlaced across deep teal silk warp threads, wooden shuttle blurred in motion with fine wood grain. Premium Indian fashion documentary editorial photograph, 50mm lens at f/2.2, warm amber workshop lighting, true-to-life handloom texture, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "I-05",
    file: "insta-05.webp",
    alias: "I-05.webp",
    ratio: "1:1",
    title: "Insta Luxury Gift Box",
    prompt:
      "Instagram aesthetic square photograph of an opulent matte-forest-green luxury rigid gift box lined with gold foil, containing a neatly rolled pure Kanjivaram bridal silk saree and golden tassel tie, with scattered brass temple flowers around it on a limestone surface. Premium luxury product editorial photograph, 50mm lens at f/2.2, soft natural light, rich packaging and silk texture, no text, no logos. 1:1 square aspect ratio.",
  },
  {
    id: "I-06",
    file: "insta-06.webp",
    alias: "I-06.webp",
    ratio: "1:1",
    title: "Insta Boutique Silk Rack",
    prompt:
      "Instagram aesthetic square interior photograph of Mayura Looms luxury saree boutique, showing a sleek brass wardrobe rail holding dozens of curated handloom sarees arranged in a gorgeous spectrum from saffron to magenta to deep teal, with warm ambient accent lighting and marble floor. Premium boutique editorial photograph, 35mm lens at f/2.8, warm interior glow, rich silk textures, no text, no logos. 1:1 square aspect ratio.",
  },
];

