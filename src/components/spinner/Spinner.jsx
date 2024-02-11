import spinner from '../../assets/img/spinner-circle.gif';
import './spinner.scss';

const Spinner = () => {
   return (
      <div className="spinner">
         <img src={spinner} alt="Spinner" />
         {/* <p>loading</p> */}
      </div>
   );
};
export default Spinner;
