import statustrans from "../../translate/status";

function Status(props) {
  const status = statustrans[props.status];
  const text = props.text?props.text:status&&status[props.lang]

  // Handler to call the changeStatus function passed from props
  const handleClick = () => {
    if (props.changeStatus) {
      props.changeStatus();
    }
  };
//   if(text==="فعال") status={color:"green",background:"lightGreen"}
  return (
    <div
      className={props.class}
      style={{
        color: status ? status.color : "gray",
        backgroundColor: status ? status.background : "silver",
      }}
      onClick={handleClick} // Attaching onClick event

    >
      {text}
    </div>
  );
}
export default Status;
