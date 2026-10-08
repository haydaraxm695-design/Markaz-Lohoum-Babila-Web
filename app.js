const cats=[['offers','🔥','العروض'],['chicken','🐔','جاج'],['lamb','🐑','غنم'],['beef','🐄','عجل']];
const defaults=[
{id:1,c:'offers',n:'عرض اليوم',d:'عرض مميز يحدده المحل يومياً',p:'حسب العرض',e:'🔥',tag:'عرض مميز'},
{id:2,c:'chicken',n:'دجاج طازج',d:'دجاج طازج يومياً وتجهيز حسب الطلب',p:'حسب الوزن',e:'🐔',tag:'طازج يومياً'},
{id:3,c:'chicken',n:'صدر دجاج',d:'صدر دجاج طازج للتقطيع أو التجهيز',p:'حسب الوزن',e:'🍗',tag:'طازج'},
{id:4,c:'lamb',n:'لحم غنم',d:'لحم غنم طازج وتجهيز حسب الطلب',p:'حسب الوزن',e:'🐑',tag:'طازج'},
{id:5,c:'lamb',n:'لحم غنم مفروم',d:'فرم طازج حسب رغبتك',p:'حسب الوزن',e:'🥩',tag:'فرم طازج'},
{id:6,c:'beef',n:'لحم عجل',d:'لحم عجل طازج يومياً',p:'حسب الوزن',e:'🐄',tag:'طازج'},
{id:7,c:'beef',n:'لحم عجل مفروم',d:'فرم طازج وتجهيز سريع',p:'حسب الوزن',e:'🥩',tag:'فرم طازج'}];
let products=JSON.parse(localStorage.getItem('babilaProducts')||'null')||defaults;let active='offers';let cart=JSON.parse(localStorage.getItem('babilaCart')||'[]');
const $=s=>document.querySelector(s);function renderCats(){ $('#categories').innerHTML=cats.map(x=>`<button class="cat ${x[0]===active?'active':''}" data-c="${x[0]}"><span class="emoji">${x[1]}</span><b>${x[2]}</b></button>`).join('');document.querySelectorAll('.cat').forEach(b=>b.onclick=()=>{active=b.dataset.c;renderCats();renderProducts()})}
function renderProducts(){let q=($('#search').value||'').trim();let arr=products.filter(p=>p.c===active&&(p.n+p.d).includes(q));$('#products').innerHTML=arr.map(p=>`<article class="product"><div class="pimg">${p.e||'🥩'}</div><div class="pbody"><span class="tag">${p.tag||'منتج'}</span><h3>${p.n}</h3><div class="desc">${p.d}</div><div class="price">${p.p}</div><div class="pactions"><button class="add" onclick="add(${p.id})">أضف للطلب</button><a class="call" href="https://wa.me/963960987637?text=${encodeURIComponent('مرحباً، أريد طلب: '+p.n)}">💬</a></div></div></article>`).join('')||'<div style="grid-column:1/-1;text-align:center;padding:40px;color:#786f63">لا يوجد منتجات بهذا الاسم حالياً.</div>'}
function add(id){let p=products.find(x=>x.id===id);let x=cart.find(x=>x.id===id);if(x)x.q++;else cart.push({id:p.id,n:p.n,p:p.p,q:1});save();openCart()}
function save(){localStorage.setItem('babilaCart',JSON.stringify(cart));$('#cartCount').textContent=cart.reduce((a,x)=>a+x.q,0);renderCart()}
function renderCart(){let el=$('#cartItems');if(!cart.length){el.innerHTML='<p style="text-align:center;color:#786f63;padding:25px">السلة فارغة</p>';$('#cartTotal').textContent='0';return}el.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.n}</b><br><small>${x.p}</small></div><div class="qty"><button onclick="change(${x.id},-1)">−</button><b>${x.q}</b><button onclick="change(${x.id},1)">+</button></div></div>`).join('');$('#cartTotal').textContent='حسب المنتجات';let text='مرحباً، أريد طلب:%0A'+cart.map(x=>`• ${x.n} × ${x.q} — ${x.p}`).join('%0A');$('#waOrder').href='https://wa.me/963960987637?text='+text}
function change(id,d){let x=cart.find(x=>x.id===id);if(!x)return;x.q+=d;if(x.q<=0)cart=cart.filter(y=>y.id!==id);save()}
function openCart(){ $('#cart').classList.add('show');$('#shade').classList.add('show');renderCart()}function closeCart(){ $('#cart').classList.remove('show');$('#shade').classList.remove('show')}
$('#search').addEventListener('input',renderProducts);$('#cartFab').onclick=openCart;$('#closeCart').onclick=closeCart;$('#shade').onclick=closeCart;renderCats();renderProducts();save();
