import SideBar from "@/Components/SideBar";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem2 from "@mui/material/MenuItem";
import Menu2 from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import firebase from "../firebase";

import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import user from "../img/users/user-1.png"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	
};
const DriverDoucments = () => {
     const [open, setOpen] = React.useState(false);
     const [DriverName, setDriverName] = useState("")
     const [DriverEmail, setDriverEmail] = useState("")
     const [DriverPhone, setDriverPhone] = useState("")
     const [DriverDOB, setDriverDOB] = useState("")
     const [DriverPic, setDriverPic] = useState("")
     const [DriverCnic, setDriverCnic] = useState("")
     const [CnicFront, setCnicFront] = useState("")
     const [CnicBack, setCnicBack] = useState("")
     const [DriverLinace, setDriverLinace] = useState("")
     const [LinceseFront, setLinceseFront] = useState("")
     const [LinceseBack, setLinceseBack] = useState("")
     const [Vechilename, setVechilename] = useState("")
     const [VechilePlate, setVechilePlate] = useState("")
     const [VechilePic, setVechilePic] = useState("")
     const [IDConfirm, setIDConfirm] = useState("")


			const handleOpen = (key) => {
                const Data=firebase.database().ref(`Drivers/${key}`)
                Data.on("value",(snapshot)=>{
                    const data=snapshot.val()||{}
                    console.log(data.DriverLincese.backimg);
                    setDriverName(data.BasicInfo.Fullname)
                    setDriverEmail(data.BasicInfo.Email)
                    setDriverPhone(key)
                    setDriverDOB(data.BasicInfo.DOB)
                    setDriverPic(data.BasicInfo.Profilepic)
                    setDriverCnic(data.CINCinfo.DriverCnic)
                    setCnicFront(data.CINCinfo.frottimg)
                    setCnicBack(data.CINCinfo.backimg)
                    setDriverLinace(data.DriverLincese.DriverLicense);
                    setLinceseFront(data.DriverLincese.frottimg);
                    setLinceseBack(data.DriverLincese.backimg)
                    setVechilename(data.VechileInfo.Vechilename);
                    setVechilePlate(data.VechileInfo.Plate)
                    setVechilePic(data.VechileInfo.picofViechile);
                    setIDConfirm(data.idconfirm.picofViechile);
                    setOpen(true)

                })
            };
			const handleClose = () => setOpen(false);
     const [anchorEl, setAnchorEl] = React.useState(null);
			const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
			const [TotalUsers, setTotalUsers] = useState([]);

			const isMenuOpen = Boolean(anchorEl);
			const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

			const handleProfileMenuOpen = (event) => {
				setAnchorEl(event.currentTarget);
			};

			const handleMobileMenuClose = () => {
				setMobileMoreAnchorEl(null);
			};

			const handleMenuClose = () => {
				setAnchorEl(null);
				handleMobileMenuClose();
			};

			const handleMobileMenuOpen = (event) => {
				setMobileMoreAnchorEl(event.currentTarget);
			};

			const menuId = "primary-search-account-menu";
			const renderMenu = (
				<Menu2
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					id={menuId}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={isMenuOpen}
					onClose={handleMenuClose}
				>
					<MenuItem2 onClick={handleMenuClose}>Profile</MenuItem2>
					<MenuItem2 onClick={handleMenuClose}>My account</MenuItem2>
				</Menu2>
			);

			const mobileMenuId = "primary-search-account-menu-mobile";
			const renderMobileMenu = (
				<Menu2
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					id={mobileMenuId}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={isMobileMenuOpen}
					onClose={handleMobileMenuClose}
				>
					<MenuItem2>
						<IconButton
							size="large"
							aria-label="show 4 new mails"
							color="inherit"
						>
							<Badge badgeContent={4} color="error">
								<MailIcon />
							</Badge>
						</IconButton>
						<p>Messages</p>
					</MenuItem2>
					<MenuItem2>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={17} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<p>Notifications</p>
					</MenuItem2>
					<MenuItem2 onClick={handleProfileMenuOpen}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<p>Profile</p>
					</MenuItem2>
				</Menu2>
			);
			const { collapseSidebar, toggleSidebar } = useProSidebar();
			const list = [];
            useEffect(() => {
							const databaseRef = firebase.database().ref("Drivers/");
							databaseRef.on("value", (snapshot) => {
								const data = snapshot.val();
								for (let key in data ? data : []) {
									list.push({ key, ...data[key] });
									
								}

								setTotalUsers(list);
							});

							return () => {
								databaseRef.off();
							};
						}, []);
				const Submit=()=>{
					const databaseRef=firebase.database().ref(`DriversConfirmation/${DriverPhone}/`)
					databaseRef.set({
						confirmStatus:true
					}).then(()=>{
						alert("Driver confirmation Sucess fully")
					}).catch((error)=>{
						alert(error)

					})
				}		
	return (
		<div className="flex">
			<SideBar />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="flex">
						<div>
							<div style={{ backgroundColor: "#253fcc" }}>
								<h1
									style={{ color: "#ffff", textAlign: "center", fontSize: 32 }}
								>
									Basic Information
								</h1>
							</div>
							<div className="flex mt-3 ml-3">
								<img
									src={DriverPic}
									style={{ borderRadius: 40, width: 80, height: 80 }}
								/>
								<div>
									<h2 className="ml-5 text-[25px] font-bold">
										Name:{DriverName}
									</h2>
									<h3 className="ml-5 text-[15px] font-bold">
										Email:{DriverEmail}
									</h3>
									<h3 className="ml-5 text-[15px] font-bold">
										{" "}
										Phone:{DriverPhone}
									</h3>
									<h3 className="ml-5 text-[15px] font-bold">
										DOB:{DriverDOB}
									</h3>
								</div>
							</div>
							<hr class="dropdown-divider" />
							<div style={{ backgroundColor: "#253fcc", marginTop: 5 }}>
								<h1
									style={{ color: "#ffff", textAlign: "center", fontSize: 32 }}
								>
									CNIC Information
								</h1>
							</div>
							<div>
								<h1 className="text-center text-[22px] font-bold">
									CNIC:{DriverCnic}
								</h1>
							</div>
							<h2 className="text-center text-[15px] mt-3 font-bold">
								CNIC Pictures
							</h2>
							<div className="flex">
								<img src={CnicFront} style={{ width: 198, height: 198 }} />
								<img src={CnicBack} style={{ width: 198, height: 198 }} />
							</div>
						</div>

						<div>
							<div style={{ backgroundColor: "#253fcc" }}>
								<h1
									style={{ color: "#ffff", textAlign: "center", fontSize: 32 }}
								>
									Driver Lincese
								</h1>
							</div>
							<div>
								<h1 className="text-center text-[22px] font-bold">
									Lincese:{DriverLinace}
								</h1>
							</div>
							<h2 className="text-center text-[15px] mt-3 font-bold">
								Lincese Pictures
							</h2>
							<div className="flex">
								<img src={LinceseFront} style={{ width: 198, height: 198 }} />
								<img src={LinceseBack} style={{ width: 198, height: 198 }} />
							</div>
							<div>
								<div style={{ backgroundColor: "#253fcc", marginTop: 5 }}>
									<h1
										style={{
											color: "#ffff",
											textAlign: "center",
											fontSize: 32,
										}}
									>
										Vechile Information
									</h1>
								</div>
								<div className="flex mt-3 ml-3">
									<img
										src={VechilePic}
										
										style={{ borderRadius: 40,width:80,height:80 }}
									/>
									<div>
										<h2 className="ml-5 text-[22px] font-bold">
											Name:{Vechilename}
										</h2>
										<h3 className="ml-5 text-[15px] font-bold">
											Plate Number:{VechilePlate}
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ backgroundColor: "#253fcc", marginTop: 5 }}>
						<h1 style={{ color: "#ffff", textAlign: "center", fontSize: 32 }}>
							ID confirmation
						</h1>
					</div>
					<div className="flex justify-center">
						<img src={IDConfirm}  style={{width:200,height:200}} />
					</div>
					<div className="flex justify-end pb-2">
						<button className="btn btn-primary" onClick={Submit}>Approve </button>
						
					</div>
				</Box>
			</Modal>
			<Box sx={{ flexGrow: 1, overflow: "hidden" }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
							onClick={() => collapseSidebar()}
							className="rm"
						>
							<MenuIcon />
						</IconButton>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
							onClick={() => toggleSidebar()}
							className="rm2"
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ display: { xs: "none", sm: "block" } }}
						>
							RIdeShare Admin Panel
						</Typography>

						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<IconButton
								size="large"
								aria-label="show 17 new notifications"
								color="inherit"
							>
								<Badge badgeContent={17} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
					<table class="w-full text-sm text-left text-gray-500 ">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
							<tr>
								<th scope="col" class="px-6 py-3">
									Driver Name
								</th>
								<th scope="col" class="px-6 py-3">
									<div class="flex items-center">
										Email
										<a href="#">
											<svg
												class="w-3 h-3 ml-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a>
									</div>
								</th>
								<th scope="col" class="px-6 py-3">
									<div class="flex items-center">
										Phone Number
										<a href="#">
											<svg
												class="w-3 h-3 ml-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a>
									</div>
								</th>
								<th scope="col" class="px-6 py-3">
									<div class="flex items-center">
										CNIC
										<a href="#">
											<svg
												class="w-3 h-3 ml-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a>
									</div>
								</th>
								<th scope="col" class="px-6 py-3">
									<div class="flex items-center">
										Vehicle Name
										<a href="#">
											<svg
												class="w-3 h-3 ml-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a>
									</div>
								</th>
								<th scope="col" class="px-6 py-3">
									<span class="sr-only">Delete</span>
								</th>
								<th scope="col" class="px-6 py-3">
									<span class="sr-only">View</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{TotalUsers.map((item) => {
								return (
									// console.log(item.BasicInfo.Fullname)
									<tr class="bg-white border-b " key={item.key}>
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
										>
											{item.BasicInfo.Fullname}
										</th>
										<td class="px-6 py-4">{item.BasicInfo.Email}</td>
										<td class="px-6 py-4">{item.key}</td>
										<td class="px-6 py-4">{item.CINCinfo.DriverCnic}</td>
										<td class="px-6 py-4">{item.VechileInfo.Vechilename}</td>
										<td class="px-6 py-4 text-right">
											<button class="font-medium text-blue-600 hover:underline">
												Delete
											</button>
										</td>
										<td class="px-6 py-4 text-right">
											<button
												onClick={() => {
													handleOpen(item.key);
												}}
												class="font-medium text-blue-600 hover:underline"
											>
												View
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Box>
		</div>
	);
};

export default DriverDoucments;
