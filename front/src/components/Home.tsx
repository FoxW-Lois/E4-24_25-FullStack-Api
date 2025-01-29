import Logo from '../logo-fav.png';

const Home = () => {
	return (
		<img
			src={Logo}
			alt="GestProj Logo"
			style={{ maxWidth: '250px', height: 'auto', marginRight: '10px', padding: '20px' }}
		/>
	);
};

export default Home;
