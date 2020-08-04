import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import FurnitureForm from '../components/AddFurniture'
import WorkplaceForm from '../components/AddWorkplace'
import EmployeeForm from '../components/AddEmployee'
import store from 'store'

const ClientHome = () => {
	console.log(store.get('user'))
	const {login_type} = store.get('user')
	console.log(login_type)
	return (
			<>
				{login_type !== 'manager' ?
					<>
					<Header/>
					<ProductList></ProductList>
					</>
				:
				<>
					<EmployeeForm/>
					<FurnitureForm/>
					<WorkplaceForm/>

				</>
				}
				
			</>
	);
}

export default ClientHome;