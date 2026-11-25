/* Learn: the why. Energy of food, the food guide, the 8 limbs, common traps, daily habits and short reads. */
window.PRANA = window.PRANA || {};

PRANA.credit = 'Inspired by the Raja Yoga teachings of Zach Sanders, Conscious Warrior Yoga.';

/* ---------- The energy of food (the three gunas) ---------- */
PRANA.gunas = [
 {k:'f',name:'Balanced',sk:'Sattvic',quality:'Clarity and steadiness',
  lean:'Lean into it',desc:'Varied, nourishing meals that leave you comfortably satisfied.',
  ex:['Fruit and berries','Vegetables: greens, squash, carrots, sweet potato','Rice, oats, quinoa and other whole grains','Lentils, mung dal and chickpeas','Milk, yogurt, ghee and paneer','Nuts, seeds and a little natural sweetness'],
  notice:'Do I feel nourished, comfortable and steadily energized?'},
 {k:'s',name:'Activating',sk:'Rajasic',quality:'Stimulation',
  lean:'Keep it moderate',desc:'Stimulating foods and drinks. Notice them most when they disturb your sleep or comfort.',
  ex:['Lots of coffee or caffeinated tea','Energy drinks and pre-workout','Very spicy or very salty food','Strong sour or fermented flavors'],
  note:'Traditional note: yogic diets usually leave out onion and garlic as too stimulating. That is a tradition, not a health rule; they aren\'t unhealthy.',
  notice:'Do I feel overstimulated, restless or uncomfortable?'},
 {k:'a',name:'Heavy',sk:'Tamasic',quality:'Dullness',
  lean:'Keep it limited',desc:'Patterns that leave you uncomfortably full or sluggish.',
  ex:['Alcohol','Frequent large, rich meals','Frequent sugary snacks and pastries','Frequent fried fast food','Highly processed, low-fiber food'],
  note:'Food safety: throw out food that has spoiled.',
  notice:'Do I feel overly full, heavy or sluggish?'}
];
PRANA.distinctions = [
 'Frozen food and safely stored leftovers can be nourishing. Fresh food has the most life in it, but frozen beats skipping a meal.',
 'Food does not decide your worth or your spiritual progress.',
 'Tiredness, anxiety and low mood have many causes. Food is one input, not the whole story. See a professional when you need to.',
 'How a food affects you depends on how much, when, your health and your own tolerance. Your experience is the guide.'
];
PRANA.keepSimple = ['Build meals around vegetables, grains and protein-rich foods.','Eat enough to nourish yourself.','Notice comfort, energy, digestion and sleep.','Adjust gently rather than becoming rigid.'];

