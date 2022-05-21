import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box } from "@mui/material";
import { client } from "../../client";
import AlumniCards from "../../components/AlumniCards";

const AlumniPrivate = () => {
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);

  const fetchAlumni = async () => {
    setLoading(true);
    const alumniQuery = `*[_type == "alumni"]`;
    const fetch = await client.fetch(alumniQuery);
    const response = await fetch;
    console.log(response);
    setAlumni(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <LandingPageHero
        query={`*[_type == "landingpageelements" && order == 4]`}
        type={"page"}
        displaySubtitle={true}
      />
      <PageContainer>
        {!loading &&
          alumni.map((student) => {
            return <AlumniCards key={student._id} alumni={student} />;
          })}
        {/* PAGE INFORMATION */}
      </PageContainer>
    </Box>
  );
};

export default AlumniPrivate;
