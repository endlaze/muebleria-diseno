import React from 'react'
import Header from '../components/Header/Header'

import './ClientHome.css'
import ProductList from '../components/ProductList/ProductList'

const ClientHome = () => {
	return (
			<>
				<Header/>
				<ProductList></ProductList>
			</>
	);
}

export default ClientHome;