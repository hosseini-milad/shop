function ShowError(props) {
  const color = props.color ? props.color : "lightGreen";
  const icon = props.icon ? props.icon : "info-circle";
  const text = props.text ? props.text : "اکشن با موفقیت انجام شد";
  return (
    <div className="notification-modal">
      <div className="n-m-box" style={{ borderColor: color }}>
        <p className="top-p" style={{ backgroundColor: color }}>
          {props.status}
        </p>
        <i className={`fa fa-lg fa-${icon}`} style={{ color: color }}></i>
        <p>{text}</p>
        <a href="#" style={{ color: color }}>
          {props.linkText}
        </a>
      </div>
    </div>
  );
}
export default ShowError;
