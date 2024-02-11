import AppHeader from '../appHeader/AppHeader.jsx';
import RandomChar from '../randomChar/RandomChar.jsx';
import CharList from '../charList/CharList.jsx';
import CharInfo from '../charInfo/CharInfo.jsx';

import decoration from '../../assets/img/vision.png';
import { Component } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary.jsx';

class App extends Component {
   state = {
      selectedCharID: null,
   };

   onChangeSelectedCharId = id => {
      this.setState({
         selectedCharID: id,
      });
   };

   render() {
      return (
         <div className="app">
            <AppHeader />
            <main>
               <ErrorBoundary>
                  <RandomChar />
               </ErrorBoundary>
               <div className="char__content">
                  <ErrorBoundary>
                     <CharList
                        onChangeSelectedCharId={this.onChangeSelectedCharId}
                     />
                  </ErrorBoundary>
                  <ErrorBoundary>
                     <CharInfo selectedCharID={this.state.selectedCharID} />
                  </ErrorBoundary>
               </div>
               <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
         </div>
      );
   }
}

export default App;
