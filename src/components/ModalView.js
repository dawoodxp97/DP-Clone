import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "./../ModalView.css";
const ModalView = ({ videoUrl }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoUrl}
        onClose={() => setOpen(false)}
      />

      <button className="btn-primary" onClick={() => setOpen(true)}>
        Trailer
      </button>
    </React.Fragment>
  );
};

export default ModalView;
