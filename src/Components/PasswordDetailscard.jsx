import React, { useState } from "react";
import passwordService from "../services/passwordService";
import Button from "./Button";

function PasswordDetailscard({ passwordName, username, pass, link, notes, handelPasswordDelete, handelPasswordEdit }) {
	const [visible, setvisible] = useState(false);
	const [visiblePassword, setvisiblePassword] = useState();
	const handelVisibility = async () => {
		setvisible(!visible);
		try {
			if (!visible) {
				const { data } = await passwordService.getMyDecriptedPassword(pass._id);
				setvisiblePassword(data.password);
			}
		} catch (error) {}
	};

	return (
		<div class="max-w-sm rounded overflow-hidden shadow-lg">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">{passwordName}</div>
				<p class="text-gray-700 text-base mb-2">
					Username/Email : <span>{username}</span>
				</p>
				<div clasname="my-4 " style={{ display: "flex", justifyContent: "space-evenly" }}>
					{visible ? <p>{visiblePassword}</p> : <p>**********</p>}
					<p clasname="cursor-pointer" onClick={handelVisibility}>
						{!visible ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							</svg>
						)}
					</p>
				</div>
				{link && (
					<p class="text-gray-700 text-base mb-2">
						Link :{" "}
						<span>
							<a href={link} target="_blank">
								Click
							</a>
						</span>
					</p>
				)}
				{pass.notes && (
					<p class="text-gray-700 text-base mb-2">
						Notes : <span>{pass.notes}</span>
					</p>
				)}
			</div>
			<div
				classname=" m-2 mb-4"
				style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "20px" }}>
				<div classname="w-[25%] mb-2">
					<button
						onClick={() => handelPasswordEdit(pass)}
						type="button"
						class="py-2 px-4  bg-green-600 hover:bg-green-700   rounded-lg ">
						Edit
					</button>
				</div>
				<div classname="w-[25%]">
					<button
						onClick={() => handelPasswordDelete(pass)}
						type="button"
						class="py-2 px-4  bg-red-600 hover:bg-red-700   rounded-lg ">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default PasswordDetailscard;
