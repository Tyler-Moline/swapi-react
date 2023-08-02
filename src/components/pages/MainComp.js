import { useState, useEffect } from "react";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [exactPerson, setExactPerson] = useState("");
  const [exactPersonHomeWorld, setExactPersonHomeWorld] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
      })
      .catch((error) => console.error(error));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (exactPersonHomeWorld !== "") {
      const controller = new AbortController();

      fetch(`${exactPersonHomeWorld}`)
        .then((res) => res.json())
        .then((data) => {
          setPlanet(data.name);
        })
        .catch((error) => console.error(error));

      return () => controller.abort();
    }
  }, [exactPersonHomeWorld]);

  function getExactPerson(specificPerson) {
    const controller = new AbortController();

    fetch(`https://swapi.dev/api/people/${specificPerson}/`)
      .then((res) => res.json())
      .then((data) => {
        setExactPersonHomeWorld(data.homeworld);
        setExactPerson(specificPerson);
      })
      .catch((error) => console.error(error));

    return () => controller.abort();
  }

  // debugger;
  useEffect(() => {
    console.log({ exactPerson });
  }, [exactPerson]);

  return (
    <div>
      {people.map((person) => {
        return (
          <div className="person" key={person.uid}>
            <h5>{person.name}</h5>
            {exactPerson === person.uid && planet === "" ? (
              <p style={{ marginLeft: "10px" }}>Loading...</p>
            ) : (
              <button
                onClick={() => {
                  setExactPerson("");
                  setPlanet("");
                  getExactPerson(person.uid);
                }}
              >
                Learn about their planet
              </button>
            )}
            <div style={{ marginLeft: "10px" }}>
              {exactPerson === person.uid ? planet : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}
