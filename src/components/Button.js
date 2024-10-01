import resetImg from "../assets/ic-reset.svg";

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className='App-reset'>
      <img src={resetImg} alt={children} />
    </button>
  );
}

export default Button;
