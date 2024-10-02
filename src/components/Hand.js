import HandIcon from "./HandIcon";

const Hand = ({ value, className }) => {
  return (
    <div className='Hand'>
      <HandIcon className={className} value={value} />
    </div>
  );
};

export default Hand;
