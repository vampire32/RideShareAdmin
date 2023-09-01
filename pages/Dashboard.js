import React, { useEffect,useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Chart } from "chart.js";


import { styled, alpha } from "@mui/material/styles";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CancelIcon from "@mui/icons-material/Cancel";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import SideBar from "@/Components/SideBar";
import firebase from "../firebase";
const drawerWidth = 240;

const Dashboard = (props) => {
	const [TotalUsers, setTotalUsers] = useState("")
	const [TotalDrivers, setTotalDrivers] = useState("")
	const [TotalPost, setTotalPost] = useState("")
	useEffect(() => {
		var ctx = document.getElementById("myChart").getContext("2d");
		var myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				],
				datasets: [
					{
						data: [86, 114, 106, 106, 107, 111, 133],
						label: "Applied",
						borderColor: "rgb(62,149,205)",
						backgroundColor: "rgb(62,149,205,0.1)",
					},
					{
						data: [70, 90, 44, 60, 83, 90, 100],
						label: "Accepted",
						borderColor: "rgb(60,186,159)",
						backgroundColor: "rgb(60,186,159,0.1)",
					},
					{
						data: [10, 21, 60, 44, 17, 21, 17],
						label: "Pending",
						borderColor: "rgb(255,165,0)",
						backgroundColor: "rgb(255,165,0,0.1)",
					},
					{
						data: [6, 3, 2, 2, 7, 0, 16],
						label: "Rejected",
						borderColor: "rgb(196,88,80)",
						backgroundColor: "rgb(196,88,80,0.1)",
					},
				],
			},
		});
	}, []);
	useEffect(() => {
		var ctx = document.getElementById("myChart2").getContext("2d");
		var myChart2 = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["Accepted", "Pending", "Rejected"],
				datasets: [
					{
						data: [70, 10, 6],
						borderColor: [
							"rgb(75, 192, 192)",
							"rgb(255, 205, 86)",
							"rgb(255, 99, 132)",
						],
						backgroundColor: [
							"rgb(75, 192, 192 )",
							"rgb(255, 205, 86)",
							"rgb(255, 99, 132)",
						],
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					xAxes: [
						{
							display: false,
						},
					],
					yAxes: [
						{
							display: false,
						},
					],
				},
			},
		});
	}, []);
	const list = [];
	useEffect(() => {
	    const databaseRef = firebase.database().ref("users/");
		databaseRef.on("value", (snapshot) => {
			const fetchedData = snapshot.numChildren();
			
			setTotalUsers(fetchedData)
		});

		const DriversDatbaase=firebase.database().ref("Drivers");
		DriversDatbaase.on("value",(snapshot)=>{
			const Drivers=snapshot.numChildren()
			setTotalDrivers(Drivers)
		});
		
		return () => {
			databaseRef.off();
			DriversDatbaase.off();
		};
	   
	}, [])
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
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

	return (
		<div className="flex" >
			<SideBar/>
			
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
				{renderMobileMenu}
				{renderMenu}
				<div className=" flex">
					<div className="container-fluid border border-dashed ">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Site Statistics
						</p>
						<div className="row">
							<div className="col-md-5">
								<div
									class="card mb-5 bg-cyan-500 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<AccountCircleIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Total Users</h5>
										<p className="text-[18px]">{TotalUsers}</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div
									class="card mb-5 bg-red-600 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<AirlineSeatReclineNormalIcon
										sx={{ fontSize: 40, margin: "auto" }}
									/>
									<div class="card-body">
										<h5 class="card-title">Total Drivers</h5>
										<p className="text-[18px]">{TotalDrivers}</p>
									</div>
								</div>
							</div>
							{/* <div className="col-md-5">
								<div
									class="card mb-5 bg-orange-400 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<LocalTaxiIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Total Drivers Post</h5>
										<p className="text-[18px]">{TotalPost}</p>
									</div>
								</div>
							</div> */}
							{/* <div className="col-md-5">
								<div
									class="card mb-5 bg-green-600 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<LocalAtmIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Revenue</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div> */}
						</div>
					</div>
					<div className="container-fluid border border-dashed ">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Ride Statistics
						</p>
						<div className="row">
							<div className="col-md-5">
								<div
									class="card mb-5 bg-cyan-500 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<DirectionsCarIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Total Number Rides</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div
									class="card mb-5 bg-red-600 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<CancelIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Cancel Ride</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div
									class="card mb-5 bg-orange-400 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<TaskAltIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Completed Ride</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div
									class="card mb-5 bg-green-600 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<TimelapseIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Running Ride</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 container-fluid border border-dashed">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Site Statistics
						</p>
						<canvas id="myChart"></canvas>
					</div>
					<div className=" col-md-6 container-fluid border border-dashed">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Ride Statistics
						</p>
						<canvas id="myChart2"></canvas>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default Dashboard;
