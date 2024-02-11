import './charList.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
   state = {
      offset: 210,
      error: false,
      charList: [],
      loading: true,
      charEnded: false,
      newItemLoading: false,
   };

   marvelService = new MarvelService();

   componentDidMount() {
      this.onRequestChar();
   }

   onRequestChar = offset => {
      this.onCharListLoading();
      this.marvelService
         .getAllCharacters(offset)
         .then(this.onCharListLoaded)
         .catch(this.onError);
   };

   onCharListLoading = () => {
      this.setState({ newItemLoading: true });
   };

   onCharListLoaded = newCharList => {
      this.setState(({ charList, offset }) => ({
         loading: false,
         offset: offset + 9,
         newItemLoading: false,
         charList: [...charList, ...newCharList],
         charEnded: newCharList.length < 9 ? true : false,
      }));
   };

   onError = () => {
      this.setState({ loading: false, error: true });
   };

   itemRefs = [];

   setRef = ref => {
      this.itemRefs.push(ref);
   };

   onFocusChar = id => {
      this.itemRefs.forEach(item =>
         item.classList.remove('char__item_selected'),
      );
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
   };

   renderItems = arr => {
      const items = arr.map((item, i) => {
         let notFoundImg = false;

         if (
            item.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
         ) {
            notFoundImg = true;
         }

         return (
            <li
               tabIndex={0}
               key={item.id}
               className="char__item"
               ref={this.setRef}
               onClick={() => {
                  this.props.onChangeSelectedCharId(item.id);
                  this.onFocusChar(i);
               }}
               onKeyDown={e => {
                  if (e.key === '' || e.key === 'Enter') {
                     this.props.onChangeSelectedCharId(item.id);
                     this.onFocusChar(i);
                  }
               }}
            >
               <img
                  alt="abyss"
                  src={item.thumbnail}
                  style={{ objectFit: notFoundImg ? 'unset' : 'cover' }}
               />
               <div className="char__name">{item.name}</div>
            </li>
         );
      });

      return <ul className="char__grid">{items}</ul>;
   };

   render() {
      const { charList, loading, newItemLoading, error, offset, charEnded } =
         this.state;

      const items = this.renderItems(charList);

      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error) ? items : null;
      const errorMessage = error ? <ErrorMessage /> : null;

      return (
         <div className="char__list">
            {spinner}
            {content}
            {errorMessage}
            <button
               disabled={newItemLoading}
               onClick={() => this.onRequestChar(offset)}
               style={{ display: charEnded ? 'none' : 'block' }}
               className="button button__main button__long"
            >
               <div className="inner">load more</div>
            </button>
         </div>
      );
   }
}

export default CharList;

CharList.propTypes = {
   onChangeSelectedCharId: PropTypes.func.isRequired,
};
