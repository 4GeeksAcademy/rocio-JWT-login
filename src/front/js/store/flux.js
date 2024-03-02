const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenSessionStore: () =>{
				const token = sessionStorage.getItem("token");
				console.log("aplication")
				if (token && token !="" && token != undefined) setStore({token: token})
			},

			logout: () =>{
				sessionStorage.removeItem("token");
				console.log("Login out");
				setStore({token: null})
			},


			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				try {
					const resp = await fetch('https://miniature-space-garbanzo-q7qggjxqjgxphpxx-3001.app.github.dev/api/token', opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}
					const data = await resp.json();
					console.log("thios come from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({token: data.access_token})
				}
				catch (error) {
					console.error("There has been an error login in")
				}
			},
			SignUp: async (email, password) => {
				try {
					const response = await fetch("https://probable-goldfish-5gqp59qp465r2v64-3001.app.github.dev/api/create/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					if (!response.ok) {
						throw new Error("Error registering user");
					}
					const data = await response.json();
					console.log("User registered successfully", data);
					// Handle successful response, e.g., redirect user to login page
					// navigate("/login");
				} catch (error) {
					console.error("Error:", error);
					// Handle error, show error message, etc.
				}
			},

				getMessage: () => {
					const store = getStore(); 
					const opts = {
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + store.token,
							"Content-Type": "application/json"
						}
					};
						// fetching data from the backend
					fetch("https://miniature-space-garbanzo-q7qggjxqjgxphpxx-3001.app.github.dev/api/hello", opts)
						.then (resp => resp.json())
						.then( data => {
							console.log(data)
							setStore({ message: data.message })
							})
						.catch (error => console.log("Error loading message from backend", error));
					},

					changeColor: (index, color) => {
						//get the store
						const store = getStore();

						//we have to loop the entire demo array to look for the respective index
						//and change its color
						const demo = store.demo.map((elm, i) => {
							if (i === index) elm.background = color;
							return elm;
						});

						//reset the global store
						setStore({ demo: demo });
					}
			}
		};
	};

	export default getState;
