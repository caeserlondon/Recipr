import { useEffect, useContext } from "react";
import axios from "axios";
import MealContainer from "../../components/MealContainer/mealContainer";
import { MyContext } from "../../context";
import "./styles.css";

function Homepage() {
  const { meals, setMeals } = useContext(MyContext);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <MealContainer meals={meals} />
    </div>
  );
}

export default Homepage;
