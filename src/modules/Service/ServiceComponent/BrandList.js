function BrandList(props){
    return(
    <dialog id="modal" onClick={()=>props.showBrands(0)}>
      <div className="popup-brand">
        <div className="popup-header">
          <h5>Manage Brands</h5>
          <i className="fa-solid fa-x close-modal" style={{color: "#ff0000",cursor: "pointer"}}></i>
        </div>
        <div className="popup-wrapper">
          <h6>Brands</h6>
          <div className="brand-name-popup">
            <p>Essense</p>
            <div className="brand-name-icon">
              <i className="fa-solid fa-pencil fa-sm" style={{color: "#00dbdb"}}></i>
              <p>Edit</p>
              <i className="fa-solid fa-trash fa-sm" style={{color: "#00dbdb"}}></i>
              <p>Delete</p>
            </div>
          </div>
          <div className="brand-name-popup">
            <p>Essense</p>
            <div className="brand-name-icon">
              <i className="fa-solid fa-pencil fa-sm" style={{color: "#00dbdb"}}></i>
              <p>Edit</p>
              <i className="fa-solid fa-trash fa-sm" style={{color: "#00dbdb"}}></i>
              <p>Delete</p>
            </div>
          </div>
        </div>
        <div className="add-brand-btn">+ New Brand</div>
      </div>
    </dialog>
    )
}
export default BrandList