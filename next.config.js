/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "https://carsharing2-d254d-default-rtdb.firebaseio.com/",
			},
		],
	},
};

module.exports = nextConfig
