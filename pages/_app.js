import SideBar from '@/Components/SideBar';
import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script';

import { ProSidebarProvider } from "react-pro-sidebar";



export default function App({ Component, pageProps }) {

  return (
		<>
			<Head>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
					crossorigin="anonymous"
				></link>
			</Head>
			<Script src="https://cdn.tailwindcss.com"></Script>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
				crossorigin="anonymous"
			></Script>
			<ProSidebarProvider>
				
					
					<Component {...pageProps} />
				
			</ProSidebarProvider>
		</>
	);
}
