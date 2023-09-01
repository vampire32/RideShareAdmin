import React,{useEffect} from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Chart } from "chart.js";

import { styled, alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem2 from "@mui/material/MenuItem";
import Menu2 from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Link from "next/link";
import { AiOutlineDashboard, AiFillCar,AiFillSetting } from "react-icons/ai";
import {BiMoney} from "react-icons/bi"
import { BsFillPersonVcardFill, BsFillEnvelopePaperFill } from "react-icons/bs";
 import {FiUsers} from "react-icons/fi"
 import {RiStarSLine} from "react-icons/ri"

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));
const SideBar = () => {
    	
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
    const { collapseSidebar,toggleSidebar } = useProSidebar();
	return (
		<>
			<div
				style={{
					display: "flex",
				}}
			>
				<Sidebar
					breakPoint="md"
					backgroundColor="#2F58CD"
					style={{ color: "#FFF" }}
					width="200px"
				>
					<Menu>
						<Link href="/Dashboard">
							<MenuItem>
								<AiOutlineDashboard size={30} style={{ marginRight: "10px" }} />
								Dashboard
							</MenuItem>
						</Link>
						<hr class="dropdown-divider"/>

						<Link href="/Riders">
							<MenuItem>
								<BsFillPersonVcardFill
									size={30}
									style={{ marginRight: "10px" }}
								/>
								Riders
							</MenuItem>
						</Link>
						<hr class="dropdown-divider"/>
						<Link href="/Users">
							<MenuItem>
								<FiUsers size={30} style={{ marginRight: "10px" }} />
								Users
							</MenuItem>
						</Link>
						
					
						<hr class="dropdown-divider"/>
						<Link href="/DriverDoucments">
							<MenuItem>
								<BsFillEnvelopePaperFill size={30} style={{ marginRight: "10px" }} />
								 Doucments
							</MenuItem>
						</Link>
						<hr class="dropdown-divider"/>
						<Link href="/Dashboard">
							<MenuItem>
								<RiStarSLine size={30} style={{ marginRight: "10px" }} />
								Rating & Review
							</MenuItem>
						</Link>
					
						<hr class="dropdown-divider"/>
					</Menu>
				</Sidebar>
			</div>
		</>
	);
};

export default SideBar;
