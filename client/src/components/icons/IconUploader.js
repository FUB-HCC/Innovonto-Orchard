import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";
import { ScaleLoader } from "react-spinners";
import Images from "./Images";
import Buttons from "./Buttons";
import { apiEndpoint } from "../../utils";

const types = ["image/png", "image/jpeg", "image/gif"];

const toastColor = {
  background: "#505050",
  text: "#fff"
};

export default class IconUploader extends Component {
  state = {
    uploading: false,
    images: this.props.images ? this.props.images : []
  };

  toast = notify.createShowQueue();

  componentWillReceiveProps({ images }) {
    if (images !== this.props.images) {
      this.setState({ images });
    }
  }

  onChange = e => {
    const errs = [];
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();
    if (files.length !== 1) {
      errs.push("Only One File allowed");
    } else {
      const file = files[0];
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }
      //Should be 3 MB
      if (file.size > 3145728) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }
      formData.append("file", file);
    }

    if (errs.length) {
      errs.forEach(err => this.toast(err, "custom", 2000, toastColor));
      this.setState({ uploading: false });
    }

    apiEndpoint
      .post("/icons/", formData)
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        return res.data;
      })
      .then(data => {
        const image = {
          ...data
          //qualifiedResourceName: "http://localhost:8080" + data.resourceName
        };
        this.setState({
          uploading: false,
          images: [image]
        });
        this.props.onUploadComplete(data);
      })
      .catch(err => {
        this.toast(err.message, "custom", 2000, toastColor);
        this.setState({ uploading: false });
      });
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.resourceName !== id)
    });
  };

  render() {
    const { uploading, images } = this.state;
    const content = () => {
      switch (true) {
        case uploading:
          return (
            <ScaleLoader
              loading={true}
              sizeUnit={"px"}
              size={120}
              color={"rgb(255, 213, 79)"}
            />
          );
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div>
        <Notifications />
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}
