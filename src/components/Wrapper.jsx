import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { FaCalculator } from "react-icons/fa";
import FoodRecord from "./FoodRecord"
import ItemNameBar from "./ItemNameBar"
import TotalBar from "./TotalBar"
import AddButton from "./AddButton"
import CreatePanel from "./CreatePanel"
import Calculator from "./Calculator"
import EditPanel from "./EditPanel"


function Wrapper({ setUser }) {

    const user = useParams()
    const userId = user.id;

    const [isCreating, setIsCreating] = useState(false)
    const [isCalculate, setIsCalculate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [bmr, setBmr] = useState(0);
    const [tdee, setTdee] = useState(0);
    const [foods, setFoods] = useState([])
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {
        getAllRecords();
        setUser(userId)
    }, [])

    async function getAllRecords() {
        const res = await fetch(`http://localhost:3000/records?from=${userId}`)
        const data = await res.json();
        setFoods(data);
    }

    async function clearAllRecordsApi() {
        await fetch(`http://localhost:3000/records?from=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const onClearClick = () => {
        if (window.confirm('確定要清空全部飲食紀錄')) {
            setFoods([]);
            clearAllRecordsApi([]);
        } else {
            return;
        }

    }

    const showCreatePanel = (isCreating) => {
        if (!isEdit && !isCalculate) setIsCreating(isCreating)
    }

    const showCalculator = (isCalculate) => {
        if (!isCreating && !isEdit) setIsCalculate(isCalculate);
    }

    const showEditPanel = (isEdit, target) => {
        if (!isCreating && !isCalculate) {
            setIsEdit(isEdit);
            setSelectedFood(target);
        }
    }

    const calculate = (bmr, tdee) => {
        setBmr(bmr);
        setTdee(tdee);
    }

    const createRecord = (newRecord) => {
        setFoods([...foods, newRecord])
    }

    return (
        <>
            <div className="wrapper">
                <h1>飲食紀錄</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddButton showCreatePanel={showCreatePanel} />
                </div>
                <ItemNameBar />
                {foods.map((food) => {
                    return (
                        <FoodRecord
                            key={food.id}
                            food={food}
                            showEditPanel={showEditPanel} />
                    )
                })}

                <hr style={{ marginTop: '15px' }} />
                <TotalBar foods={foods} />
                <div className="button" style={{ backgroundColor: '#777777', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => showCalculator(true)}>
                    <FaCalculator style={{ marginRight: '10px' }} />
                    <div>
                        BMR、TDEE 計算機
                    </div>
                </div>
                <div className="button" style={{ backgroundColor: 'red', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClearClick}>
                    <FaCalculator style={{ marginRight: '10px' }} />
                    <div>
                        清空紀錄
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px' }}>
                <div>
                    BMR: {bmr} cal
                </div>
                <div style={{ marginLeft: '15px' }}>
                    TDEE: {tdee} cal
                </div>
            </div>

            {/* popup: create panel */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CreatePanel
                    userId={userId}
                    isCreating={isCreating}
                    showCreatePanel={showCreatePanel}
                    createRecord={createRecord} />
            </div>

            {/* popup: edit panel */}
            {isEdit && selectedFood && (
                <EditPanel
                    userId={userId}
                    food={selectedFood}
                    foods={foods}
                    setFoods={setFoods}
                    isEdit={isEdit}
                    showEditPanel={setIsEdit}
                />
            )}

            {/* popup: calculate panel */}
            <div>
                <Calculator
                    bmr={bmr}
                    tdee={tdee}
                    calculate={calculate}
                    showCalculator={showCalculator}
                    isCalculate={isCalculate} />
            </div>
        </>
    )
}

export default Wrapper