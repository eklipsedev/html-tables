window.addEventListener("DOMContentLoaded", () => {
	const D = document;

	// table elements
	const TABLE = D.getElementsByTagName("table")[0];
	const CAPTION_ELEMENT = D.getElementsByTagName("caption")[0];
	const TABLE_HEADER_CELLS = D.getElementsByTagName("th");
	const TABLE_ROW_CELLS = D.getElementsByTagName("tr");
	const TABLE_DATA_CELLS = D.getElementsByTagName("td");
	const LAYOUT_DROPDOWN = D.getElementById("Dtablelayout");
	const ROWS_INPUT = D.getElementById("nrows");
	const COLUMNS_INPUT = D.getElementById("ncols");

	// table styles
	const TABLE_STYLES =
		"table-layout: fixed; height:100%; width:100%; border: 1px solid rgb(222, 222, 223); border-collapse: collapse; padding: 5px; border-spacing: 1px; text-align: left; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0)";
	const CAPTION_STYLES = "text-align: left; caption-side: top;";
	const TH_STYLES =
		"background-color: rgb(236, 239, 241); padding: 5px; border-width: 1px; border-style: solid; border-color: rgb(222, 222, 223); color: rgb(0, 0, 0);";
	const TD_STYLES =
		"padding: 5px; border-width: 1px; border-style: solid; border-color: rgb(222, 222, 223); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);";

	// table width elements
	const WIDTH_INPUT = D.getElementById("width");
	const WIDTH_DROPDOWN = D.getElementById("Dwidth");

	// Table height elements
	const HEIGHT_INPUT = D.getElementById("height");
	const HEIGHT_DROPDOWN = D.getElementById("Dheight");

	// class name elements
	const CLASS_NAME_INPUT = D.getElementById("className");

	// header background color elements
	const HEADER_BG_COLOR_INPUT = D.getElementById("headbgcolor");
	const HEADER_BG_COLOR_PICKER = D.getElementById("headbgcolorpick");
	const HEADER_BG_COLOR_CHECKBOX = D.getElementById("Cheadbgcolor");

	// header text color elements
	const HEADER_TEXT_COLOR_INPUT = D.getElementById("headtextcolor");
	const HEADER_TEXT_COLOR_PICKER = D.getElementById("headtextcolorpick");
	const HEADER_TEXT_COLOR_CHECKBOX = D.getElementById("Cheadtextcolor");

	// body background color elements
	const BODY_BG_COLOR_INPUT = D.getElementById("bodybgcolor");
	const BODY_BG_COLOR_PICKER = D.getElementById("bodybgcolorpick");
	const BODY_BG_COLOR_CHECKBOX = D.getElementById("Cbodybgcolor");

	// body text color elements
	const BODY_TEXT_COLOR_INPUT = D.getElementById("bodytextcolor");
	const BODY_TEXT_COLOR_PICKER = D.getElementById("bodytextcolorpick");
	const BODY_TEXT_COLOR_CHECKBOX = D.getElementById("Cbodytextcolor");

	// border color elements
	const BORDER_COLOR_INPUT = D.getElementById("bordercolor");
	const BORDER_COLOR_PICKER = D.getElementById("bordercolorpick");
	const BORDER_COLOR_CHECKBOX = D.getElementById("Cbordercolor");

	// border style elements
	const BORDER_STYLE_CHECKBOX = D.getElementById("Cborderstyle");
	const BORDER_STYLE_DROPDOWN = D.getElementById("Dborderstyle");

	// border width elements
	const BORDER_WIDTH_INPUT = D.getElementById("borderwidth");
	const BORDER_WIDTH_CHECKBOX = D.getElementById("Cborderwidth");
	const BORDER_WIDTH_DROPDOWN = D.getElementById("Dborderwidth");

	// border collapse elements
	const BORDER_COLLAPSE_CHECKBOX = D.getElementById("Ccollapse");
	const BORDER_COLLAPSE_DROPDOWN = D.getElementById("Dcollapse");

	// border spacing elements
	const BORDER_SPACING_INPUT = D.getElementById("borderspacing");
	const BORDER_SPACING_CHECKBOX = D.getElementById("Cborderspacing");
	const BORDER_SPACING_DROPDOWN = D.getElementById("Dborderspacing");

	// cell text alignment elements
	const CELL_TEXT_ALIGN_CHECKBOX = D.getElementById("Ctextalign");
	const CELL_TEXT_ALIGN_DROPDOWN = D.getElementById("Dtextalign");

	// cell padding elements
	const CELL_PADDING_INPUT = D.getElementById("padding");
	const CELL_PADDING_CHECKBOX = D.getElementById("Cpadding");
	const CELL_PADDING_DROPDOWN = D.getElementById("Dpadding");

	// caption text alignment elements
	const CAPTION_ALIGN_CHECKBOX = D.getElementById("Ccaptionalign");
	const CAPTION_ALIGN_DROPDOWN = D.getElementById("Dcaptionalign");

	// caption side elements
	const CAPTION_SIDE_CHECKBOX = D.getElementById("Ccaptionside");
	const CAPTION_SIDE_DROPDOWN = D.getElementById("Dcaptionside");

	// code results elements
	const GENERATE_CSS_CHECKBOX = D.getElementById("generatecss");
	const COMPACT_MODE_CHECKBOX = D.getElementById("compactMode");
	const CODE_RESULTS_TEXTAREA = D.getElementById("code");

	let rows = parseInt(ROWS_INPUT.value);
	let cols = parseInt(COLUMNS_INPUT.value);
	let cell;

	// function to return <style> tags to be added to code
	const updateStyle = () => {
		let text;
		let text_wrapper = "";
		let text_table = "";
		let text_cap = "";
		let text_th = "";
		let text_td = "";

		// line breaks & spacing...
		// \n\t\t = line break + 2 tabs

		// construct the style text for the wrapping <div>
		text_wrapper += `\n\t\toverflow: auto;`;
		text_wrapper += `\n\t\twidth: 100%;`;

		let s = "";
		if (BORDER_WIDTH_CHECKBOX.checked)
			s += ` ${BORDER_WIDTH_INPUT.value + BORDER_WIDTH_DROPDOWN.value}`;
		if (BORDER_STYLE_CHECKBOX.checked) s += ` ${BORDER_STYLE_DROPDOWN.value}`;
		if (BORDER_COLOR_CHECKBOX.checked) s += ` ${BORDER_COLOR_INPUT.value}`;
		if (s.length) {
			s = s.replace(" ", "");
			text_table += `\n\t\tborder: ${s};`;
			text_th += `\n\t\tborder: ${s};`;
			text_td += `\n\t\tborder: ${s};`;
			TABLE.style.border = s;
		}

		const setStyleTextAndCodeStyles = (
			element,
			elementToSelect,
			elementText,
			cssPropertyValue,
			cssPropertyName
		) => {
			let cssProperty = `\n\t\t${cssPropertyName}: ${
				cssPropertyValue.value || cssPropertyValue
			};`;
			let checkbox =
				elementToSelect.getAttribute("type") === "checkbox" &&
				elementToSelect.checked;
			let select =
				elementToSelect.tagName === "SELECT" && elementToSelect.value.length;
			let number =
				elementToSelect.getAttribute("type") === "number" &&
				elementToSelect.value.length;

			// check if the length is 0 -- if so set a placeholder of 0
			if (
				elementToSelect.getAttribute("type") === "number" &&
				!elementToSelect.value.length
			) {
				elementToSelect.setAttribute("placeholder", "0");
			}

			if (checkbox || select || number) {
				if (elementText === text_table) {
					text_table += cssProperty;
				} else if (elementText === text_cap) {
					text_cap += cssProperty;
				} else if (elementText === text_th) {
					text_th += cssProperty;
				} else if (elementText === text_td) {
					text_td += cssProperty;
				} else if (elementText === text_stripes) {
					text_stripes += cssProperty;
				}
				element.style[cssPropertyName] =
					cssPropertyValue.value || cssPropertyValue;
			} else {
				element.style[cssPropertyName] = "";
			}
		};

		setStyleTextAndCodeStyles(
			TABLE,
			HEIGHT_INPUT,
			text_table,
			HEIGHT_INPUT.value + HEIGHT_DROPDOWN.value,
			"height"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			WIDTH_INPUT,
			text_table,
			WIDTH_INPUT.value + WIDTH_DROPDOWN.value,
			"width"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			LAYOUT_DROPDOWN,
			text_table,
			LAYOUT_DROPDOWN,
			"table-layout"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			BORDER_COLLAPSE_CHECKBOX,
			text_table,
			BORDER_COLLAPSE_DROPDOWN,
			"border-collapse"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			BORDER_SPACING_CHECKBOX,
			text_table,
			BORDER_SPACING_INPUT.value + BORDER_SPACING_DROPDOWN.value,
			"border-spacing"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			CELL_TEXT_ALIGN_CHECKBOX,
			text_table,
			CELL_TEXT_ALIGN_DROPDOWN,
			"text-align"
		);
		setStyleTextAndCodeStyles(
			CAPTION_ELEMENT,
			CAPTION_SIDE_CHECKBOX,
			text_cap,
			CAPTION_SIDE_DROPDOWN,
			"caption-side"
		);
		setStyleTextAndCodeStyles(
			CAPTION_ELEMENT,
			CAPTION_ALIGN_CHECKBOX,
			text_cap,
			CAPTION_ALIGN_DROPDOWN,
			"text-align"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			HEADER_BG_COLOR_CHECKBOX,
			text_th,
			HEADER_BG_COLOR_INPUT,
			"background-color"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			HEADER_TEXT_COLOR_CHECKBOX,
			text_th,
			HEADER_TEXT_COLOR_INPUT,
			"color"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			BODY_BG_COLOR_CHECKBOX,
			text_td,
			BODY_BG_COLOR_INPUT,
			"background-color"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			BODY_TEXT_COLOR_CHECKBOX,
			text_td,
			BODY_TEXT_COLOR_INPUT,
			"color"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			CELL_PADDING_CHECKBOX,
			text_th,
			CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value,
			"padding"
		);
		setStyleTextAndCodeStyles(
			TABLE,
			CELL_PADDING_CHECKBOX,
			text_td,
			CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value,
			"padding"
		);

		const setCellStyles = (
			i,
			checkedElement,
			cssPropertyName,
			cssPropertyValue
		) => {
			if (checkedElement.checked) {
				i.style[cssPropertyName] = cssPropertyValue.value || cssPropertyValue;
			} else {
				i.style[cssPropertyName] = "";
			}
		};

		cell = TABLE_HEADER_CELLS;
		for (let i = 0; i < cell.length; i++) {
			setCellStyles(
				cell[i],
				HEADER_BG_COLOR_CHECKBOX,
				"background-color",
				HEADER_BG_COLOR_INPUT
			);
			setCellStyles(
				cell[i],
				HEADER_TEXT_COLOR_CHECKBOX,
				"color",
				HEADER_TEXT_COLOR_INPUT
			);
			setCellStyles(
				cell[i],
				CELL_PADDING_CHECKBOX,
				"padding",
				CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value
			);
			setCellStyles(
				cell[i],
				BORDER_WIDTH_CHECKBOX,
				"border-width",
				BORDER_WIDTH_INPUT.value + BORDER_WIDTH_DROPDOWN.value
			);
			setCellStyles(
				cell[i],
				BORDER_STYLE_CHECKBOX,
				"border-style",
				BORDER_STYLE_DROPDOWN
			);
			setCellStyles(
				cell[i],
				BORDER_COLOR_CHECKBOX,
				"border-color",
				BORDER_COLOR_INPUT
			);
		}

		cell = TABLE_DATA_CELLS;
		for (let i = 0; i < cell.length; i++) {
			if (CELL_PADDING_CHECKBOX.checked) {
				cell[i].style.padding =
					CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value;
			} else {
				cell[i].style.padding = "";
			}
			setCellStyles(
				cell[i],
				BODY_BG_COLOR_CHECKBOX,
				"background-color",
				BODY_BG_COLOR_INPUT
			);
			setCellStyles(
				cell[i],
				BODY_TEXT_COLOR_CHECKBOX,
				"color",
				BODY_TEXT_COLOR_INPUT
			);
			setCellStyles(
				cell[i],
				CELL_PADDING_CHECKBOX,
				"padding",
				CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value
			);
			setCellStyles(
				cell[i],
				BORDER_WIDTH_CHECKBOX,
				"border-width",
				BORDER_WIDTH_INPUT.value + BORDER_WIDTH_DROPDOWN.value
			);
			setCellStyles(
				cell[i],
				BORDER_STYLE_CHECKBOX,
				"border-style",
				BORDER_STYLE_DROPDOWN
			);
			setCellStyles(
				cell[i],
				BORDER_COLOR_CHECKBOX,
				"border-color",
				BORDER_COLOR_INPUT
			);
		}

		// function to set the CSS rule for each table element
		const setCSSRule = (elementText, tag, pseudoClass) => {
			if (elementText.length) {
				return (elementText = `\n\t.${CLASS_NAME_INPUT.value
					.trim()
					.replace(/\s/g, "-")
					.toLowerCase()} ${tag ? tag : ""}${
					pseudoClass ? pseudoClass : ""
				} {${elementText}\n\t}`);
			}
			return (elementText = "");
		};

		const wrapperRule = setCSSRule(text_wrapper);
		const tableRule = setCSSRule(text_table, "table");
		const captionRule = setCSSRule(text_cap, "caption");
		const thRule = setCSSRule(text_th, "th");
		const tdRule = setCSSRule(text_td, "td");

		text = wrapperRule + tableRule + captionRule + thRule + tdRule;
		if (text.length) text = `<style>${text}\n</style>`;

		if (GENERATE_CSS_CHECKBOX.checked && !COMPACT_MODE_CHECKBOX.checked) {
			return text;
		} else if (GENERATE_CSS_CHECKBOX.checked && COMPACT_MODE_CHECKBOX.checked) {
			return text.replace(/[\r\n\t\t]/gm, "");
		} else {
			return "";
		}
	};

	// update code function
	const updateCode = () => {
		let styleTagText = updateStyle();
		let text = TABLE.innerHTML;
		console.log(TABLE.innerHTML);
		let captionText = CAPTION_ELEMENT.textContent;
		const hasCaption =
			CAPTION_ALIGN_CHECKBOX.checked || CAPTION_SIDE_CHECKBOX.checked;

		if (hasCaption) {
			text = ReduceTag("<caption", text);
		} else {
			text = text.replace(
				`<caption contenteditable="true" style="">${captionText}</caption>`,
				""
			);
		}
		text = ReduceTag("<th", text);
		text = ReduceTag("<th", text);
		text = ReduceTag("<td", text);
		text = ReduceTag("<td", text);
		text = text.replace(/\t/g, "");
		text = text.replace(/<\u002Fth><\u002Ftr>/g, "</th>\n</tr>");
		text = text.replace(/<\u002Ftd><\u002Ftr>/g, "</td>\n</tr>");
		text = text.replace(/<\u002Fth><th>/g, "</th>\n<th>");
		text = text.replace(/<\u002Ftd><td>/g, "</td>\n<td>");
		text = text.replace(/<\u002Ftr><tr>/g, "</tr>\n<tr>");
		text = text.replace(/<\u002Ftr><\u002Ftbody>/g, "</tr>\n<tbody>");
		text = text.replace(/<tr><td>/g, "<tr>\n<td>");
		if (hasCaption) {
			text = text.replace(/<caption>/g, "\t<caption>");
		}
		text = text.replace(/<thead/g, "\t<thead");
		text = text.replace(/<\u002Fthead>/g, "\t</thead>");
		text = text.replace(/<tbody/g, "\t<tbody");
		text = text.replace(/<\u002Ftbody>/g, "\t</tbody>");
		text = text.replace(/<tr>/g, "\t<tr>");
		text = text.replace(/<\u002Ftr>/g, "\t</tr>");
		text = text.replace(/<th>/g, "\t\t<th>");
		text = text.replace(/<td>/g, "\t\t<td>");
		text = text.replace(/\n\n/g, "\n");
		text = text.replace(/\n\n/g, "\n");

		const IS_STYLED = GENERATE_CSS_CHECKBOX.checked
			? ` class="${CLASS_NAME_INPUT.value
					.trim()
					.replace(/\s/g, "-")
					.toLowerCase()}"`
			: "";
		text = `<div${IS_STYLED} role="region" tabindex="0">\n<table>${text}</table>\n<div style="margin-top:8px">Made with <a href="https://www.htmltables.io/">HTML Tables</a></div>\n</div>`;

		if (GENERATE_CSS_CHECKBOX.checked && !COMPACT_MODE_CHECKBOX.checked) {
			styleTagText += "\n" + text;
		} else if (GENERATE_CSS_CHECKBOX.checked && COMPACT_MODE_CHECKBOX.checked) {
			styleTagText += "\n" + text.replace(/[\r\n\t\t]/gm, "");
		} else if (
			!GENERATE_CSS_CHECKBOX.checked &&
			COMPACT_MODE_CHECKBOX.checked
		) {
			styleTagText = text.replace(/[\r\n\t\t]/gm, "");
		} else {
			styleTagText += text;
		}

		CODE_RESULTS_TEXTAREA.value = styleTagText;
		textCounter(CODE_RESULTS_TEXTAREA);
	};

	// event listeners
	ROWS_INPUT.addEventListener("change", () => {
		UpdateRows();
	});

	COLUMNS_INPUT.addEventListener("change", () => {
		UpdateCols();
	});

	TABLE.addEventListener("click", () => {
		updateCode();
	});

	CAPTION_ELEMENT.addEventListener("keyup", () => {
		updateCode();
	});

	document
		.getElementsByClassName("js-setting-reset")[0]
		.addEventListener("click", (event) => {
			resetTable();
			updateCode();
			deliverMessage(event);
		});

	document
		.getElementsByClassName("js-setting-download-csv")[0]
		.addEventListener("click", () => {
			tableToCSV();
		});

	document
		.getElementsByClassName("js-setting-new-table")[0]
		.addEventListener("click", () => {
			createNewTable();
			updateCode();
			UpdateRows();
			UpdateCols();
		});

	document.getElementById("csvUploadBtn").addEventListener("click", () => {
		uploadCSVFile();
	});

	[
		CLASS_NAME_INPUT,
		HEADER_BG_COLOR_CHECKBOX,
		HEADER_TEXT_COLOR_CHECKBOX,
		BODY_BG_COLOR_CHECKBOX,
		BODY_TEXT_COLOR_CHECKBOX,
		BORDER_COLOR_CHECKBOX,
		BORDER_WIDTH_CHECKBOX,
		BORDER_STYLE_CHECKBOX,
		BORDER_COLLAPSE_CHECKBOX,
		BORDER_SPACING_CHECKBOX,
		CELL_TEXT_ALIGN_CHECKBOX,
		CELL_PADDING_CHECKBOX,
		CAPTION_SIDE_CHECKBOX,
		CAPTION_ALIGN_CHECKBOX,
		WIDTH_INPUT,
		WIDTH_DROPDOWN,
		HEIGHT_INPUT,
		HEIGHT_DROPDOWN,
		HEADER_BG_COLOR_INPUT,
		HEADER_BG_COLOR_PICKER,
		HEADER_TEXT_COLOR_INPUT,
		HEADER_TEXT_COLOR_PICKER,
		BODY_BG_COLOR_INPUT,
		BODY_TEXT_COLOR_INPUT,
		BODY_TEXT_COLOR_PICKER,
		BORDER_COLOR_INPUT,
		BORDER_WIDTH_INPUT,
		BORDER_STYLE_DROPDOWN,
		BORDER_WIDTH_DROPDOWN,
		BORDER_COLLAPSE_DROPDOWN,
		BORDER_SPACING_INPUT,
		BORDER_SPACING_DROPDOWN,
		CELL_TEXT_ALIGN_DROPDOWN,
		CELL_PADDING_INPUT,
		CELL_PADDING_DROPDOWN,
		CAPTION_SIDE_DROPDOWN,
		CAPTION_ALIGN_DROPDOWN,
		LAYOUT_DROPDOWN,
		GENERATE_CSS_CHECKBOX,
		COMPACT_MODE_CHECKBOX
	].forEach((element) => {
		element.addEventListener("change", () => {
			updateCode();
		});
	});

	CLASS_NAME_INPUT.addEventListener("change", () => {
		CLASS_NAME_INPUT.value = CLASS_NAME_INPUT.value
			.trim()
			.replace(/\s/g, "-")
			.toLowerCase();
	});

	// DOM update functions
	const UpdateRows = () => {
		const dRows = parseInt(ROWS_INPUT.value) - rows;
		if (dRows == 0) return;
		if (dRows > 0) {
			for (k = 0; k < dRows; k++) {
				row = TABLE.insertRow(-1);
				for (i = 0; i < cols; i++) {
					cell = row.insertCell(i);
					cell.innerHTML.replace(/&nbsp;/g, "");
					cell.setAttribute("contenteditable", "true");
					cell.addEventListener("keyup", () => {
						updateCode();
					});
				}
				pasteHandler(row);
			}
		} else {
			n = -dRows;
			for (k = 0; k < n; k++) TABLE.deleteRow(rows - k);
		}
		rows = parseInt(ROWS_INPUT.value);
		updateCode();
	};

	const UpdateCols = () => {
		const dCols = parseInt(COLUMNS_INPUT.value) - cols;
		if (dCols == 0) return;
		if (dCols > 0) {
			for (i = 0; i <= rows; i++) {
				row = TABLE.rows[i];
				for (k = 0; k < dCols; k++) {
					if (i == 0) {
						cell = D.createElement("th");
						row = TABLE.tHead.children[0];
						row.appendChild(cell);
						n = cols + k + 1;
						cell.textContent = `Header ${n}`;
						cell.setAttribute("contenteditable", "true");
						cell.addEventListener("keyup", () => {
							updateCode();
						});
					} else {
						cell = row.insertCell(-1);
						cell.innerHTML.replace(/&nbsp;/g, "");
						cell.setAttribute("contenteditable", "true");
						cell.addEventListener("keyup", () => {
							updateCode();
						});
					}
				}
				pasteHandler(row);
			}
		} else {
			n = -dCols;
			for (i = 0; i <= rows; i++) {
				row = TABLE.rows[i];
				for (k = 0; k < n; k++) row.deleteCell(cols - k - 1);
			}
		}
		cols = parseInt(COLUMNS_INPUT.value);
		updateCode();
	};

	const pasteHandler = (element) => {
		element.addEventListener("paste", (e) => {
			// Prevent the default action
			e.preventDefault();

			// Get the copied text from the clipboard
			const text = e.clipboardData
				? (e.originalEvent || e).clipboardData.getData("text/plain")
				: // For IE
				window.clipboardData
				? window.clipboardData.getData("Text")
				: "";

			if (D.queryCommandSupported("insertText")) {
				D.execCommand("insertText", false, text);
			} else {
				// Insert text at the current position of caret
				const range = D.getSelection().getRangeAt(0);
				range.deleteContents();

				const textNode = D.createTextNode(text);
				range.insertNode(textNode);
				range.selectNodeContents(textNode);
				range.collapse(false);

				const selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
			}
		});
	};

	const createNewTable = () => {
		// change all inputs to either default or user input
		LAYOUT_DROPDOWN.value = "fixed";
		COLUMNS_INPUT.value = "3";
		ROWS_INPUT.value = "8";
		HEIGHT_INPUT.value = "100";
		HEIGHT_DROPDOWN.value = "%";
		WIDTH_INPUT.value = "100";
		WIDTH_DROPDOWN.value = "%";
		HEADER_BG_COLOR_CHECKBOX.checked = true;
		HEADER_BG_COLOR_INPUT.value = "#ECEFF1";
		HEADER_BG_COLOR_PICKER.value = "#ECEFF1";
		HEADER_TEXT_COLOR_CHECKBOX.checked = true;
		HEADER_TEXT_COLOR_INPUT.value = "#000000";
		HEADER_TEXT_COLOR_PICKER.value = "#000000";
		BODY_BG_COLOR_CHECKBOX.checked = true;
		BODY_BG_COLOR_INPUT.value = "#FFFFFF";
		BODY_BG_COLOR_PICKER.value = "#FFFFFF";
		BODY_TEXT_COLOR_CHECKBOX.checked = true;
		BODY_TEXT_COLOR_INPUT.value = "#000000";
		BODY_TEXT_COLOR_PICKER.value = "#000000";
		BORDER_COLOR_CHECKBOX.checked = true;
		BORDER_COLOR_INPUT.value = "#DEDEDF";
		BORDER_COLOR_PICKER.value = "#DEDEDF";
		BORDER_STYLE_CHECKBOX.checked = true;
		BORDER_STYLE_DROPDOWN.value = "solid";
		BORDER_WIDTH_CHECKBOX.checked = true;
		BORDER_WIDTH_INPUT.value = "1";
		BORDER_WIDTH_DROPDOWN.value = "px";
		BORDER_COLLAPSE_CHECKBOX.checked = true;
		BORDER_COLLAPSE_DROPDOWN.value = "collapse";
		BORDER_SPACING_CHECKBOX.checked = "true";
		BORDER_SPACING_INPUT.value = "1";
		BORDER_SPACING_DROPDOWN.value = "px";
		CELL_TEXT_ALIGN_CHECKBOX.checked = true;
		CELL_TEXT_ALIGN_DROPDOWN.value = "left";
		CELL_PADDING_CHECKBOX.checked = true;
		CELL_PADDING_INPUT.value = "5";
		CELL_PADDING_DROPDOWN.value = "px";
		CAPTION_ALIGN_CHECKBOX.checked = true;
		CAPTION_ALIGN_DROPDOWN.value = "left";
		CAPTION_SIDE_CHECKBOX.checked = true;
		CAPTION_SIDE_DROPDOWN.value = "top";

		// override since Webflow doesn't automatically add the checked class
		Array.from(
			document.getElementsByClassName("w-checkbox-input--inputType-custom")
		).forEach((element) => {
			element.classList.add("w--redirected-checked");
		});
	};

	const textCounter = (textArea) => {
		D.querySelector(".character-count__count").textContent =
			textArea.value.length;
	};

	const syncColorInputs = (colorPicker, textField) => {
		colorPicker.addEventListener("change", () => {
			textField.value = colorPicker.value.toUpperCase();
			updateCode();
		});
		textField.addEventListener("change", () => {
			textField.value = textField.value.toUpperCase();
			colorPicker.value = textField.value;
		});
	};

	Array.from(TABLE_DATA_CELLS).forEach((element) => {
		pasteHandler(element);
		element.addEventListener("keyup", () => {
			updateCode();
		});
	});

	Array.from(TABLE_HEADER_CELLS).forEach((element) => {
		pasteHandler(element);
		element.addEventListener("keyup", () => {
			updateCode();
		});
	});

	// util functions
	const ReduceTag = (e, TEXT_1) => {
		const INDEX_1 = TEXT_1.indexOf(e + ' contenteditable="true" style="');
		if (INDEX_1 > -1) {
			const TEXT_2 = TEXT_1.substring(INDEX_1);
			const INDEX_2 = INDEX_1 + TEXT_2.indexOf(';">');
			const STRING = TEXT_1.substring(INDEX_1, INDEX_2 + 3);
			TEXT_1 = TEXT_1.split(STRING).join(e + ">");
		}
		return TEXT_1;
	};

	const resetTable = () => {
		CAPTION_ELEMENT.textContent = "Table 1";
		[...TABLE_HEADER_CELLS].forEach((cell, index) => {
			cell.innerHTML = `Header ${index + 1}`;
		});

		[...TABLE_DATA_CELLS].forEach((cell) => {
			cell.innerHTML = "";
		});
	};

	const tableToCSV = () => {
		let csvData = [];

		for (let i = 0; i < TABLE_ROW_CELLS.length; i++) {
			const cols = TABLE_ROW_CELLS[i].querySelectorAll("td,th");

			let csvRow = [];
			for (let j = 0; j < cols.length; j++) {
				// Get the text data of each cell
				// of a row and push it to csvrow
				csvRow.push(cols[j].innerHTML);
			}

			// Combine each column value with comma
			csvData.push(csvRow.join(","));
		}

		// Combine each row data with new line character
		csvData = CAPTION_ELEMENT.textContent + "\n" + csvData.join("\n");

		downloadCSVFile(csvData);
	};

	const downloadCSVFile = (csvData) => {
		// Create CSV file object and feed
		// our csv_data into it
		CSVFile = new Blob([csvData], {
			type: "text/csv"
		});

		// Create to temporary link to initiate
		// download process
		const tempLink = document.createElement("a");

		// Download csv file
		const hasCaptionCheck =
			CAPTION_ELEMENT.textContent !== ""
				? CAPTION_ELEMENT.textContent.trim().replace(/\s/g, "-").toLowerCase()
				: "html-table";

		tempLink.download = hasCaptionCheck;
		const url = window.URL.createObjectURL(CSVFile);
		tempLink.href = url;

		// This link should not be displayed
		tempLink.style.display = "none";
		document.body.appendChild(tempLink);

		// Automatically click the link to
		// trigger download
		tempLink.click();
		document.body.removeChild(tempLink);
	};

	const uploadCSVFile = () => {
		const fileUpload = document.getElementById("csvUpload");
		const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

		// since we are using a custom file upload button
		// we need to trigger the real one programmatically
		fileUpload.click();

		// listen for when a file is uploaded
		fileUpload.addEventListener("change", () => {
			if (regex.test(fileUpload.value.toLowerCase())) {
				if (typeof FileReader != "undefined") {
					const reader = new FileReader();
					const fileText = document.getElementById("csvUploadText");

					// removes the "fakepath" part of the value
					fileText.textContent = fileUpload.value.replace(/^.*\\/, "");

					reader.addEventListener("load", (e) => {
						const table = document.createElement("table");
						// creates array and removes any empty rows
						const rows = e.target.result.split("\n").filter((item) => {
							return !/^[,]+$/.test(item);
						});
						// "My Table Data"
						// "Header 1,Header 2,Header 3,Header 4"
						// "sdfds,dsfd,dsfds,dsfsd"
						// "dsfd,,,"

						for (let i = 0; i < rows.length; i++) {
							let csvRows = rows[i].split(",");
							// ['My Table Data']
							// ['Header 1', 'Header 2', 'Header 3', 'Header 4']
							// ['sdfds', 'dsfd', 'dsfds', 'dsfsd']
							// ['dsfd', '', '', '']

							let tBody;
							if (csvRows.length > 1) {
								if (i === 1) {
									const tHead = table.createTHead();
									const headerRow = tHead.insertRow(-1);

									for (let j = 0; j < csvRows.length; j++) {
										const cell = D.createElement("th");
										headerRow.appendChild(cell);
										cell.innerHTML = csvRows[j];
										cell.setAttribute("contenteditable", "true");
										cell.setAttribute("style", TH_STYLES);
										cell.addEventListener("keyup", () => {
											updateCode();
										});
									}
								}
								if (i > 1) {
									if (i === 2) {
										tBody = table.createTBody();
										const row = tBody.insertRow(-1);
										for (let j = 0; j < csvRows.length; j++) {
											const cell = row.insertCell(-1);
											cell.innerHTML = csvRows[j];
											cell.setAttribute("contenteditable", "true");
											cell.setAttribute("style", TD_STYLES);
											cell.addEventListener("keyup", () => {
												updateCode();
											});
										}
									} else {
										tBody = table.tBodies[0];
										const row = tBody.insertRow(-1);
										for (let j = 0; j < csvRows.length; j++) {
											const cell = row.insertCell(-1);
											cell.innerHTML = csvRows[j];
											cell.setAttribute("contenteditable", "true");
											cell.setAttribute("style", TD_STYLES);
											cell.addEventListener("keyup", () => {
												updateCode();
											});
										}
									}
								}
							}
						}
						const dvCSV = document.getElementsByClassName("table__embed")[0]
							.children[0];
						dvCSV.innerHTML = "";
						const caption = table.createCaption();
						caption.innerHTML = "My Table";
						caption.setAttribute("contenteditable", "true");
						caption.setAttribute("style", CAPTION_STYLES);
						caption.addEventListener("keyup", () => {
							updateCode();
						});
						dvCSV.appendChild(table);
						table.setAttribute("style", TABLE_STYLES);
						updateCode();
					});
					reader.readAsText(fileUpload.files[0]);
				}
			}
		});
	};

	const deliverMessage = (event) => {
		let notification = document.getElementsByClassName("js-notification")[0],
			notificationMessage = notification.getElementsByClassName(
				"js-notification-message"
			)[0],
			message = "";
		notificationMessage.innerHTML = "";
		switch (event.target.dataset.setting) {
			case "autosave":
				if (settings.autosave) {
					message = "Autosave enabled";
				} else {
					message = "Autosave disabled";
				}
				break;
			case "reset":
				message = "Table cleared";
				break;
			default:
				console.log("Invalid option");
				break;
		}
		notificationMessage.innerHTML = message;
		notification.classList.add("is-active");
		setTimeout(() => {
			notification.classList.remove("is-active");
		}, 1500);
	};

	syncColorInputs(BORDER_COLOR_PICKER, BORDER_COLOR_INPUT);
	syncColorInputs(HEADER_BG_COLOR_PICKER, HEADER_BG_COLOR_INPUT);
	syncColorInputs(HEADER_TEXT_COLOR_PICKER, HEADER_TEXT_COLOR_INPUT);
	syncColorInputs(BODY_BG_COLOR_PICKER, BODY_BG_COLOR_INPUT);
	syncColorInputs(BODY_TEXT_COLOR_PICKER, BODY_TEXT_COLOR_INPUT);

	updateCode();
});
