import tabletrans from "../../../translate/tables"

function CatImage(props){
    return(
        <div className="images">
            <h5>{tabletrans.images[props.lang]}</h5>
            <input type="file" name="" id="pd-image"/>
            <label htmlFor="pd-image">
                <img src="../assets/img/icon-pic.png" alt="picture"/>
                <h6>Drop or Select file</h6>
                <p>Drop files here or click<span>browse</span>thorough your machine</p>
            </label>
        </div>
    )
}
export default CatImage