import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail]= useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	console.log("this is the token", store.token)

	const handleClick = () => {
		actions.login(email, password)
		};
	useEffect(()=> {
		if (store.token && store.token!="" && store.token != undefined){
			navigate("/")
		} 
	}, [store.token, navigate]);

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{(store.token && store.token!="" &&store.token!= undefined) ? "You are logged in with this token" + store.token :

			<div>
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick ={ () => (handleClick)(navigate("/"))} >Login</button>
			</div>
			}

		</div>
	);
};
