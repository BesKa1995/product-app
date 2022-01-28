import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios'

function Products(props) {
	const [data, setData] = useState([])
	const [filter, setFilter] = useState([])
	const [loading, setLoading] = useState(false)
	const priceRangeRef1 = useRef(0)
	const priceRangeRef2 = useRef(0)
	const [selectedCategory, setSelectedCategory] = useState('')
	const inputRef = useRef('')

	useEffect(() => {
		setLoading(true)
		axios.get('https://fakestoreapi.com/products')
			.then(res => {
				setData(res.data)
				setFilter(res.data)
				setLoading(false)
			})
	}, [])
	const Loading = () => {
		return <>
			<h1 className='row justify-content-center'>LOADING...</h1>
		</>
	}

	const filterProduct = (category) => {
		setSelectedCategory(category)
		const updatedList = data.filter(x => x.category === category)
		setFilter(updatedList)
	}

	const priceRangeFiltreHandler = (e, from, to) => {
		e.preventDefault()
		const updateList = data.filter(x => x.price >= from && x.price <= to && x.category === selectedCategory)
		setFilter(updateList)

	}
	const searchProduct = (e, title) => {
		e.preventDefault()
		console.log(title)
		const updateList = data.filter(x => x.title.toLowerCase().includes(title.toLowerCase()))
		console.log(updateList)
		setFilter(updateList)
	}
	const ShowProduct = () => {
		return <>
			<div>
				<nav className="navbar navbar-collapse bg-light justify-content-between p-3">
					<a className="navbar-brand fw-bold" style={{
						cursor: 'pointer'
					}}>MARKET</a>
					<form className="form-inline d-inline-flex">
						<input ref={inputRef} className="form-control mr-sm-2 me-4" type="search" placeholder="Search"
						       aria-label="Search"/>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit"
						        onClick={event => searchProduct(event, inputRef.current.value)}>Search
						</button>
					</form>
				</nav>
			</div>

			<div className='flex-row d-flex justify-content-center'
			     style={{ display: 'absolute', backgroundColor: '#aaa', height: '200px', width: '100%', margin: '0' }}>
				<div>
					<button className='btn btn-outline-dark me-4' onClick={() => setFilter(data)}>ALL</button>
					<button className='btn btn-outline-dark me-4' onClick={(e) => filterProduct('men\'s clothing')}>MEN'S CLOTHING
					</button>
					<button className='btn btn-outline-dark me-4' onClick={() => filterProduct('women\'s clothing')}>WOMEN'S
						CLOTHING
					</button>
					<button className='btn btn-outline-dark me-4' onClick={() => filterProduct('jewelery\'s clothing')}>JEWELERY
						CLOTHING
					</button>
					<button className='btn btn-outline-dark me-4' onClick={() => filterProduct('electronics')}>ELECTRONIC</button>
					<div className='d-flex justify-content-center mt-5'>
						<form>
							<label htmlFor="text">Price-range: </label>
							<input ref={priceRangeRef1} type="text" style={{ width: '50px', height: '20px' }}/>-
							<input ref={priceRangeRef2} type="text" style={{ width: '50px', height: '20px' }}/>
							<button type='submit' style={{ marginLeft: '5px', border: 'none', borderRadius: '5px' }}
							        onClick={(e) => priceRangeFiltreHandler(e, priceRangeRef1.current.value, priceRangeRef2.current.value, selectedCategory)}>FILTRE
							</button>
						</form>
					</div>
				</div>
			</div>


			<div>

			</div>
			{filter.map(product => {
				return (
					<div className='col-md-3 mb-4 rounded' key={product.id}>
						<div className="card h-100 text-center p-4">
							<img className='card-img-top' height='250px' src={product.image} alt={product.title}/>
							<div className="card-body">
								<h5 className="card-title">{product.title}</h5>
								<p className="card-text load fw-bold">${product.price}</p>
								<a href="#" className="btn btn-primary">Buy Now</a>
							</div>
						</div>
					</div>

				)
			})}
		</>
	}
	return (
		<div className='row justify-content-center'>
			{loading ? <Loading/> : <ShowProduct/>}
		</div>
	);
}

export default Products;