import { useState, useEffect } from "react";

function TotalBar({ foods }) {
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCrbohydrate, setTotalCrbohydrate] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [totalSodium, setTotalSodium] = useState(0);

    useEffect(() => {
        const totalCal = foods.reduce((sum, food) => sum + Number(food.calories), 0);
        const totalPro = foods.reduce((sum, food) => sum + Number(food.protein), 0);
        const totalCrb = foods.reduce((sum, food) => sum + Number(food.carbohydrate), 0);
        const totalFa = foods.reduce((sum, food) => sum + Number(food.fat), 0);
        const totalSod = foods.reduce((sum, food) => sum + Number(food.sodium), 0);
        setTotalCalories(totalCal);
        setTotalProtein(totalPro);
        setTotalCrbohydrate(totalCrb);
        setTotalFat(totalFa)
        setTotalSodium(totalSod);

    }, [foods]);


    return (
        <div className="barContainer" style={{ backgroundColor: '#aaaaaa', color: '#555555' }}>
            <div>總量：</div>
            <div>
                {totalCalories} cal
            </div>
            <div>
                {totalProtein} g
            </div>
            <div>
                {totalCrbohydrate} g
            </div>
            <div>
                {totalFat} g
            </div>
            <div>
                {totalSodium} g
            </div>
        </div>
    )
}

export default TotalBar