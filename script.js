document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- 2. MOBIL MENU TOGGLE ---
    const mobileBtn = document.getElementById("mobile-toggle");
    const navLinks = document.querySelector(".nav-links");

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // --- 3. OUR CLASSES TABS ---
    const buttons = document.querySelectorAll(".class-btn");
    const title = document.getElementById("class-title");
    const desc = document.getElementById("class-desc");
    const img = document.getElementById("class-image");

    const contentData = {
        yoga: {
            title: "Why are your Yoga?",
            desc: "Yoga helps you to relax and regain your energy. Lorem ipsum dolor sit amet.",
            img: "assets/yoga.jpg"
        },
        group: {
            title: "Group Sessions Power",
            desc: "Join the group energy and push your limits together with friends.",
            img: "assets/yoga.jpg" // Grup resmi varsa değiştir: assets/group.jpg
        },
        solo: {
            title: "Focus on Yourself",
            desc: "Private sessions tailored just for your specific needs and goals.",
            img: "assets/yoga.jpg" // Solo resmi varsa değiştir
        },
        stretching: {
            title: "Flexibility & Mobility",
            desc: "Prevent injuries and feel better with our advanced stretching classes.",
            img: "assets/yoga.jpg" // Stretching resmi varsa değiştir
        }
    };

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".class-btn.active").classList.remove("active");
            btn.classList.add("active");
            
            const type = btn.getAttribute("data-target");
            title.textContent = contentData[type].title;
            desc.textContent = contentData[type].desc;
            img.src = contentData[type].img;
        });
    });

    // --- 4. BMI CALCULATOR ---
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const arrow = document.getElementById("bmi-arrow");
    const bmiVal = document.getElementById("bmi-val");

    function calculateBMI() {
        const h = heightInput.value;
        const w = weightInput.value;

        if (h > 0 && w > 0) {
            const hM = h / 100;
            const bmi = w / (hM * hM);
            const bmiRounded = bmi.toFixed(1);
            bmiVal.textContent = bmiRounded;

            // Grafik üzerinde ok pozisyonu (Tahmini Yüzdelik)
            // Grafik soldan sağa: Under(<18.5) - Normal(18.5-25) - Over(25-30) - Obese(30-35) - Ext(>35)
            // Toplam 5 dilim var gibi düşünürsek her biri %20 yer kaplar.
            
            let position = 0;

            if (bmi < 18.5) {
                // 0% - 20% arası
                position = 10 + ((bmi / 18.5) * 10); 
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                // 20% - 40% arası
                position = 30;
            } else if (bmi >= 25 && bmi <= 29.9) {
                // 40% - 60% arası
                position = 50;
            } else if (bmi >= 30 && bmi <= 34.9) {
                // 60% - 80% arası
                position = 70;
            } else {
                // 80% - 100%
                position = 90;
            }
            
            // Sınırları koru
            if (position > 95) position = 95;
            if (position < 5) position = 5;

            arrow.style.left = `${position}%`;
        }
    }

    heightInput.addEventListener("input", calculateBMI);
    weightInput.addEventListener("input", calculateBMI);

});