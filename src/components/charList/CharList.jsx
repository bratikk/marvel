import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = props => {
   const [offset, setOffset] = useState(210);
   const [charList, setCharList] = useState([]);
   const [charEnded, setCharEnded] = useState(false);
   const [newItemLoading, setNewItemLoading] = useState(false);

   const { loading, error, getAllCharacters } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, []);

   const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset).then(onCharListLoaded);
   };

   const onCharListLoaded = newCharList => {
      let ended = false;
      if (newCharList.length < 9) {
         ended = true;
      }

      setCharEnded(charEnded => ended);
      setOffset(offset => offset + 9);
      setNewItemLoading(newItemLoading => false);
      setCharList(charList => [...charList, ...newCharList]);
   };

   const itemRefs = useRef([]);
   const focusOnItem = id => {
      itemRefs.current.forEach(item =>
         item.classList.remove('char__item_selected'),
      );
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
   };

   function renderItems(arr) {
      const items = arr.map((item, i) => {
         let imgStyle = { objectFit: 'cover' };
         if (
            item.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
         ) {
            imgStyle = { objectFit: 'unset' };
         }

         return (
            <CSSTransition key={i} timeout={700} classNames="item">
               <li
                  tabIndex={0}
                  key={item.id}
                  className="char__item"
                  ref={el => (itemRefs.current[i] = el)}
                  onClick={() => {
                     props.onCharSelected(item.id);
                     focusOnItem(i);
                  }}
                  onKeyPress={e => {
                     if (e.key === ' ' || e.key === 'Enter') {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                     }
                  }}
               >
                  <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                  <div className="char__name">{item.name}</div>
               </li>
            </CSSTransition>
         );
      });
      return (
         <ul>
            <TransitionGroup className="char__grid">{items}</TransitionGroup>
         </ul>
      );
   }

   const items = renderItems(charList);

   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading && !newItemLoading ? <Spinner /> : null;

   return (
      <div className="char__list">
         {items}
         {spinner}
         {errorMessage}
         <button
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            className="button button__main button__long"
            style={{ display: charEnded ? 'none' : 'block' }}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   );
};

CharList.propTypes = {
   onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
