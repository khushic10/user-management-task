import type { Metadata } from "next";
import Providers from "@/components/providers";
import "semantic-ui-css/semantic.min.css";

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
			<body>
				<Providers>
					<div className="ui container" style={{ padding: "2rem 0" }}>
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
