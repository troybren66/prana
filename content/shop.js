/* Grocery list, grouped by aisle so it works in any store.
   at: where it is easy to find. 'any' = most supermarkets (Kroger, Publix, Safeway, Target, Walmart, H-E-B…).
   f: 'w' weekly, 'm' monthly, 'once' one-time.
   Brands are suggestions. A clean-label equivalent is always fine. */
window.PRANA = window.PRANA || {};

PRANA.stores = {
 any:{name:'Any supermarket',short:'Any store'},
 wf:{name:'Whole Foods',short:'Whole Foods',q:'Whole Foods Market'},
 tj:{name:'Trader Joe\'s',short:'Trader Joe\'s',q:'Trader Joe\'s'},
 sp:{name:'Sprouts',short:'Sprouts',q:'Sprouts Farmers Market'},
 co:{name:'Costco',short:'Costco',q:'Costco'},
 in:{name:'Indian grocery',short:'Indian grocery',q:'Indian grocery store'},
 fm:{name:'Farmers market',short:'Farmers market',q:'farmers market'},
 on:{name:'Online',short:'Online'}
};

/* Buttons in "Find stores near me". Each opens your phone's map app with that search. */
PRANA.nearby = [
 {q:'Indian grocery store',label:'Indian grocery',why:'Best prices on dal, basmati, ghee, hing and whole spices. Patel Brothers is a national chain.'},
 {q:'farmers market',label:'Farmers market',why:'The freshest produce and local raw honey. Check the season and hours.'},
 {q:'Whole Foods Market',label:'Whole Foods',why:'Organic pantry, dairy, ghee and frozen vegetables.'},
 {q:'Trader Joe\'s',label:'Trader Joe\'s',why:'Frozen rice and quinoa, steamed lentils, cheap produce.'},
 {q:'Sprouts Farmers Market',label:'Sprouts',why:'Bulk bins for grains, nuts and spices.'},
 {q:'natural food co-op',label:'Health food co-op',why:'Bulk spices, local produce and good staff advice.'},
 {q:'Costco',label:'Costco',why:'Big bags of nuts, dates, frozen vegetables and ghee.'}
];

