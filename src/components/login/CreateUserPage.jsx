import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

function CreateUserPage({ setUser }) {
    const [user, setUserInput] = useState('darren8888') // todo: last time login user
    const [userList, setUserList] = useState([])
    const [sex, setSex] = useState('male');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        getUsersListApi();
    }, [])

    async function getUsersListApi() {
        const res = await fetch(`http://localhost:3000/users`)
        const data = await res.json();
        setUserList(data);
    }

    async function AddUserApi(req) {
        await fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }

    const createUser = () => {
        let newUser = { id: user }
        AddUserApi({ id: user })
        setUserList([...userList, newUser])
        window.alert(`使用者${user}創建成功!`)
        setUserInput('');
    }


    return (
        <div className="wrapper">
            <h1>
                創建新用戶
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>用戶名:</div>
                <input type="text" className="loginInput" onChange={(e) => setUserInput(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>性別:</div>
                <div style={{ width: '60%', display: 'flex', justifyContent: 'space-around' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>年齡:</div>
                <input type="number" className="loginInput" onChange={(e) => setAge(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>身高:</div>
                <input type="number" className="loginInput" onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>體重:</div>
                <input type="number" className="loginInput" onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px' }}>活動強度:</div>
                <select name="strength" className="loginInput" onChange={(e) => setStrength(e.target.value)} >
                    <option value="0">--請選擇--</option>
                    <option value="1.2">沒啥運動QQ</option>
                    <option value="1.375">輕量活動 (每周運動1-3天)</option>
                    <option value="1.55">中度活動 (每周運動3-5天)</option>
                    <option value="1.725">高度活動 (每周運動5-7天)</option>
                    <option value="1.9">極高度 (專業運動員)</option>
                </select>
            </div>

            <hr style={{ margin: '30px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className="button" style={{ backgroundColor: '#777', textDecoration: 'none' }} onClick={createUser}>
                    創建
                </div>
                <NavLink className="button" style={{ backgroundColor: 'red', textDecoration: 'none' }} to={'/'}>
                    返回
                </NavLink>
            </div>
        </div>
    )
}

export default CreateUserPage