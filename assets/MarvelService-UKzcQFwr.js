import{r as c}from"./index-J8m60jSi.js";const g=()=>{const[r,e]=c.useState(!1),[h,o]=c.useState(!1),n=c.useCallback(async(i,u="GET",p=null,d={"Content-type":"application/json"})=>{e(!0);try{const a=await fetch(i,{method:u,body:p,headers:d});if(!a.ok)throw new Error(`Could not fetch ${i}, status: ${a.status}`);const m=await a.json();return e(!1),m}catch(a){throw e(!1),o(a.message),a}},[]),l=c.useCallback(()=>o(null),[]);return{loading:r,request:n,error:h,clearError:l}},C=()=>{const r="https://gateway.marvel.com:443/v1/public/",e="apikey=c5d6fc8b83116d92ed468ce36bac6c62",{loading:o,request:n,error:l,clearError:i}=g(),u=async t=>{const s=await n(`${r}comics/${t}?${e}`);return $(s.data.results[0])},p=async t=>{const s=await n(`${r}characters/${t}?${e}`);return f(s.data.results[0])},d=async(t=0)=>(await n(`${r}comics?limit=8&offset=${t}&${e}`)).data.results.map($),a=async(t=210)=>(await n(`${r}characters?limit=9&offset=${t}&${e}`)).data.results.map(f),m=async t=>(await n(`${r}characters?name=${t}&${e}`)).data.results.map(f),f=t=>({id:t.id,name:t.name,description:t.description?`${t.description.slice(0,210)}...`:"There is no description for this character",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,homepage:t.urls[0].url,wiki:t.urls[1].url,comics:t.comics.items}),$=t=>{var s;return{id:t.id,title:t.title,description:t.description||"There is no description",pageCount:t.pageCount?`${t.pageCount} p.`:"No information about the number of pages",thumbnail:t.thumbnail.path+"."+t.thumbnail.extension,language:((s=t.textObjects[0])==null?void 0:s.language)||"en-us",price:t.prices[0].price?`${t.prices[0].price}$`:"not available"}};return{error:l,loading:o,getComic:u,clearError:i,getCharacter:p,getAllComics:d,getAllCharacters:a,getCharacterByName:m}};export{C as u};