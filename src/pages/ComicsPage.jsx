import AppBanner from '@components/appBanner/AppBanner';
import ComicsList from '@components/comicsList/ComicsList';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
   return (
      <>
         <Helmet>
            <title>Comics</title>
            <meta name="description" content="Page with list of our comics" />
         </Helmet>
         <AppBanner />
         <ComicsList />
      </>
   );
};

export default ComicsPage;