/* ---------- "Can I eat this?" (f = balanced, s = activating, a = heavy) ---------- */
PRANA.foods = [
['Basmati rice','f','The classic yogic grain. White basmati is easiest to digest.'],['Split yellow mung dal','f','The yogi\'s protein, and the lightest legume.'],['Red lentils','f','Quick to cook and easy to digest.'],['Brown or green lentils','f','Cook them well and spice with cumin.'],['Chickpeas','f','Nourishing but heavier. Best at lunch, with cumin.'],['Black or kidney beans','s','Heavy and gassy for many. Cook well and spice.'],['Oats','f','Warm and grounding. Cook or soak them.'],['Quinoa','f','Light and high in protein.'],['Sprouted bread','f','Easier to digest than most flour breads.'],['White bread or pasta','s','Fine sometimes. Heavy in large amounts.'],
['Ghee','f','Prized in yoga and Ayurveda. 1–3 tsp a day.'],['Whole milk','f','Warm and spiced, on its own or with grains or dates.'],['Yogurt','f','Daytime, plain, without fruit.'],['Paneer','f','Fresh cheese, a balanced protein.'],['Aged cheese','s','Rich and salty. Small amounts.'],['Butter','f','In small amounts.'],
['Almonds','f','Soak overnight; peel if you like.'],['Walnuts','f','Soaking helps.'],['Cashews','f','Rich, so a small handful.'],['Sesame or tahini','f','Warming and nourishing.'],['Coconut','f','Cooling. Great in hot weather.'],['Dates','f','Natural sweetness and energy.'],['Raw honey','f','Ayurveda says not to cook or heat it.'],['Maple syrup or jaggery','f','Natural sweeteners, used lightly.'],['White sugar','s','Keep it small.'],['Artificial sweeteners','s','Processed. Notice how you feel.'],
['Sweet fruit: mango, apple, pear, grapes, berries, papaya, melon','f','Ripe and fresh, best on its own.'],['Banana','f','Ayurveda keeps it out of milk and yogurt.'],['Avocado','f','Grounding healthy fat.'],['Lemon or lime','f','Daily, in water and on food.'],['Overripe or spoiling fruit','a','Past its best. Throw out anything spoiled.'],
['Sweet potato','f','Grounding and easy.'],['Squash, zucchini, carrots, beets','f','Classic balanced vegetables.'],['Spinach and leafy greens','f','Cooked in the evening, raw at lunch.'],['Cucumber','f','Cooling, ideal in summer.'],['Green beans, peas','f','Light and easy.'],['Broccoli, cauliflower, cabbage','f','Nutritious. Cook with cumin or fennel if they make you gassy.'],['Tomato','s','Sour and heating. Cooked is easier for many.'],['Eggplant, bell peppers','s','Fine for most. Some traditions keep nightshades small.'],['Radish','s','Pungent.'],['Mushrooms','s','Traditionally avoided by yogis. Nutritionally fine.'],['Onion','s','Traditionally left out as too stimulating. Not unhealthy. Hing is the classic swap.'],['Garlic','s','Traditionally left out as too stimulating. Not unhealthy. Ginger and hing are the classic swaps.'],['Leeks, shallots, chives, scallions','s','The onion family. Same traditional note.'],
['Cumin, coriander, fennel, turmeric, cardamom, cinnamon','f','Digestive, balancing spices.'],['Fresh ginger','f','Kindles digestion.'],['Hing (asafoetida)','f','A tiny pinch replaces onion and garlic.'],['Fresh herbs: cilantro, mint, basil, tulsi','f','Light and cooling.'],['Black pepper','f','A pinch is fine.'],['Hot chili, cayenne, hot sauce','s','Strongly activating. Keep it mild.'],['Salt','s','Moderate amounts. Pink or sea salt.'],['Vinegar, pickles','s','Sour and fermented. Small amounts.'],
['Olive oil, coconut oil','f','Used lightly.'],['Deep-fried food','a','Heavy when frequent.'],['Chips and packaged snacks','a','Heavy when frequent.'],['Plain frozen vegetables','f','Nutritious and practical.'],['Frozen ready meals','s','Can be nourishing. Check labels for salt and additives.'],['Leftovers, same day','f','Fine.'],['Leftovers, 1–3 days, refrigerated','f','Still good food. A little less fresh.'],['Food kept too long or spoiled','a','Throw it out.'],
['Tofu, tempeh','s','Some yogis eat them in moderation. Dal and paneer are the traditional choices.'],['Protein powder','s','Processed. Choose a short, clean label if you use it.'],
['Meat and poultry','a','Traditionally avoided out of ahimsa (non-harm). A personal choice.'],['Fish and seafood','a','Traditionally avoided out of ahimsa.'],['Eggs','a','Traditionally left out of yogic diets.'],
['Warm water','f','The yogi\'s main drink.'],['Herbal tea: tulsi, ginger, chamomile, fennel','f','Freely.'],['Green tea','s','Mild caffeine, a good coffee swap.'],['Coffee','s','One small cup before noon is plenty for most.'],['Black tea or chai','s','Moderate. Chai with milk and spices is gentler.'],['Coconut water','f','Cooling and hydrating.'],['Fresh juice','f','Fresh, not bottled, on its own.'],['Soda','a','Sugar and chemicals. Heavy when frequent.'],['Energy drinks','s','Very activating. Avoid near bedtime.'],['Kombucha','s','Fermented and sour. Occasional.'],['Alcohol','a','Dulls the mind. Yogic practice leaves it out.'],['Chocolate or cacao','s','Stimulating. Small and occasional.'],['Tobacco, vaping, cannabis','a','Dulling. Not part of a yogic life.'],
['Overeating anything','a','Even balanced food becomes heavy in excess.']
];

