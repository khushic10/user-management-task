import type { Metadata } from "next";
import Providers from "@/components/providers";
import "semantic-ui-css/semantic.min.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "User Management",
	description: "Users list and details using JSONPlaceholder",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className="home-background"
				style={{
					minHeight: "100vh",
					background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
					padding: "1rem 4rem",
				}}
			>
				<Providers>
					<div>{children}</div>
				</Providers>
			</body>
		</html>
	);
}
