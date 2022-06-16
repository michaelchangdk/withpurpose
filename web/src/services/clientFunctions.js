import { useState, useEffect } from "react";
import { client } from "../client";

// HeroHeader Component - fetching Hero Header
export const SetHeader = (query) => {
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    client.fetch(query).then((response) => {
      setHeroRef(response[0].heroImage.asset._ref);
      setTitle(response[0].title);
      setSubtitle(response[0].subtitle);
      setLoading(false);
    });
  }, [query]);

  return [loading, heroRef, title, subtitle];
};

// LessonItem Component Functions
export const checkLesson = (userid, lesson) => {
  client
    .patch(userid)
    .setIfMissing({
      completed: [],
    })
    .insert("after", "completed[-1]", [
      {
        lessonRef: lesson._id,
        lessonTitle: lesson.title,
        userId: userid,
        completed: true,
      },
    ])
    .commit({ autoGenerateArrayKeys: true })
    .then(() => {});
};

export const uncheckLesson = (userid, completedLesson) => {
  const deleteQuery = [
    `completed[lessonRef=="${completedLesson[0].lessonRef}"]`,
  ];
  client
    .patch(userid)
    .unset(deleteQuery)
    .commit()
    .then(() => {});
};
