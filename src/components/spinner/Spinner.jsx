import spinner from '../../resources/img/spinner-circle.gif';
import './spinner.scss';

const Spinner = () => {
   return (
      <div className="spinner">
         <img src={spinner} alt="Spinner" />
      </div>
   );
};

export default Spinner;
