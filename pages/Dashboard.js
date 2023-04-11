import React,{useEffect} from 'react'
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Chart } from "chart.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CancelIcon from "@mui/icons-material/Cancel";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelapseIcon from "@mui/icons-material/Timelapse";
const drawerWidth = 240;

const Dashboard = (props) => {
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
      const { window } = props;
			const [mobileOpen, setMobileOpen] = React.useState(false);

			const handleDrawerToggle = () => {
				setMobileOpen(!mobileOpen);
			};

			const drawer = (
				<div>
					<Toolbar />
					<Divider />
					<List>
						
							<ListItem  disablePadding>
								<ListItemButton>
									<ListItemIcon>
										 <InboxIcon /> 
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</ListItemButton>
							</ListItem>
						
					</List>
					<Divider />
					
				</div>
			);

			const container =
				window !== undefined ? () => window().document.body : undefined;
  return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
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
										<h5 class="card-title">Total Rides</h5>
										<p className="text-[18px]">0</p>
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
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
								<div
									class="card mb-5 bg-orange-400 text-white text-center"
									style={{ width: "11rem;" }}
								>
									<LocalTaxiIcon sx={{ fontSize: 40, margin: "auto" }} />
									<div class="card-body">
										<h5 class="card-title">Vechicel Type</h5>
										<p className="text-[18px]">0</p>
									</div>
								</div>
							</div>
							<div className="col-md-5">
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
							</div>
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

				<div className="flex ">
					<div className="w-1/2 container-fluid border border-dashed">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Site Statistics
						</p>
						<canvas id="myChart" className="w-1/2"></canvas>
					</div>
					<div className=" w-1/2 container-fluid border border-dashed">
						<p className="text-[18px] font-bold text-blue-600 mb-3 mt-2">
							Ride Statistics
						</p>
						<canvas id="myChart2" className="w-1/2"></canvas>
					</div>
				</div>
			</Box>
		</Box>
	);
}

export default Dashboard