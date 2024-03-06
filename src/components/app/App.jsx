import { Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { Suspense, lazy } from 'react';
import { Spinner } from 'react-bootstrap';

const NotFound = lazy(() => import('../../pages/NotFound'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const SingleComicLayout = lazy(
   () => import('../../pages/singleComicLayout/SingleComicLayout'),
);
const SingleCharacterLayout = lazy(
   () => import('../../pages/singleCharacterLayout/SingleCharacterLayout'),
);
const SinglePage = lazy(() => import('../../pages/SinglePage'));

const App = () => {
   return (
      <div className="app">
         <AppHeader />
         <main>
            <Suspense fallback={<Spinner />}>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/comics" element={<ComicsPage />} />
                  <Route
                     path="/comics/:id"
                     element={
                        <SinglePage
                           Component={SingleComicLayout}
                           dataType="comic"
                        />
                     }
                  />
                  <Route
                     path="/character/:id"
                     element={
                        <SinglePage
                           Component={SingleCharacterLayout}
                           dataType="character"
                        />
                     }
                  />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </Suspense>
         </main>
      </div>
   );
};

export default App;
