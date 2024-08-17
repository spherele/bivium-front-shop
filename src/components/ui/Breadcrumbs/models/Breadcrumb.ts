import type { UrlObject } from 'url';

export interface Breadcrumb {
  name: string;
  path: string | UrlObject;
}
