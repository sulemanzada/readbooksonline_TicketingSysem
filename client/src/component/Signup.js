import React, { useState } from "react";

const Signup = () => {
    const [records, setRecords] = useState([]);
    const [userRegistration, setuserRegistration] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);

        setuserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...userRegistration, id: new Date().getTime().toString() }
        console.log(records);
        setRecords([...records, newRecord]);
        console.log(records);

        setuserRegistration({ username: "", email: "", phone: "", password: "" });
    }
    return (
        // React Fragment short form Syntactic sugar
        <>
            <form action="" onSubmit={handleSubmit} class="container register">
                <div >
                    <label htmlFor="username"> Fullname</label>
                    <input type="text" autoCapitalize="off"
                        value={userRegistration.username}
                        onChange={handleInput}
                        name="username" id="username" />
                </div>

                <div>
                    <label htmlFor="email"> email</label>
                    <input type="text" autoCapitalize="off"
                        value={userRegistration.email}
                        onChange={handleInput}
                        name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="phone"> phone</label>
                    <input type="text" autoCapitalize="off"
                        value={userRegistration.phone}
                        onChange={handleInput}
                        name="phone" id="phone" />
                </div>

                <div>
                    <label htmlFor="password"> password</label>
                    <input type="text" autoCapitalize="off"
                        value={userRegistration.password}
                        onChange={handleInput}
                        name="password" id="password" />
                </div>

                <button type="submit"> Register</button>

            </form>

            <div>

                {

                    records.map((currentElem) => {
                        const { id, username, email, phone, password } = currentElem;//object de-structuring
                        return (
                            <div className="showDataStyle" key={id}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{phone}</p>
                                <p>{password}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Signup