import React, { useState } from 'react';

// strapi functions

// handle user
import { useHistory } from 'react-router-dom';

export default function Login() {
	const history = useHistory();

	//setup user context

	// state values

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('default');
	const [isMember, setIsmember] = useState(true);

	let isEmpty = false;

	const toggleMember = () => {

	}

	const handleSubmit = async (e) => {

	}
	return <h1>hello from login page</h1>;
}
