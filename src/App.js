import * as React from "react";
import { fetchPhoto } from "./api";
import Carousel from "./Carousel";
import PhotoCard from "./PhotoCard";

export default function App() {
  const [id, setId] = React.useState(0);
  const [photo, setPhoto] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handlePrevious = () => {
    if (id > 0) setId(id - 1);
  };
  const handleNext = () => setId(id + 1);

  React.useEffect(() => {
    let isStale = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);

      const { error, response } = await fetchPhoto(id);

      if (isStale) return;
      if (error) {
        setError(error.message);
      } else {
        setPhoto(response);
      }

      setLoading(false);
    };

    fetch();

    return () => {
      isStale = true;
    };
  }, [id]);

  return (
    <Carousel onPrevious={handlePrevious} onNext={handleNext}>
      <PhotoCard loading={loading} error={error} data={photo} />
    </Carousel>
  );
}
