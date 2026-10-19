(function () {
  'use strict';
  const defaults = {name:'Bạn thân mến',sender:'Một người luôn nghĩ đến bạn',intro:'Nhân ngày 20/10, chúc bạn luôn rạng rỡ, hạnh phúc và bình yên. Mong mỗi ngày đều ngập tràn tiếng cười và thật nhiều yêu thương. 🌸',quote:'Cảm ơn bạn vì đã xuất hiện và làm thế giới này dịu dàng hơn rất nhiều.'};
  function clean(data) {
    const result = {};
    for (const [key, limit] of Object.entries({name:80,sender:80,intro:2000,quote:300})) result[key] = typeof data?.[key] === 'string' ? data[key].trim().slice(0,limit) : defaults[key];
    if (!result.name || !result.intro) throw Error('Vui lòng nhập tên người nhận và lời chúc.');
    return result;
  }
  function encode(data) { return btoa(Array.from(new TextEncoder().encode(JSON.stringify(clean(data))), b=>String.fromCharCode(b)).join('')).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,''); }
  function decode(hash) {
    const encoded = new URLSearchParams(hash.replace(/^#/, '')).get('g');
    if (!encoded || encoded.length>20000) throw Error('Link thiệp không hợp lệ.');
    const base = encoded.replaceAll('-','+').replaceAll('_','/');
    return clean(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(base), c=>c.charCodeAt(0)))));
  }
  let data = defaults, invalid = false;
  if (location.hash) { try {data = decode(location.hash);} catch (_) {invalid = true;} }
  window.Greeting = {defaults,clean,encode,decode,invalid,config:{...data,l1:'CHÚC MỪNG 20/10',l2:data.name.toLocaleUpperCase('vi'),sign:data.sender?'— '+data.sender+' 🌹':'',wishes:[['🌸','Luôn xinh đẹp','Rạng rỡ từ nụ cười đến trái tim.'],['💖','Thật hạnh phúc','Mỗi ngày đều có một niềm vui nhỏ.'],['✨','Bình yên','Nhẹ nhàng giữa mọi bộn bề.'],['🌹','Được yêu thương','Nhiều hơn bạn có thể đếm hết.']]}};
  if (invalid) addEventListener('DOMContentLoaded',()=>{document.body.replaceChildren(); const box=document.createElement('main');box.style.cssText='padding:40px;max-width:600px;margin:auto;text-align:center'; const h=document.createElement('h1');h.textContent='Link thiệp chưa đúng 💌';const p=document.createElement('p');p.textContent='Hãy nhờ người gửi sao chép lại toàn bộ link thiệp nhé.';const a=document.createElement('a');a.href='./';a.textContent='Về studio tạo thiệp';a.style.color='#ffb3d4';box.append(h,p,a);document.body.append(box);});
})();
