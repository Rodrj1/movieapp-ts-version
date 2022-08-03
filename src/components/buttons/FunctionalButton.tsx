import "./FunctionalButton.css";
interface ButtonProps {
  id: string | number;
  fn: ((id: string | number) => void | undefined | null) | undefined;
  btnClass: string;
  text: string;
}

const FunctionalButton = ({ id, fn, btnClass, text }: ButtonProps) => {

  const handleOnClick = () => {
    if(fn != undefined) {
      fn(id);
    }
  }
  return (
    <button onClick={handleOnClick} className={btnClass}>
      {text}
    </button>
  );
};

export default FunctionalButton;
