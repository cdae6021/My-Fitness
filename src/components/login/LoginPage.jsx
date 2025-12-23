import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

function LoginPage({ setUser }) {
    const [user, setUserInput] = useState('darren8888') // todo: last time login user
    const [userList, setUserList] = useState([])

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
                請選擇使用者
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <select className="loginSelector" onChange={(e) => setUserInput(e.target.value)}>
                    {
                        userList.map((item) => {
                            return (
                                <option value={item.id} key={item.id}>
                                    {item.id}
                                </option>
                            )
                        })
                    }
                </select>

                <NavLink to={`/record/${user}`} className="button" style={{ backgroundColor: '#777', textDecoration: 'none' }} onClick={() => setUser(user)}>
                    登入
                </NavLink>
            </div>
            <h1>
                創建新用戶
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input type="text" className="loginInput" onChange={(e) => setUserInput(e.target.value)} />
                <NavLink to={'/create'} className="button" style={{ backgroundColor: '#777', textDecoration: 'none' }}>
                    創建
                </NavLink>
            </div>
        </div>
    )
}

export default LoginPage