import Spinner from '../components/spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

export default setContent = (process, char) => {
   switch (process) {
      case 'waiting':
         return <Skeleton />;
      case 'loading':
         return <Spinner />;
      case 'succsess':
         return <View char={char} />;
      case 'error':
         return <ErrorMessage />;
      default:
         throw new Error('Unexpected new error');
   }
};
