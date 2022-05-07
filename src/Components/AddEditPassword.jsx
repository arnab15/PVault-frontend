import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Components/Input/Input";
import passwordService from "../services/passwordService";

function AddPassword({ pass, fetchAllPass, setActivePass }) {
	const initialValues = {
		name: pass ? pass.passwordName : "",
		username: pass ? pass.username : "",
		password: pass ? pass.password : "",
		notes: pass ? pass.notes : "",
		url: pass ? pass.url : "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().trim().required("Required"),
		username: Yup.string().trim().required("Required"),
		password: Yup.string().trim().min(6).required("Required"),
		notes: Yup.string().trim(),
		url: Yup.string().trim(),
	});
	const handelLoginSubmit = async (values, { setSubmiting, resetForm, setFieldError }) => {
		try {
			const { name, username, password, url, notes } = values;
			if (pass) {
				const { data } = await passwordService.updatePassword(pass._id, {
					name,
					username,
					password,
					url,
					notes,
				});
				if (data) {
					resetForm();
				}
				fetchAllPass();
				setActivePass(null);
			}
			const { data } = await passwordService.addPassword({
				name,
				username,
				password,
				url,
				notes,
			});
			if (data) {
				resetForm();
				fetchAllPass();
				setActivePass(null);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setFieldError("email", error.response.data.error.message);
			}
		}
		// resetForm();
	};
	// useEffect(() => {
	// 	if (pass) {
	// 		initialValues.name = pass.passwordName;
	// 		initialValues.password = pass.password;
	// 		initialValues.username = pass.username;
	// 		initialValues.url = pass.url;
	// 		initialValues.notes = pass.notes;
	// 	}
	// }, [pass]);
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handelLoginSubmit}>
			{(props) => {
				const { values, isValidating, errors, handleChange, handleBlur, handleSubmit } = props;
				return (
					<div className="mt-10 mx-6 md:max-w-sm md:mx-auto">
						<form onSubmit={handleSubmit}>
							<Input
								labelName="Password name"
								placeholder="Enter Password title"
								type="text"
								name="name"
								value={values.name}
								error={errors.name}
								onBlur={handleBlur}
								handelChange={handleChange}
							/>
							<Input
								labelName="Username"
								placeholder="Enter username/email"
								type="text"
								name="username"
								value={values.username}
								error={errors.username}
								onBlur={handleBlur}
								handelChange={handleChange}
							/>
							<Input
								labelName="Password"
								placeholder="Enter Password"
								type="text"
								name="password"
								value={values.password}
								handelChange={handleChange}
								onBlur={handleBlur}
								error={errors.password}
							/>
							<Input
								labelName="Url Link"
								placeholder="Enter website link"
								type="text"
								name="url"
								value={values.url}
								handelChange={handleChange}
								onBlur={handleBlur}
								error={errors.url}
							/>
							<Input
								labelName="Notes"
								placeholder="Write some notes"
								type="text"
								name="notes"
								value={values.notes}
								handelChange={handleChange}
								onBlur={handleBlur}
								error={errors.notes}
							/>
							<button
								disabled={isValidating}
								className="px-4 py-2 mt-4 text-white w-full font-light tracking-wider focus:outline-none  bg-blue-600 hover:bg-blue-700  rounded"
								type="submit">
								{pass ? "Update Passsword" : "Add New Password"}
							</button>
						</form>
					</div>
				);
			}}
		</Formik>
	);
}

export default AddPassword;
