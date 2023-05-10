import React, { useEffect, useState } from "react";
import Images from "./images";
import axios from "axios";
import { Data, homepagedata } from "./api";

function Navbar() {
  // state variable to hold search data
  const [search, setsearch] = useState("");
  // to hold the images array
  const [images, setimages] = useState("");

  // getting data for user input
  function submitHandler(e) {
    setsearch(e.target.value);
    e.preventDefault();
    const img = async () => {
      const img = await axios.get(Data(1, e.target.value));
      setimages(img.data.photos.photo);
    };
    img();
  }

  // getting homepage images
  useEffect(() => {
    const img = async () => {
      const img = await axios.get(homepagedata());
      setimages(img.data.photos.photo);
    };
    img();
  }, []);

  // for infinite scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isfetching, setisfetching] = useState(false);
  useEffect(() => {
    if (!isfetching) return;
    fetchMoreItems();
  }, [isfetching]);
  const [page, setpage] = useState(2);
  async function fetchMoreItems() {
    setpage(page + 1);
    const img = await axios.get(Data(page, search));
    setimages(images.concat(img.data.photos.photo));
    setisfetching(false);
  }
  async function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setisfetching(true);
    }
  }

  return (
    <div>
      <div className="nav-container">
        <div>
          {" "}
          <h2>Search Photos</h2>
        </div>
        <div className="search-form">
          <div style={{ width: "400px" }}>
            <div class="input-group mb-3">
              <input
                type="search"
                id="search"
                class="form-control "
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={search}
                onChange={(e) => submitHandler(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <Images data={images} loading={isfetching} />
    </div>
  );
}
export default Navbar;
