'use strict';
const $ = id => document.getElementById(id);
const form = $('studio-form'), audio = $('sample');
const fields = {name:$('recipient'),sender:$('sender'),intro:$('message'),quote:$('quote')};
let timer, lastData = '', generated = '';
const draftKey = '20-10-studio-v1';
function data() { return Object.fromEntries(Object.entries(fields).map(([key,el])=>[key,el.value])); }
function setData(value) { Object.entries(fields).forEach(([key,el])=>el.value=typeof value[key]==='string'?value[key].slice(0,el.maxLength):''); }
function update() {
  const value = data();
  $('count').textContent = value.intro.length+' / 2000';
  try { localStorage.setItem(draftKey,JSON.stringify(value)); $('draft-status').textContent='Đã lưu nháp'; } catch (_) { $('draft-status').textContent='Bản nháp tạm thời'; }
  if (generated && JSON.stringify(value)!==generated) {
    $('changed').hidden=false;
    $('copy').disabled=$('share').disabled=true;
    $('open').removeAttribute('href');$('open').setAttribute('aria-disabled','true');
    $('share-link').value='';
  }
  clearTimeout(timer);
  timer=setTimeout(()=> {
    const previewData={...value,name:value.name.trim()||Greeting.defaults.name,intro:value.intro.trim()||Greeting.defaults.intro};
    const encoded=Greeting.encode(previewData);
    if (encoded!==lastData) {$('preview').src='card.html?preview=1#g='+encoded;lastData=encoded;}
  },350);
}
try { const draft=JSON.parse(localStorage.getItem(draftKey));if(draft && typeof draft==='object')setData(draft);else setData({...Greeting.defaults,name:'',sender:''}); } catch (_) {setData({...Greeting.defaults,name:'',sender:''});}
form.addEventListener('input',update);
update();
const templates={
friend:'Nhân ngày 20/10, chúc bạn luôn xinh đẹp, tự tin và rạng rỡ. Mong bạn có thật nhiều niềm vui, đủ bình yên để tận hưởng những điều nhỏ bé và đủ can đảm để theo đuổi ước mơ của mình. 🌸',
mom:'Mẹ yêu, nhân ngày 20/10, con chúc mẹ thật nhiều sức khỏe, luôn vui vẻ và bình an. Cảm ơn mẹ vì những yêu thương và hy sinh thầm lặng. Con mong mỗi ngày của mẹ đều thật nhẹ nhàng, hạnh phúc. Con thương mẹ nhiều! 🌷',
love:'Chúc người thương của mình một ngày 20/10 thật ngọt ngào. Cảm ơn vì đã đến, đã ở lại và làm những ngày bình thường trở nên đặc biệt. Mong bạn luôn được yêu thương, được là chính mình và luôn mỉm cười hạnh phúc. 💗'};
document.querySelectorAll('[data-template]').forEach(button=>button.addEventListener('click',()=>{fields.intro.value=templates[button.dataset.template];update();}));
form.addEventListener('submit',event=>{
  event.preventDefault();
  try {
    const encoded=Greeting.encode(data());
    const link=new URL('card.html',location.href);link.search='';link.hash='g='+encoded;
    $('share-link').value=link.href;$('open').href=link.href;$('open').removeAttribute('aria-disabled');
    $('copy').disabled=$('share').disabled=false;$('changed').hidden=true;$('result').hidden=false;
    generated=JSON.stringify(data());$('status').textContent='Đã tạo thiệp! Sao chép link và gửi cho người bạn muốn chúc.';
    $('result').scrollIntoView({behavior:'smooth',block:'nearest'});
  }catch(error){$('status').textContent=error.message;}
});
$('copy').addEventListener('click',async()=>{
  const input=$('share-link');
  try {await navigator.clipboard.writeText(input.value);$('status').textContent='Đã sao chép link thiệp 💌';}
  catch(_){input.focus();input.select();$('status').textContent='Link đã được chọn. Nhấn giữ hoặc Ctrl+C để sao chép.';}
});
$('share').addEventListener('click',async()=>{
  if(!navigator.share){$('copy').click();return;}
  try{await navigator.share({title:'Một lời chúc 20/10 dành riêng cho bạn 💌',text:'Có một thông điệp đang chờ bạn giải mã…',url:$('share-link').value});}
  catch(error){if(error.name!=='AbortError')$('status').textContent='Chưa chia sẻ được. Bạn có thể sao chép link để gửi.';}
});
function syncAudio(){ $('listen').textContent=audio.paused?'Nghe thử':'Tạm dừng';$('listen').setAttribute('aria-pressed',String(!audio.paused)); }
$('listen').addEventListener('click',async()=>{if(audio.paused){try{audio.volume=.55;await audio.play();}catch(_){$('status').textContent='Chưa phát được nhạc. Hãy thử lại.';}}else audio.pause();syncAudio();});
audio.addEventListener('error',()=>{$('status').textContent='Không tải được nhạc. Kiểm tra kết nối rồi bấm nghe thử lại.';syncAudio();});
$('reset').addEventListener('click',()=>{setData({...Greeting.defaults,name:'',sender:''});generated='';$('result').hidden=true;audio.pause();syncAudio();update();$('status').textContent='Đã đặt lại bản nháp. Các link đã gửi vẫn hoạt động.';});
