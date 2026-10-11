function documentState(d){if(d.kind==='quote')return {label:'Devis',key:'quote'};if(d.paid)return {label:'Payée',key:'paid'};if(d.due<iso(new Date()))return {label:'En retard',key:'overdue'};return {label:'À recevoir',key:'unpaid'}}
history=function(){
  const query=$('search-docs').value.trim().toLocaleLowerCase(),filter=$('filter-docs').value;
  const visible=docs.filter(d=>{const s=documentState(d);return (!query||(d.number+' '+d.client).toLocaleLowerCase().includes(query))&&(filter==='all'||filter==='unpaid'&&d.kind==='invoice'&&!d.paid||s.key===filter)});
  $('count').textContent=visible.length+' / '+docs.length+' documents';
  $('saved').innerHTML=visible.length?visible.map(d=>{const s=documentState(d);return `<div class="saved-row"><div class="doc-icon" aria-hidden="true">${d.kind==='quote'?'D':'F'}</div><div class="doc-info"><strong>${esc(d.number)}</strong><small>${esc(d.client)} · ${esc(d.date)}</small></div><div class="doc-amount"><strong>${money(amounts(d).total)}</strong><span class="state ${s.key}">${s.label}</span></div><div class="saved-actions"><button data-action="open" data-id="${esc(d.id)}">Ouvrir</button>${d.kind==='invoice'?`<button data-action="paid" data-id="${esc(d.id)}">${d.paid?'Marquer non payé':'Marquer payé'}</button>`:''}<button data-action="delete" data-id="${esc(d.id)}" aria-label="Supprimer ${esc(d.number)}">Supprimer</button></div></div>`}).join(''):`<div class="empty">${docs.length?'Aucun document ne correspond à votre recherche.':'Votre premier document vous attend. Créez-le juste au-dessus.'}</div>`;
  updateSummary();$('sum-overdue').textContent=money(docs.filter(d=>documentState(d).key==='overdue').reduce((s,d)=>s+amounts(d).total,0));
};
$('search-docs').addEventListener('input',history);$('filter-docs').addEventListener('change',history);
$('restore').onclick=()=>$('backup-file').click();
$('backup-file').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try{
    if(file.size>5000000)throw Error('Le fichier dépasse la limite de 5 Mo.');
    const imported=FactouraBackup.validateBackup(JSON.parse(await file.text()));
    const result=FactouraBackup.mergeDocuments(docs,imported);
    const before=docs;docs=result.documents;if(!persist()){docs=before;throw Error('Le navigateur ne peut pas enregistrer cette sauvegarde.')}
    history();$('library-status').textContent=`${result.added} document(s) restauré(s). ${result.skipped} doublon(s) ignoré(s). Vos documents existants sont conservés.`;
  }catch(error){$('library-status').textContent=error instanceof SyntaxError?'Ce fichier ne contient pas une sauvegarde JSON valide.':error.message}
  finally{e.target.value=''}
};
history();
