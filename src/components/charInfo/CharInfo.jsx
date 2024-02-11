import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import './charInfo.scss';

class CharInfo extends Component {
   state = {
      char: null,
      error: false,
      loading: false,
   };
   marvelService = new MarvelService();

   componentDidMount() {
      this.updateChar();
   }
   componentDidUpdate(prevProps) {
      if (this.props.selectedCharID !== prevProps.selectedCharID) {
         this.updateChar();
      }
   }

   updateChar = () => {
      const { selectedCharID } = this.props;
      if (!selectedCharID) {
         return;
      }
      this.onCharLoading();
      this.marvelService
         .getCharacter(selectedCharID)
         .then(this.onCharLoaded)
         .catch(this.onError);
   };

   onCharLoaded = char => {
      this.setState({
         char,
         loading: false,
      });
   };
   onCharLoading = () => {
      this.setState({
         loading: true,
      });
   };
   onError = () => {
      this.setState({ loading: false, error: true });
   };

   render() {
      const { char, loading, error } = this.state;

      const skeleton = char || loading || error ? null : <Skeleton />;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error || !char) ? (
         <View char={char} />
      ) : null;
      const errorMessage = error ? <ErrorMessage /> : null;

      return (
         <div className="char__info">
            {skeleton}
            {spinner}
            {content}
            {errorMessage}
         </div>
      );
   }
}

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = char;
   let limitComicsArr = comics.slice(0, 10);
   let notFoundImg = false;

   if (
      thumbnail ===
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
   ) {
      notFoundImg = true;
   }

   return (
      <>
         <div className="char__basics">
            <img
               src={thumbnail}
               alt="abyss"
               style={{ objectFit: notFoundImg ? 'unset' : 'cover' }}
            />
            <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="char__descr">{description}</div>
         <div className="char__comics">Comics:</div>
         <ul className="char__comics-list">
            {comics.length
               ? limitComicsArr.map((item, id) => (
                    <li key={id} className="char__comics-item">
                       {item.name}
                    </li>
                 ))
               : 'This character has never appeared in any comic book'}
         </ul>
      </>
   );
};

export default CharInfo;

CharInfo.propTypes = {
   selectedCharID: PropTypes.number,
};
