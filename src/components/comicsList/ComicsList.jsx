import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
   const [offset, setOffset] = useState(0);
   const [comics, setComics] = useState([]);
   const [comicsEnded, setComicsEnded] = useState(false);
   const [newItemLoading, setNewItemLoading] = useState(false);

   const { loading, error, getAllComics } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, []);

   const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllComics(offset).then(onComicsListLoaded);
   };

   const onComicsListLoaded = newComicsList => {
      let ended = false;
      if (newComicsList.length < 8) {
         ended = true;
      }

      setComicsEnded(ended);
      setOffset(offset + 8);
      setNewItemLoading(false);
      setComics(precComicsList => [...precComicsList, ...newComicsList]);
   };

   const renderComics = comics => {
      const items = comics.map(comic => {
         return (
            <li key={comic.id} className="comics__item">
               <Link to={`/comics/${comic.id}`}>
                  <img
                     src={comic.thumbnail}
                     alt={comic.title}
                     className="comics__item-img"
                  />
                  <div className="comics__item-name">{comic.title}</div>
                  <div className="comics__item-price">{comic.price}</div>
               </Link>
            </li>
         );
      });

      return <ul className="comics__grid">{items}</ul>;
   };

   const items = renderComics(comics);

   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading && !newItemLoading ? <Spinner /> : null;

   return (
      <div className="comics__list">
         {items}
         {spinner}
         {errorMessage}
         <button
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            className="button button__main button__long"
            style={{ display: comicsEnded ? 'none' : 'block' }}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   );
};

export default ComicsList;
