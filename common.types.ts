import { User, Session } from "next-auth";

export type FormState = {
	title: string;
	description: string;
	image: string;
	liveSiteUrl: string;
	githubUrl: string;
	category: string;
};

export interface ProjectInterface {
	title: string;
	description: string;
	image: string;
	liveSiteUrl: string;
	githubUrl: string;
	category: string;
	id: string;
	createdBy: {
		name: string;
		email: string;
		avatarUrl: string;
		id: string;
	};
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	image: string;
}
// description: string | null;
// githubUrl: string | null;
// linkedinUrl: string | null;
// projects: {
// 	edges: { node: ProjectInterface }[];
// 	pageInfo: {
// 		hasPreviousPage: boolean;
// 		hasNextPage: boolean;
// 		startCursor: string;
// 		endCursor: string;
// 	};
// };

export interface SessionInterface extends Session {
	user: User & {
		name: string | null | undefined;
		email: string | null | undefined;
		image: string | null | undefined;
		uid: string | null | undefined;
	};
}

export interface ProjectForm {
	title: string;
	description: string;
	image: string;
	liveSiteUrl: string;
	githubUrl: string;
	category: string;
}
