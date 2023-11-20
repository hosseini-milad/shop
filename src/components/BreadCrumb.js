const Breadcrumb = (props)=>{
    return(
        <div className="breadcrumb">
            <a href="#">Home</a>
            /
            <span>{props.title}</span>
        </div>
    )
}
export default Breadcrumb