/* ---------- The 8 limbs, and how Prana uses each ---------- */
PRANA.limbs = [
 {n:1,name:'Yama',en:'How you treat others',body:'Non-harm, truthfulness, not taking what isn\'t given, moderation, and non-grasping.',prana:'Lacto-vegetarian eating (non-harm), clean speech, and kind boundaries in relationships.'},
 {n:2,name:'Niyama',en:'How you treat yourself',body:'Cleanliness (saucha), contentment (santosha), discipline (tapas), self-study (svadhyaya) and surrender (ishvara pranidhana).',prana:'Most of Prana lives here: every purification, the gratitude and reflection practices, and the gentle discipline of a daily rhythm.'},
 {n:3,name:'Asana',en:'Posture',body:'A steady, comfortable body you can sit in.',prana:'Short postures for digestion and energy, walking after meals, and deep rest.'},
 {n:4,name:'Pranayama',en:'Breath',body:'Working with the breath to steady energy (prana).',prana:'The 3-minute calming breath, alternate nostril, humming bee, and skull-shining breath.'},
 {n:5,name:'Pratyahara',en:'Turning the senses inward',body:'Pulling attention back from the pull of the senses.',prana:'Clean inputs, phone-free meals, uplifting sound.'},
 {n:6,name:'Dharana',en:'Concentration',body:'Holding attention on one point.',prana:'Candle gazing.'},
 {n:7,name:'Dhyana',en:'Meditation',body:'Unbroken awareness.',prana:'The daily awareness sit.'},
 {n:8,name:'Samadhi',en:'Absorption',body:'Resting fully in pure awareness. The fruit, not something you do.',prana:'Everything else prepares the ground.'}
];
PRANA.limbsIntro = 'Patanjali\'s Yoga Sutras lay out eight limbs. A common way to see them: the first four (how you live, cleanliness, posture and breath) prepare the body and mind, and the last four are deepening stages of meditation. The Hatha Yoga Pradipika says the same: its cleansings and postures exist to make Raja Yoga, the yoga of meditation, possible. Prana starts where the path starts, with daily living.';
PRANA.sauchaFruits = 'Yoga Sutras 2.41: as cleanliness is established come clarity (sattva), a cheerful mind, one-pointed focus, mastery of the senses, and fitness to realize the true Self. Think of body and mind as a window. Cleaning the glass doesn\'t make the light; it lets the light through.';

/* ---------- Common traps ---------- */
PRANA.traps = [
 {t:'All or nothing',d:'Changing everything on Monday, slipping by Thursday, and quitting.',fix:'Aim for 80%. Follow the 4-week transition and add one change a week. A missed day is just a missed day.'},
 {t:'Conflicting diet advice',d:'Keto one week, raw vegan the next, a new rule from every video.',fix:'Use one test: after eating, do I feel balanced, activated or heavy? Your own experience beats the internet\'s opinion.'},
 {t:'Purity turning into anxiety',d:'Worrying over every ingredient, feeling guilty, judging other people\'s plates.',fix:'Food doesn\'t decide your worth. Eating in peace is more sattvic than eating perfectly while stressed.'},
 {t:'Late, heavy dinners',d:'The biggest meal at 9pm, then heavy mornings and foggy practice.',fix:'Make lunch the biggest meal and finish dinner about 3 hours before bed. Kitchari or soup on late nights.'},
 {t:'Skipping meals, then overeating',d:'No breakfast, a rushed lunch, then a huge evening.',fix:'Three regular meals at steady times. Eat to about three-quarters full.'},
 {t:'Under-eating protein',d:'Dropping meat without adding anything, then feeling weak on training days.',fix:'Put a protein in every meal: dal, lentils, yogurt, paneer, milk, nuts. Add extra on training days.'},
 {t:'Trying every purification at once',d:'Neti, kapalabhati, nauli, a fast and a cold plunge in week one.',fix:'Add one practice at a time, and let it become easy before adding the next.'},
 {t:'Learning extreme techniques from videos',d:'Trying cloth swallowing, saltwater flushes or full nauli alone.',fix:'Home-safe practices only. The "Teacher only" list is for learning in person. Even experienced practitioners have hurt themselves going it alone.'},
 {t:'Pushing breathwork to dizziness',d:'Thinking more intense means more progress.',fix:'Breath practice should feel calm and steady. Dizzy or tingling hands means stop and breathe normally.'},
 {t:'Quitting because it feels weird',d:'Neti and belly pumping feel strange at first, so you stop.',fix:'Resistance is normal, and it takes a handful of days for the body to learn. Give a practice 1–2 weeks before judging it.'},
 {t:'Forcing it on your household',d:'Lecturing family about their food or their mess.',fix:'Make it about you: "this helps my energy." Offer to help. Lead by example, never by rule.'},
 {t:'Caffeine creep',d:'One coffee becomes four, sleep suffers, and so does practice.',fix:'One small cup before noon. Swap the afternoon cup for tulsi or green tea.'},
 {t:'Ignoring sleep',d:'Eating perfectly and sleeping five hours.',fix:'An early, regular bedtime does more for clear mornings than any food.'},
 {t:'Using fasting to make up for overeating',d:'A big weekend, then a punishing fast.',fix:'Fasting is rest for digestion, not penance. Keep the weekly light day gentle and regular.'},
 {t:'Treating it like a diet',d:'Forcing the food rules while skipping the practice.',fix:'Practice comes first. With regular breath, postures and awareness, food preferences often shift on their own, without force.'}
];

