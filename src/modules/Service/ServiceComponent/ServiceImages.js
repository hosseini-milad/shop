
function ServiceImages(props){
    return(

        <div className="item-col">
          <div className="image-input">
            <input type="file" name="" id="img"/>
            <label htmlFor="img">
              <img src="../assets/img/icon-pic.png" alt=""/>
              <p>Drag image(s) here <br/>or<br/><span>browse images</span></p>
              <p>You can add up to 15 images, each not <br/> exceeding 5 MB.</p>
            </label>
          </div>
        </div>
    )
}
export default ServiceImages