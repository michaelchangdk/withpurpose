import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import ModuleCards from "../../components/authenticated/ModuleCards";

const WeekPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [moduleQueries, setModuleQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { week } = useParams();
  let modulesArray = [];
  const [modules, setModules] = useState([]);

  const weekQuery = `*[_type == "week" && name == "${week}"] {title, subtitle, description, module}`;

  const fetchModuleRefs = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    setTitle(response[0].title);
    setSubtitle(response[0].subtitle);
    setDescription(response[0].description);
    setModuleQueries(
      response[0].module.map(
        (module) =>
          `*[_type == "module" && _id == "${module._ref}"] {duration, order, name, title, type, _id}`
      )
    );
  };

  const fetchModules = async () => {
    await Promise.all(
      moduleQueries.map((query) =>
        client.fetch(query).then((res) => {
          modulesArray.push(res[0]);
        })
      )
    ).then(() => {
      modulesArray.sort((a, b) => a.order - b.order);
      setModules(modulesArray);
      setLoading(false);
    });
  };

  const fetchAll = async () => {
    await fetchModuleRefs();
    await fetchModules();
  };

  useEffect(() => {
    fetchAll();
  }, [loading]);

  return (
    <>
      <HeaderAuth />
      <p>{title}</p>
      <p>{subtitle}</p>
      <p>{description}</p>
      {loading && <p>Loading...</p>}
      {!loading &&
        modules.map((module) => (
          <ModuleCards
            key={module.title}
            duration={module.duration}
            name={module.name}
            title={module.title}
            type={module.type}
          />
        ))}
    </>
  );
};

export default WeekPage;
