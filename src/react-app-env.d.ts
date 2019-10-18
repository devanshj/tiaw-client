/// <reference types="react-scripts" />

import * as CSS from 'csstype';

declare module "csstype" {
	interface Properties {
		[index: string]: any;
	}
}