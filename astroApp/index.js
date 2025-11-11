document.addEventListener('DOMContentLoaded', () => {
    // size = 31
        const compliments = [
    "You have a pure and kind-hearted soul.",
    "Your presence brings peace and positivity to others.",
    "You always think of others before yourself — a true giver.",
    "People admire your calm and composed nature.",
    "You radiate warmth and compassion wherever you go.",
    "You are deeply intuitive and always understand unspoken emotions.",
    "You spread happiness just by being yourself.",
    "Your inner strength inspires those around you.",
    "You are a natural healer with your words and energy.",
    "You stay grounded and humble even when praised.",
    "Your generosity makes the world a better place.",
    "You carry wisdom beyond your years.",
    "You always lift others up, never tear them down.",
    "You find beauty in small things and appreciate life deeply.",
    "You are admired for your loyalty and honesty.",
    "People feel safe and valued around you.",
    "You have a unique charm that draws people towards you.",
    "Your laughter is contagious and spreads joy.",
    "You handle tough times with incredible grace.",
    "You always choose love and empathy over anger.",
    "You inspire others to be better without even trying.",
    "You speak with kindness and listen with understanding.",
    "Your dedication to helping others is truly rare.",
    "Your positive aura lights up every room you enter.",
    "You have a natural ability to bring people together.",
    "You turn challenges into opportunities with ease.",
    "You believe in the goodness of people — and it shows.",
    "You are deeply spiritual and connected to your inner self.",
    "Your presence feels like a blessing to those who know you.",
    "You are thoughtful, sincere, and truly irreplaceable.",
    "You have a heart that only gives, never expects."
    ];

    // size = 20
        const victimCardsAstroStyle = [
    "You care deeply for others, but they often forget your worth.",
    "Your heart carries silent pain, yet you always choose to smile.",
    "You give your 100%, but people still question your intentions.",
    "Your silence hides the storms you've survived.",
    "You stand by everyone, yet when you need someone, you're alone.",
    "You're often misunderstood, even when your heart is pure.",
    "You carry others’ burdens, but no one asks how *you* are.",
    "You forgive easily, even when you’re the one who needs healing.",
    "You expect little, but still get disappointed.",
    "You stay strong for others, but who stays strong for you?",
    "You’re the one who always adjusts, always compromises.",
    "Your kindness is often taken for granted.",
    "You’ve been broken, but you still offer love with open arms.",
    "You wish for peace, but life keeps testing your patience.",
    "You don't ask for much, just honesty and loyalty — yet even that feels too much.",
    "You’re the one people call in crisis, but vanish when you’re in pain.",
    "You try to keep everyone happy, but forget your own smile.",
    "You love with depth, but often receive only shallow emotions in return.",
    "You crave a connection that understands your silence.",
    "You act like you're okay, but you're tired of pretending.",
    "Your soul has been through a lot, but you still believe in love and light."
    ];

    // size = 30
    const recommendations = [
    "Help someone without expecting anything in return today.",
    "Speak kindly — your words carry energy that echoes.",
    "Spend a few quiet minutes in gratitude every morning.",
    "Let go of one grudge — it’s only weighing you down.",
    "Offer water or food to a stray animal or bird.",
    "Donate something you don’t use to someone who needs it.",
    "Forgive someone, even if they don’t apologize — for your own peace.",
    "Light a diya or candle and send love to the universe.",
    "Pray not just for yourself, but for the happiness of others too.",
    "Meditate on your breath and thank it for keeping you alive.",
    "Be honest today, even when it’s hard — truth attracts clarity.",
    "Avoid gossip — let your energy speak in silence.",
    "Help someone without them knowing — quiet kindness creates pure karma.",
    "Bless the people who hurt you — they were lessons in disguise.",
    "Speak a few words of encouragement to someone feeling low.",
    "Give time to an elder or listen to their stories with love.",
    "Keep a plant and nurture it — as it grows, so will your peace.",
    "Avoid unnecessary arguments today — peace is more powerful than being right.",
    "Respect time — yours and others’. Punctuality is silent discipline.",
    "Eat mindfully and thank your food before eating.",
    "Smile at a stranger — that tiny spark might brighten their day.",
    "Avoid complaining for a day and notice how light you feel.",
    "Declutter a small space — clearing space clears your energy.",
    "Share your knowledge — what you give multiplies in blessings.",
    "Appreciate someone sincerely — your words can become their strength.",
    "Walk barefoot on grass — connect with nature and your root chakra.",
    "Send a silent prayer to someone you miss or care about.",
    "Don’t compare yourself today — your journey is uniquely divine.",
    "Write down 3 things you're grateful for before sleeping.",
    "Trust divine timing — what’s meant for you will never miss you."
    ];


    // size = 12
        const futurePredictions = [
    "You’ll become a fearless leader who inspires thousands.",
    "You’re destined to build a life of luxury through your creativity.",
    "You’ll rise as a famous content creator or media personality.",
    "Your future lies in healing others and spreading emotional warmth.",
    "You’ll shine in the spotlight as a performer or powerful speaker.",
    "You’ll master a profession that demands precision and intellect.",
    "You’ll bring harmony and elegance into the world through law, art, or fashion.",
    "You’ll dive deep into psychology, secrets, and transformation — and come out stronger.",
    "Your future includes exploring the world and becoming a spiritual teacher or guide.",
    "You’re destined to lead organizations and build strong empires.",
    "You will invent or revolutionize something that changes how people live.",
    "You’ll become an artist, healer, or storyteller who touches souls."
    ];

    // size = 20
    const loveAndRelationshipPredictions = [
  "Your heart is waiting for a love that feels like home, not a thrill.",
  "A deep soul connection is forming in silence — the universe is aligning it for you.",
  "You attract emotionally intense love, because you love with your entire soul.",
  "You may feel unseen sometimes, but someone out there dreams of loving you right.",
  "Your loyalty in love is rare, and soon it will be cherished by the right heart.",
  "Stop doubting your worth — the love you’re looking for is also looking for you.",
  "You give silent love — one day, someone will match that energy and effort.",
  "The next person you love will feel like peace, not confusion.",
  "Your love life is entering a healing phase — trust the timing, not the past.",
  "Someone is manifesting a love just like yours — soulful, deep, and pure.",
  "You’ve been the strong one in love — now the stars are sending you softness.",
  "Your energy attracts people who need healing, but soon you’ll attract someone whole.",
  "The universe has seen your heartbreak — it's sending a love that feels safe.",
  "Your future partner will admire your mind as much as your heart.",
  "In love, you crave emotional depth — and yes, it's coming your way soon.",
  "You deserve a love that doesn’t make you question your worth — only cherish it.",
  "The one meant for you will see the beauty in your silence too.",
  "Romance is written in your stars — but patience is your current lesson.",
  "You’re not hard to love — you just love in a way that’s not for the weak.",
  "A karmic cycle is ending — this time, love will feel like ease, not effort."
];

    // size =15
        const currentAstroPhase = [
    "You’re healing silently, and no one even knows how strong you're becoming.",
    "Your heart is learning to protect itself without turning cold.",
    "The universe is teaching you patience through people and delays.",
    "You’re being tested, not punished — trust the process.",
    "Right now, you're shedding old versions of yourself without realizing it.",
    "You’re learning to walk away from what no longer aligns with your soul.",
    "The energy around you is shifting — something big is about to begin.",
    "You’re finding clarity in confusion, and it’s making you unshakable.",
    "People don’t see it, but you’re in your transformation era.",
    "Right now, silence is your greatest power — and you're using it well.",
    "You’re in a karmic cycle reset — what’s meant for you won’t pass you.",
    "Your soul is tired, but your spirit is quietly preparing for a breakthrough.",
    "You’re craving peace more than attention, and that’s growth.",
    "Right now, the universe is pushing you to choose yourself, finally.",
    "You're being aligned with people and situations that match your energy."
    ];





    const astroForm = document.getElementById('astro-form');
    const predictionSection = document.getElementById('prediction-section');
    const predictionTitle = document.getElementById('prediction-title');
    const resetButton = document.getElementById('reset-button');

    // Get the result fields
    const zodiacSignText = document.getElementById('zodiac-sign-text');
    const loveText = document.getElementById('love-text');
    const careerText = document.getElementById('career-text');
    const wellnessText = document.getElementById('wellness-text');
    const yourLove = document.getElementById('your-love')
    const universeText = document.getElementById('universe-text')


    astroForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const yr = parseInt(document.getElementById('year').value)

        // --- DUMMY PREDICTION LOGIC ---
        // In a real app, you would make an API call here.
        // For this demo, we'll generate some placeholder predictions.

        const zodiacSign = getZodiacSign(day, month);
        const userName = name.split(' ')[0]; // Get the first name

        // Update the prediction title

        predictionTitle.textContent = `Your Cosmic Blueprint, ${userName}`;


        zodiacSignText.textContent = `As a ${zodiacSign}, ${compliments[Math.floor(Math.random() * compliments.length)]}.`;
        loveText.textContent = `${victimCardsAstroStyle[Math.floor(Math.random() * victimCardsAstroStyle.length)]}`;
        careerText.textContent = `${futurePredictions[Math.floor(Math.random() * futurePredictions.length)]}`;
        wellnessText.textContent = `${recommendations[(userName.length * yr)%30]}`;
        yourLove.textContent = `${loveAndRelationshipPredictions[Math.floor(Math.random() * loveAndRelationshipPredictions.length)]}`;
        universeText.textContent = `${currentAstroPhase[Math.floor(Math.random() * currentAstroPhase.length)]}`;


        // Hide the form and show the prediction section
        astroForm.parentElement.classList.add('hidden');
        predictionSection.classList.remove('hidden');

        // Scroll to the prediction section for a smooth user experience
        predictionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    resetButton.addEventListener('click', () => {
        // Hide prediction and show form
        predictionSection.classList.add('hidden');
        astroForm.parentElement.classList.remove('hidden');
        astroForm.reset(); // Clear the form fields

        // Scroll back to the form
        astroForm.parentElement.scrollIntoView({ behavior: 'smooth' });
    });

    // Simple function to determine Zodiac sign (for demo purposes)
    function getZodiacSign(day, month) {
        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
        if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
        if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
        if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
        if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
        if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
        if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
        if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
        if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
        if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
        if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    }
});