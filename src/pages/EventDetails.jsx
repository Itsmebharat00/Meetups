/** @format */
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";

const EventDetails = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useFetch(
    `https://meetups-backend-sooty.vercel.app/events/${eventId}`
  );

  console.log(data);

  if (loading) return <p className="container py-4">Loading...</p>;
  if (error) return <p className="container py-4">Error loading event</p>;
  if (!data) return <p className="container py-4">No event found.</p>;

  return (
    <>
      <Header />
      <div className="container py-4">
        <h3 className="fw-bold mb-1">{data.title}</h3>
        <p className="text-muted">
          Hosted By: <strong>{data.hostedBy}</strong>
        </p>

        <div className="row mt-4">
          <div className="col-md-8">
            <img
              src={data.image}
              alt=""
              className="img-fluid rounded mb-4"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            <h5 className="fw-bold">Details:</h5>
            <p className="text-muted">{data.description}</p>

            <h5 className="fw-bold mt-4">Additional Information:</h5>
            <p>
              <strong>Dress Code:</strong> {data.dressCode}
            </p>
            <p>
              <strong>Age Restrictions:</strong> {data.ageRestrictions}
            </p>

            <h5 className="fw-bold mt-4">Event Tags:</h5>
            <div>
              {data.tags?.map((tag) => (
                <span className="badge bg-primary text-white me-2 mb-2 px-3 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4 shadow-sm border-0">
              <div className="card-body">
                <p className="mb-2">
                  {data.startTime} <br /> to {data.endTime}
                </p>
                <p className="mb-2">{data.location}</p>
                <p className="mb-0">Cost: {data.price}Rs </p>
              </div>
            </div>

            {data.speakers?.length > 0 && (
              <div className="card mb-4 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    Speakers: ({data.speakers.length})
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {data.speakers?.map((speaker) => (
                      <div className=" text-center">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                          }}
                        />
                        <p className="mb-0 fw-semibold"> {speaker} </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary w-100 py-2 fw-semibold">
              RSVP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
