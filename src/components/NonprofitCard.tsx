import { useEffect, useState } from "react";
import axios from "axios";

interface CharityCauseData {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
}

interface ApiResponse {
  nonprofits: CharityCauseData[];
}

const API_KEY = (import.meta.env.VITE_API_KEY as string) ?? "";

const NonprofitCard = () => {
  const [causes, setCauses] = useState<ApiResponse>();

  // Fetching data using then-catch
  //   useEffect(() => {
  //     axios
  //       .get<ApiResponse>(
  //         `https://partners.every.org/v0.2/browse/animals?apiKey=${API_KEY}`
  //       )
  //       .then((response) => {
  //         setCauses({ nonprofits: response.data.nonprofits });
  //         console.log(response.data.nonprofits);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error!", error);
  //       });
  //   }, []);

  // Fetching data using async-await
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://partners.every.org/v0.2/browse/animals?apiKey=${API_KEY}`
        );
        setCauses({ nonprofits: response.data.nonprofits });
        console.log(response.data.nonprofits);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    //explicitly stating that you're aware the promise is not being handled
    void fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {causes && causes.nonprofits.length > 0 ? (
          causes.nonprofits.map((cause, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
              <div className="card">
                <img
                  src={cause.coverImageUrl}
                  className="card-img-top"
                  alt={`${cause.name} Cover`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{cause.name}</h5>
                  <p className="card-text">{cause.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading charities...</p>
        )}
      </div>
    </div>
  );
};

export default NonprofitCard;
