// imports the React Javascript Library
import React from "react";
import Resizer from "react-image-file-resizer";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";



import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

// Search


//Tabs
import { withStyles } from "@material-ui/core/styles";

const resizeFile = (file,type) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,1500,900,type,100,0,
      (uri) => {
        resolve(uri);
      },"base64");
  });
const resizeThumb = (file,type) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,150,150,type,70,0,
      (uri) => {
        resolve(uri);
      },"base64");
  });

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing(2)
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: red[800]
    }
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  },
  typography: {
    margin: theme.spacing(2),
    backgroundColor: "default"
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200
  },
  searchInput: {
    marginLeft: 8,
    flex: 1
  },
  searchIconButton: {
    padding: 10
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null
  };

  handleUploadClick = async event => {
    var fileRaw = event.target.files[0];
    var fileType= fileRaw.type
    if(fileType==="image/png")fileType="PNG"
    else fileType="JPEG"
    const tempfile = await resizeFile(fileRaw,fileType);
    const thumbFile = await resizeThumb(fileRaw,fileType);
    //console.log(fileRaw.name.replaceAll(' ','_'))
    //console.log(this.props)
    //this.props.setSender(this.props.sender)
    this.props.setImage({base64:tempfile,fileName:fileRaw.name.replaceAll(' ','_').replaceAll(',','_')});
    this.props.setThumb&&
    this.props.setThumb({base64:thumbFile,fileName:"Thumb"+fileRaw.name.replaceAll(' ','_').replaceAll(',','_')});
  };

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <label htmlFor="pd-image" style={{display:"flex"}}>
             
            <input
              accept="image/*"
              className={classes.input}
              id={"contained-button-file"+this.props.part}
              multiple
              type="file"
              capture="camera" 
              onChange={this.handleUploadClick}
            />
            <label htmlFor={"contained-button-file"+this.props.part} 
              style={{display:"grid"}}>
              <Fab component="span" className={classes.button}>
                <i className="uploadSize fas fa-upload"></i>
              </Fab>
            </label>
            </label>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }


  render() {
    return (
      <React.Fragment>
          {this.renderInitialState() }
            
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
