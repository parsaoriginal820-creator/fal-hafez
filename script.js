// ستاره‌ها
for(let i=0;i<400;i++){
    let s=document.createElement('div');s.className='star';
    s.style.width=s.style.height=(Math.random()*3+1)+'px';
    s.style.top=Math.random()*100+'%';s.style.left=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*4+'s';
    document.getElementById('stars').appendChild(s);
}

// ساعت
function updateClock(){
    const n=new Date();
    const s=n.getSeconds()*6;
    const m=n.getMinutes()*6 + s/60;
    const h=(n.getHours()%12)*30 + m/12;
    document.getElementById('second').style.transform=`rotate(${s+90}deg)`;
    document.getElementById('minute').style.transform=`rotate(${m+90}deg)`;
    document.getElementById('hour').style.transform=`rotate(${h+90}deg)`;
}
setInterval(updateClock,1000);updateClock();

// تقویم دقیق
function toJalali(gy,gm,gd){
    let jy=gy-621,g2=gm>2?gy+1:gy,d=365*gy+Math.floor((g2+3)/4)-Math.floor((g2+99)/100)+Math.floor((g2+399)/400)-80+gd+[0,31,59,90,120,151,181,212,243,273,304,334][gm-1];
    if(gm>2&&((gy%4==0&&gy%100!=0)||gy%400==0))d++;
    let jdays=d-79,jc=Math.floor(jdays/12053);jdays%=12053;jy+=979+jc*2820;
    let y=Math.floor(jdays/366);jdays-=y*366;jy+=y*4;
    let jm=1;while(jdays>(jm<=6?31:30)){jdays-=jm<=6?31:30;jm++;}
    return {jy,jm,jd:jdays+1};
}
const now=new Date();
const j=toJalali(now.getFullYear(),now.getMonth()+1,now.getDate());
const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
document.getElementById('jalaliDate').innerHTML = `<div style="font-size:2.4rem;font-weight:bold">${months[j.jm-1]} ${j.jy}</div><div style="font-size:1.2rem;margin-top:6px;opacity:0.9">${j.jd} ${months[j.jm-1]} ${j.jy}</div>`;
document.getElementById('gregorianDate').textContent=now.toLocaleDateString('fa-IR');

// جدول تقویم
const firstDay=new Date(now.getFullYear(),now.getMonth(),1).getDay();
const daysInMonth=j.jm<=6?31:(j.jm<=11?30:30);
const offset=(firstDay===0?6:firstDay-1);
let html='',day=1;
for(let i=0;i<6;i++){
    html+='<tr>';
    for(let k=0;k<7;k++){
        if(i===0&&k<offset)html+='<td></td>';
        else if(day<=daysInMonth)html+=`<td ${day===j.jd?'class="today"':''}>${day++}</td>`;
        else html+='<td></td>';
    }
    html+='</tr>';if(day>daysInMonth)break;
}
document.getElementById('calendarBody').innerHTML=html;
document.getElementById('events').textContent="روز جهانی معلولان – ۱۰ آذر ۱۴۰۴";

// فال
const falha=[
    {p:"الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها",t:"عشق و آرزوهایت به زودی محقق می‌شود"},
    {p:"صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش",t:"روزگار خوشی در پیش داری"},
    {p:"دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت زاهد او شد و ما شدیم می‌پرست",t:"تغییرات بزرگ و مثبت در راه است"}
];
document.getElementById('get-fal').onclick=()=>{
    const f=falha[Math.floor(Math.random()*falha.length)];
    const card=document.getElementById('fal-card');
    const poem=document.getElementById('poem');
    const taavil=document.getElementById('taavil');
    poem.innerHTML='';taavil.textContent='';card.classList.remove('show');
    setTimeout(()=>card.classList.add('show'),100);
    let i=0;
    function type(){if(i<f.p.length){poem.innerHTML+=f.p[i]==='\n'?'<br>':f.p[i];i++;setTimeout(type,70);}else taavil.textContent=f.t;}
    type();

};
