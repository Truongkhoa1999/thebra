import "./style/instagramview.scss";
export const InstagramView = () => {
  const datalink = [
    "https://www.instagram.com/p/Cv2Unalona8/?img_index=2",
    "https://www.instagram.com/p/CveFjj9qdqj/?img_index=1",
    "https://www.instagram.com/p/CvjM5zmqV_q/?img_index=1",
    "https://www.instagram.com/p/CvtolWGt_9W/?img_index=1",
  ];
  return (
    <div className="instagram_container">
      <h2>
        FOLLOW US,
        <br />
        @thebra_lingerie

      </h2>
      <div className="image_container">
        <a href={datalink[0]} target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Banner%2F21.avif?alt=media&token=66958c34-6f53-4fb3-91cb-86caef00eb6c"
            alt="Instagram post"
          />
        </a>
        <a href={datalink[1]} target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Banner%2F22.avif?alt=media&token=2b2d9abf-20ae-473e-a1dd-7ea137e77b2b"
            alt="Instagram post"
          />
        </a>

        <a href={datalink[2]} target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Banner%2F26.avif?alt=media&token=b31088a8-189d-4612-ad5e-7ec7996bd22c"
            alt="Instagram post"
          />
        </a>

        <a href={datalink[3]} target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/Banner%2F27.avif?alt=media&token=02dff0cd-eb7c-41a5-a82c-3ceb8d8ed5b1"
            alt="Instagram post"
          />
        </a>
      </div>
    </div>
  );
};
