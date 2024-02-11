import errorImg from './error.gif';

const ErrorMessage = () => {
   return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <img
            src={errorImg}
            alt="Error img"
            style={{ display: 'block', width: 250, margin: '0 auto' }}
         />
      </div>
   );
};
export default ErrorMessage;
