import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tour from "./Tour";
import Tours from "./Tours";

/**
 * - while fetching, setLoading to true (as extra precaution) (1)
 * - use useEffect where invoking fetchTours once App component renders (2)
 * - insert dependency array [] so that it only runs once upon initial render (3)
 * - pass removeTour() as a prop (4)
 */

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true); //                                        (1)

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //                                                            (2)
  useEffect(() => {
    fetchTours();
  }, []); //                                                    (3)

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    //                                                   (4)
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
