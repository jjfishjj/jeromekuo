import metadata from "./routeMetadata.json";

export type Metadata = {
  title: string;
  description: string;
  index?: boolean;
};

export const routeMetadata = metadata as Record<string, Metadata>;
