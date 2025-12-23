import { useState } from "react";

function EditPanel({ userId, food, foods, isEdit, showEditPanel, setFoods }) {
    const [content, setContent] = useState(food.content);
    const [calories, setCalories] = useState(food.calories);
    const [protein, setProtein] = useState(food.protein);
    const [carbohydrate, setCarbohydrate] = useState(food.carbohydrate);
    const [fat, setFat] = useState(food.fat);
    const [sodium, setSodium] = useState(food.sodium);

    async function updateRecordsApi(id, req) {
        await fetch(`http://localhost:3000/records/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }

    async function deleteRecordsApi(id) {
        await fetch(`http://localhost:3000/records/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const editRecord = (id) => {
        const editModel = { content, calories, protein, carbohydrate, fat, sodium, id };
        updateRecordsApi(id, editModel)
        setFoods(foods.map((food) => {
            return food.id === id ? editModel : food;
        }));
        showEditPanel(false);
    }

    const deleteRecord = (id) => {
        deleteRecordsApi(id)
        setFoods(foods.filter((food) => food.id !== id));
        showEditPanel(false);
    }

    return (
        <div className="PanelContainer popup" style={{ marginLeft: '120px', display: `${isEdit ? 'block' : 'none'}` }}>
            <h2 style={{ marginBottom: '20px' }}>編輯紀錄</h2>
            <div className="panalInputContainer">
                <div>名稱:</div>
                <input className="panalInput" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>卡路里:</div>
                <input className="panalInput" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>蛋白質:</div>
                <input className="panalInput" type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>碳水:</div>
                <input className="panalInput" type="number" value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>脂肪:</div>
                <input className="panalInput" type="number" value={fat} onChange={(e) => setFat(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>鈉:</div>
                <input className="panalInput" type="number" value={sodium} onChange={(e) => setSodium(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                <button className="addButton" onClick={() => editRecord(food.id)}>確認</button>
                <button className="button" style={{ backgroundColor: '#777777' }} onClick={() => showEditPanel(false)}>取消</button>
                <button className="button" style={{ backgroundColor: 'red' }} onClick={() => deleteRecord(food.id)}>刪除</button>
            </div>
        </div>
    );
}

export default EditPanel;