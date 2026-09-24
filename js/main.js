// ========== THEME TOGGLE (semua halaman) ==========
(function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    function applyLabel(theme) {
        themeToggle.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
        );
    }

    // Set label awal sesuai tema yang sudah diterapkan oleh script anti-flash di <head>
    applyLabel(document.documentElement.getAttribute('data-theme') || 'light');

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* private mode: abaikan */ }
        applyLabel(next);
    });

    // Kalau user belum pernah memilih manual, ikuti perubahan preferensi sistem secara live
    if (window.matchMedia) {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        mql.addEventListener('change', (e) => {
            let hasManualPref = false;
            try { hasManualPref = localStorage.getItem('theme') !== null; } catch (err) { /* abaikan */ }
            if (!hasManualPref) {
                const theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                applyLabel(theme);
            }
        });
    }
})();
// ========== 0. NAV TOGGLE (semua halaman) ==========
(function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Tutup menu saat salah satu link diklik (UX di mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Tutup menu saat klik di luar nav
    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        const clickedInsideNav = e.target.closest('nav');
        if (!clickedInsideNav) closeMenu();
    });

    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
})();

// ========== 1. TYPING EFFECT (khusus index.html) ==========
(function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return; // Hanya berjalan jika elemen ada (index.html)

    const names = ['Dimas Luthfi', 'Web Developer', 'Mahasiswa SI'];

    // Kunci lebar slot: tiap teks dipasang tak terlihat di slot yang sama,
    // sehingga lebar slot = teks terpanjang dan layout hero tidak bergeser saat mengetik
    const slot = typingText.parentElement;
    names.forEach(name => {
        const sizer = document.createElement('span');
        sizer.className = 'typing-sizer';
        sizer.setAttribute('aria-hidden', 'true');
        sizer.textContent = name;
        slot.appendChild(sizer);
    });

    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentName = names[nameIndex];
        if (isDeleting) {
            typingText.textContent = currentName.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentName.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentName.length) {
            delay = 2000; // Jeda saat teks selesai diketik
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            nameIndex = (nameIndex + 1) % names.length;
            delay = 500; // Jeda sebelum mengetik kata baru
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect(); // Mulai efek
})();

// ========== 2. GENERATE PROJECT CARDS (khusus index.html) ==========
(function initProjectCards() {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return; // Hanya berjalan jika elemen ada (index.html)

    const projects = [
        { title: 'Website Profil', desc: 'Website profil dengan HTML & CSS', image: 'https://via.placeholder.com/300x200/2563eb/fff?text=Profil' },
        { title: 'Kalkulator JS', desc: 'Kalkulator interaktif', image: 'https://via.placeholder.com/300x200/2563eb/fff?text=Kalkulator' },
        { title: 'Form Interaktif', desc: 'Form pendaftaran dengan validasi', image: 'https://via.placeholder.com/300x200/2563eb/fff?text=Form' }
    ];

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
        `;

        card.addEventListener('click', () => {
            alert(`Anda memilih proyek: ${project.title}`);
        });

        projectGrid.appendChild(card);
    });
})();

// ========== 3. SKILL BAR ANIMATION (khusus about.html) ==========
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (bars.length === 0) return; // Hanya berjalan jika elemen ada (about.html)

    // Animasikan saat elemen masuk viewport, bukan langsung saat load
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percent = fill.dataset.percent || 0;
                fill.style.width = percent + '%';
                obs.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
})();

// ========== 4. CONTACT FORM VALIDATION (khusus contact.html) ==========
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return; // Hanya berjalan jika elemen ada (contact.html)

    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    const fields = {
        name: {
            input: document.getElementById('name'),
            group: document.getElementById('group-name'),
            validate: (v) => v.trim().length >= 3
        },
        email: {
            input: document.getElementById('email'),
            group: document.getElementById('group-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        },
        subject: {
            input: document.getElementById('subject'),
            group: document.getElementById('group-subject'),
            validate: (v) => v.trim().length >= 3
        },
        message: {
            input: document.getElementById('message'),
            group: document.getElementById('group-message'),
            validate: (v) => v.trim().length >= 10
        }
    };

    function setFieldValidity(field, isValid) {
        field.group.classList.toggle('error', !isValid);
        field.input.setAttribute('aria-invalid', String(!isValid));
    }

    function validateField(key) {
        const field = fields[key];
        const isValid = field.validate(field.input.value);
        setFieldValidity(field, isValid);
        return isValid;
    }

    // Validasi real-time: saat user selesai mengetik (blur) & saat mengetik ulang setelah error
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.input.addEventListener('blur', () => validateField(key));
        field.input.addEventListener('input', () => {
            if (field.group.classList.contains('error')) validateField(key);
        });
    });

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status show ${type}`;
    }

    function hideStatus() {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hideStatus();

        let allValid = true;
        Object.keys(fields).forEach(key => {
            const valid = validateField(key);
            if (!valid) allValid = false;
        });

        if (!allValid) {
            showStatus('Mohon periksa kembali data yang Anda isi.', 'error');
            const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) firstError.focus();
            return;
        }

        // Tidak ada backend nyata: simulasikan pengiriman
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';

        setTimeout(() => {
            showStatus('Pesan berhasil terkirim! Terima kasih sudah menghubungi saya.', 'success');
            form.reset();
            Object.values(fields).forEach(field => setFieldValidity(field, true));
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        }, 800);
    });
})();