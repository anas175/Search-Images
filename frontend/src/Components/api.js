// setting flicker url for (user search inputs)

const Data = (page, search) => {
  const ApiKey = "0b37a9e8ccf4517094efe0095efb5159";
  const data = {
    method: "flickr.photos.search",
    api_key: ApiKey,
    text: search,
    sort: "interestingness-desc",
    per_page: 12,
    license: "4",
    extras: "owner_name,license",
    format: "json",
    nojsoncallback: 1,
    page: page,
  };

  const parameters = new URLSearchParams(data);

  const url = `https://api.flickr.com/services/rest/?${parameters}`;

  return url;
};
// setting url for flicker (homepage)
function homepagedata() {
  const url =
    "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=0b37a9e8ccf4517094efe0095efb5159&per_page=15&format=json&nojsoncallback=1";
  return url;
}
export { Data, homepagedata };
