import { useEffect, useState } from "react";
import MealItems from "./MealItems";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMeals() {
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetch('http://localhost:3000/meals');

                if (!result.ok) {
                    throw new Error('Failed to fetch meals. Please try again later.');
                }
                const data = await result.json();
                setLoadedMeals(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMeals();
    }, []);

    if (isLoading) {
        return <p style={{ color: 'blue' }}>Loading meals...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (loadedMeals.length === 0) {
        return <p>No meals found.</p>;
    }

    return (
        <ul id="meals">
            {loadedMeals.map(item => (
                <MealItems key={item.id} meal={item} />
            ))}
        </ul>
    );
}
