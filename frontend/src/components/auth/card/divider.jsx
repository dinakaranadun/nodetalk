const Divider = ({ text = "OR" }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="divider">{text}</div>
    </div>
  );
};

export default Divider;