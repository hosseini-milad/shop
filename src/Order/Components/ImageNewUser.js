// imports the React Javascript Library
import React from "react";
import Resizer from "react-image-file-resizer";


const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,1500,900,"JPEG",100,0,
      (uri) => {
        resolve(uri);
      },"base64");
  });

const styles = theme => ({
  
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null
  };

  handleUploadClick = async event => {
    var fileRaw = event.target.files[0];
    const tempfile = await resizeFile(fileRaw);
    //console.log(fileRaw.name.replaceAll(' ','_'))
    //console.log(this.props)
    //this.props.setSender(this.props.sender)
    this.props.setImage({base64:tempfile,fileName:fileRaw.name.replaceAll(' ','_').replaceAll(',','_')});
  };


  renderInitialState() {
    return (
      <React.Fragment>
          <input
              accept="image/*"
              id={"contained-button-file"+this.props.part}
              multiple
              type="file"
              capture="camera" 
              onChange={this.handleUploadClick}
            />
            <label htmlFor={"contained-button-file"+this.props.part}>
              بارگذاری تصویر
            </label>
            
      </React.Fragment>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
            {(this.state.mainState == "initial" && this.renderInitialState())
               }
          
      </React.Fragment>
    );
  }
}

export default (ImageUploadCard);
