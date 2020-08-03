import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import FurnitureForm from '../components/AddFurniture'
import WorkplaceForm from '../components/AddWorkplace'
import EmployeeForm from '../components/AddEmployee'
import store from 'store'

const ClientHome = () => {
	console.log(store.get('user'))
	const loginType = store.get('login_type')

	return (
			<>
				{loginType !== 'admin' ?
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