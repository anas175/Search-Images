import React, { useState } from "react";
function Images(props) {
  // state variable for img url
  const [img, setimg] = useState("");

  // getting img url from img id's (from flicker)
  const getFlickrImageURL = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (size) {
      url += `_${size}`;
    }
    url += ".jpg";
    return url;
  };

  return (
    <div>
      <div class="row images-container">
        {/* looping for photo arrays */}
        {props.data
          ? props.data.map((photo) => {
              return (
                <div
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                  class="col-lg-4 col-md-12 mb-4 mb-lg-0"
                >
                  <img
                    key={photo.id}
                    src={getFlickrImageURL(photo, "z")}
                    class="w-100 shadow-1-strong rounded mb-4 photos"
                    alt=""
                    onClick={(e) => setimg(e.target.src)}
                  />
                </div>
              );
            })
          : "Loading"}

        {/* large image modal  */}
        <div
          class="modal fade bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <img src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
      {props.loading ? <div className="loading">loading...</div> : ""}
    </div>
  );
}
export default Images;
