import { useState } from "react";

function Calculator({ bmr, tdee, calculate, showCalculator, isCalculate }) {

    const [sex, setSex] = useState('male');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [strength, setStrength] = useState(0);


    const onCalculateClick = () => {
        let bmrResult;
        let tdeeResult;
        if (sex === 'female') {
            bmrResult = Number(10 * weight) + Number(6.25 * height) - Number(5 * age) - 161;
        } else {
            bmrResult = Number(10 * weight) + Number(6.25 * height) - Number(5 * age) + 5;
        }
        tdeeResult = bmrResult * Number(strength);
        calculate(bmrResult, tdeeResult)
    }

    const onSexClick = (value) => {
        setSex(value);
    }

    const onCancelClick = () => {
        showCalculator(false);
    }


    return (
        <div className="calculator popup" style={{ display: `${isCalculate ? 'block' : 'none'}` }}>
            <h3 style={{ marginBottom: '30px' }}>
                TDEE 計算器
            </h3>
            <div className="InputContainer">
                <div>
                    性別:
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <label>
                        <input type="radio" name="sex" value="male" onClick={(e) => onSexClick(e.target.value)} />
                        <span className="radioButton">男性</span>
                    </label>
                    <label>
                        <input type="radio" name="sex" value="female" onClick={(e) => onSexClick(e.target.value)} />
                        <span className="radioButton">女性</span>
                    </label>
                </div>
            </div>
            <div className="InputContainer">
                <div>
                    年齡:
                </div>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="InputContainer">
                <div>
                    身高:
                </div>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="InputContainer">
                <div>
                    體重:
                </div>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="InputContainer">
                <div>
                    活動強度:
                </div>
                <select name="strength" onChange={(e) => setStrength(e.target.value)} >
                    <option value="0">--請選擇--</option>
                    <option value="1.2">沒啥運動QQ</option>
                    <option value="1.375">輕量活動 (每周運動1-3天)</option>
                    <option value="1.55">中度活動 (每周運動3-5天)</option>
                    <option value="1.725">高度活動 (每周運動5-7天)</option>
                    <option value="1.9">極高度 (專業運動員)</option>
                </select>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <div>
                <div>
                    BRM: {bmr} 大卡
                </div>
                <div>
                    TDEE: {tdee} 大卡
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                <button className="addButton" onClick={onCalculateClick}>
                    計算
                </button>
                <button className="button" style={{ backgroundColor: '#777777' }} onClick={onCancelClick}>
                    取消
                </button>
            </div>
        </div>
    )
}

export default Calculator