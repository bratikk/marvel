import { Link } from 'react-router-dom';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const NotFound = () => {
   return (
      <div>
         <ErrorMessage />
         <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
            Page doesn't exist
         </p>
         <Link
            to="/"
            style={{
               display: 'block',
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: 24,
            }}
         >
            Back to main page
         </Link>
      </div>
   );
};
export default NotFound;
