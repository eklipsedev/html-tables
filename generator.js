document.addEventListener("DOMContentLoaded", () => {
  const D = document;

  // table elements
  const TABLE_TARGET = D.querySelector("[data-element='table-target']");
  const TABLE_HEADER_CELLS = TABLE_TARGET.getElementsByTagName("th");
  const TABLE_ROW_CELLS = TABLE_TARGET.getElementsByTagName("tr");
  const TABLE_DATA_CELLS = TABLE_TARGET.getElementsByTagName("td");
  const LAYOUT_DROPDOWN = D.getElementById("layout-dropdown");
  const ROWS_INPUT = D.getElementById("rows-input");
  const COLUMNS_INPUT = D.getElementById("columns-input");

  let TABLE;
  let CAPTION_ELEMENT = TABLE_TARGET.getElementsByTagName("caption");

  // table width elements
  const WIDTH_INPUT = D.getElementById("width-input");
  const WIDTH_DROPDOWN = D.getElementById("width-dropdown");

  // Table height elements
  const HEIGHT_INPUT = D.getElementById("height-input");
  const HEIGHT_DROPDOWN = D.getElementById("height-dropdown");

  // class name elements
  const CLASS_NAME_INPUT = D.getElementById("class-name-input");

  // header background color elements
  const HEADER_BG_COLOR_INPUT = D.getElementById("header-bg-color-input");
  const HEADER_BG_COLOR_PICKER = D.getElementById("header-bg-color-picker");

  // header text color elements
  const HEADER_TEXT_COLOR_INPUT = D.getElementById("header-text-color-input");
  const HEADER_TEXT_COLOR_PICKER = D.getElementById("header-text-color-picker");

  // body background color elements
  const BODY_BG_COLOR_INPUT = D.getElementById("body-bg-color-input");
  const BODY_BG_COLOR_PICKER = D.getElementById("body-bg-color-picker");

  // body text color elements
  const BODY_TEXT_COLOR_INPUT = D.getElementById("body-text-color-input");
  const BODY_TEXT_COLOR_PICKER = D.getElementById("body-text-color-picker");

  // stripes background color elements
  const STRIPES_BG_COLOR_INPUT = D.getElementById("stripes-bg-color-input");
  const STRIPES_BG_COLOR_PICKER = D.getElementById("stripes-bg-color-picker");

  // body text color elements
  const STRIPES_TEXT_COLOR_INPUT = D.getElementById("stripes-text-color-input");
  const STRIPES_TEXT_COLOR_PICKER = D.getElementById(
    "stripes-text-color-picker"
  );

  const STRIPES_CHECKBOX = D.getElementById("stripes");
  const STRIPE_STYLES_ROW = D.querySelector("[data-element='stripe-styles']");
  const SETTINGS_COMPONENT = D.querySelector(
    "[data-element='settings-component']"
  );

  // border color elements
  const BORDER_COLOR_INPUT = D.getElementById("border-color-input");
  const BORDER_COLOR_PICKER = D.getElementById("border-color-picker");

  // border style elements
  const BORDER_STYLE_DROPDOWN = D.getElementById("border-style-dropdown");

  // border width elements
  const BORDER_WIDTH_INPUT = D.getElementById("border-width-input");
  const BORDER_WIDTH_DROPDOWN = D.getElementById("border-width-dropdown");

  // border collapse elements
  const BORDER_COLLAPSE_DROPDOWN = D.getElementById("border-collapse-dropdown");

  // border spacing elements
  const BORDER_SPACING_INPUT = D.getElementById("border-spacing-input");
  const BORDER_SPACING_DROPDOWN = D.getElementById("border-spacing-dropdown");

  // cell text alignment elements
  const CELL_TEXT_ALIGN_DROPDOWN = D.getElementById("cell-text-align-dropdown");

  // cell padding elements
  const CELL_PADDING_INPUT = D.getElementById("cell-padding-input");
  const CELL_PADDING_DROPDOWN = D.getElementById("cell-padding-dropdown");

  // caption elements
  const CAPTION_ALIGN_DROPDOWN = D.getElementById("caption-align-dropdown");
  const CAPTION_SIDE_DROPDOWN = D.getElementById("caption-side-dropdown");

  // code results elements
  const GENERATE_CSS_CHECKBOX = D.getElementById("generatecss");
  const COMPACT_MODE_CHECKBOX = D.getElementById("compactMode");
  const CODE_RESULTS_TEXTAREA = D.getElementById("code");

  const NEW_TABLE_BUTTON = D.querySelector("[data-setting='new-table']");
  const RESET_TABLE_BUTTON = D.querySelector("[data-setting='clear-table']");
  const CLEAR_FORMATTING_BUTTON = D.querySelector(
    "[data-setting='clear-formatting']"
  );
  const RESET_STYLES_BUTTON = D.querySelector("[data-setting='reset-styles']");
  const DOWNLOAD_CSV_BUTTON = D.querySelector("[data-setting='download-csv']");
  const UPLOAD_CSV_BUTTON = D.querySelector("[data-setting='upload-csv']");
  const AUTOSAVE_BUTTON = D.querySelector("[data-setting='autosave']");

  const UPLOAD_CSV_MODAL = document.querySelector(".modal.is-csv-upload");
  const UPLOAD_CSV_CLOSER = UPLOAD_CSV_MODAL.firstChild;
  const UPLOAD_CSV_AREA = UPLOAD_CSV_MODAL.querySelector(
    "[data-element='upload-file-component']"
  );
  const FILE_NAME_COMPONENT = UPLOAD_CSV_MODAL.querySelector(
    "[data-element='file-name-component']"
  );
  const FILE_NAME_REMOVE = FILE_NAME_COMPONENT.querySelector(
    "[data-element='remove-file']"
  );
  const FILE_NAME_NAME = FILE_NAME_COMPONENT.querySelector(
    "[data-element='file-text']"
  );
  const CSV_FILE_INPUT = document.getElementById("csvFileInput");
  const UPLOAD_CSV_CONFIRM_BUTTON = UPLOAD_CSV_MODAL.querySelector(
    "[data-element='upload-confirm']"
  );

  const defaultStyles = {
    CLASS_NAME_INPUT: "table_component",
    LAYOUT_DROPDOWN: "fixed",
    HEIGHT_INPUT: "100",
    HEIGHT_DROPDOWN: "%",
    WIDTH_INPUT: "100",
    WIDTH_DROPDOWN: "%",
    HEADER_BG_COLOR_INPUT: "#eceff1",
    HEADER_BG_COLOR_PICKER: "#eceff1",
    HEADER_TEXT_COLOR_INPUT: "#000000",
    HEADER_TEXT_COLOR_PICKER: "#000000",
    BODY_BG_COLOR_INPUT: "#ffffff",
    BODY_BG_COLOR_PICKER: "#ffffff",
    BODY_TEXT_COLOR_INPUT: "#000000",
    BODY_TEXT_COLOR_PICKER: "#000000",
    STRIPES_BG_COLOR_INPUT: "#ffffff",
    STRIPES_BG_COLOR_PICKER: "#ffffff",
    STRIPES_TEXT_COLOR_INPUT: "#000000",
    STRIPES_TEXT_COLOR_PICKER: "#000000",
    BORDER_COLOR_INPUT: "#dededf",
    BORDER_COLOR_PICKER: "#dededf",
    BORDER_STYLE_DROPDOWN: "solid",
    BORDER_WIDTH_INPUT: "1",
    BORDER_WIDTH_DROPDOWN: "px",
    BORDER_COLLAPSE_DROPDOWN: "collapse",
    BORDER_SPACING_INPUT: "1",
    BORDER_SPACING_DROPDOWN: "px",
    CELL_TEXT_ALIGN_DROPDOWN: "left",
    CELL_PADDING_INPUT: "5",
    CELL_PADDING_DROPDOWN: "px",
    CAPTION_ALIGN_DROPDOWN: "left",
    CAPTION_SIDE_DROPDOWN: "top"
  };

  let tableCode = "";
  let tableCaption = "Table 1";
  let tableStyles = { ...defaultStyles };

  const settings = {
    autosave: true,
    generateCSS: true,
    minifyCode: false,
    stripes: false
  };

  let editor;
  const editorOptions = {
    toolbar: {
      allowMultiParagraphSelection: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "anchor",
        "strikethrough",
        "subscript",
        "superscript"
      ],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: "medium-editor-button-first",
      lastButtonClass: "medium-editor-button-last",
      relativeContainer: null,
      standardizeSelectionStart: false,
      static: false,
      /* options which only apply when static is true */
      align: "center",
      sticky: false,
      updateOnEmptySelection: false
    },
    placeholder: false,
    anchor: {
      linkValidation: true,
      placeholderText: "Paste or type a link",
      targetCheckbox: true,
      targetCheckboxText: "Open in new tab"
    },
    paste: {
      forcePlainText: false,
      cleanPastedHTML: true,
      cleanReplacements: [],
      cleanAttrs: ["class", "style", "dir"],
      cleanTags: ["meta"],
      unwrapTags: []
    }
  };

  let file = "";

  let rows = 0;
  let cols = 0;

  const defaultRowCount = 5;
  const defaultColCount = 4;

  let cell;

  // Helper function to create a style rule
  function createCSSRule(elementText, tag = "", pseudoClass = "") {
    if (elementText.length) {
      return `\n\t.${CLASS_NAME_INPUT.value
        .trim()
        .replace(/\s/g, "-")
        .toLowerCase()} ${tag} ${pseudoClass} {${elementText}\n\t}`;
    }
    return "";
  }

  // Function to update the style and generate CSS
  function updateStyle() {
    let text;
    let text_wrapper = ""; // css rule for table wrapper
    let text_table = ""; // css rule for table
    let text_cap = ""; // css rule for table caption
    let text_th = ""; // css rule for table headers
    let text_td = ""; // css rule for table td;
    let text_stripes_even = "";
    let text_stripes_odd = "";

    // line breaks & spacing...
    // \n\t\t = line break + 2 tabs

    // construct the style text for the wrapping <div>
    text_wrapper += `\n\t\toverflow: auto;`;
    text_wrapper += `\n\t\twidth: 100%;`;

    let s = "";

    if (BORDER_WIDTH_INPUT.value.length)
      s += ` ${BORDER_WIDTH_INPUT.value + BORDER_WIDTH_DROPDOWN.value}`;
    if (BORDER_STYLE_DROPDOWN.value.length)
      s += ` ${BORDER_STYLE_DROPDOWN.value}`;
    if (BORDER_COLOR_INPUT.value.length) s += ` ${BORDER_COLOR_INPUT.value}`;

    if (s.length) {
      s = s.replace(" ", "");
      text_table += `\n\t\tborder: ${s};`;
      text_th += `\n\t\tborder: ${s};`;
      text_td += `\n\t\tborder: ${s};`;
      TABLE.style.border = s;
    }

    const setStyleTextAndCodeStyles = (
      element,
      elementText,
      cssPropertyValue,
      cssPropertyName
    ) => {
      let cssProperty = `\n\t\t${cssPropertyName}: ${
        cssPropertyValue.value || cssPropertyValue
      };`;

      if (elementText === text_table) {
        text_table += cssProperty;
      } else if (elementText === text_cap) {
        text_cap += cssProperty;
      } else if (elementText === text_th) {
        text_th += cssProperty;
      } else if (elementText === text_td) {
        text_td += cssProperty;
      } else if (elementText === text_stripes_even) {
        text_stripes_even += cssProperty;
      } else if (elementText === text_stripes_odd) {
        text_stripes_odd += cssProperty;
      }
      element.style[cssPropertyName] =
        cssPropertyValue.value || cssPropertyValue;
    };

    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      HEIGHT_INPUT.value + HEIGHT_DROPDOWN.value,
      "height"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      WIDTH_INPUT.value + WIDTH_DROPDOWN.value,
      "width"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      LAYOUT_DROPDOWN,
      "table-layout"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      BORDER_COLLAPSE_DROPDOWN,
      "border-collapse"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      BORDER_SPACING_INPUT.value + BORDER_SPACING_DROPDOWN.value,
      "border-spacing"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_table,
      CELL_TEXT_ALIGN_DROPDOWN,
      "text-align"
    );
    setStyleTextAndCodeStyles(
      CAPTION_ELEMENT,
      text_cap,
      CAPTION_SIDE_DROPDOWN,
      "caption-side"
    );
    setStyleTextAndCodeStyles(
      CAPTION_ELEMENT,
      text_cap,
      CAPTION_ALIGN_DROPDOWN,
      "text-align"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_th,
      HEADER_BG_COLOR_INPUT,
      "background-color"
    );
    setStyleTextAndCodeStyles(TABLE, text_th, HEADER_TEXT_COLOR_INPUT, "color");
    setStyleTextAndCodeStyles(
      TABLE,
      !settings.stripes ? text_td : text_stripes_even,
      BODY_BG_COLOR_INPUT,
      "background-color"
    );

    setStyleTextAndCodeStyles(
      TABLE,
      !settings.stripes ? text_td : text_stripes_even,
      BODY_TEXT_COLOR_INPUT,
      "color"
    );

    setStyleTextAndCodeStyles(
      TABLE,
      text_th,
      CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value,
      "padding"
    );
    setStyleTextAndCodeStyles(
      TABLE,
      text_td,
      CELL_PADDING_INPUT.value + CELL_PADDING_DROPDOWN.value,
      "padding"
    );

    if (settings.stripes) {
      // for stripes
      setStyleTextAndCodeStyles(
        TABLE,
        text_stripes_odd,
        STRIPES_BG_COLOR_INPUT,
        "background-color"
      );
      setStyleTextAndCodeStyles(
        TABLE,
        text_stripes_odd,
        STRIPES_TEXT_COLOR_INPUT,
        "color"
      );
    }

    const setCellStyles = (i, element, cssPropertyName, cssPropertyValue) => {
      if (element.value.length) {
        i.style[cssPropertyName] = cssPropertyValue.value || cssPropertyValue;
      } else {
        i.style[cssPropertyName] = "";
      }
    };

    cell = Array.from(TABLE_HEADER_CELLS);
    cell.forEach((cellElement) => {
      setCellStyles(
        cellElement,
        HEADER_BG_COLOR_INPUT,
        "background-color",
        HEADER_BG_COLOR_INPUT
      );
      setCellStyles(
        cellElement,
        HEADER_TEXT_COLOR_INPUT,
        "color",
        HEADER_TEXT_COLOR_INPUT
      );
      setCellStyles(
        cellElement,
        CELL_PADDING_INPUT,
        "padding",
        `${CELL_PADDING_INPUT.value}${CELL_PADDING_DROPDOWN.value}`
      );
      setCellStyles(
        cellElement,
        BORDER_WIDTH_INPUT,
        "border-width",
        `${BORDER_WIDTH_INPUT.value}${BORDER_WIDTH_DROPDOWN.value}`
      );
      setCellStyles(
        cellElement,
        BORDER_STYLE_DROPDOWN,
        "border-style",
        BORDER_STYLE_DROPDOWN
      );
      setCellStyles(
        cellElement,
        BORDER_COLOR_INPUT,
        "border-color",
        BORDER_COLOR_INPUT
      );
    });

    cell = Array.from(TABLE_DATA_CELLS);
    cell.forEach((cellElement) => {
      setCellStyles(
        cellElement,
        CELL_PADDING_INPUT,
        "padding",
        `${CELL_PADDING_INPUT.value}${CELL_PADDING_DROPDOWN.value}`
      );
      setCellStyles(
        cellElement,
        BORDER_WIDTH_INPUT,
        "border-width",
        `${BORDER_WIDTH_INPUT.value}${BORDER_WIDTH_DROPDOWN.value}`
      );
      setCellStyles(
        cellElement,
        BORDER_STYLE_DROPDOWN,
        "border-style",
        BORDER_STYLE_DROPDOWN
      );
      setCellStyles(
        cellElement,
        BORDER_COLOR_INPUT,
        "border-color",
        BORDER_COLOR_INPUT
      );

      if (settings.stripes) {
        const trElement = cellElement.parentElement; // Get the parent <tr> element

        if (trElement && trElement.tagName === "TR") {
          const trIndex = Array.from(TABLE.querySelectorAll("tr")).indexOf(
            trElement
          );

          if (trIndex % 2 === 1) {
            // <td> is inside an odd <tr>
            // for stripes
            setCellStyles(
              cellElement,
              STRIPES_BG_COLOR_INPUT,
              "background-color",
              STRIPES_BG_COLOR_INPUT
            );
            setCellStyles(
              cellElement,
              STRIPES_TEXT_COLOR_INPUT,
              "color",
              STRIPES_TEXT_COLOR_INPUT
            );
          } else {
            // <td> is inside an even <tr>
            setCellStyles(
              cellElement,
              BODY_BG_COLOR_INPUT,
              "background-color",
              BODY_BG_COLOR_INPUT
            );
            setCellStyles(
              cellElement,
              BODY_TEXT_COLOR_INPUT,
              "color",
              BODY_TEXT_COLOR_INPUT
            );
          }
        }
      } else {
        // stripes is off, apply regular styles
        setCellStyles(
          cellElement,
          BODY_BG_COLOR_INPUT,
          "background-color",
          BODY_BG_COLOR_INPUT
        );
        setCellStyles(
          cellElement,
          BODY_TEXT_COLOR_INPUT,
          "color",
          BODY_TEXT_COLOR_INPUT
        );
      }
    });

    const wrapperRule = createCSSRule(text_wrapper);
    const tableRule = createCSSRule(text_table, "table");
    const captionRule = createCSSRule(text_cap, "caption");
    const thRule = createCSSRule(text_th, "th");
    const tdRule = createCSSRule(text_td, "td");
    const stripesEvenRule = createCSSRule(
      text_stripes_even,
      "tr:nth-child(even) td"
    );
    const stripeOddRule = createCSSRule(
      text_stripes_odd,
      "tr:nth-child(odd) td"
    ); // will be "even" or "odd"

    text =
      wrapperRule +
      tableRule +
      captionRule +
      thRule +
      tdRule +
      stripesEvenRule +
      stripeOddRule;

    function minifyCSS(css) {
      css = css
        .replace(/\r\n|\r|\n/g, "") // Remove line breaks, extra spaces, and tabs
        .replace(/\s+/g, " ")
        .replace(/: /g, ":") // Remove spaces around colons, semicolons, and curly braces
        .replace(/; /g, ";")
        .replace(/{ /g, "{")
        .replace(/ }/g, "}");

      return css;
    }

    if (settings.generateCSS) {
      if (settings.minifyCode) {
        text = minifyCSS(text);
      } else {
        text = formatUsingBeautify(text, "css");
      }
    } else {
      text = "";
    }

    if (text.length) {
      return (text = `<style>\n${text}\n</style>`);
    } else {
      return "";
    }
  }

  function formatUsingBeautify(text, type) {
    const options = {
      indent_size: "4",
      indent_char: " ",
      max_preserve_newlines: "-1",
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: type === "html" ? "separate" : "keep",
      brace_style: type === "html" ? "expand" : "end-expand",
      space_before_conditional: false,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: "0",
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: true
    };

    if (type === "html") {
      return html_beautify(text, options);
    } else {
      return css_beautify(text, options);
    }
  }

  function removeAttributes(text) {
    return (text = text.replace(/<[^>]+>/g, (match) => {
      // Define an array of attributes to exclude from removal
      const excludedAttributes = ["href", "target", "rel"];

      // Use a regular expression to match and preserve the desired attributes
      return match.replace(
        /([^\s=]+)="([^"]*)"/g,
        (attributeMatch, attributeName, attributeValue) => {
          // Check if the attributeName is in the excludedAttributes list
          if (excludedAttributes.includes(attributeName)) {
            return attributeMatch; // Preserve the matched attribute
          } else {
            return ""; // Remove the attribute
          }
        }
      );
    }));
  }

  const updateCode = () => {
    let styleTagText = updateStyle(); // will come preformated
    let text = TABLE.outerHTML;

    function minifyHTML(text) {
      text = text
        .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
        .replace(/\s+/g, " ") // Remove extra whitespace and line breaks
        .replace(/>\s+</g, "><") // Remove spaces around HTML tags
        .trim(); // Trim any leading or trailing whitespace

      return text;
    }

    // remove attributes, but only certain ones
    text = removeAttributes(text);

    // format the text using Beautify
    text = formatUsingBeautify(text, "html");

    // Generate the full HTML structure
    const IS_STYLED = settings.generateCSS
      ? ` class="${CLASS_NAME_INPUT.value
          .trim()
          .replace(/\s/g, "-")
          .toLowerCase()}"`
      : "";
    text = `<div${IS_STYLED} role="region" tabindex="0">\n${text}\n<div style="margin-top:8px">Made with <a href="https://www.htmltables.io/" target="_blank">HTML Tables</a></div>\n</div>`;

    // Combine style and HTML
    if (settings.generateCSS) {
      if (settings.minifyCode) {
        styleTagText += "\n" + minifyHTML(text);
      } else {
        styleTagText += "\n" + text;
      }
    } else if (settings.minifyCode) {
      styleTagText = minifyHTML(text);
    } else {
      styleTagText += text;
    }

    // Update the code results textarea
    CODE_RESULTS_TEXTAREA.value = styleTagText;
    textCounter(CODE_RESULTS_TEXTAREA);
  };

  const saveTableData = () => {
    tableCode = TABLE.outerHTML;
  };

  function cleanHtmlCode(htmlCode) {
    // Parse the HTML code into a DocumentFragment
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, "text/html");

    // Remove the specified attributes from all elements in the DocumentFragment
    doc
      .querySelectorAll(
        "[medium-editor-index], [data-medium-editor-editor-index], [data-medium-editor-element], .medium-editor-element"
      )
      .forEach((element) => {
        element.removeAttribute("medium-editor-index");
        element.removeAttribute("data-medium-editor-editor-index");
        element.removeAttribute("data-medium-editor-element");
        element.classList.remove("medium-editor-element");
      });

    // Get the clean HTML string
    return doc.body.innerHTML;
  }

  function buildTableFromCode(data) {
    rows = 0;
    cols = 0;

    if (data) {
      if (typeof data === "string") {
        // its code
        const cleanCode = cleanHtmlCode(data);

        // Set the cleaned HTML to the target element
        TABLE_TARGET.innerHTML = cleanCode;
        TABLE = TABLE_TARGET.querySelector("table");
        CAPTION_ELEMENT = TABLE_TARGET.querySelector("caption");

        tableCode = data;

        // Create a DOMParser instance and parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableCode, "text/html");

        const table = doc.querySelector("table");

        // Loop through rows
        table.querySelectorAll("tr").forEach((row, rowIndex) => {
          rows++;

          if (rowIndex === 0) {
            // Loop through the header row
            row.querySelectorAll("th").forEach(() => {
              cols++;
            });
          }
        });
      } else if (Array.isArray(data)) {
        // its csv data or array data
        const newTable = document.createElement("table");
        // if table exists, clear existing one
        TABLE ? (TABLE.innerHTML = "") : (TABLE = newTable);
        TABLE_TARGET.appendChild(newTable);

        createCaption();
        createTableHead(data);
        createTableBody(data);
        saveTableData();
      }
    } else {
      // there is no saved code, build table from scratch
      const newTable = document.createElement("table");
      // if table exists, clear existing one
      TABLE ? (TABLE.innerHTML = "") : (TABLE = newTable);
      TABLE_TARGET.appendChild(newTable);

      createCaption();
      createTableHead();
      createTableBody();
      saveTableData();
    }

    const elements = document.querySelectorAll("caption, th, td");
    editor = new MediumEditor(elements, editorOptions);
    editor.addElements(elements);
    subscribeToEditableInput();

    ROWS_INPUT.value = rows;
    COLUMNS_INPUT.value = cols;
  }

  // handle class name input changes
  CLASS_NAME_INPUT.addEventListener("change", () => {
    CLASS_NAME_INPUT.value = CLASS_NAME_INPUT.value
      .trim()
      .replace(/\s/g, "-")
      .toLowerCase();
  });

  function createTableCell(cell, type, index) {
    cell.setAttribute("contenteditable", "true");

    if (type === "th") {
      // Table header cell
      cell.textContent = `Header ${index}`;
    } else if (type === "td") {
      // Table row cell
      cell.innerHTML = cell.innerHTML.replace(/&nbsp;/g, "");
    }
  }

  // DOM update function to update the number of rows
  function updateRows() {
    const newRowCount = parseInt(ROWS_INPUT.value);
    if (newRowCount === rows) return;

    if (newRowCount > rows) {
      for (let k = rows; k < newRowCount; k++) {
        const row = TABLE.insertRow(-1);
        for (let i = 0; i < cols; i++) {
          const cell = row.insertCell(i);
          createTableCell(cell, "td");
          editor.addElements(cell);
        }
      }
      console.log(editor);
    } else {
      while (rows > newRowCount) {
        const rowToDelete = TABLE.querySelectorAll("tr")[rows - 1]; //TABLE.rows[rows - 2]; // Get the row to delete
        const cellsToDelete = rowToDelete.cells; // Get the cells in the row

        editor.removeElements(cellsToDelete);
        console.log(editor);

        TABLE.deleteRow(rows - 1);
        rows--;
      }
    }

    rows = newRowCount;
    saveTableData();
    if (settings.autosave) {
      updateTableCodeInLocalStorage();
    }
    updateCode();
  }

  let elementsToRemove = [];

  // DOM update function to update the number of columns
  function updateCols() {
    const newColCount = parseInt(COLUMNS_INPUT.value);
    if (newColCount === cols) return;

    // adding columns
    if (newColCount > cols) {
      for (let i = 0; i <= rows - 1; i++) {
        let row = TABLE.rows[i];
        for (let k = 0; k < newColCount - cols; k++) {
          if (i === 0) {
            const cell = document.createElement("th");
            row = TABLE.querySelectorAll("tr")[0];
            row.appendChild(cell);
            const n = cols + k + 1;
            createTableCell(cell, "th", n);
            editor.addElements(cell);
          } else {
            const cell = row.insertCell(-1);
            createTableCell(cell, "td");
            editor.addElements(cell);
          }
        }
      }
      console.log(editor);
    } else {
      // removing columns
      const colDifference = cols - newColCount;
      for (let i = 0; i <= rows - 1; i++) {
        const row = TABLE.rows[i];
        for (let k = 0; k < colDifference; k++) {
          const cellToDelete = row.cells[row.cells.length - 1]; // Get the cell to delete

          row.deleteCell(row.cells.length - 1);

          if (!document.body.contains(cellToDelete)) {
            elementsToRemove.push(cellToDelete);
          }

          //editor.removeElements(cellToDelete);
          //console.log(editor.elements);
        }
      }
      editor.removeElements(elementsToRemove);
      console.log(editor);
    }

    //editor.removeElements(elementsToRemove);
    cols = newColCount;
    saveTableData();
    if (settings.autosave) {
      updateTableCodeInLocalStorage();
    }
    updateCode();
  }

  // Handle Table Build
  const createCaption = () => {
    const caption = document.createElement("caption");
    caption.textContent = tableCaption;
    caption.setAttribute("contenteditable", true);
    CAPTION_ELEMENT = caption;
    TABLE.appendChild(caption);
  };

  const createTableHead = (arrayData) => {
    const thead = TABLE.createTHead();
    const headRow = thead.insertRow();

    rows = 0;
    cols = 0;

    // handle based on if array data is present or not, otherwise build from scratch
    if (arrayData) {
      arrayData.forEach((arrayRow, arrayRowIndex) => {
        // if its the first row in the array, its the header
        if (arrayRowIndex === 0) {
          // this loop will only run for each header cell
          arrayRow.forEach((arrayCell, arrayCellIndex) => {
            const cell = document.createElement("th");
            createTableCell(cell, "th", arrayCellIndex + 1);
            cell.innerHTML = arrayCell;
            headRow.appendChild(cell);
            cols++;
          });
        }
      });
    } else {
      // there is no array data, build from scratch
      cols = defaultColCount;
      for (let i = 1; i <= cols; i++) {
        const cell = document.createElement("th");
        cell.setAttribute("contenteditable", "true");
        cell.innerHTML = `Header ${i}`;
        headRow.appendChild(cell);
      }
    }
    TABLE.appendChild(thead);
  };

  const createTableBody = (arrayData) => {
    const tbody = TABLE.createTBody();

    if (arrayData) {
      rows = arrayData.length;
      arrayData.forEach((arrayRow, arrayRowIndex) => {
        // gets every row except header row
        if (arrayRowIndex > 0) {
          const row = tbody.insertRow();

          // each cell in the body
          arrayRow.forEach((arrayCell, arrayCellIndex) => {
            const cell = row.insertCell();
            cell.setAttribute("contenteditable", "true");
            cell.innerHTML = arrayCell;
          });
        }
      });
    } else {
      rows = defaultRowCount;
      cols = defaultColCount;

      for (let i = 1; i <= rows - 1; i++) {
        // remove 1 row to account for header
        const row = tbody.insertRow();
        for (let j = 1; j <= cols; j++) {
          const cell = row.insertCell();
          cell.setAttribute("contenteditable", "true");
        }
      }
    }
    TABLE.appendChild(tbody);
  };

  function convertCsvToArray(csvContent) {
    const rows = csvContent.split("\n");
    return rows.map((row) => {
      // Remove quotes from each value in the row
      return row.split(",").map((value) => value.replace(/^"(.*)"$/, "$1"));
    });
  }

  const textCounter = (textArea) => {
    D.querySelector("[data-element='character-count']").textContent =
      textArea.value.length;
  };

  const syncColorInputs = (colorPicker, textField) => {
    // Function to validate the input value
    const isValidColorFormat = (value) => /^#([0-9A-Fa-f]{6})$/.test(value);

    // Update the text field when the color picker changes
    colorPicker.addEventListener("input", () => {
      const newValue = colorPicker.value;
      if (isValidColorFormat(newValue)) {
        if (textField.value !== newValue) {
          textField.value = newValue;
        }
      } else {
        // Provide feedback for an invalid format
        console.error("Invalid color format");
      }
      textField.dispatchEvent(new Event("change"));
    });

    // Update the color picker when the text field changes
    textField.addEventListener("input", () => {
      const newValue = textField.value;
      if (isValidColorFormat(newValue)) {
        if (colorPicker.value !== newValue) {
          colorPicker.value = newValue;
        }
      } else {
        // Provide feedback for an invalid format
        console.error("Invalid color format");
      }
      colorPicker.dispatchEvent(new Event("change"));
    });
  };

  let timeoutID; // Store the timeout ID
  let messageText = "";

  const deliverMessage = (message) => {
    const notification = document.querySelector(
      "[data-element='notification-component']"
    );
    const notificationMessage = notification.querySelector(
      "[data-element='notification-message']"
    );

    // Clear the previous timeout (if it exists)
    if (timeoutID) {
      clearTimeout(timeoutID);
      notification.classList.remove("is-active");
    }

    switch (message) {
      case "autosave":
        messageText = settings.autosave
          ? "Autosave enabled"
          : "Autosave disabled";
        break;
      case "clear-data":
        messageText = "Table data cleared";
        break;
      case "clear-formatting":
        messageText = "Table formatting cleared";
        break;
      case "reset-styles":
        messageText = "Table styles reset";
        break;
      case "upload-csv":
        messageText = file
          ? "CSV imported successfully"
          : "Error importing CSV";
        break;
      case "download-csv":
        messageText = "Table exported successfully";
        break;
      case "new-table":
        messageText = "New table created";
        break;
      default:
        console.log("Invalid option");
        return; // Exit early for invalid options
    }

    setTimeout(() => {
      notificationMessage.textContent = messageText;
      notification.classList.add("is-active");
    }, 300);

    // Set a new timeout for hiding the notification
    timeoutID = setTimeout(() => {
      notification.classList.remove("is-active");
    }, 2000);
  };

  const resetTable = () => {
    CAPTION_ELEMENT.textContent = "Table 1";

    Array.from(TABLE_HEADER_CELLS).forEach((cell, index) => {
      cell.innerHTML = `Header ${index + 1}`;
    });

    Array.from(TABLE_DATA_CELLS).forEach((cell) => {
      cell.innerHTML = "";
    });
  };

  const tableToCSV = () => {
    const csvData = [];

    Array.from(TABLE_ROW_CELLS).forEach((row) => {
      const cols = Array.from(row.querySelectorAll("td, th"));

      const csvRow = cols.map((col) => {
        // Get the text data of each cell, and handle escaping of special characters
        const cellText = col.textContent.trim(); // Remove extra white space
        return `"${cellText
          .replace(/"/g, '""')
          .replace(/\n/g, " ")
          .replace(/\r/g, " ")}"`; // Handle double quotes and line breaks
      });

      csvData.push(csvRow.join(","));
    });

    const tableContent = csvData.join("\n");

    downloadCSVFile(tableContent);
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

  // Event listeners
  ROWS_INPUT.addEventListener("change", updateRows);
  COLUMNS_INPUT.addEventListener("change", updateCols);

  document.querySelectorAll("[data-action='update']").forEach((element) => {
    if (element.id === "class-name-input") {
      element.addEventListener("keyup", () => {
        updateCode();
      });
    }
    element.addEventListener("change", (e) => {
      saveStylesToTableStyles(e);
      updateCode();
      if (settings.autosave === true) {
        updateStylesInLocalStorage(e);
      }
    });
  });

  COMPACT_MODE_CHECKBOX.addEventListener("change", () => {
    settings.minifyCode = COMPACT_MODE_CHECKBOX.checked;
    updateCode();
    updateSettingsInLocalStorage("minifyCode");
  });

  GENERATE_CSS_CHECKBOX.addEventListener("change", () => {
    settings.generateCSS = GENERATE_CSS_CHECKBOX.checked;
    updateCode();
    updateSettingsInLocalStorage("generateCSS");
  });

  STRIPES_CHECKBOX.addEventListener("change", () => {
    settings.stripes = STRIPES_CHECKBOX.checked;
    console.log(settings.stripes);
    if (settings.stripes) {
      STRIPE_STYLES_ROW.style.display = "flex";
      SETTINGS_COMPONENT.classList.add("is-stripes");
    } else {
      STRIPE_STYLES_ROW.style.display = "none";
      SETTINGS_COMPONENT.classList.remove("is-stripes");
    }

    updateCode();
    updateSettingsInLocalStorage("stripes");
  });

  RESET_TABLE_BUTTON.addEventListener("click", () => {
    resetTable();
    saveTableData();
    updateCode();
    if (settings.autosave === true) {
      updateTableCodeInLocalStorage();
      tableCaption = "Table 1";
      CAPTION_ELEMENT.textContent = tableCaption;
    }
    deliverMessage("clear-data");
  });

  DOWNLOAD_CSV_BUTTON.addEventListener("click", () => {
    tableToCSV();
    deliverMessage("download-csv");
  });

  UPLOAD_CSV_BUTTON.addEventListener("click", () => {
    UPLOAD_CSV_MODAL.classList.add("is-open");
  });

  UPLOAD_CSV_CLOSER.addEventListener("click", () => {
    UPLOAD_CSV_MODAL.classList.remove("is-open");
  });

  // Click event for the drop area
  UPLOAD_CSV_AREA.addEventListener("click", () => {
    CSV_FILE_INPUT.click();
  });

  // Drag and drop events for the drop area
  UPLOAD_CSV_AREA.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    if (file) {
      UPLOAD_CSV_AREA.style.display = "none";
      FILE_NAME_NAME.textContent = file.name;
      FILE_NAME_COMPONENT.style.display = "flex";
      UPLOAD_CSV_CONFIRM_BUTTON.parentElement.style.display = "flex";
    } else {
      FILE_NAME_NAME.textContent = "No file selected";
    }
  });

  CSV_FILE_INPUT.addEventListener("change", (event) => {
    file = event.target.files[0];
    if (file) {
      UPLOAD_CSV_AREA.style.display = "none";
      FILE_NAME_NAME.textContent = file.name;
      FILE_NAME_COMPONENT.style.display = "flex";
      UPLOAD_CSV_CONFIRM_BUTTON.parentElement.style.display = "flex";
    } else {
      FILE_NAME_NAME.textContent = "No file selected";
    }
  });

  FILE_NAME_REMOVE.addEventListener("click", () => {
    UPLOAD_CSV_AREA.style.display = "flex";
    FILE_NAME_COMPONENT.style.display = "none";
    UPLOAD_CSV_CONFIRM_BUTTON.parentElement.style.display = "none";
  });

  // Drag and drop events for the drop area
  UPLOAD_CSV_AREA.addEventListener("dragover", (e) => {
    e.preventDefault();
    UPLOAD_CSV_AREA.classList.add("drag-over");
  });

  UPLOAD_CSV_AREA.addEventListener("dragleave", () => {
    UPLOAD_CSV_AREA.classList.remove("drag-over");
  });

  UPLOAD_CSV_CONFIRM_BUTTON.addEventListener("click", (e) => {
    UPLOAD_CSV_MODAL.classList.remove("is-open");
    handleFile(file);
  });

  // get the file extension of the CSV file
  function getFileExtension(fileName) {
    // Split the file name by the dot (.) character and get the last part
    const parts = fileName.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase();
    }
    return ""; // If no extension is found
  }

  function handleFile(file) {
    if (file) {
      const fileName = file.name;
      const extension = getFileExtension(fileName); // Will return csv or xlsx
      tableCaption = fileName;

      const reader = new FileReader();

      reader.onload = function (e) {
        if (extension === "csv") {
          const csvContent = e.target.result;
          const csvArray = convertCsvToArray(csvContent);

          buildTableFromCode(csvArray);
        } else if (extension === "xlsx") {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Assuming the first sheet is the one you want to convert
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Create an options object to specify allowed HTML elements and attributes
          const options = {
            ALLOWED_TAGS: [
              "table",
              "caption",
              "thead",
              "tbody",
              "tr",
              "th",
              "td",
              "b",
              "a",
              "i",
              "u",
              "strike"
            ],
            ALLOWED_ATTR: ["href", "target", "rel"]
          };

          // Convert the sheet data to HTML table with sanitized content
          const htmlTable = XLSX.utils.sheet_to_html(sheet, {
            display: true,
            raw: true, // Return raw cell content
            cellHTML: true // Include cell content as HTML
          });

          // Sanitize the cell content
          const sanitizedHtmlTable = DOMPurify.sanitize(htmlTable, options);
          const withAttributesRemoved = removeAttributes(sanitizedHtmlTable);

          // Create a temporary container to parse the HTML content
          const tempContainer = document.createElement("div");
          tempContainer.innerHTML = withAttributesRemoved;

          // Get the table and its first row
          const table = tempContainer.querySelector("table");
          const tbody = table.querySelector("tbody");
          const tcaption = document.createElement("caption");
          const thead = document.createElement("thead"); // Create a new <thead>
          const headerRow = tbody.querySelector("tr"); // Get the first row from <tbody>

          tcaption.textContent = tableCaption;

          // Remove the first row from <tbody>
          tbody.removeChild(headerRow);

          // Convert the <td> elements in the header row to <th>
          const headerCells = headerRow.querySelectorAll("td");
          headerCells.forEach((cell) => {
            const th = document.createElement("th");
            th.innerHTML = cell.innerHTML;
            thead.appendChild(th);
          });

          // Add the new <thead> above the <tbody>
          table.insertBefore(thead, tbody);
          table.insertBefore(tcaption, thead);

          buildTableFromCode(tempContainer.innerHTML);
        }

        updateCode();
        if (settings.autosave) {
          updateTableCodeInLocalStorage();
        }
        // reset DOM things
        UPLOAD_CSV_AREA.style.display = "flex";
        FILE_NAME_COMPONENT.style.display = "none";
        UPLOAD_CSV_CONFIRM_BUTTON.parentElement.style.display = "none";
        CSV_FILE_INPUT.value = "";
        FILE_NAME_NAME.textContent = "No file selected";

        deliverMessage("upload-csv");
      };

      reader.onerror = function (error) {
        // Handle the error, e.g., by displaying an error message or logging it
        console.error("Error reading the file:", error);
        deliverMessage("upload-csv");
      };

      // Start reading the file after setting up the event handlers
      if (extension === "csv") {
        reader.readAsText(file);
      } else if (extension === "xlsx") {
        reader.readAsArrayBuffer(file);
      }
    }
  }

  AUTOSAVE_BUTTON.addEventListener("click", (e) => {
    AUTOSAVE_BUTTON.classList.toggle("is-active");
    updateSettingsInLocalStorage("autosave");
    if (settings.autosave) {
      updateTableCodeInLocalStorage();
      updateStylesInLocalStorage(e);
    } else {
      localStorage.removeItem("tableCode");
      localStorage.removeItem("tableStyles");
    }
    deliverMessage("autosave");
  });

  // handle local storage for settings

  function getSettingsFromLocalStorage() {
    const tableSettings =
      JSON.parse(localStorage.getItem("tableSettings")) || {};

    const settingsMap = {
      autosave: {
        element: AUTOSAVE_BUTTON,
        localStorageKey: "autosave"
      },
      generateCSS: {
        element: GENERATE_CSS_CHECKBOX,
        localStorageKey: "generateCSS"
      },
      minifyCode: {
        element: COMPACT_MODE_CHECKBOX,
        localStorageKey: "minifyCode"
      },
      stripes: {
        element: STRIPES_CHECKBOX,
        localStorageKey: "stripes"
      }
    };

    for (const key in settingsMap) {
      const setting = settingsMap[key];
      const { element, localStorageKey } = setting;

      if (localStorageKey in tableSettings && element.type === "checkbox") {
        const isChecked = tableSettings[localStorageKey] === true;
        element.checked = isChecked;
        const classMethod = isChecked ? "add" : "remove";
        element.previousElementSibling.classList[classMethod](
          "w--redirected-checked"
        );
      }
    }

    // if the table settings exist
    if ("autosave" in tableSettings) {
      settings.autosave = tableSettings.autosave;
      tableSettings.autosave
        ? AUTOSAVE_BUTTON.classList.add("is-active")
        : AUTOSAVE_BUTTON.classList.remove("is-active");
    } else {
      settings.autosave = true;
      AUTOSAVE_BUTTON.classList.add("is-active");
    }

    if ("generateCSS" in tableSettings) {
      settings.generateCSS = tableSettings.generateCSS;
    } else {
      settings.generateCSS = true;
    }

    if ("minifyCode" in tableSettings) {
      settings.minifyCode = tableSettings.minifyCode;
    } else {
      settings.minifyCode = false;
    }

    if ("stripes" in tableSettings) {
      settings.stripes = tableSettings.stripes;
      if (tableSettings.stripes) {
        STRIPE_STYLES_ROW.style.display = "flex";
        SETTINGS_COMPONENT.classList.add("is-stripes");
      } else {
        STRIPE_STYLES_ROW.style.display = "none";
        SETTINGS_COMPONENT.classList.remove("is-stripes");
      }
    } else {
      settings.stripes = false;
    }

    localStorage.setItem("tableSettings", JSON.stringify(settings));
  }

  function updateSettingsInLocalStorage(action) {
    if (action === "autosave") {
      settings.autosave = AUTOSAVE_BUTTON.classList.contains("is-active")
        ? true
        : false;
    } else if (action === "generateCSS") {
      settings.generateCSS = GENERATE_CSS_CHECKBOX.checked;
    } else if (action === "minifyCode") {
      settings.minifyCode = COMPACT_MODE_CHECKBOX.checked;
    } else if (action === "stripes") {
      settings.stripes = STRIPES_CHECKBOX.checked;
    }
    localStorage.setItem("tableSettings", JSON.stringify(settings));
  }

  // handle local storage for table code

  function getTableCodeFromLocalStorage() {
    const savedTableCode = JSON.parse(localStorage.getItem("tableCode"));

    if (savedTableCode) {
      tableCode = savedTableCode;
      buildTableFromCode(savedTableCode);
    } else {
      buildTableFromCode();
    }
    updateTableCodeInLocalStorage();
  }

  function updateTableCodeInLocalStorage() {
    const cleanCode = cleanHtmlCode(TABLE.outerHTML);
    localStorage.setItem("tableCode", JSON.stringify(cleanCode));
  }

  // handle local storage for styles

  function getStylesFromLocalStorage() {
    const savedTableStyles = JSON.parse(localStorage.getItem("tableStyles"));

    if (savedTableStyles) {
      tableStyles = savedTableStyles;
      // styles are stored, parse and set to their correct input
      setStylePanelStyles(savedTableStyles);
    } else {
      // no styles are stored
      localStorage.setItem("tableStyles", JSON.stringify(tableStyles));
      setStylePanelStyles(tableStyles);
    }
  }

  function saveStylesToTableStyles(e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
      const key = e.target.id.toUpperCase().replace(/-/g, "_");
      const value = e.target.value;
      tableStyles = { ...tableStyles, [key]: value };
    }
  }

  function updateStylesInLocalStorage(e) {
    localStorage.setItem("tableStyles", JSON.stringify(tableStyles));
  }

  function setStylePanelStyles(stylesObject) {
    for (const key in stylesObject) {
      if (stylesObject.hasOwnProperty(key)) {
        const elementId = key.toLowerCase().replace(/_/g, "-");

        const element = document.getElementById(elementId);

        if (element) {
          if (element.tagName === "INPUT" || element.tagName === "SELECT") {
            element.value = stylesObject[key];
          }
        }
      }
    }
  }

  function clearTableFormatting() {
    const tableHtml = TABLE_TARGET.innerHTML;
    // pattern to clean formatting
    const pattern = /<(?!\/?(table|caption|tr|td|th)\b)[^>]+>/gi;
    // Remove unwanted HTML tags using regular expressions
    const cleanHtml = tableHtml.replace(pattern, "");

    tableCode = cleanHtml;
    buildTableFromCode(tableCode);
  }

  CLEAR_FORMATTING_BUTTON.addEventListener("click", () => {
    clearTableFormatting();
    updateCode();

    if (settings.autosave) {
      updateTableCodeInLocalStorage();
    }
    deliverMessage("clear-formatting");
  });

  RESET_STYLES_BUTTON.addEventListener("click", (e) => {
    setStylePanelStyles(defaultStyles);
    tableStyles = defaultStyles;
    updateCode();

    STRIPES_CHECKBOX.checked = false;
    STRIPES_CHECKBOX.dispatchEvent(new Event("change"));

    if (settings.stripes) {
      STRIPES_CHECKBOX.previousElementSibling.classList.add(
        "w--redirected-checked"
      );
    } else {
      STRIPES_CHECKBOX.previousElementSibling.classList.remove(
        "w--redirected-checked"
      );
    }

    if (settings.autosave) {
      updateTableCodeInLocalStorage();
      updateStylesInLocalStorage(e);
    }
    deliverMessage("reset-styles");
  });

  NEW_TABLE_BUTTON.addEventListener("click", (e) => {
    tableCaption = "Table 1";
    buildTableFromCode();
    setStylePanelStyles(defaultStyles);
    tableStyles = defaultStyles;
    updateCode();
    // handle stripes change
    STRIPES_CHECKBOX.checked = false;
    STRIPES_CHECKBOX.dispatchEvent(new Event("change"));

    if (settings.stripes) {
      STRIPES_CHECKBOX.previousElementSibling.classList.add(
        "w--redirected-checked"
      );
    } else {
      STRIPES_CHECKBOX.previousElementSibling.classList.remove(
        "w--redirected-checked"
      );
    }

    if (settings.autosave) {
      updateTableCodeInLocalStorage();
      updateStylesInLocalStorage(e);
    }
    deliverMessage("new-table");
  });

  getSettingsFromLocalStorage();

  if (settings.autosave) {
    getTableCodeFromLocalStorage();
    getStylesFromLocalStorage();
  } else {
    buildTableFromCode();
    setStylePanelStyles(defaultStyles);
  }

  function subscribeToEditableInput() {
    editor.subscribe("editableInput", () => {
      updateCode();
      if (settings.autosave) {
        updateTableCodeInLocalStorage();
      }
    });
  }

  subscribeToEditableInput();

  TABLE.addEventListener("keyup", () => {
    updateCode();
    saveTableData();
    if (settings.autosave) {
      updateTableCodeInLocalStorage();
    }
  });

  TABLE.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent the default tab behavior
      const currentCell = document.activeElement;
      const nextCell = getNextCell(currentCell);
      if (nextCell) {
        nextCell.focus();
        // Set the cursor at the end of the text in the cell
        const range = document.createRange();
        range.selectNodeContents(nextCell);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });

  function getNextCell(currentCell) {
    const allCells = Array.from(document.querySelectorAll("td, th"));
    const currentIndex = allCells.indexOf(currentCell);
    const nextIndex = (currentIndex + 1) % allCells.length;
    return allCells[nextIndex];
  }

  updateCode();

  syncColorInputs(BORDER_COLOR_PICKER, BORDER_COLOR_INPUT);
  syncColorInputs(HEADER_BG_COLOR_PICKER, HEADER_BG_COLOR_INPUT);
  syncColorInputs(HEADER_TEXT_COLOR_PICKER, HEADER_TEXT_COLOR_INPUT);
  syncColorInputs(BODY_BG_COLOR_PICKER, BODY_BG_COLOR_INPUT);
  syncColorInputs(BODY_TEXT_COLOR_PICKER, BODY_TEXT_COLOR_INPUT);
  syncColorInputs(STRIPES_BG_COLOR_PICKER, STRIPES_BG_COLOR_INPUT);
  syncColorInputs(STRIPES_TEXT_COLOR_PICKER, STRIPES_TEXT_COLOR_INPUT);
});
