import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import FurnitureForm from '../components/AddFurniture'
import WorkplaceForm from '../components/AddWorkplace'
import EmployeeForm from '../components/AddEmployee'
import store from 'store'
import Report from '../components/Report'
import ComboForm from '../components/AddCombo'

const Home = () => {
	const { login_type, workplace } = store.get('user')
	console.log(store.get('user'))
	return (
		<>
			{login_type !== 'manager' ?
				<>
					<Header />
					<ProductList></ProductList>
				</>
				:
				<>
					<EmployeeForm />
					<FurnitureForm />
					<WorkplaceForm />
					<ComboForm />
					<Report branch={workplace.id}></Report>
				</>
			}

		</>
	);
}

export default Home;