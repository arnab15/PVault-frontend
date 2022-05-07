import React, { useEffect, useState } from "react";
import AddPassword from "../Components/AddEditPassword";
import Button from "../Components/Button";
import PasswordDetailscard from "../Components/PasswordDetailscard";
import passwordService from "../services/passwordService";

function PasswordsPage(props) {
	const [myPasswords, setMypasswords] = useState([]);
	const [currentActivePass, setcurrentActivePass] = useState();
	const getPasswords = async () => {
		try {
			const { data } = await passwordService.getMyPasswords();
			setMypasswords(data);
		} catch (error) {}
	};

	const handelPasswordDelete = async (pass) => {
		try {
			const { data } = await passwordService.deletePassword(pass._id);
			await getPasswords();
		} catch (error) {}
	};

	const handelPasswordEdit = async (pass) => {
		try {
			const { data } = await passwordService.getMyDecriptedPassword(pass._id);
			if (data.password) {
				const newPass = {
					...pass,
					password: data.password,
				};
				setcurrentActivePass(newPass);
			}
		} catch (error) {}
	};
	useEffect(() => {
		getPasswords();
	}, []);
	return (
		<div>
			<div className="w-[50%] flex items-center m-4" style={{ display: "flex", justifyContent: "center" }}>
				<AddPassword
					fetchAllPass={getPasswords}
					pass={currentActivePass}
					setActivePass={setcurrentActivePass}
				/>
			</div>
			<div>
				<h1 className="font-bold text-center m-4">Your Saved Passwords</h1>
			</div>

			<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
				{myPasswords.map((pass) => (
					<PasswordDetailscard
						key={pass._id}
						pass={pass}
						passwordName={pass.passwordName}
						link={pass.url}
						username={pass.username}
						handelPasswordDelete={handelPasswordDelete}
						handelPasswordEdit={handelPasswordEdit}
					/>
				))}
			</div>
		</div>
	);
}

export default PasswordsPage;
