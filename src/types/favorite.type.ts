export interface Favorite {
  id: number;
  userId: string;
  resourceType: string;
  resourceId: number;
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteResource {
  id: string;
  name: string;
  type: string;
}

export interface ResourceItem {
  name?: string;
  title?: string;
}

export interface ResourceData {
  id: string;
  name: string;
  type: string;
  resourceId: number;
}