PRANA.shop = [
 {cat:'Fresh produce',items:[
  {n:'Leafy greens: baby spinach or mixed greens',size:'1 large tub',f:'w',at:['any','tj','wf','fm']},
  {n:'Cucumbers',size:'3',f:'w',at:['any','fm']},
  {n:'Avocados',size:'3',f:'w',at:['any','tj','co']},
  {n:'Lemons and limes',size:'4 + 2',f:'w',at:['any']},
  {n:'Sweet potatoes',size:'3 medium',f:'w',at:['any','fm']},
  {n:'Seasonal sweet fruit: apples, pears, papaya, berries, mango',size:'7–10 pieces',f:'w',at:['any','fm']},
  {n:'Fresh cilantro and ginger root',size:'1 bunch + 1 knob',f:'w',at:['any','in']},
  {n:'Fresh herbs: mint or basil',size:'1 bunch',f:'w',at:['fm','any']}
 ]},
 {cat:'Dairy',items:[
  {n:'Whole milk',rec:'Straus, Organic Valley, or store organic',size:'½ gallon',f:'w',at:['any','wf']},
  {n:'Plain whole-milk Greek yogurt',rec:'Straus, Maple Hill, Fage',size:'32 oz',f:'w',at:['any','tj','co']},
  {n:'Paneer',rec:'Gopi, Nanak, or any fresh paneer',size:'8 oz',f:'w',at:['in','wf','sp']},
  {n:'Ghee',rec:'4th & Heart, Ancient Organics, Kirkland, or Indian-grocery ghee',size:'1 jar',f:'m',at:['any','in','tj','co']}
 ]},
 {cat:'Grains & legumes',items:[
  {n:'White basmati rice',rec:'Lundberg, Royal, or Indian-grocery basmati',size:'2 lb bag',f:'m',at:['any','in','co']},
  {n:'Split yellow moong dal',rec:'Indian grocery is cheapest',size:'2 lb bag',f:'m',at:['in','on']},
  {n:'Rolled or quick oats',rec:'Bob\'s Red Mill or store brand',size:'1 bag',f:'m',at:['any']},
  {n:'Frozen rice pouches (brown or jasmine)',size:'2 boxes',f:'w',at:['tj','wf','co']},
  {n:'Quinoa (frozen or dry)',size:'1 bag',f:'m',at:['any','tj','co']},
  {n:'Steamed lentils, ready to eat',rec:'Trader Joe\'s or Melissa\'s; or canned lentils, rinsed',size:'2 packages',f:'w',at:['tj','any']},
  {n:'Chickpeas, no salt added',rec:'Eden Organic or store brand',size:'3 cans',f:'m',at:['any']},
  {n:'Sprouted-grain bread',rec:'Food For Life Ezekiel 4:9 (in the freezer aisle)',size:'1 loaf; keep frozen',f:'m',at:['any','wf','sp']}
 ]},
 {cat:'Frozen',items:[
  {n:'Plain frozen vegetables: broccoli, green beans, peas, spinach',size:'4 bags',f:'w',at:['any','co']},
  {n:'Plain steam-in-bag vegetables (unseasoned)',size:'2 bags',f:'w',at:['any']}
 ]},
 {cat:'Nuts, seeds & sweet',items:[
  {n:'Raw almonds and walnuts',size:'1 bag each',f:'m',at:['any','co','tj']},
  {n:'Medjool dates',size:'1 container',f:'m',at:['any','co','tj']},
  {n:'Hemp hearts or pumpkin seeds',size:'1 bag',f:'m',at:['any','co']},
  {n:'Almond butter',rec:'Justin\'s, 365, or Kirkland',size:'1 jar',f:'m',at:['any','co']},
  {n:'Tahini',rec:'Soom, Artisana, or store brand',size:'1 jar',f:'m',at:['any','in']},
  {n:'Raw honey, local if you can',size:'1 jar',f:'m',at:['fm','any']}
 ]},
 {cat:'Spices & oils',items:[
  {n:'Cumin seed, ground coriander, turmeric, cardamom, cinnamon, fennel seed, ground ginger',rec:'Indian grocery is a fraction of the supermarket price',size:'1 each',f:'m',at:['in','any','sp']},
  {n:'Hing (asafoetida): the classic swap for onion and garlic',size:'1 small jar',f:'m',at:['in','on']},
  {n:'Kitchari spice mix (optional)',rec:'Banyan Botanicals',size:'1 bag',f:'m',at:['on']},
  {n:'Pink or sea salt',size:'1 jar',f:'m',at:['any']},
  {n:'Extra-virgin olive oil',size:'1 bottle',f:'m',at:['any','co']}
 ]},
 {cat:'Drinks',items:[
  {n:'Tulsi tea',rec:'Organic India: Original, Sweet Rose or Ginger',size:'2 boxes',f:'m',at:['any','wf','sp']},
  {n:'Golden milk blend (optional)',rec:'Gaia Herbs',size:'1 jar',f:'m',at:['wf','sp','on']},
  {n:'Unsweetened coconut water',size:'2 bottles',f:'w',at:['any','tj','co']}
 ]},
 {cat:'Purification kit',items:[
  {n:'Tongue scraper (stainless steel or copper)',size:'1',f:'once',at:['any','on']},
  {n:'Neti pot + saline packets',rec:'Any pharmacy (CVS, Walgreens)',size:'1 pot + 1 box',f:'once',at:['any','on']},
  {n:'Distilled water, for neti',size:'1 gallon',f:'m',at:['any']},
  {n:'Unscented candle for trataka',size:'1',f:'once',at:['any']},
  {n:'Sesame or coconut oil for self-massage and oil pulling',size:'1 bottle',f:'m',at:['any','in']}
 ]},
 {cat:'Kitchen kit (one time)',items:[
  {n:'Pressure cooker (Instant Pot 6-qt) or a heavy pot with a lid',size:'1',f:'once',at:['co','on','any']},
  {n:'Electric kettle',size:'1',f:'once',at:['any','on']},
  {n:'Single-serve blender',size:'1',f:'once',at:['any','on']},
  {n:'Glass storage containers',size:'1 set',f:'once',at:['any','co']}
 ]}
];
