function UserClassInTable(props){
    const classes=props.classes

    return(
        <div className="cu-phone">
            {classes.map((classItem,i)=>(
                <small key={i}>{classItem.className}</small>
            ))}
            
        </div>
    )
}
export default UserClassInTable