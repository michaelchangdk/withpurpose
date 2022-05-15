import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";

const ModulePage = () => {
  const { module } = useParams();
  const [moduleDescription, setModuleDescription] = useState("");
  const [lessonQueries, setLessonQueries] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  let lessonsArray = [];

  const moduleQuery = `*[_type == "module" && name == "${module}"]`;

  const fetchLessonRefs = async () => {
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    console.log(response);
    if (response[0].description) {
      setModuleDescription(response[0].description);
    }
    setLessonQueries(
      response[0].lesson.map(
        (lesson) => `*[_type == "lesson" && _id == "${lesson._ref}"]`
      )
    );
  };

  const fetchLessons = async () => {
    await Promise.all(
      lessonQueries.map((query) =>
        client.fetch(query).then((res) => {
          lessonsArray.push(res[0]);
        })
      )
    ).then(() => {
      lessonsArray.sort((a, b) => a.order - b.order);
      setLessons(lessonsArray);
      setLoading(false);
    });
  };

  const fetchAll = async () => {
    await fetchLessonRefs();
    await fetchLessons();
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <HeaderAuth />
      {/* FIGURE OUT HOW TO ADD NEW LINES TO DESCRIPTION FOR NON-VIDEO! */}
      {moduleDescription.length > 0 && <div>{moduleDescription}</div>}
      <LessonList lessons={lessons} />
    </>
  );
};

export default ModulePage;