/* ---------- Daily habits (the traditional guidelines, each with what to do) ---------- */
PRANA.rules = [
['What','Mostly balanced, fresh food','Fresh, whole, plant-forward food: grains, dal, vegetables, fruit, nuts, seeds, dairy, ghee and gentle spices.','Every meal = a grain + dal or dairy + a vegetable + a little ghee. The Meals tab has you covered.'],
['What','Ahimsa: the traditional lacto-vegetarian diet','Non-harm extends to food. The yogic diet leaves out meat, fish and eggs and includes dairy. It\'s an invitation, not a test. Don\'t judge people who eat differently.','If you choose it, get protein from dal, lentils, yogurt, paneer, milk and nuts.'],
['What','Limit heavy foods','Alcohol, frequent fried or fast food, sugary snacks and large rich meals leave you dull.','Keep them occasional. Throw out spoiled food.'],
['What','Keep activating foods moderate','Lots of coffee, very spicy, very salty and very sour food stir the mind up.','One small coffee before noon. Mild spice. Notice how you sleep.'],
['What','Fresh first, frozen is fine','Food cooked the same day has the most life in it. Frozen vegetables and stored leftovers are still nourishing.','Cook fresh when you can. Plain frozen beats takeout.'],
['How much','Mitahara: stop at three-quarters full','Leave room in the stomach. Overeating even good food makes it heavy.','One meal is about what fits in two cupped hands. Stop at your first "I could eat more."'],
['How much','Eat when hungry','Real hunger means the last meal has digested.','Three meals and at most one snack. No grazing.'],
['When','Make lunch the biggest meal','Digestion is strongest at midday.','Lunch between 12 and 1:30. Lighter breakfast and dinner.'],
['When','Dinner light and early','Going to bed full makes for heavy mornings.','Finish dinner about 3 hours before bed.'],
['When','Practice on an empty stomach','A full stomach gets in the way of breath and makes you drowsy.','Meals 2+ hours before practice. Water or a little fruit up to 1 hour before. Wait 30 minutes after practice to eat.'],
['When','Same times every day','The body digests best on a rhythm.','The Today tab sets your times from your wake-up time.'],
['When','A light day once a week','Rest for digestion and discipline for the mind.','Monday light day: fruit, kitchari and tea, if it suits you.'],
['How','Eat mindfully','Sit down, no phone, no TV, no driving.','Three breaths and a word of thanks, then the first five bites in silence.'],
['How','Warm over ice cold','Ayurveda says ice-cold drinks dampen digestion.','Warm or room-temperature water, in small sips with meals.'],
['How','Fruit on its own','Fruit digests quickly and sits best on its own.','Fruit 30 minutes before or 2 hours after other food.'],
['How','Use digestive spices','Cumin, coriander, fennel, ginger, turmeric, cardamom and cinnamon aid digestion and add flavor.','A pinch in every cooked meal.'],
['How','Drink like a yogi','Alcohol dulls the mind; too much caffeine agitates it.','Morning: warm lemon water. Day: herbal or green tea, coconut water. Evening: golden milk or tulsi.'],
['How','Cook and eat with a calm mind','Your state of mind goes into the meal.','If you\'re upset, take 10 breaths before you eat.'],
['How','Be gentle with yourself','Flexibility and kindness, toward yourself and others, are part of the practice.','Aim for 80% and let the rest go.']
];

