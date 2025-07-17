import { useContext } from "react";
import { currencyFormatter } from "../util/currencyFormatter";
import Button from "./UI/Button";
import { CartContext } from "../Store/CartContext";
export default function MealItems({ meal }) {
  const cartCtx = useContext(CartContext)
  function handleAddMealToCart(){
    cartCtx.addItems(meal)
  }
  
  return (
    <li className="meal-item">
      <article>
        <img src={`https://the-beautiful-indian.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick = {handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
