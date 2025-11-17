/** @format */
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const EventList = () => {
  const { data } = useFetch("https://meetups-backend-sooty.vercel.app/events");
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventType, setEventType] = useState("All");

  const eventFilterType = () => {
    if (!data) return;
    const input = searchInput.toLowerCase();
    const filtered = data?.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(input);
      const tagsMatch = event.tags?.join(" ").toLowerCase().includes(input);
      const matchSearch = input === "" || titleMatch || tagsMatch;
      const eventFilter = eventType === "All" || event.eventType === eventType;
      return matchSearch && eventFilter;
    });
    setFilteredEvents(filtered);
  };
  console.log(data);

  useEffect(() => {
    if (data) eventFilterType();
  }, [data, eventType]);

  const handleSearch = () => {
    eventFilterType(searchInput, eventType);
  };

  return (
    <>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <div className="container py-4">
        <div className="py-3 d-flex justify-content-end">
          <select
            name="eventType"
            id="eventFilter"
            className="border rounded px-2 py-1  text-secondary"
            onChange={(event) => setEventType(event.target.value)}
          >
            <option value="All"> Select event type </option>
            <option value="All">Both </option>
            <option value="Offline"> Offline </option>
            <option value="Online"> Online </option>
          </select>
        </div>

        <div className="row">
          {filteredEvents?.length > 0 ? (
            filteredEvents.map((event) => (
              <div className="col-md-4 mb-4" key={event._id}>
                <div className="" style={{ width: "18rem" }}>
                  <div className="position-relative">
                    <img
                      src={event.image}
                      className="card-img-top"
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                      }}
                    />
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-primary position-absolute top-0 start-0 m-2 px-3 py-2"
                    >
                      {event.eventType} Event
                    </Link>
                  </div>

                  <div className="card-body">
                    <p className="card-text mb-1">{event.startTime}</p>
                    <h5 className="card-title mt-0 mb-2">{event.title}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center container ">No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventList;
