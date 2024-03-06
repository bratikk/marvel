import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import ErrorMessage from '../components/errorMessage/ErrorMessage';

import useMarvelService from '../services/MarvelService';
import AppBanner from '../components/appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
   const { id } = useParams();
   const [date, setDate] = useState(null);
   const { loading, error, getComic, getCharacter, clearError } =
      useMarvelService();

   useEffect(() => {
      updateDate();
   }, [id]);

   const updateDate = () => {
      // clearError();

      switch (dataType) {
         case 'comic':
            getComic(id).then(onDateLoaded);
            break;
         case 'character':
            getCharacter(id).then(onDateLoaded);
            break;
      }
   };

   const onDateLoaded = date => {
      setDate(date);
   };

   const spinner = loading ? <Spinner /> : null;
   const errorMessage = error ? <ErrorMessage /> : null;
   const content = !(loading || error || !date) ? (
      <Component date={date} />
   ) : null;

   return (
      <>
         <AppBanner />
         {spinner}
         {errorMessage}
         {content}
      </>
   );
};

export default SinglePage;
