/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';

import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Bold, Italic} from '@ckeditor/ckeditor5-basic-styles';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {CodeBlock} from '@ckeditor/ckeditor5-code-block';
import type {EditorConfig} from '@ckeditor/ckeditor5-core';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {FontBackgroundColor, FontColor, FontFamily, FontSize} from '@ckeditor/ckeditor5-font';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Highlight} from '@ckeditor/ckeditor5-highlight';
import {Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload} from '@ckeditor/ckeditor5-image';
import {Indent} from '@ckeditor/ckeditor5-indent';
import {Link} from '@ckeditor/ckeditor5-link';
import {List} from '@ckeditor/ckeditor5-list';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {PasteFromOffice} from '@ckeditor/ckeditor5-paste-from-office';
import {SelectAll} from '@ckeditor/ckeditor5-select-all';
import {Table, TableToolbar} from '@ckeditor/ckeditor5-table';
import {TextTransformation} from '@ckeditor/ckeditor5-typing';
import {Undo} from '@ckeditor/ckeditor5-undo';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		Autoformat,
		BlockQuote,
		Bold,
		CodeBlock,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		Highlight,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		SelectAll,
		Table,
		TableToolbar,
		TextTransformation,
		Undo
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'highlight',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'codeBlock',
				'outdent',
				'alignment',
				'indent',
				'|',
				'fontFamily',
				'fontBackgroundColor',
				'fontSize',
				'fontColor',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo'
			],
		},
		language: 'en',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		}
	};
}

export default Editor;
