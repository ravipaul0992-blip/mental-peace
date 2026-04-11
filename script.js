// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Hero Particles =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
    particlesContainer.appendChild(particle);
}

// ===== Stat Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = { threshold: 0.5 };

const countUp = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased);
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(el => statObserver.observe(el));

// ===== Scroll Reveal for Cards =====
const revealElements = document.querySelectorAll('.about-card, .technique-card, .resource-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Breathing Exercise =====
let breathInterval = null;
let breathTimeout = null;
let cycleCount = 0;
let currentPattern = { inhale: 4, hold: 4, exhale: 4 };

const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');
const breathTimer = document.getElementById('breathTimer');
const breathStart = document.getElementById('breathStart');
const breathStop = document.getElementById('breathStop');
const cycleCountEl = document.getElementById('cycleCount');
const patternBtns = document.querySelectorAll('.pattern-btn');

patternBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        patternBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPattern = {
            inhale: parseInt(btn.dataset.inhale),
            hold: parseInt(btn.dataset.hold),
            exhale: parseInt(btn.dataset.exhale)
        };
        if (breathInterval) {
            stopBreathing();
            startBreathing();
        }
    });
});

function startBreathing() {
    cycleCount = 0;
    cycleCountEl.textContent = '0';
    breathStart.style.display = 'none';
    breathStop.style.display = 'inline-flex';
    runBreathCycle();
}

function stopBreathing() {
    clearInterval(breathInterval);
    clearTimeout(breathTimeout);
    breathInterval = null;
    breathTimeout = null;
    breathCircle.className = 'breathing-circle';
    breathText.textContent = 'Press Start';
    breathTimer.textContent = '';
    breathStart.style.display = 'inline-flex';
    breathStop.style.display = 'none';
}

function runBreathCycle() {
    const { inhale, hold, exhale } = currentPattern;

    // Inhale phase
    breathCircle.className = 'breathing-circle inhale';
    breathText.textContent = 'Breathe In';
    breathCircle.style.transition = `all ${inhale}s ease-in-out`;
    startCountdown(inhale);

    breathTimeout = setTimeout(() => {
        // Hold phase
        if (hold > 0) {
            breathCircle.className = 'breathing-circle hold';
            breathText.textContent = 'Hold';
            startCountdown(hold);

            breathTimeout = setTimeout(() => {
                exhalePhase();
            }, hold * 1000);
        } else {
            exhalePhase();
        }
    }, inhale * 1000);

    function exhalePhase() {
        breathCircle.className = 'breathing-circle exhale';
        breathCircle.style.transition = `all ${exhale}s ease-in-out`;
        breathText.textContent = 'Breathe Out';
        startCountdown(exhale);

        breathTimeout = setTimeout(() => {
            cycleCount++;
            cycleCountEl.textContent = cycleCount;
            runBreathCycle();
        }, exhale * 1000);
    }
}

function startCountdown(seconds) {
    let remaining = seconds;
    breathTimer.textContent = remaining;
    clearInterval(breathInterval);
    breathInterval = setInterval(() => {
        remaining--;
        breathTimer.textContent = remaining > 0 ? remaining : '';
        if (remaining <= 0) clearInterval(breathInterval);
    }, 1000);
}

breathStart.addEventListener('click', startBreathing);
breathStop.addEventListener('click', stopBreathing);

// ===== Affirmations =====
const affirmations = [
    "You are stronger than your anxiety. This moment will pass, and you will be okay.",
    "You are worthy of love, peace, and happiness just as you are.",
    "It's okay to take things one breath at a time. There is no rush.",
    "Your feelings are valid. You don't need to justify how you feel.",
    "You have survived every bad day so far. You are resilient.",
    "It's okay to ask for help. Seeking support is an act of courage.",
    "You are not your thoughts. You are the observer of your thoughts.",
    "Peace is not the absence of storms, but the calm within them.",
    "You deserve to take up space in this world. You matter.",
    "Every small step forward is still progress. Be gentle with yourself.",
    "You don't have to have it all figured out. It's okay to be a work in progress.",
    "The fact that you're trying is enough. You are enough.",
    "Healing is not linear. Be patient with your journey.",
    "You are allowed to set boundaries and protect your energy.",
    "This anxious feeling is temporary. You are permanent."
];

const affirmationText = document.getElementById('affirmationText');
const newAffirmationBtn = document.getElementById('newAffirmation');

newAffirmationBtn.addEventListener('click', () => {
    affirmationText.style.opacity = '0';
    setTimeout(() => {
        const random = Math.floor(Math.random() * affirmations.length);
        affirmationText.textContent = `"${affirmations[random]}"`;
        affirmationText.style.opacity = '1';
    }, 300);
});

// ===== Mood Journal =====
const moodBtns = document.querySelectorAll('.mood-btn');
const journalText = document.getElementById('journalText');
const saveJournal = document.getElementById('saveJournal');
const journalEntries = document.getElementById('journalEntries');
let selectedMood = '';

const moodEmojis = {
    great: '\u{1F60A}',
    good: '\u{1F642}',
    okay: '\u{1F610}',
    low: '\u{1F615}',
    anxious: '\u{1F630}'
};

moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        moodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMood = btn.dataset.mood;
    });
});

function loadJournalEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.innerHTML = '';

    if (entries.length === 0) {
        journalEntries.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No entries yet. Start by selecting your mood and writing your thoughts.</p>';
        return;
    }

    entries.slice(0, 10).forEach((entry, index) => {
        const el = document.createElement('div');
        el.className = 'journal-entry-item';
        el.innerHTML = `
            <div class="journal-entry-header">
                <span class="journal-entry-mood">${moodEmojis[entry.mood] || ''} ${entry.mood}</span>
                <div>
                    <span class="journal-entry-date">${entry.date}</span>
                    <button class="journal-delete" data-index="${index}">remove</button>
                </div>
            </div>
            <p class="journal-entry-text">${entry.text}</p>
        `;
        journalEntries.appendChild(el);
    });

    document.querySelectorAll('.journal-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
            entries.splice(idx, 1);
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            loadJournalEntries();
        });
    });
}

saveJournal.addEventListener('click', () => {
    if (!selectedMood) {
        showToast('Please select your mood first');
        return;
    }
    if (!journalText.value.trim()) {
        showToast('Please write something about how you feel');
        return;
    }

    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.unshift({
        mood: selectedMood,
        text: journalText.value.trim(),
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    });
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    journalText.value = '';
    selectedMood = '';
    moodBtns.forEach(b => b.classList.remove('active'));
    loadJournalEntries();
    showToast('Journal entry saved! You\'re doing great.');
});

loadJournalEntries();

// ===== Calming Sounds (Web Audio API) =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let activeSounds = {};

document.querySelectorAll('.sound-card').forEach(card => {
    card.addEventListener('click', () => {
        const sound = card.dataset.sound;

        if (activeSounds[sound]) {
            activeSounds[sound].stop();
            delete activeSounds[sound];
            card.classList.remove('playing');
            return;
        }

        // Stop other sounds
        Object.keys(activeSounds).forEach(key => {
            activeSounds[key].stop();
            delete activeSounds[key];
        });
        document.querySelectorAll('.sound-card').forEach(c => c.classList.remove('playing'));

        // Generate ambient sound using Web Audio API
        const source = createAmbientSound(sound);
        activeSounds[sound] = source;
        card.classList.add('playing');
    });
});

function createAmbientSound(type) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.15;
    gainNode.connect(audioCtx.destination);

    const bufferSize = 2 * audioCtx.sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'rain') {
        // Brown noise for rain
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.02 * white)) / 1.02;
            last = data[i];
            data[i] *= 3.5;
        }
    } else if (type === 'ocean') {
        // Modulated noise for waves
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.04 * white)) / 1.04;
            last = data[i];
            const wave = Math.sin(i / (audioCtx.sampleRate * 3)) * 0.5 + 0.5;
            data[i] *= wave * 5;
        }
    } else if (type === 'forest') {
        // Gentle filtered noise for forest ambience
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.01 * white)) / 1.01;
            last = data[i];
            const chirp = Math.sin(i / 80) * Math.sin(i / 3000) * 0.3;
            data[i] = data[i] * 3 + chirp * 0.1;
        }
    } else if (type === 'wind') {
        // Pink noise for wind
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode);
    source.start();

    source.stop = (() => {
        const originalStop = source.stop.bind(source);
        return () => {
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
            setTimeout(originalStop, 600);
        };
    })();

    return source;
}

// ===== Quotes Carousel =====
const quotes = [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
    { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
    { text: "The only way out is through.", author: "Robert Frost" },
    { text: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.", author: "Charles Spurgeon" },
    { text: "Be where you are, not where you think you should be.", author: "Unknown" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
    { text: "Surrender to what is. Let go of what was. Have faith in what will be.", author: "Sonia Ricotti" },
    { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" }
];

let currentQuote = 0;
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');

function showQuote(index) {
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = quotes[index].text;
        quoteAuthor.textContent = `- ${quotes[index].author}`;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

document.getElementById('quoteNext').addEventListener('click', () => {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
});

document.getElementById('quotePrev').addEventListener('click', () => {
    currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
    showQuote(currentQuote);
});

// Auto-rotate quotes every 8 seconds
setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
}, 8000);

// ===== Grounding Exercise Modal =====
const calmBtn = document.getElementById('calmBtn');
const calmModal = document.getElementById('calmModal');
const calmClose = document.getElementById('calmClose');
const groundNext = document.getElementById('groundNext');
let groundStep = 1;

calmBtn.addEventListener('click', () => {
    calmModal.classList.add('active');
    groundStep = 1;
    updateGroundingSteps();
});

calmClose.addEventListener('click', () => {
    calmModal.classList.remove('active');
});

calmModal.addEventListener('click', (e) => {
    if (e.target === calmModal) calmModal.classList.remove('active');
});

groundNext.addEventListener('click', () => {
    if (groundStep < 5) {
        document.querySelector(`.ground-step[data-step="${groundStep}"]`).classList.remove('active');
        document.querySelector(`.ground-step[data-step="${groundStep}"]`).classList.add('done');
        groundStep++;
        updateGroundingSteps();
    } else {
        // All done
        showToast('Great job! You completed the grounding exercise.');
        calmModal.classList.remove('active');
        groundStep = 1;
        updateGroundingSteps();
    }
});

function updateGroundingSteps() {
    document.querySelectorAll('.ground-step').forEach(step => {
        step.classList.remove('active', 'done');
        if (parseInt(step.dataset.step) < groundStep) step.classList.add('done');
        if (parseInt(step.dataset.step) === groundStep) step.classList.add('active');
    });
    groundNext.textContent = groundStep === 5 ? 'Complete' : 'Next Step';
}

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you for reaching out! We\'ll get back to you soon.');
    e.target.reset();
});

// ===== Toast Notification =====
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Smooth Active Nav Highlighting =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});
