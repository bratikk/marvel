import{u as j,r as o,j as e,S as h}from"./index-J8m60jSi.js";import{E}from"./ErrorMessage-IGFIT2pC.js";import{u as S}from"./MarvelService-UKzcQFwr.js";import{A as D}from"./AppBanner-Zt5ELa1N.js";const C=({Component:c,dataType:i})=>{const{id:r}=j(),[s,l]=o.useState(null),{loading:t,error:a,getComic:u,getCharacter:m,clearError:M}=S();o.useEffect(()=>{p()},[r]);const p=()=>{switch(i){case"comic":u(r).then(n);break;case"character":m(r).then(n);break}},n=f=>{l(f)},x=t?e.jsx(h,{}):null,d=a?e.jsx(E,{}):null,g=t||a||!s?null:e.jsx(c,{date:s});return e.jsxs(e.Fragment,{children:[e.jsx(D,{}),x,d,g]})};export{C as default};
