export class Project {
	public constructor(
		public readonly client: any[] | undefined,
		public readonly cover: any,
		public readonly date: string,
		public readonly gallery: any[],
		public readonly galleryArray: any[] | undefined,
		public readonly videos: any,
		public readonly myTags: {label: string, value: string}[],
		public readonly order: number,
		public readonly slug: {current: string, _type: string},
		public readonly text: {cs: any[], en: any[]},
		public readonly title: {cs: string, en: string},

		public readonly web: any[] | undefined,
		public readonly photographer: any[] | undefined,
		public readonly collaboration: any[] | undefined,


		public readonly _createdAt: string,
		public readonly _id: string,
		public readonly _type: string,
		public readonly _updatedAt: string,
	) {}
}

