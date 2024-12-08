import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../Services/Redux/Slices/AuthSlice';
import LoadingPage from '../Pages/OtherPages/LoadingPage';

const PrivateRoutes = () => {
	const auth = localStorage.getItem('token');
	const userData = useSelector(state => state.authData)
	const dispatch = useDispatch();
	

	useEffect(() => {
		if(auth){
			dispatch(verifyToken())
		}
	}, []);
	if (!auth) {
		return <Navigate to={'/login'} />;
	}
	return (
		userData.loading ? <LoadingPage/> :  (
			<>
				<Header/>
				<Outlet />
			</>
			)

	)
	
};

export default PrivateRoutes;
