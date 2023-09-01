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

const Riders = () => {
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
                    console.log(list)
				}

				setTotalUsers(list);
			});

			return () => {
				databaseRef.off();
			};
		}, []);
		const DataDelete=(key)=>{
			const databaseRef=firebase.database().ref(`Drivers/${key}`)
			return databaseRef.remove().then(()=>{
				alert("Your data is sucessfully removed")
			})
			.catch((error)=>{
				alert(error)
			})
			


		}
	return (
		<div className="flex">
			<SideBar />
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
											<button
											onClick={()=>{
												DataDelete(item.key)
											}}
												
												class="font-medium text-blue-600 hover:underline"
											>
												Delete
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

export default Riders;