/* ---------- Short reads ---------- */
PRANA.reads = [
 {t:'Mitahara: the yogi\'s portion rule',h:'<p>The Hatha Yoga Pradipika calls moderate eating (mitahara) essential: pleasant, nourishing food, with part of the stomach left empty.</p><p><b>In practice:</b> half the stomach food, a quarter water, a quarter empty. Stop at the first light sigh or "I could eat more." One meal is roughly what fits in two cupped hands.</p>'},
 {t:'Agni: your digestive fire',h:'<p>Ayurveda treats digestion as a fire (agni). Like the sun, it is strongest at midday and low in the morning and evening. That is why lunch is the biggest meal and dinner stays light.</p><p>Signs your agni is happy: real hunger at mealtimes, no heaviness after eating, a clear tongue in the morning, steady energy. Woke with a coated tongue and no appetite? Have a lighter day.</p>'},
 {t:'Food combinations Ayurveda skips',h:'<ul><li><b>Milk with banana, sour fruit or salty food.</b> Have milk on its own or with sweet spices, dates or grains.</li><li><b>Fruit with meals.</b> Eat fruit alone.</li><li><b>Yogurt at night.</b></li><li><b>Cooked or heated honey.</b> Stir honey in once food has cooled to warm.</li></ul><p class="small">These are traditional guidelines. If something sits well with you, trust your experience.</p>'},
 {t:'The offering before you eat',h:'<p>Before each meal, sit, put the phone down, take three slow breaths and offer the food. A traditional verse is Bhagavad Gita 4.24, which says the offering, the food, the fire and the one who offers are all the Divine.</p><p>A plain version works just as well: "May this food nourish me so I can serve well." Then eat the first five bites in silence.</p>'},
 {t:'Eating for the season',h:'<p><b>Hot months:</b> heat builds pitta, the fire element. Lean cooling: cucumber, coconut water, melon, mango, cilantro, mint, fennel, ghee, basmati and mung dal. Go easy on chili, sour and fermented foods.</p><p><b>Cold or dry months:</b> more warm soups, kitchari, root vegetables, ginger and warming spices.</p><p>Buy what is in season locally. The farmers market tells you what that is.</p>'},
 {t:'Protein for an active body',h:'<p>A lacto-vegetarian diet gives plenty of protein if every meal has a source: mung dal and lentils (about 9g per ½ cup cooked), Greek yogurt (about 15–18g per ¾ cup), paneer (about 14g per 3 oz), milk (8g per cup), and nuts, seeds and tahini. Rice and dal together make a complete protein, which is why kitchari is the classic.</p><p>On heavy training days, add ½ cup of lentils at lunch or a yogurt bowl as a snack. With specific health goals or conditions, check with a doctor or dietitian.</p>'},
 {t:'Eating out and social life',h:'<ul><li>Indian restaurants: plain basmati, yellow dal, saag paneer, vegetable dishes, raita.</li><li>Anywhere else: a grain bowl or salad with beans, rice and avocado.</li><li>Drinks with friends: sparkling water with lime. No explanation needed.</li><li>Eating with peace among friends is more sattvic than eating perfectly while stressed.</li></ul>'},
 {t:'Your 4-week transition',h:'<ol><li><b>Week 1:</b> Warm water and tongue scraping on waking. Make lunch your biggest meal. Swap half your coffee for tea. Cook kitchari once. Try the 3-minute breath daily.</li><li><b>Week 2:</b> Finish dinner 3 hours before bed. Eat without screens. Add a walk after meals. If you choose the traditional path, start eating vegetarian.</li><li><b>Week 3:</b> Cut back alcohol and fried food. Add one purification (neti or belly pumping). Try a Monday light day.</li><li><b>Week 4:</b> Stop at three-quarters full. Add golden milk and an evening awareness sit. Coffee down to one small cup.</li></ol>'},
 {t:'Your minimal kitchen',h:'<ul><li><b>Pressure cooker or a heavy pot with a lid</b> for kitchari.</li><li><b>Electric kettle</b> for morning water, oats and tea.</li><li><b>One skillet</b> for paneer.</li><li><b>Single-serve blender</b> (optional).</li><li><b>One big bowl, one big mug, one spoon,</b> plus glass containers for leftovers.</li></ul><p><b>Clean-up habit:</b> rinse right after eating. Ten seconds now saves ten minutes later, and dishes never sit overnight.</p>'}
];
