import { useState } from "react"


function CreatePanel({ userId, isCreating, showCreatePanel, createRecord }) {

    const [content, setContent] = useState('');
    const [calories, setCalories] = useState('0');
    const [protein, setProtein] = useState('0');
    const [carbohydrate, setCarbohydrate] = useState('0');
    const [fat, setFat] = useState('0');
    const [sodium, setSodium] = useState('0');

    async function AddRecordApi(req) {
        await fetch(`http://localhost:3000/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }

    const onCreateClick = () => {
        const newRecord = { content, calories, protein, carbohydrate, fat, sodium, id: Math.random().toString(), from: userId }
        createRecord(newRecord);
        AddRecordApi(newRecord)
        refreshInput();
        showCreatePanel(false);
    }

    const onCancelClick = () => {
        refreshInput();
        showCreatePanel(false);
    }

    const refreshInput = () => {
        setContent('');
        setCalories('0');
        setProtein('0');
        setCarbohydrate('0');
        setFat('0');
        setSodium('0');
    }

    // 去除前导零的处理函数
    const removeLeadingZero = (value) => {
        return value.replace(/^0+(?!$)/, '');
    }


    return (
        <div className="PanelContainer popup" style={{ display: `${isCreating ? 'block' : 'none'}` }}>
            <h2 style={{ marginBottom: '20px' }}>
                新增紀錄
            </h2>
            <div className="panalInputContainer">
                <div>
                    名稱:
                </div>
                <input className="panalInput" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="panalInputContainer">
                <div>
                    卡路里:
                </div>
                <input className="panalInput" type="number" value={calories} onChange={(e) => setCalories(removeLeadingZero(e.target.value))} />
            </div>
            <div className="panalInputContainer">
                <div>
                    蛋白質:
                </div>
                <input className="panalInput" type="number" value={protein} onChange={(e) => setProtein(removeLeadingZero(e.target.value))} />
            </div>
            <div className="panalInputContainer">
                <div>
                    碳水:
                </div>
                <input className="panalInput" type="number" value={carbohydrate} onChange={(e) => setCarbohydrate(removeLeadingZero(e.target.value))} />
            </div>
            <div className="panalInputContainer">
                <div>
                    脂肪:
                </div>
                <input className="panalInput" type="number" value={fat} onChange={(e) => setFat(removeLeadingZero(e.target.value))} />
            </div>
            <div className="panalInputContainer">
                <div>
                    鈉:
                </div>
                <input className="panalInput" type="number" value={sodium} onChange={(e) => setSodium(removeLeadingZero(e.target.value))} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                <button className="addButton" onClick={onCreateClick}>
                    確認
                </button>
                <button className="button" style={{ backgroundColor: '#777777' }} onClick={onCancelClick}>
                    取消
                </button>
            </div>
        </div>
    )
}

export default CreatePanel