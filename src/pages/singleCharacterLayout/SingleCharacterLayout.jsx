import { Helmet } from 'react-helmet';
import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ date }) => {
   const { name, description, thumbnail } = date;

   return (
      <>
         <div className="single-character">
            <Helmet>
               <title>{name}</title>
               <meta name="description" content={`${name} character`} />
            </Helmet>
            <img src={thumbnail} alt={name} className="single-character__img" />
            <div className="single-character__info">
               <h2 className="single-character__name">{name}</h2>
               <p className="single-character__description">{description}</p>
            </div>
         </div>
      </>
   );
};
export default SingleCharacterLayout;
