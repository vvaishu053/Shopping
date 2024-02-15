//App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './Components/SearchComponent';
import ShowCourseComponent from './Components/ShowCourseComponent';
import UserCartComponent from './Components/UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: 'Nike shoe', 
		price: 1999, 
		image: 
'https://tse4.mm.bing.net/th?id=OIP.qYa0XqBYwwboBrGnijalnAHaEq&pid=Api&P=0&h=180'
		},
		{ id: 2, 
		name: 'Wildcraft Bag', 
		price: 999, 
		image: 
'https://tse4.mm.bing.net/th?id=OIP.gm_QWiubfY-VNkhMcs7OpwHaJ4&pid=Api&P=0&h=180'
		},
		{ id: 3, 
		name: 'Samsung Galaxy smart-watch', 
		price: 4599, 
		image: 
'https://tse2.mm.bing.net/th?id=OIP.d-77G7hmOGkHDQ__PP8CwgHaHa&pid=Api&P=0&h=180'
		}
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (course) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === course.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === course.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: course, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (Course) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== Course.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;
