// Filename - App.js

// Importing modules
// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { getTestData } from './app/api/exportCode';
import "./App.css";

// const API = "https://github-repos-nodejs-api-json.onrender.com/";


function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		name: "",
		age: 10,
		date: "",
		programming: "",
	});

    // os.environ.get('FLASK_API_RETURN')

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from 
		// flask server it will be redirected to proxy

		// Source: https://stackoverflow.com/questions/56838392/how-to-call-an-async-function-inside-useeffect-in-react
		const fetchMyData = async () => {
			try {
				const data = await getTestData()
				if (data) {
					setdata({
					name: data.Name,
					age: data.Age,
					date: data.Date,
					programming: data.programming,
				});
			}
			// console.log("success", data);
			alert("success", data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchMyData();
		

		
		// fetch(API + "/").then((res) =>
		// 	res.json().then((data) => {
		// 		// Setting a data from api
		// 		setdata({
		// 			name: data.Name,
		// 			age: data.Age,
		// 			date: data.Date,
		// 			programming: data.programming,
		// 		});
		// 	})
		// );
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>React and flask</h1>
				{/* Calling a data from setdata for showing */}
				<p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
				<p>{data.programming}</p>

			</header>
		</div>
	);
}

export default App;
