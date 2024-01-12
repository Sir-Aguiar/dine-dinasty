import React, { useEffect } from "react";
import "./AssistantMessage.css";

interface Props {
  ingredients: {
    name: string;
    quantity: string;
  }[];
  prepare: string[];
}

const AssistantMessage: React.FC<Props> = ({ ingredients, prepare }) => {
  useEffect(() => {
    console.log(ingredients, prepare);
  }, []);

  return (
    <div className="assistant-message">
      <header>
        <span className={`w-5 h-5 rounded-full bg-orange-400`}></span>
        <span className="font-semibold">Chef Chico</span>
      </header>
      <main>
        <div className="ingredients">
          <h1>Ingredientes</h1>
          <ul>
            {ingredients.map(({ name, quantity }) => (
              <li>
                {name} ({quantity})
              </li>
            ))}
          </ul>
        </div>
        <div className="prepare">
          <h1>Modo de preparo</h1>
          <ol>
            {prepare.map((prepare) => (
              <li>{prepare}</li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
};

export default AssistantMessage;
