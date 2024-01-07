function BreadCrumb(props){
    return(<div className="breadCrumb">
        <a href="/">{" خانه / "}</a>
        <a href={props.catUrl}>{props.pCat}</a>
        <span> {props.pName} </span>
        </div>
    )
}
export default BreadCrumb