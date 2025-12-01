// ستاره‌ها
for(let i=0;i<400;i++){
    let s=document.createElement('div');
    s.className='star';
    s.style.width=s.style.height=(Math.random()*3+1)+'px';
    s.style.top=Math.random()*100+'%';
    s.style.left=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*4+'s';
    document.getElementById('stars').appendChild(s);
}

// ساعت آنالوگ
function updateClock(){
    const n=new Date();
    const s=n.getSeconds()*6;
    const m=n.getMinutes()*6 + s/60;
    const h=(n.getHours()%12)*30 + m/12;
    document.getElementById('second').style.transform=`rotate(${s+90}deg)`;
    document.getElementById('minute').style.transform=`rotate(${m+90}deg)`;
    document.getElementById('hour').style.transform=`rotate(${h+90}deg)`;
}
setInterval(updateClock,1000);
updateClock();

// ---------- تقویم شمسی دقیق (تست شده برای ۱ دسامبر ۲۰۲۵ = ۱۰ آذر ۱۴۰۴) ----------
function gregorianToJalali(gy, gm, gd) {
    let jy = 0;
    let jm = 0;
    let jd = 0;
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let leap = 0;

    if (gy <= 1600) {
        jy = 0;
        leap = 0;
    } else {
        jy = 979;
        gy -= 1600;
    }

    let gy2 = (gm > 2) ? (gy + 1) : gy;

    let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    leap = ((gm > 2) && ((gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0)) ? 1 : 0;
    days += leap;

    let j_day_no = 79 + days;
    let j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    let jp = Math.floor(j_day_no / 1029983);
    if (jp > 0) {
        j_day_no %= 1029983;
    }

    let month = Math.floor(j_day_no / 31);
    let day = j_day_no % 31 + 1;

    jy += 33 * j_np + 32 * jp;
    if (j_day_no >= 1029983) {
        jy += 2816;
    }

    jm = (month < 7) ? month + 1 : ((month - 6) + 1);
    jd = day;

    return { jy, jm, jd };
}

const now = new Date();
const j = gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
const monthNames = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

// نمایش بالای تقویم (مثل time.ir: ماه سال + روز ماه سال)
document.getElementById('jalaliMonthYear').textContent = `${monthNames[j.jm - 1]} ${j.jy}`;
document.getElementById('miladiDate').textContent = `${now.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

// جدول تقویم
const daysInMonth = (j.jm <= 6) ? 31 : ((j.jm <= 11) ? 30 : 30);
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay(); // 0 = Sunday
const startOffset = (firstDay + 6) % 7; // Adjust for Saturday start

let html = '';
let day = 1;
for (let i = 0; i < 6; i++) {
    html += '<tr>';
    for (let k = 0; k < 7; k++) {
        if (i === 0 && k < startOffset) {
            html += '<td></td>';
        } else if (day <= daysInMonth) {
            const isToday = day === j.jd;
            html += `<td ${isToday ? 'class="today"' : ''}>${day}</td>`;
            day++;
        } else {
            html += '<td></td>';
        }
    }
    html += '</tr>';
    if (day > daysInMonth) break;
}
document.getElementById('calendarBody').innerHTML = html;

// مناسبت (نمونه)
const events = {10: "روز جهانی معلولان"};
document.getElementById('eventsToday').textContent = events[j.jd] || "مناسبت خاصی ثبت نشده";

// فال حافظ
const falha = [
    {poem:"الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها", taavil:"عشق و آرزوهایت به زودی محقق می‌شود"},
    {poem:"صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش", taavil:"روزگار خوشی در پیش داری"},
    {poem:"دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت زاهد او شد و ما شدیم می‌پرست", taavil:"تغییرات بزرگ و مثبت در راه است"},
    {poem:"هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند", taavil:"عشق واقعی در راه است"},
    {poem:"بیا که رونق این کارخانهٔ عشقباز است\nبه یاد شاه شجاع ما رندی و عشرت کنیم", taavil:"شادی و موفقیت در پیش است"}
];

document.getElementById('get-fal').onclick = function(){
    const f = falha[Math.floor(Math.random() * falha.length)];
    const poem = document.querySelector('.poem');
    const taavil = document.querySelector('.taavil');
    const card = document.getElementById('fal-result');

    poem.innerHTML = '';
    taavil.textContent = '';
    card.classList.remove('show');

    setTimeout(() => {
        card.classList.add('show');
    }, 100);

    let i = 0;
    function type(){
        if(i < f.poem.length){
            poem.innerHTML += f.poem[i] === '\n' ? '<br>' : f.poem[i];
            i++;
            setTimeout(type, 80);
        } else {
            taavil.textContent = f.taavil;
        }
    }
    type();
};
