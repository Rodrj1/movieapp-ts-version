import "./Separator.css";

interface SeparatorProps {
  classProp: string | undefined ;
}

const SeparatorDetails = ({ classProp }: SeparatorProps) => {
  return <div className={classProp}></div>;
};

export default SeparatorDetails;
