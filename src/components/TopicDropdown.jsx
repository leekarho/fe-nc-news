import { useEffect, useState } from "react";
import { getTopics } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function TopicDropdown() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then(({ data }) => {
      setTopics(data.topics);
    });
  }, []);

  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    if (selectedTopic !== "Topic") {
      navigate(`/${selectedTopic}`);
    }
  };

  return (
    <select name="" id="" onChange={handleChange}>
      <option>Topic</option>
      {topics.map((topic, index) => (
        <option key={index} value={topic.slug}>
          {topic.slug}
        </option>
      ))}
    </select>
  );
}
