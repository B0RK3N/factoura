function documentState(d){if(d.kind==='quote')return {label:'Quote',key:'quote'};if(d.paid)return {label:'Paid',key:'paid'};if(d.due<iso(new Date()))return {label:'Overdue',key:'overdue'};return {label:'Outstanding',key:'unpaid'}}
history=function(){
  const query=$('search-docs').value.trim().toLocaleLowerCase(),filter=$('filter-docs').value;
  const visible=docs.filter(d=>{const s=documentState(d);return (!query||(d.number+' '+d.client).toLocaleLowerCase().includes(query))&&(filter==='all'||filter==='unpaid'&&d.kind==='invoice'&&!d.paid||s.key===filter)});
  $('count').textContent=visible.length+' / '+docs.length+' documents';
  $('saved').innerHTML=visible.length?visible.map(d=>{const s=documentState(d);return `<div class="saved-row"><div class="doc-icon" aria-hidden="true">${d.kind==='quote'?'Q':'I'}</div><div class="doc-info"><strong>${esc(d.number)}</strong><small>${esc(d.client)} · ${esc(d.date)}</small></div><div class="doc-amount"><strong>${money(amounts(d).total)}</strong><span class="state ${s.key}">${s.label}</span></div><div class="saved-actions"><button data-action="open" data-id="${esc(d.id)}">Open</button>${d.kind==='invoice'?`<button data-action="paid" data-id="${esc(d.id)}">${d.paid?'Mark unpaid':'Mark paid'}</button>`:''}<button data-action="delete" data-id="${esc(d.id)}" aria-label="Delete ${esc(d.number)}">Delete</button></div></div>`}).join(''):`<div class="empty">${docs.length?'No documents match your search.':'Your first document is waiting. Create it above.'}</div>`;
  updateSummary();$('sum-overdue').textContent=money(docs.filter(d=>documentState(d).key==='overdue').reduce((s,d)=>s+amounts(d).total,0));
};
$('search-docs').addEventListener('input',history);$('filter-docs').addEventListener('change',history);
$('restore').onclick=()=>$('backup-file').click();
$('backup-file').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try{
    if(file.size>5000000)throw Error('The file exceeds the 5 MB limit.');
    const imported=FactouraBackup.validateBackup(JSON.parse(await file.text()));
    const result=FactouraBackup.mergeDocuments(docs,imported);
    const before=docs;docs=result.documents;if(!persist()){docs=before;throw Error('The browser could not save this backup.')}
    history();$('library-status').textContent=`${result.added} document(s) restored. ${result.skipped} duplicate(s) skipped. Existing documents were kept.`;
  }catch(error){$('library-status').textContent=error instanceof SyntaxError?'This file is not a valid JSON backup.':error.message}
  finally{e.target.value=''}
};
history();
