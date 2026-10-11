(function(root){
  'use strict';
  const textFields=['seller','email','client','number','note'];
  function validateBackup(value){
    if(!value||value.format!=='factoura'||value.version!==1||!Array.isArray(value.documents)||value.documents.length>2000)throw Error('Backup format not recognized.');
    const ids=new Set(),refs=new Set();
    const isDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
    const numeric=(v,min,max)=> (typeof v==='number'||typeof v==='string'&&v.trim()!=='')&&Number.isFinite(Number(v))&&Number(v)>=min&&Number(v)<=max;
    return value.documents.map(d=>{
      if(!d||typeof d.id!=='string'||!d.id||d.id.length>100||ids.has(d.id)||!['invoice','quote'].includes(d.kind)||!['en','fr','ar'].includes(d.lang)||typeof d.paid!=='boolean')throw Error('Invalid document in backup.');
      if(textFields.some(f=>typeof d[f]!=='string'||d[f].length>10000)||!d.seller.trim()||!d.client.trim()||!d.number.trim()||refs.has(d.number.trim()))throw Error('Document details or references are invalid.');
      if(!isDate(d.date)||!isDate(d.due)||d.due<d.date||!numeric(d.tax,0,100)||!numeric(d.discount,0,100))throw Error('Invalid dates or percentages.');
      if(!Array.isArray(d.items)||!d.items.length||d.items.length>200||d.items.some(i=>!i||typeof i.desc!=='string'||!i.desc.trim()||i.desc.length>10000||!numeric(i.qty,0.001,1000000)||!numeric(i.price,0,1000000000)))throw Error('Invalid services in backup.');
      ids.add(d.id);refs.add(d.number.trim());
      return {...Object.fromEntries(textFields.map(f=>[f,d[f]])),id:d.id,kind:d.kind,lang:d.lang,paid:d.paid,date:d.date,due:d.due,tax:String(d.tax),discount:String(d.discount),items:d.items.map(i=>({desc:i.desc,qty:Number(i.qty),price:Number(i.price)}))};
    });
  }
  function mergeDocuments(current,incoming){const ids=new Set(current.map(d=>d.id)),refs=new Set(current.map(d=>d.number.trim()));let skipped=0;const added=[];for(const d of incoming){if(ids.has(d.id)||refs.has(d.number.trim())){skipped++;continue}ids.add(d.id);refs.add(d.number.trim());added.push(d)}return {documents:[...added,...current],added:added.length,skipped}}
  const api={validateBackup,mergeDocuments};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.FactouraBackup=api;
})(typeof globalThis!=='undefined'?globalThis:this);
