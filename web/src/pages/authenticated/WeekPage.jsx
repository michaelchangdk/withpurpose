import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import { urlFor } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import ModuleCards from "../../components/authenticated/ModuleCards";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import down from "../../assets/down.png";

const WeekPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [moduleQueries, setModuleQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
  const { week } = useParams();
  let modulesArray = [];
  const [modules, setModules] = useState([]);

  // const weekQuery = `*[_type == "week" && name == "${week}"] {title, subtitle, description, module`;
  const weekQuery = `*[_type == "week" && name == "${week}"]`;

  const fetchModuleRefs = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    console.log(response[0]);
    setTitle(response[0].title);
    setSubtitle(response[0].subtitle);
    setDescription(response[0].description);
    setHeroRef(response[0].heroImage.asset._ref);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {loading && <>Loading</>}
      {!loading && (
        <>
          <Header backgroundimage={urlFor(heroRef).url()}>
            <HeaderAuth />
            <PageContainer>
              <HeaderTitleWrapper>
                <HeaderTitle>{subtitle}</HeaderTitle>
                <HeaderSubtitle>{title}</HeaderSubtitle>
              </HeaderTitleWrapper>
              <HeaderInstruction>
                <HeaderSubtitle>Scroll to the course</HeaderSubtitle>
                <HeaderIcon src={down} alt="down arrow." />
              </HeaderInstruction>
            </PageContainer>
          </Header>
          <PageContainer>
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
          </PageContainer>
        </>
      )}
    </>
  );
};

export default WeekPage;

const Header = styled.header`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.backgroundimage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 64px;
  padding-bottom: 10px;
`;

const HeaderSubtitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 300;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
`;

const HeaderInstruction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 2vh;
  gap: 1vh;
`;

const HeaderIcon = styled.img`
  width: 20px;
  height: 20px;
`;
