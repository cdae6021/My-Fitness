import { useState, useEffect } from "react"


function FoodRecord({ food, showEditPanel }) {

    return (
        <>
            <div className="barContainer" style={{ cursor: 'pointer' }} onClick={() => showEditPanel(true, food)}>
                <div>{food.content}</div>
                <div>{food.calories} cal</div>
                <div>{food.protein} g</div>
                <div>{food.carbohydrate} g</div>
                <div>{food.fat} g</div>
                <div>{food.sodium} g</div>
            </div>
        </>
    );
}

export default FoodRecord;