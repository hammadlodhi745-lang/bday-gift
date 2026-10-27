document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.getElementById('envelope');
    const enterSiteBtn = document.getElementById('enter-site-btn');
    const mainContent = document.getElementById('main-content');

    openSurpriseBtn.addEventListener('click', () => {
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.add('d-none');
            envelopeOverlay.classList.remove('d-none');
        }, 600);
    });

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
    });

    enterSiteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
            envelopeOverlay.classList.add('d-none');
            mainContent.classList.remove('d-none');
        }, 600);
    });

    const countdownContainer = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date();
        const isBirthday = now.getMonth() === 9 && now.getDate() === 29;

        if (isBirthday) {
            countdownContainer.innerHTML = '<h4 class="font-serif text-burgundy fw-bold">Aaj aapka khaas din hai! Salgirah mubarak ❤️</h4>';
            return;
        }

        let birthday = new Date(now.getFullYear(), 9, 29);
        if (now > birthday) {
            birthday = new Date(now.getFullYear() + 1, 9, 29);
        }

        const diff = birthday.getTime() - now.getTime();
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const totalMinutes = Math.floor((diff / (1000 * 60)) % 60);
        const totalSeconds = Math.floor((diff / 1000) % 60);

        countdownContainer.innerHTML = `
            <div class="countdown-unit glass-card px-3 py-2 text-center shadow-sm">
                <span class="fs-4 fw-bold text-burgundy">${totalDays}</span><br><small class="text-muted">Din</small>
            </div>
            <div class="countdown-unit glass-card px-3 py-2 text-center shadow-sm">
                <span class="fs-4 fw-bold text-burgundy">${totalHours}</span><br><small class="text-muted">Ghantay</small>
            </div>
            <div class="countdown-unit glass-card px-3 py-2 text-center shadow-sm">
                <span class="fs-4 fw-bold text-burgundy">${totalMinutes}</span><br><small class="text-muted">Minute</small>
            </div>
            <div class="countdown-unit glass-card px-3 py-2 text-center shadow-sm">
                <span class="fs-4 fw-bold text-burgundy">${totalSeconds}</span><br><small class="text-muted">Saniye</small>
            </div>
        `;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.addEventListener('show.bs.modal', function (event) {
        const card = event.relatedTarget;
        const imgSrc = card.getAttribute('data-img');
        const imgCaption = card.getAttribute('data-caption');
        document.getElementById('lightbox-img').src = imgSrc;
        document.getElementById('lightbox-caption').textContent = imgCaption;
    });

    const giftButtons = document.querySelectorAll('.open-gift-btn');
    const romanticModal = new bootstrap.Modal(document.getElementById('romanticModal'));
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    const giftMessages = {
        '1': { title: 'Thori si khushi 🎁', msg: 'Aapki khushi meri sab se pehli tarjeeh hai. Har din aapke liye khushiyan aur sukoon laaye. ❤️' },
        '2': { title: 'Mere dil ka khat 💌', msg: 'Aapke saath guzra har lamha meri zindagi ka sab se khoobsurat hissa hai. Jaisi aap hain, waisi hi rehne ke liye aapka shukriya.' },
        '3': { title: 'Ek aur tohfa 💖', msg: 'Aaj aapko ek cheez de sakoon, toh woh yeh hogi ke aap khud ko meri nazar se dekh sakein. Aap mere liye sab se khaas hain. ❤️' }
    };

    giftButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.gift-box-card');
            const giftId = card.getAttribute('data-gift');
            const content = giftMessages[giftId];
            modalTitle.textContent = content.title;
            modalMessage.textContent = content.msg;
            romanticModal.show();
        });
    });

    const wishesArray = [
        'Aapki muskurahat ko hamesha koi na koi wajah milti rahe.',
        'Yeh saal aapke liye sukoon, khushiyan aur khoobsurat mauqay laaye.',
        'Aapko woh sab mile jo aapka dil chahta hai, kyunki aap har khushi ki haqdar hain. ❤️',
        'Aapke dil ke qareeb har khwab poora ho.',
        'Meri sab se pyari jaan ko salgirah bohat bohat mubarak.'
    ];

    const generateWishBtn = document.getElementById('generate-wish-btn');
    const wishDisplay = document.getElementById('wish-display');
    let lastWishIndex = -1;

    generateWishBtn.addEventListener('click', () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * wishesArray.length);
        } while (randomIndex === lastWishIndex);

        lastWishIndex = randomIndex;
        wishDisplay.textContent = `"${wishesArray[randomIndex]}"`;
    });

    const secretModalBtn = document.getElementById('secret-modal-btn');
    secretModalBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Aapke liye ek raaz ki baat 🤫';
        modalMessage.textContent = 'Zindagi ne mujhe bohat si khoobsurat cheezein di hain, magar aapke saath ki yaadein un mein sab se qeemti hain. Aap duniya bhar ke pyaar ki haqdar hain. ❤️';
        romanticModal.show();
    });

    const reReadBtn = document.getElementById('re-read-btn');
    reReadBtn.addEventListener('click', () => {
        document.getElementById('letter-section').scrollIntoView({ behavior: 'smooth' });
    });
});