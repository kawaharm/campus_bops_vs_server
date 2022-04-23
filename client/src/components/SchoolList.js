import React, { useEffect, useContext, useState } from "react";
import { SchoolsContext } from "../context/CampusContext";
import SchoolFinder from "../api/SchoolFinder";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SchoolList() {
  const { schools, setSchools } = useContext(SchoolsContext);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all schools from server
        const response = await SchoolFinder.get("/");
        // Store school list in state
        console.log(response.data);

        setSchools(response.data.data.schools);

        // axios
        //   .post(`${process.env.REACT_APP_SERVER_URL}/api/server`, {
        //     name: "this is from api post in schoollist",
        //   })
        //   .then((response) => {
        //     console.log("RESPONSE IN SCHOOLLIST", response);
        //     console.log("RESPONSE DATA IN SCHOOLLIST", response.data);
        //     // setUser(response.data);
        //   });
      } catch (err) {
        console.log("CATCH ERROR IN SCHOOLLIST", err);
      }
    };

    fetchData();
  }, []);

  const handleSchoolSelect = (id) => {
    try {
      // Navigate to detail page
      navigate(`/schools/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">School</th>
          </tr>
        </thead>
        <tbody>
          {/* && Means will only render if schools exists */}
          {schools &&
            schools.map((school) => {
              return (
                <tr
                  onClick={() => {
                    handleSchoolSelect(school.id);
                  }}
                  key={school.id}
                >
                  <td style={{ cursor: "pointer" }}>{school.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default SchoolList;
