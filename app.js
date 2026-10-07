/* =========================================================
   CITATION BUILDER
   Version 0.7 — Core Sources

   Architecture:
   SOURCE TYPE SCHEMA
        ↓
   Dynamic Form
        ↓
   Raw Source Data
        ↓
   Citation Context
        ↓
   Style Formatter
        ↓
   Citation Output

   Current source types:
   - Book
   - Website / Web Page

   Current styles:
   - MLA 9
   - Chicago 18 Notes & Bibliography
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const citationStyleSelect =
    document.getElementById("citationStyle");

const sourceTypeSelect =
    document.getElementById("sourceType");

const citationForm =
    document.getElementById("citationForm");

const sourceFields =
    document.getElementById("sourceFields");

const sourceInstructionBox =
    document.getElementById("sourceInstructionBox");


const sourceInformationSection =
    document.getElementById("sourceInformationSection");

const citationOutputSection =
    document.getElementById("citationOutputSection");


const pageNumberInput =
    document.getElementById("pageNumber");


const styleExplanation =
    document.getElementById("styleExplanation");

const mainOutputLabel =
    document.getElementById("mainOutputLabel");

const mainOutputHelp =
    document.getElementById("mainOutputHelp");

const pageNumberHelp =
    document.getElementById("pageNumberHelp");


const citationPreview =
    document.getElementById("citationPreview");

const inTextPreview =
    document.getElementById("inTextPreview");

const firstFootnotePreview =
    document.getElementById("firstFootnotePreview");

const shortFootnotePreview =
    document.getElementById("shortFootnotePreview");


const mlaOutputs =
    document.getElementById("mlaOutputs");

const chicagoOutputs =
    document.getElementById("chicagoOutputs");


const validationMessage =
    document.getElementById("validationMessage");


const addCitationButton =
    document.getElementById("addCitationButton");

const cancelEditButton =
    document.getElementById("cancelEditButton");

const copyMainCitationButton =
    document.getElementById("copyMainCitationButton");

const copyInTextButton =
    document.getElementById("copyInTextButton");

const copyFirstFootnoteButton =
    document.getElementById("copyFirstFootnoteButton");

const copyShortFootnoteButton =
    document.getElementById("copyShortFootnoteButton");

const copyCollectionButton =
    document.getElementById("copyCollectionButton");

const clearBibliographyButton =
    document.getElementById("clearBibliographyButton");


const collectionHeading =
    document.getElementById("collectionHeading");

const paperHeading =
    document.getElementById("paperHeading");

const worksCitedList =
    document.getElementById("worksCitedList");


const editingNotice =
    document.getElementById("editingNotice");

const editingNoticeText =
    document.getElementById("editingNoticeText");

const citingNotice =
    document.getElementById("citingNotice");

const citingNoticeText =
    document.getElementById("citingNoticeText");

const stopCitingButton =
    document.getElementById("stopCitingButton");


/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY =
    "citationBuilderSourcesV2";


let savedSources =
    loadSources();


let editingSourceId =
    null;


let citedSource =
    null;


/* =========================================================
   STYLE CONFIGURATION
========================================================= */

const STYLE_CONFIG = {

    mla9: {

        name:
            "MLA 9",

        collectionName:
            "Works Cited",

        mainLabel:
            "MLA 9 — Works Cited Entry",

        mainHelp:
            "This is the full citation that appears on your Works Cited page.",

        explanationTitle:
            "MLA 9",

        explanation:
            "MLA uses a Works Cited page for full source information and parenthetical in-text citations inside the paper."

    },


    chicago18: {

        name:
            "Chicago 18 — Notes & Bibliography",

        collectionName:
            "Bibliography",

        mainLabel:
            "Chicago 18 — Bibliography Entry",

        mainHelp:
            "This is the full citation that appears in your bibliography.",

        explanationTitle:
            "Chicago Notes & Bibliography",

        explanation:
            "Chicago Notes & Bibliography uses numbered footnotes in the paper and a bibliography for full source information."

    }

};


/* =========================================================
   SOURCE TYPE SCHEMAS
========================================================= */

/*
    THIS is now where source forms are defined.

    A source type describes:

    - its name
    - where students should look for information
    - its field groups
    - individual fields
    - which fields are required

    Future source types such as Website and Journal Article
    will be added here.
*/

const SOURCE_TYPES = {

    book: {

        label:
            "Book",

        instructionTitle:
            "Using a book?",

        instruction:
            "You can usually find most citation information on the title page and copyright page near the beginning of the book.",


        groups: [

            /* ---------------------------------------------
               AUTHOR
            --------------------------------------------- */

            {

                legend:
                    "Author",

                explanation:
                    "Who wrote the book?",

                help:
                    "If the book does not identify an author, leave these fields blank. The citation can begin with the title.",


                fields: [

                    {
                        key:
                            "author.first",

                        label:
                            "First Name",

                        type:
                            "text",

                        placeholder:
                            "George",

                        required:
                            false
                    },


                    {
                        key:
                            "author.last",

                        label:
                            "Last Name",

                        type:
                            "text",

                        placeholder:
                            "Orwell",

                        required:
                            false
                    }

                ]

            },


            /* ---------------------------------------------
               TITLE
            --------------------------------------------- */

            {

                legend:
                    "Book Title",

                explanation:
                    "What is the complete title of the book?",


                fields: [

                    {
                        key:
                            "title",

                        label:
                            "Title",

                        type:
                            "text",

                        placeholder:
                            "1984",

                        required:
                            true
                    },


                    {
                        key:
                            "subtitle",

                        label:
                            "Subtitle",

                        type:
                            "text",

                        placeholder:
                            "Leave blank if there is no subtitle",

                        required:
                            false
                    }

                ]

            },


            /* ---------------------------------------------
               PUBLICATION
            --------------------------------------------- */

            {

                legend:
                    "Publication",

                explanation:
                    "Who published the book, and when was this edition published?",

                help:
                    "Use the publication year for the edition you are actually using, not necessarily the year the book was first published.",


                fields: [

                    {
                        key:
                            "publisher",

                        label:
                            "Publisher",

                        type:
                            "text",

                        placeholder:
                            "Penguin Books",

                        required:
                            true
                    },


                    {
                        key:
                            "year",

                        label:
                            "Publication Year",

                        type:
                            "number",

                        placeholder:
                            "2021",

                        min:
                            "1000",

                        max:
                            "2100",

                        required:
                            true
                    }

                ]

            },


            /* ---------------------------------------------
               OTHER INFORMATION
            --------------------------------------------- */

            {

                legend:
                    "Other Information",

                explanation:
                    "Some books include additional information that belongs in the citation.",


                fields: [

                    {
                        key:
                            "edition",

                        label:
                            "Edition",

                        type:
                            "text",

                        placeholder:
                            "2nd",

                        required:
                            false
                    },


                    {
                        key:
                            "translator",

                        label:
                            "Translator",

                        type:
                            "text",

                        placeholder:
                            "Gregory Rabassa",

                        required:
                            false
                    }

                ]

            }

        ]

    }

};


/* =========================================================
   BASIC HELPERS
========================================================= */


// Website data uses the same raw-source storage and dynamic form as books.
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MLA_MONTH_NAMES = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
function monthIndex(value) {
    const text = clean(value).toLowerCase().replace(/\./g, '');
    if (/^\d+$/.test(text)) return Number(text) - 1;
    return MONTH_NAMES.findIndex(month => month.toLowerCase() === text || month.slice(0,3).toLowerCase() === text || (month === 'September' && text === 'sept'));
}
function formatWebsiteDate(date, mla = false) {
    if (!date) return '';
    const index = monthIndex(date.month);
    const month = index >= 0 && index < 12 ? (mla ? MLA_MONTH_NAMES : MONTH_NAMES)[index] : clean(date.month);
    const day = clean(date.day), year = clean(date.year);
    if (mla) return [day, month, year].filter(Boolean).join(' ');
    return month && day ? month + ' ' + day + (year ? ', ' + year : '') : [month, year].filter(Boolean).join(' ');
}
function websiteField(key, label, required = false, type = 'text') { return {key, label, required, type}; }
function websiteDateGroup(key, legend, help) {
    return {legend, help, fields: [
        {...websiteField(key + '.day', 'Day', false, 'number'), min:1, max:31},
        {...websiteField(key + '.month', 'Month'), placeholder:'March'},
        {...websiteField(key + '.year', 'Year', false, 'number'), min:1000, max:9999}
    ]};
}
SOURCE_TYPES.website = {
    label:'Website / Web Page', instructionTitle:'Using a website?',
    instruction:'Cite the specific page or article you used. Look near the title for its author and date, and check the site for its name and publisher or sponsor.',
    groups:[
        {legend:'Author', help:'Enter the individual who wrote this page. If no person is named, leave these fields blank. The publisher or sponsor is not automatically the author.', fields:[websiteField('author.first','First Name'),websiteField('author.last','Last Name')]},
        {legend:'Page or Article', fields:[websiteField('title','Page / Article Title',true)]},
        {legend:'Website', fields:[websiteField('websiteName','Website Name',true),websiteField('publisher','Publisher / Sponsor')]},
        websiteDateGroup('publicationDate','Publication Date','Use the date for this page, not the site-wide copyright year. Leave blank if unavailable. Enter a full month name or month number.'),
        {legend:'Location',fields:[websiteField('url','URL',true,'url')]},
        websiteDateGroup('accessDate','Access Date','Optional in MLA. Chicago requires an access date when no publication or revision date is given.')
    ]
};


function websiteResult(plain, html = escapeHTML(plain)) { return {plain, html}; }

function formatMLAWebsite(source) {
    if (!clean(source.title)) return websiteResult('');
    const author = websiteAuthor(source,true);
    let plain = (author ? ensurePeriod(author) + ' ' : '') + '“' + ensurePeriod(clean(source.title)) + '”';
    let html = escapeHTML(plain);
    const parts = [], htmlParts = [];
    if (clean(source.websiteName)) { parts.push(clean(source.websiteName)); htmlParts.push('<em>' + escapeHTML(clean(source.websiteName)) + '</em>'); }
    if (clean(source.publisher) && normalizeForComparison(source.publisher) !== normalizeForComparison(source.websiteName)) { parts.push(clean(source.publisher)); htmlParts.push(escapeHTML(clean(source.publisher))); }
    const date = formatWebsiteDate(source.publicationDate,true);
    if (date) { parts.push(date); htmlParts.push(escapeHTML(date)); }
    const url = clean(source.url).replace(/^https?:\/\//i,'');
    if (url) { parts.push(url); htmlParts.push(escapeHTML(url)); }
    if (parts.length) { plain += ' ' + ensurePeriod(parts.join(', ')); html += ' ' + ensureHTMLPeriod(htmlParts.join(', ')); }
    const access = formatWebsiteDate(source.accessDate,true);
    if (access) { plain += ' Accessed ' + ensurePeriod(access); html += ' Accessed ' + escapeHTML(ensurePeriod(access)); }
    return {plain,html};
}
function formatChicagoWebsite(source, mode) {
    if (!clean(source.title)) return websiteResult('');
    const author = websiteAuthor(source, mode === 'bibliography');
    const owner = clean(source.publisher) || clean(source.websiteName);
    const website = clean(source.websiteName);
    const date = formatWebsiteDate(source.publicationDate);
    const access = formatWebsiteDate(source.accessDate);
    if (mode === 'short') {
        const lead = clean(source.author?.last) || clean(source.author?.first);
        return websiteResult((lead ? lead + ', ' : '') + '“' + ensurePeriod(getShortTitle(source)) + '”');
    }
    if (mode === 'bibliography') {
        const parts = [];
        if (author || owner) parts.push(ensurePeriod(author || owner));
        parts.push('“' + ensurePeriod(clean(source.title)) + '”');
        if (website && normalizeForComparison(website) !== normalizeForComparison(author || owner)) parts.push(ensurePeriod(website));
        if (author && clean(source.publisher) && normalizeForComparison(source.publisher) !== normalizeForComparison(website)) parts.push(ensurePeriod(clean(source.publisher)));
        if (date) parts.push(ensurePeriod(date));
        else if (access) parts.push('Accessed ' + ensurePeriod(access));
        if (clean(source.url)) parts.push(ensurePeriod(clean(source.url)));
        return websiteResult(parts.join(' '));
    }
    const parts = [];
    if (author) parts.push(author);
    parts.push('“' + clean(source.title).replace(/[.,]$/, '') + ',”');
    // A generic, unsigned webpage starts with the page title in a note.
    const tail = [];
    if (website && normalizeForComparison(website) !== normalizeForComparison(owner)) tail.push(website);
    if (owner) tail.push(owner);
    if (date) tail.push(date); else if (access) tail.push('accessed ' + access);
    if (clean(source.url)) tail.push(clean(source.url));
    return websiteResult(ensurePeriod((author ? author + ', ' : '') + parts[parts.length - 1] + (tail.length ? ' ' + tail.join(', ') : '')));
}
function formatChicagoWebsiteBibliography(source) { return formatChicagoWebsite(source,'bibliography'); }

function clean(value) {

    return String(value || "")
        .trim();

}


function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        String(value || "");


    return div.innerHTML;

}


function ensurePeriod(value) {

    const cleaned =
        clean(value);


    if (!cleaned) {
        return "";
    }


    if (/[.!?]$/.test(cleaned)) {
        return cleaned;
    }


    return cleaned + ".";

}


function ensureHTMLPeriod(html) {

    const cleaned =
        clean(html);


    if (!cleaned) {
        return "";
    }


    if (/[.!?]$/.test(cleaned)) {
        return cleaned;
    }


    return cleaned + ".";

}


function getFullTitle(source) {

    if (!source.subtitle) {

        return source.title;

    }


    return `${source.title}: ${source.subtitle}`;

}


function normalizeEdition(value) {

    const edition =
        clean(value);


    if (!edition) {
        return "";
    }


    if (
        /\b(ed|edition)\b/i.test(edition)
    ) {

        return edition;

    }


    return `${edition} ed.`;

}


function createSourceId() {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now().toString() +
        Math.random()
            .toString(16)
            .slice(2)
    );

}


function scrollToElement(element) {

    element.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}


/* =========================================================
   OBJECT PATH HELPERS
========================================================= */

/*
    Dynamic forms use keys such as:

        title
        publisher
        author.first
        author.last

    These helpers allow the form engine to read/write nested
    properties without knowing anything about Books.
*/

function getNestedValue(
    object,
    path
) {

    return path
        .split(".")
        .reduce(
            (current, key) =>
                current?.[key],
            object
        );

}


function setNestedValue(
    object,
    path,
    value
) {

    const keys =
        path.split(".");


    let current =
        object;


    keys.forEach(
        (key, index) => {

            const isLast =
                index ===
                keys.length - 1;


            if (isLast) {

                current[key] =
                    value;

                return;

            }


            if (
                !current[key] ||
                typeof current[key] !== "object"
            ) {

                current[key] = {};

            }


            current =
                current[key];

        }
    );

}


/* =========================================================
   STORAGE
========================================================= */

function loadSources() {

    try {

        const stored =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!stored) {
            return [];
        }


        const parsed =
            JSON.parse(stored);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Could not load saved sources:",
            error
        );


        return [];

    }

}


function saveSources() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedSources)
    );

}


/* =========================================================
   BUILD SOURCE TYPE SELECT
========================================================= */

function buildSourceTypeOptions() {

    sourceTypeSelect.innerHTML =
        "";


    Object.entries(
        SOURCE_TYPES
    ).forEach(
        ([key, config]) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                key;


            option.textContent =
                config.label;


            sourceTypeSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   DYNAMIC FORM RENDERER
========================================================= */

function legacyRenderSourceForm(
    sourceData = null
) {

    const sourceType =
        sourceTypeSelect.value;


    const config =
        SOURCE_TYPES[sourceType];


    if (!config) {
        return;
    }


    sourceFields.innerHTML =
        "";


    /* INSTRUCTION BOX */

    sourceInstructionBox.innerHTML =
        `<strong>${escapeHTML(
            config.instructionTitle
        )}</strong>
        ${escapeHTML(
            config.instruction
        )}`;


    /* FIELD GROUPS */

    config.groups.forEach(
        group => {

            const fieldset =
                document.createElement(
                    "fieldset"
                );


            /* LEGEND */

            const legend =
                document.createElement(
                    "legend"
                );


            legend.textContent =
                group.legend;


            fieldset.appendChild(
                legend
            );


            /* EXPLANATION */

            if (group.explanation) {

                const explanation =
                    document.createElement(
                        "p"
                    );


                explanation.className =
                    "field-explanation";


                explanation.textContent =
                    group.explanation;


                fieldset.appendChild(
                    explanation
                );

            }


            /* FIELD GRID */

            const fieldContainer =
                document.createElement(
                    "div"
                );


            fieldContainer.className =
                group.fields.length > 1
                    ? "two-column"
                    : "";


            group.fields.forEach(
                field => {

                    const formGroup =
                        createFormField(
                            field,
                            sourceData
                        );


                    fieldContainer.appendChild(
                        formGroup
                    );

                }
            );


            fieldset.appendChild(
                fieldContainer
            );


            /* HELP */

            if (group.help) {

                const help =
                    document.createElement(
                        "p"
                    );


                help.className =
                    "help-text";


                help.textContent =
                    group.help;


                fieldset.appendChild(
                    help
                );

            }


            sourceFields.appendChild(
                fieldset
            );

        }
    );


    /*
        Fields have just been recreated, so attach their
        live-preview events.
    */

    const accessYear = document.getElementById(createFieldId('accessDate.year'));
    if (accessYear) {
        const button = document.createElement('button');
        button.type = 'button'; button.id = 'useTodayButton'; button.className = 'small-button use-today-button'; button.textContent = 'Use Today';
        button.addEventListener('click', () => {
            const today = new Date();
            [['day',today.getDate()],['month',MONTH_NAMES[today.getMonth()]],['year',today.getFullYear()]].forEach(([part,value]) => {
                document.getElementById(createFieldId('accessDate.' + part)).value = value;
            });
            citedSource = null; citingNotice.hidden = true; updatePreview();
        });
        accessYear.closest('fieldset').appendChild(button);
    }
    attachDynamicFieldEvents();

}


/* =========================================================
   CREATE FIELD
========================================================= */

function createFormField(
    field,
    sourceData
) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "form-group";


    /* LABEL */

    const label =
        document.createElement(
            "label"
        );


    const fieldId =
        createFieldId(
            field.key
        );


    label.htmlFor =
        fieldId;


    label.append(
        document.createTextNode(
            field.label + " "
        )
    );


    /* REQUIRED / OPTIONAL BADGE */

    const badge =
        document.createElement(
            "span"
        );


    if (field.required) {

        badge.className =
            "required-label";


        badge.textContent =
            "Required";

    } else {

        badge.className =
            "optional-label";


        badge.textContent =
            "If available";

    }


    label.appendChild(
        badge
    );


    /* INPUT */

    const input =
        document.createElement(
            "input"
        );


    input.type =
        field.type || "text";


    input.id =
        fieldId;


    input.dataset.sourceKey =
        field.key;


    input.placeholder =
        field.placeholder || "";


    input.required =
        Boolean(field.required);


    if (field.min !== undefined) {

        input.min =
            field.min;

    }


    if (field.max !== undefined) {

        input.max =
            field.max;

    }


    if (sourceData) {

        input.value =
            getNestedValue(
                sourceData,
                field.key
            ) || "";

    }


    wrapper.appendChild(
        label
    );


    wrapper.appendChild(
        input
    );


    return wrapper;

}


/* =========================================================
   FIELD ID
========================================================= */

function createFieldId(key) {

    return (
        "sourceField_" +
        key.replaceAll(".", "_")
    );

}


/* =========================================================
   DYNAMIC FIELD EVENTS
========================================================= */

function attachDynamicFieldEvents() {

    const inputs =
        sourceFields.querySelectorAll(
            "[data-source-key]"
        );


    inputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    /*
                        If a student starts entering/editing
                        source information, Cite mode ends.
                    */

                    if (citedSource) {

                        citedSource =
                            null;


                        citingNotice.hidden =
                            true;


                        citingNoticeText.textContent =
                            "";

                    }


                    updatePreview();

                }
            );

        }
    );

}


/* =========================================================
   READ DYNAMIC FORM
========================================================= */

function legacyGetCurrentSource() {

    const source = {

        id:
            editingSourceId,

        type:
            sourceTypeSelect.value

    };


    const inputs =
        sourceFields.querySelectorAll(
            "[data-source-key]"
        );


    inputs.forEach(
        input => {

            setNestedValue(
                source,
                input.dataset.sourceKey,
                clean(input.value)
            );

        }
    );


    return source;

}


/* =========================================================
   VALIDATION
========================================================= */

function validateSource(source) {

    const config =
        SOURCE_TYPES[source.type];


    if (!config) {

        return [
            "valid source type"
        ];

    }


    const missing = [];


    config.groups.forEach(
        group => {

            group.fields.forEach(
                field => {

                    if (!field.required) {
                        return;
                    }


                    const value =
                        getNestedValue(
                            source,
                            field.key
                        );


                    if (!clean(value)) {

                        missing.push(
                            field.label.toLowerCase()
                        );

                    }

                }
            );

        }
    );


    if (['website','journal','video'].includes(source.type)) {
        for (const key of ['publicationDate', 'accessDate']) {
            const date = source[key] || {};
            const day = clean(date.day), month = clean(date.month), year = clean(date.year);
            const label = key === 'publicationDate' ? 'publication date' : 'access date';
            const index = monthIndex(month);
            const validYear = /^\d{4}$/.test(year) && Number(year) >= 1000;
            if ((day || month || year) && (!validYear || (month && (index < 0 || index > 11)) || (day && (!month || !/^\d{1,2}$/.test(day) || Number(day) < 1 || Number(day) > new Date(Number(year), index + 1, 0).getDate())))) {
                missing.push('valid ' + label + ' (year, month and year, or full date)');
            }
        }
        if (clean(source.url)) {
            try { const url = new URL(source.url); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); }
            catch { missing.push('valid URL beginning with https:// or http://'); }
        }
        if (source.type === 'website' && citationStyleSelect.value === 'chicago18' && !formatWebsiteDate(source.publicationDate) && !formatWebsiteDate(source.accessDate)) missing.push('access date for an undated Chicago webpage');
    }
    if (source.type === "journal" && !formatWebsiteDate(source.publicationDate)) missing.push("publication year");
    if (source.doi && !/^10\.\d{4,9}\/\S+$/i.test(clean(source.doi).replace(/^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)/i,""))) missing.push("valid DOI (10.xxxx/...) ");
    return missing;

}


/* =========================================================
   CITATION CONTEXT
========================================================= */

function normalizeForComparison(value) {

    return clean(value)
        .toLowerCase()
        .replace(
            /[^\p{L}\p{N}]+/gu,
            " "
        )
        .trim();

}





function getCitationContext(
    source,
    allSources
) {

    const authorKey =
        getAuthorKey(source);


    let sameAuthorSources = [];


    if (authorKey) {

        sameAuthorSources =
            allSources.filter(
                otherSource =>
                    getAuthorKey(
                        otherSource
                    ) === authorKey
            );

    }


    const titleKey =
        normalizeForComparison(
            getFullTitle(source)
        );


    const sameAuthorSameTitleSources =
        sameAuthorSources.filter(
            otherSource =>
                normalizeForComparison(
                    getFullTitle(
                        otherSource
                    )
                ) === titleKey
        );


    return {

        sameAuthorSources,

        sameAuthorSameTitleSources,

        authorHasMultipleWorks:
            sameAuthorSources.length > 1,

        authorHasDuplicateTitle:
            sameAuthorSameTitleSources.length > 1,

        authorMissing:
            !authorKey

    };

}


/* =========================================================
   SHORT TITLES
========================================================= */

function removeInitialArticle(title) {

    return clean(title)
        .replace(
            /^(a|an|the)\s+/i,
            ""
        );

}


function getShortTitle(source) {

    const title =
        removeInitialArticle(
            source.title
        );


    return (
        title ||
        source.title ||
        ""
    );

}


/* =========================================================
   MLA — BOOK
========================================================= */

function legacyFormatMLABook(source) {

    const htmlParts = [];
    const plainParts = [];


    /* AUTHOR */

    if (
        source.author?.last ||
        source.author?.first
    ) {

        let author = "";


        if (
            source.author.last &&
            source.author.first
        ) {

            author =
                `${source.author.last}, ${source.author.first}`;

        } else {

            author =
                source.author.last ||
                source.author.first;

        }


        author =
            ensurePeriod(author);


        htmlParts.push(
            escapeHTML(author)
        );


        plainParts.push(
            author
        );

    }


    /* TITLE */

    if (source.title) {

        const title =
            ensurePeriod(
                getFullTitle(source)
            );


        htmlParts.push(
            `<em>${escapeHTML(title)}</em>`
        );


        plainParts.push(
            title
        );

    }


    /* TRANSLATOR */

    if (source.translator) {

        const translator =
            `Translated by ${source.translator},`;


        htmlParts.push(
            escapeHTML(translator)
        );


        plainParts.push(
            translator
        );

    }


    /* EDITION */

    if (source.edition) {

        const edition =
            `${normalizeEdition(
                source.edition
            )},`;


        htmlParts.push(
            escapeHTML(edition)
        );


        plainParts.push(
            edition
        );

    }


    /* PUBLICATION */

    let publication = "";


    if (source.publisher) {

        publication +=
            source.publisher;

    }


    if (
        source.publisher &&
        source.year
    ) {

        publication +=
            ", ";

    }


    if (source.year) {

        publication +=
            source.year;

    }


    if (publication) {

        publication =
            ensurePeriod(
                publication
            );


        htmlParts.push(
            escapeHTML(publication)
        );


        plainParts.push(
            publication
        );

    }


    return {

        html:
            htmlParts.join(" "),

        plain:
            plainParts.join(" ")

    };

}


/* =========================================================
   MLA — IN-TEXT
========================================================= */




/* =========================================================
   CHICAGO — BOOK BIBLIOGRAPHY
========================================================= */

function legacyFormatChicagoBookBibliography(
    source
) {

    const htmlParts = [];
    const plainParts = [];


    /* AUTHOR */

    if (
        source.author?.last ||
        source.author?.first
    ) {

        let author = "";


        if (
            source.author.last &&
            source.author.first
        ) {

            author =
                `${source.author.last}, ${source.author.first}`;

        } else {

            author =
                source.author.last ||
                source.author.first;

        }


        author =
            ensurePeriod(author);


        htmlParts.push(
            escapeHTML(author)
        );


        plainParts.push(
            author
        );

    }


    /* TITLE */

    if (source.title) {

        const title =
            ensurePeriod(
                getFullTitle(source)
            );


        htmlParts.push(
            `<em>${escapeHTML(title)}</em>`
        );


        plainParts.push(
            title
        );

    }


    /* TRANSLATOR */

    if (source.translator) {

        const translator =
            `Translated by ${source.translator}.`;


        htmlParts.push(
            escapeHTML(translator)
        );


        plainParts.push(
            translator
        );

    }


    /* EDITION */

    if (source.edition) {

        const edition =
            ensurePeriod(
                normalizeEdition(
                    source.edition
                )
            );


        htmlParts.push(
            escapeHTML(edition)
        );


        plainParts.push(
            edition
        );

    }


    /* PUBLICATION */

    let publication = "";


    if (source.publisher) {

        publication +=
            source.publisher;

    }


    if (
        source.publisher &&
        source.year
    ) {

        publication +=
            ", ";

    }


    if (source.year) {

        publication +=
            source.year;

    }


    if (publication) {

        publication =
            ensurePeriod(
                publication
            );


        htmlParts.push(
            escapeHTML(publication)
        );


        plainParts.push(
            publication
        );

    }


    return {

        html:
            htmlParts.join(" "),

        plain:
            plainParts.join(" ")

    };

}


/* =========================================================
   CHICAGO — FIRST FOOTNOTE
========================================================= */

function legacyFormatChicagoFirstFootnote(
    source,
    page
) {
    if (source.type === 'website') return formatChicagoWebsite(source,'full');

    const htmlParts = [];
    const plainParts = [];


    let author = "";


    if (
        source.author?.first &&
        source.author?.last
    ) {

        author =
            `${source.author.first} ${source.author.last}`;

    } else {

        author =
            source.author?.first ||
            source.author?.last ||
            "";

    }


    if (author) {

        htmlParts.push(
            escapeHTML(author)
        );


        plainParts.push(
            author
        );

    }


    if (source.title) {

        const title =
            getFullTitle(source);


        htmlParts.push(
            `<em>${escapeHTML(title)}</em>`
        );


        plainParts.push(
            title
        );

    }


    let publicationInfo = "";


    if (source.publisher) {

        publicationInfo +=
            source.publisher;

    }


    if (
        source.publisher &&
        source.year
    ) {

        publicationInfo +=
            ", ";

    }


    if (source.year) {

        publicationInfo +=
            source.year;

    }


    let html =
        htmlParts.join(", ");


    let plain =
        plainParts.join(", ");


    if (publicationInfo) {

        html +=
            ` (${escapeHTML(
                publicationInfo
            )})`;


        plain +=
            ` (${publicationInfo})`;

    }


    if (page) {

        html +=
            `, ${escapeHTML(page)}`;


        plain +=
            `, ${page}`;

    }


    return {

        html:
            ensureHTMLPeriod(html),

        plain:
            ensurePeriod(plain)

    };

}


/* =========================================================
   CHICAGO — SHORT FOOTNOTE
========================================================= */




/* =========================================================
   FORMATTER ROUTER
========================================================= */

const FORMATTERS = {

    mla9: {

        book:
            formatMLABook,
        website: formatMLAWebsite

    },


    chicago18: {

        book:
            formatChicagoBookBibliography,
        website: formatChicagoWebsiteBibliography

    }

};


function formatMainCitation(
    source,
    style
) {

    if (!source) {

        return {
            html: "",
            plain: ""
        };

    }


    const formatter =
        FORMATTERS[style]?.[
            source.type
        ];


    if (!formatter) {

        return {
            html: "",
            plain: ""
        };

    }


    return formatter(source);

}


/* =========================================================
   ACTIVE CITATION SOURCE
========================================================= */

function getActiveCitationSource() {

    if (citedSource) {

        return citedSource;

    }


    return getCurrentSource();

}


/* =========================================================
   STYLE INTERFACE
========================================================= */

function updateStyleInterface() {

    const style =
        citationStyleSelect.value;


    const config =
        STYLE_CONFIG[style];


    styleExplanation.innerHTML =
        `<strong>${escapeHTML(
            config.explanationTitle
        )}</strong>
        ${escapeHTML(
            config.explanation
        )}`;


    mainOutputLabel.textContent =
        config.mainLabel;


    mainOutputHelp.textContent =
        config.mainHelp;


    collectionHeading.textContent =
        `My ${config.collectionName}`;


    paperHeading.textContent =
        config.collectionName;


    copyCollectionButton.textContent =
        `Copy ${config.collectionName}`;


    if (!editingSourceId) {

        addCitationButton.textContent =
            `Add to My ${config.collectionName}`;

    }


    if (style === "mla9") {

        mlaOutputs.hidden =
            false;


        chicagoOutputs.hidden =
            true;


        pageNumberHelp.textContent =
            "Enter the page containing the information you used. Note: This is not included on the Works Cited.";

    } else {

        mlaOutputs.hidden =
            true;


        chicagoOutputs.hidden =
            false;


        pageNumberHelp.textContent =
            "Enter the page containing the information you used. Note: This is not included in the Bibliography.";

    }


    updatePreview();

    renderCollection();

}

/* =========================================================
   EFFECTIVE CITATION COLLECTION
========================================================= */

/*
    Citation context must include the source currently being
    created or edited, even before it has been saved.

    Example:

    Saved:
        Orwell — 1984

    Currently entering:
        Orwell — Animal Farm

    The preview must already understand that there are now
    two Orwell works and produce:

        (Orwell, Animal Farm 17)

    rather than:

        (Orwell 17)
*/

function getEffectiveCitationCollection(source) {

    /*
        Cite mode uses an existing saved source.

        It is already represented in savedSources, so adding
        it again would incorrectly create a duplicate.
    */

    if (citedSource) {

        return savedSources;

    }


    /*
        Edit mode also represents an existing saved source.

        Replace the stored version with the currently edited
        version so context reflects the student's changes
        without counting the source twice.
    */

    if (editingSourceId) {

        return savedSources.map(
            savedSource => {

                if (
                    savedSource.id ===
                    editingSourceId
                ) {

                    return source;

                }


                return savedSource;

            }
        );

    }


    /*
        A new unsaved source does not yet exist in
        savedSources.

        Add it temporarily for citation-context calculations.
        This does NOT save it to localStorage or the student's
        Works Cited / Bibliography.
    */

    return [
        ...savedSources,
        source
    ];

}

/* =========================================================
   LIVE PREVIEW
========================================================= */

function legacyUpdatePreview() {
    document.getElementById('pageNumberPanel').hidden = getActiveCitationSource().type === 'website';

    const source =
        getActiveCitationSource();


    const style =
        citationStyleSelect.value;


    const page =
        clean(
            pageNumberInput.value
        );


    const mainCitation =
        formatMainCitation(
            source,
            style
        );


    /* MAIN CITATION */

    if (!mainCitation.plain) {

        citationPreview.innerHTML =
            `<span class="placeholder-text">
                Your citation will appear here.
            </span>`;

    } else {

        citationPreview.innerHTML =
            mainCitation.html;

    }


    /* MLA */

    if (style === "mla9") {

        const citationCollection =
             getEffectiveCitationCollection(
                 source
             );
         
         
         const inText =
             formatMLAInText(
                 source,
                 page,
                 citationCollection
             );


        if (!inText.plain) {

            inTextPreview.innerHTML =
                `<span class="placeholder-text">
                    Your in-text citation will appear here.
                </span>`;

        } else {

            inTextPreview.innerHTML =
                inText.html;

        }

    }


    /* CHICAGO */

    if (style === "chicago18") {

        const firstFootnote =
            formatChicagoFirstFootnote(
                source,
                page
            );


        const shortFootnote =
            formatChicagoShortFootnote(
                source,
                page
            );


        if (!firstFootnote.plain) {

            firstFootnotePreview.innerHTML =
                `<span class="placeholder-text">
                    Your first footnote will appear here.
                </span>`;

        } else {

            firstFootnotePreview.innerHTML =
                firstFootnote.html;

        }


        if (!shortFootnote.plain) {

            shortFootnotePreview.innerHTML =
                `<span class="placeholder-text">
                    Your shortened footnote will appear here.
                </span>`;

        } else {

            shortFootnotePreview.innerHTML =
                shortFootnote.html;

        }

    }


    if (citedSource) {

        validationMessage.textContent =
            "";

        return;

    }


    const missing =
        validateSource(source);


    /*
        Don't show warnings while the form is completely
        untouched.
    */

    const hasAnyData =
        sourceFields.querySelector(
            "[data-source-key]"
        )
        &&
        Array.from(
            sourceFields.querySelectorAll(
                "[data-source-key]"
            )
        ).some(
            input =>
                clean(input.value)
        );


    if (!hasAnyData) {

        validationMessage.textContent =
            "";

        return;

    }


    if (missing.length > 0) {

        validationMessage.textContent =
            `Still needed: ${missing.join(", ")}.`;

    } else {

        validationMessage.textContent =
            "";

    }

}


/* =========================================================
   SAVE SOURCE
========================================================= */

function saveCurrentSource() {

    const source =
        getCurrentSource();


    const missing =
        validateSource(source);


    if (missing.length > 0) {

        validationMessage.textContent =
            `Before saving this source, complete: ${missing.join(", ")}.`;

        return;

    }


    /* EDIT */

    if (editingSourceId) {

        const index =
            savedSources.findIndex(
                item =>
                    item.id ===
                    editingSourceId
            );


        if (index !== -1) {

            source.id =
                editingSourceId;


            savedSources[index] =
                source;

        }


        saveSources();

        finishEditing();

        renderCollection();

        return;

    }


    /* ADD */

    source.id =
        createSourceId();


    savedSources.push(
        source
    );


    saveSources();

    renderCollection();

    resetEntryForm();

}


/* =========================================================
   EDIT SOURCE
========================================================= */

function editSource(id) {

    const source =
        savedSources.find(
            item =>
                item.id === id
        );


    if (!source) {
        return;
    }


    stopCiting();


    editingSourceId =
        id;


    sourceTypeSelect.value =
        source.type;


    renderSourceForm(
        source
    );


    editingNotice.hidden =
        false;


    editingNoticeText.textContent =
        getSourceDisplayName(
            source
        );


    cancelEditButton.hidden =
        false;


    addCitationButton.textContent =
        "Save Changes";


    validationMessage.textContent =
        "";


    updatePreview();


    scrollToElement(
        sourceInformationSection
    );

}


/* =========================================================
   FINISH / CANCEL EDIT
========================================================= */

function finishEditing() {

    editingSourceId =
        null;


    editingNotice.hidden =
        true;


    editingNoticeText.textContent =
        "";


    cancelEditButton.hidden =
        true;


    const collectionName =
        STYLE_CONFIG[
            citationStyleSelect.value
        ].collectionName;


    addCitationButton.textContent =
        `Add to My ${collectionName}`;


    renderSourceForm();

    pageNumberInput.value =
        "";


    updatePreview();

}


function cancelEditing() {

    editingSourceId =
        null;


    editingNotice.hidden =
        true;


    editingNoticeText.textContent =
        "";


    cancelEditButton.hidden =
        true;


    const collectionName =
        STYLE_CONFIG[
            citationStyleSelect.value
        ].collectionName;


    addCitationButton.textContent =
        `Add to My ${collectionName}`;


    renderSourceForm();

    pageNumberInput.value =
        "";


    updatePreview();

}


/* =========================================================
   CITE SAVED SOURCE
========================================================= */

function citeSource(id) {

    const source =
        savedSources.find(
            item =>
                item.id === id
        );


    if (!source) {
        return;
    }


    citedSource =
        JSON.parse(
            JSON.stringify(source)
        );


    citingNotice.hidden =
        false;


    citingNoticeText.textContent =
        getSourceDisplayName(
            source
        );


    pageNumberInput.value =
        "";


    validationMessage.textContent =
        "";


    updatePreview();


    scrollToElement(
        citationOutputSection
    );


    setTimeout(
        () => {

            if (source.type === 'book') pageNumberInput.focus();

        },
        500
    );

}


/* =========================================================
   STOP CITING
========================================================= */

function stopCiting() {

    citedSource =
        null;


    citingNotice.hidden =
        true;


    citingNoticeText.textContent =
        "";


    pageNumberInput.value =
        "";


    updatePreview();

}


/* =========================================================
   RESET FORM
========================================================= */

function resetEntryForm() {

    citedSource =
        null;


    citingNotice.hidden =
        true;


    citingNoticeText.textContent =
        "";


    pageNumberInput.value =
        "";


    validationMessage.textContent =
        "";


    renderSourceForm();

    updatePreview();

}


/* =========================================================
   SOURCE DISPLAY NAME
========================================================= */

function getSourceDisplayName(source) {

    let result = "";


    if (
        source.author?.first ||
        source.author?.last
    ) {

        const name = [

            source.author.first,
            source.author.last

        ]
            .filter(Boolean)
            .join(" ");


        result +=
            name;

    }


    if (source.title) {

        if (result) {

            result +=
                " — ";

        }


        result +=
            getFullTitle(source);

    }


    return (
        result ||
        "Saved source"
    );

}


/* =========================================================
   SORTING
========================================================= */




/* =========================================================
   RENDER COLLECTION
========================================================= */

function renderCollection() {

    worksCitedList.innerHTML =
        "";


    if (
        savedSources.length === 0
    ) {

        worksCitedList.innerHTML =
            `<p class="empty-message">
                You have not added any sources yet.
            </p>`;

        return;

    }


    const style =
        citationStyleSelect.value;


    const sorted =
        [...savedSources].sort(
            (a, b) =>
                getSortKey(a)
                    .localeCompare(
                        getSortKey(b),
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    )
        );


    sorted.forEach(
        source => {

            const citation =
                formatMainCitation(
                    source,
                    style
                );


            const entry =
                document.createElement(
                    "div"
                );


            entry.className =
                "works-cited-entry";


            /* CITATION */

            const citationText =
                document.createElement(
                    "div"
                );


            citationText.innerHTML =
                citation.html;


            /* ACTIONS */

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "source-actions";


            const citeButton =
                createActionButton(
                    "Cite",
                    "cite-button",
                    () =>
                        citeSource(
                            source.id
                        )
                );


            const editButton =
                createActionButton(
                    "Edit",
                    "",
                    () =>
                        editSource(
                            source.id
                        )
                );


            const removeButton =
                createActionButton(
                    "Remove",
                    "remove-button",
                    () =>
                        removeSource(
                            source.id
                        )
                );


            actions.appendChild(
                citeButton
            );


            actions.appendChild(
                editButton
            );


            actions.appendChild(
                removeButton
            );


            entry.appendChild(
                citationText
            );


            entry.appendChild(
                actions
            );


            worksCitedList.appendChild(
                entry
            );

        }
    );

}


/* =========================================================
   ACTION BUTTON
========================================================= */

function createActionButton(
    label,
    extraClass,
    handler
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        `source-action-button ${extraClass}`
            .trim();


    button.textContent =
        label;


    button.addEventListener(
        "click",
        handler
    );


    return button;

}


/* =========================================================
   REMOVE SOURCE
========================================================= */

function removeSource(id) {

    const source =
        savedSources.find(
            item =>
                item.id === id
        );


    if (!source) {
        return;
    }


    const confirmed =
        window.confirm(
            `Remove "${getSourceDisplayName(
                source
            )}"?`
        );


    if (!confirmed) {
        return;
    }


    savedSources =
        savedSources.filter(
            item =>
                item.id !== id
        );


    if (
        editingSourceId === id
    ) {

        cancelEditing();

    }


    if (
        citedSource &&
        citedSource.id === id
    ) {

        stopCiting();

    }


    saveSources();

    renderCollection();

    updatePreview();

}


/* =========================================================
   CLEAR COLLECTION
========================================================= */

function clearCollection() {

    if (
        savedSources.length === 0
    ) {

        return;

    }


    const collectionName =
        STYLE_CONFIG[
            citationStyleSelect.value
        ].collectionName;


    const confirmed =
        window.confirm(
            `Remove every source from your ${collectionName}?`
        );


    if (!confirmed) {
        return;
    }


    savedSources = [];


    editingSourceId =
        null;


    citedSource =
        null;


    editingNotice.hidden =
        true;


    citingNotice.hidden =
        true;


    cancelEditButton.hidden =
        true;


    saveSources();

    renderSourceForm();

    updateStyleInterface();

}


/* =========================================================
   COPY HELPERS
========================================================= */

async function copyRichText(
    html,
    plain
) {

    if (!plain) {
        return false;
    }


    if (
        navigator.clipboard &&
        window.ClipboardItem
    ) {

        const htmlBlob =
            new Blob(
                [html],
                {
                    type:
                        "text/html"
                }
            );


        const textBlob =
            new Blob(
                [plain],
                {
                    type:
                        "text/plain"
                }
            );


        const item =
            new ClipboardItem({

                "text/html":
                    htmlBlob,

                "text/plain":
                    textBlob

            });


        await navigator.clipboard.write(
            [item]
        );


        return true;

    }


    if (navigator.clipboard) {

        await navigator.clipboard.writeText(
            plain
        );


        return true;

    }


    return false;

}


/* =========================================================
   COPY MAIN CITATION
========================================================= */

async function copyMainCitation() {

    const source =
        getActiveCitationSource();


    const style =
        citationStyleSelect.value;


    const citation =
        formatMainCitation(
            source,
            style
        );


    if (!citation.plain) {

        validationMessage.textContent =
            "Enter source information before copying.";

        return;

    }


    await copyRichText(
        citation.html,
        citation.plain
    );


    showTemporaryButtonMessage(
        copyMainCitationButton,
        "Copied!"
    );

}


/* =========================================================
   COPY MLA IN-TEXT
========================================================= */

async function copyMLAInText() {

    const source =
        getActiveCitationSource();


    const page =
        clean(
            pageNumberInput.value
        );


      const citationCollection =
          getEffectiveCitationCollection(
              source
          );
      
      
      const citation =
          formatMLAInText(
              source,
              page,
              citationCollection
          );


    if (!citation.plain) {
        return;
    }


    await copyRichText(
        citation.html,
        citation.plain
    );


    showTemporaryButtonMessage(
        copyInTextButton,
        "Copied!"
    );

}


/* =========================================================
   COPY CHICAGO FIRST NOTE
========================================================= */

async function copyFirstFootnote() {

    const source =
        getActiveCitationSource();


    const page =
        clean(
            pageNumberInput.value
        );


    const citation =
        formatChicagoFirstFootnote(
            source,
            page
        );


    if (!citation.plain) {
        return;
    }


    await copyRichText(
        citation.html,
        citation.plain
    );


    showTemporaryButtonMessage(
        copyFirstFootnoteButton,
        "Copied!"
    );

}


/* =========================================================
   COPY CHICAGO SHORT NOTE
========================================================= */

async function copyShortFootnote() {

    const source =
        getActiveCitationSource();


    const page =
        clean(
            pageNumberInput.value
        );


    const citation =
        formatChicagoShortFootnote(
            source,
            page
        );


    if (!citation.plain) {
        return;
    }


    await copyRichText(
        citation.html,
        citation.plain
    );


    showTemporaryButtonMessage(
        copyShortFootnoteButton,
        "Copied!"
    );

}


/* =========================================================
   COPY COLLECTION
========================================================= */

async function copyCollection() {

    if (
        savedSources.length === 0
    ) {

        return;

    }


    const style =
        citationStyleSelect.value;


    const config =
        STYLE_CONFIG[style];


    const sorted =
        [...savedSources].sort(
            (a, b) =>
                getSortKey(a)
                    .localeCompare(
                        getSortKey(b),
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    )
        );


    const formatted =
        sorted.map(
            source =>
                formatMainCitation(
                    source,
                    style
                )
        );


    const htmlEntries =
        formatted
            .map(
                citation =>
                    `<div style="
                        margin-bottom: 1em;
                        padding-left: 2em;
                        text-indent: -2em;
                    ">
                        ${citation.html}
                    </div>`
            )
            .join("");


    const fullHTML =
        `<div>
            <div style="
                text-align: center;
                margin-bottom: 2em;
            ">
                ${escapeHTML(
                    config.collectionName
                )}
            </div>

            ${htmlEntries}
        </div>`;


    const plainText =
        `${config.collectionName}\n\n` +
        formatted
            .map(
                citation =>
                    citation.plain
            )
            .join("\n\n");


    await copyRichText(
        fullHTML,
        plainText
    );


    showTemporaryButtonMessage(
        copyCollectionButton,
        "Copied!"
    );

}


/* =========================================================
   BUTTON FEEDBACK
========================================================= */

function showTemporaryButtonMessage(
    button,
    message
) {

    const original =
        button.textContent;


    button.textContent =
        message;


    setTimeout(
        () => {

            button.textContent =
                original;

        },
        1500
    );

}


/* =========================================================
   EVENTS
========================================================= */

pageNumberInput.addEventListener(
    "input",
    updatePreview
);


citationStyleSelect.addEventListener(
    "change",
    updateStyleInterface
);


sourceTypeSelect.addEventListener(
    "change",
    () => {

        /*
            Changing source type starts a fresh source form.
        */

        editingSourceId =
            null;


        citedSource =
            null;


        editingNotice.hidden =
            true;


        citingNotice.hidden =
            true;


        cancelEditButton.hidden =
            true;


        pageNumberInput.value =
            "";


        const collectionName =
            STYLE_CONFIG[
                citationStyleSelect.value
            ].collectionName;


        addCitationButton.textContent =
            `Add to My ${collectionName}`;


        renderSourceForm();

        updatePreview();

    }
);


addCitationButton.addEventListener(
    "click",
    saveCurrentSource
);


cancelEditButton.addEventListener(
    "click",
    cancelEditing
);


stopCitingButton.addEventListener(
    "click",
    stopCiting
);


copyMainCitationButton.addEventListener(
    "click",
    copyMainCitation
);


copyInTextButton.addEventListener(
    "click",
    copyMLAInText
);


copyFirstFootnoteButton.addEventListener(
    "click",
    copyFirstFootnote
);


copyShortFootnoteButton.addEventListener(
    "click",
    copyShortFootnote
);


copyCollectionButton.addEventListener(
    "click",
    copyCollection
);


clearBibliographyButton.addEventListener(
    "click",
    clearCollection
);


/* =========================================================
   INITIALIZE
========================================================= */

// Core Sources v0.7. Guidance: style.mla.org and CMOS 18 Citation Quick Guide.
function authorsOf(s) {
    const list = Array.isArray(s.authors) ? s.authors : s.authors ? Object.values(s.authors) : [s.author || {}];
    return list.filter(a => clean(a.first) || clean(a.last) || clean(a.literal));
}
function personName(a, invert = false, short = false) {
    if (a.literal) return clean(a.literal);
    if (short) return clean(a.last) || clean(a.first);
    return invert && a.first && a.last ? clean(a.last) + ', ' + clean(a.first) : [clean(a.first), clean(a.last)].filter(Boolean).join(' ');
}
function authorNames(s, style = 'mla', mode = 'bibliography') {
    const a = authorsOf(s), short = mode === 'short', bib = mode === 'bibliography';
    if (!a.length) return '';
    const names = a.map((p,i) => personName(p,bib && i === 0,short));
    if ((style === 'mla' || !bib) && a.length > 2) return names[0] + (bib ? ', et al.' : ' et al.');
    if (style === 'chicago' && bib && a.length > 6) return names.slice(0,3).join(', ') + ', et al.';
    return names.length === 1 ? names[0] : names.length === 2 ? names.join(bib ? ', and ' : ' and ') : names.slice(0,-1).join(', ') + ', and ' + names.at(-1);
}
function websiteAuthor(s, inverted = false) { return authorNames(s,citationStyleSelect.value === 'chicago18' ? 'chicago' : 'mla',inverted ? 'bibliography' : 'full'); }
function getAuthorKey(s) { return normalizeForComparison(s.type === 'video' ? clean(s.creator) : authorNames(s,'mla','short')); }
function getMLATitleHTML(s,t) { return s.type === 'book' ? '<em>' + escapeHTML(t) + '</em>' : '“' + escapeHTML(t) + '”'; }
function getMLATitlePlain(s,t) { return s.type === 'book' ? t : '“' + t + '”'; }
const authorGroup = {legend:'Authors',help:'Keep the order printed on the source. Leave blank when no author is named. For an organization, enter its complete name in Last Name.',fields:[]};
SOURCE_TYPES.book.groups[0] = authorGroup;
SOURCE_TYPES.website.groups[0] = authorGroup;
SOURCE_TYPES.journal = {label:'Journal Article',instructionTitle:'Using a journal article?',instruction:'Use the article itself or its journal record. The article’s complete page range belongs in the bibliography; the page you cite belongs in the locator below.',groups:[authorGroup,
    {legend:'Article and Journal',fields:[websiteField('title','Article Title',true),websiteField('journalTitle','Journal Title',true)]},
    {legend:'Journal Details',fields:[websiteField('volume','Volume'),websiteField('issue','Issue'),websiteField('pages','Complete Page Range / Article ID')]},
    websiteDateGroup('publicationDate','Publication Date','Enter the year and, when provided, month and day. Use the journal issue date.'),
    {legend:'Online Location',help:'Prefer the DOI. Add a database only if it actually contains the article you consulted. Chicago uses the database when no DOI or URL is supplied; MLA treats it as a second container.',fields:[websiteField('doi','DOI'),websiteField('url','URL',false,'url'),websiteField('database','Database (if used)')]}
]};
SOURCE_TYPES.video = {label:'Video',instructionTitle:'Using an online video?',instruction:'Copy the video title and date from its page. Enter a primary creator only when clearly credited; a channel or organization can be the creator. Otherwise leave Creator blank and identify the uploader.',groups:[
    {legend:'Video',fields:[websiteField('title','Video Title',true),websiteField('creator','Primary Creator / Organization'),websiteField('uploader','Uploader / Channel'),websiteField('platform','Platform',true)]},
    websiteDateGroup('publicationDate','Publication / Upload Date','Use the date displayed for this video. Leave blank if unavailable.'),
    {legend:'Location',fields:[websiteField('url','URL',true,'url'),websiteField('duration','Duration (optional, e.g. 12:35)')]}
]};
function renderSourceForm(data = null, rowCount = 0) {
    const type = sourceTypeSelect.value;
    if (type !== 'video' && SOURCE_TYPES[type]) {
        const authors = authorsOf(data || {});
        const count = Math.max(1,authors.length,rowCount);
        SOURCE_TYPES[type].groups[0] = {...authorGroup,fields:Array.from({length:count},(_,i) => [websiteField('authors.'+i+'.first','Author '+(i+1)+' — First Name'),websiteField('authors.'+i+'.last','Author '+(i+1)+' — Last Name')]).flat()};
        data = {...(data || {}),authors:authors.length ? authors : [{}]};
    }
    legacyRenderSourceForm(data);
    if (type !== 'video') {
        const button = document.createElement('button');
        button.id = 'addAuthorButton'; button.type = 'button'; button.className = 'small-button'; button.textContent = 'Add Another Author';
        button.addEventListener('click',() => {
            const current = getCurrentSource();
            // Keep blank rows as well as completed author rows.
            const count = SOURCE_TYPES[type].groups[0].fields.length / 2;
            current.authors = Array.from({length:count+1},(_,i) => current.authors[i] || {});
            renderSourceForm(current,count+1); citedSource = null; citingNotice.hidden = true; updatePreview();
        });
        sourceFields.children[0].appendChild(button);
    }
}
function getCurrentSource() {
    const s = legacyGetCurrentSource();
    if (s.type !== 'video') { s.authors = authorsOf(s); s.author = s.authors[0] || {}; }
    return s;
}
function replaceAuthor(result,old,newName) {
    if (!old) return newName ? {plain:ensurePeriod(newName)+' '+result.plain,html:escapeHTML(ensurePeriod(newName))+' '+result.html} : result;
    return {plain:result.plain.replace(old,newName),html:result.html.replace(escapeHTML(old),escapeHTML(newName))};
}
function formatMLABook(s) { const a=authorsOf(s)[0]||{}; return replaceAuthor(legacyFormatMLABook({...s,author:a}),personName(a,true),authorNames(s)); }
function formatChicagoBookBibliography(s) { const a=authorsOf(s)[0]||{}; return replaceAuthor(legacyFormatChicagoBookBibliography({...s,author:a}),personName(a,true),authorNames(s,'chicago')); }
function resultHTML(html) { const plain = html.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,"'"); return {html,plain}; }
function quoted(t,punctuation='.') { const text=clean(t).replace(/[.,]$/,''); return '“'+escapeHTML(/[!?]$/.test(text) ? text : text+punctuation)+'”'; }
function doiURL(s) { const d=clean(s.doi).replace(/^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)/i,''); return d ? 'https://doi.org/'+d : clean(s.url); }
function pageRange(p) { return clean(p).replace(/(\d)\s*-\s*(\d)/g,'$1–$2'); }
function formatMLAJournal(s) {
    if (!s.title) return {html:'',plain:''};
    const a=authorNames(s), parts=['<em>'+escapeHTML(s.journalTitle)+'</em>'];
    if(s.volume) parts.push('vol. '+escapeHTML(s.volume)); if(s.issue) parts.push('no. '+escapeHTML(s.issue));
    const date=formatWebsiteDate(s.publicationDate,true); if(date) parts.push(escapeHTML(date));
    if(s.pages) parts.push((/^\d+(?:\s*[-–]\s*\d+)?$/.test(s.pages) ? (/[-–]/.test(s.pages)?'pp. ':'p. ') : '')+escapeHTML(pageRange(s.pages)));
    let html=(a?escapeHTML(ensurePeriod(a))+' ':'')+quoted(s.title)+' '+parts.join(', ')+'.';
    const location=doiURL(s);
    if(s.database) html+=' <em>'+escapeHTML(s.database)+'</em>'+(location?', '+escapeHTML(location):'')+'.';
    else if(location) html=html.slice(0,-1)+', '+escapeHTML(location)+'.';
    return resultHTML(html);
}
function formatChicagoJournal(s,mode='bibliography',page='') {
    if(!s.title) return {html:'',plain:''};
    const bib=mode==='bibliography', a=authorNames(s,'chicago',mode);
    let html=(a?escapeHTML(bib?ensurePeriod(a):a+',')+' ':'')+quoted(s.title,bib?'.':',')+' <em>'+escapeHTML(s.journalTitle)+'</em>';
    if(s.volume) html+=' '+escapeHTML(s.volume); if(s.issue) html+=', no. '+escapeHTML(s.issue);
    const date=formatWebsiteDate(s.publicationDate); if(date) html+=' ('+escapeHTML(date)+')';
    const pages=bib?s.pages:page; if(pages) html+=': '+escapeHTML(pageRange(pages));
    const loc=doiURL(s)||clean(s.database); html+=bib?'.':(loc?',':'.'); if(loc) html+=' '+escapeHTML(loc)+(bib?'.':'.');
    return resultHTML(html);
}
function formatMLAVideo(s) {
    if(!s.title) return {html:'',plain:''};
    const parts=['<em>'+escapeHTML(s.platform)+'</em>'];
    if(s.uploader && normalizeForComparison(s.uploader)!==normalizeForComparison(s.creator)) parts.push('uploaded by '+escapeHTML(s.uploader));
    const date=formatWebsiteDate(s.publicationDate,true); if(date)parts.push(escapeHTML(date)); if(s.url)parts.push(escapeHTML(s.url.replace(/^https?:\/\//i,'')));
    return resultHTML((s.creator?escapeHTML(ensurePeriod(s.creator))+' ':'')+quoted(s.title)+' '+parts.join(', ')+'.');
}
function formatChicagoVideo(s,mode='bibliography',page='') {
    if(!s.title) return {html:'',plain:''};
    const bib=mode==='bibliography',lead=clean(s.creator),date=formatWebsiteDate(s.publicationDate);
    const parts=[]; if(s.uploader && s.uploader!==lead) parts.push((date?'posted '+date+', ':'posted ')+'by '+s.uploader); else if(date)parts.push(date);
    if(s.platform)parts.push(s.platform); parts.push('video'+(s.duration?', '+s.duration:'')); if(page&&!bib)parts.push('at '+pageRange(page)); if(s.url)parts.push(s.url);
    return resultHTML((lead?escapeHTML(bib?ensurePeriod(lead):lead+',')+' ':'')+quoted(s.title,bib?'.':',')+' '+escapeHTML(parts.join(bib?'. ':', '))+'.');
}
function formatChicagoFirstFootnote(s,p) {
    if(s.type==='journal')return formatChicagoJournal(s,'full',p);
    if(s.type==='video')return formatChicagoVideo(s,'full',p);
    if(s.type==='website')return formatChicagoWebsite(s,'full');
    const a=authorsOf(s)[0]||{};
    let r=replaceAuthor(legacyFormatChicagoFirstFootnote({...s,author:a},p),personName(a),authorNames(s,'chicago','full'));
    const details=[s.translator?'trans. '+s.translator:'',s.edition?normalizeEdition(s.edition):''].filter(Boolean).join(', ');
    if(details) {const title=getFullTitle(s);r={plain:r.plain.replace(title,title+', '+details),html:r.html.replace('</em>','</em>, '+escapeHTML(details))};} return r;
}
function formatChicagoShortFootnote(s,p) {
    const lead=s.type==='video'?clean(s.creator):authorNames(s,'chicago','short');
    if(!s.title)return {html:'',plain:''};
    const locator=p&&s.type!=='website';
    const title=s.type==='book'?'<em>'+escapeHTML(getShortTitle(s))+'</em>':quoted(getShortTitle(s),locator?'':'.');
    return resultHTML((lead?escapeHTML(lead)+', ':'')+title+(locator?', '+(s.type==='video'?'at ':'')+escapeHTML(pageRange(p)):'' )+(s.type==='book'||locator?'.':''));
}
function formatMLAInText(s,p,all=[]) {
    if(!s.title)return {html:'',plain:''};
    if(s.type==='website')p='';
    const lead=s.type==='video'?clean(s.creator):authorNames(s,'mla','short');
    const context=getCitationContext(s,all);
    let html=lead?escapeHTML(lead):getMLATitleHTML(s,getShortTitle(s));
    if(lead&&context.authorHasMultipleWorks)html+=', '+getMLATitleHTML(s,getShortTitle(s));
    if(context.authorHasDuplicateTitle) {const d=s.year||formatWebsiteDate(s.publicationDate,true)||s.publisher||s.platform; if(d)html+=', '+escapeHTML(d);}
    if(p)html+=' '+escapeHTML(pageRange(p)); return resultHTML('('+html+')');
}
function getSortKey(s) {
    let lead=s.type==='video'?clean(s.creator):personName(authorsOf(s)[0]||{},true);
    if(s.type==='website'&&citationStyleSelect.value==='chicago18')lead=lead||s.publisher||s.websiteName;
    return normalizeForComparison(lead||removeInitialArticle(s.title))+' '+normalizeForComparison(removeInitialArticle(s.title));
}
function updatePreview() {
    legacyUpdatePreview();
    const type=getActiveCitationSource().type;
    pageNumberInput.placeholder=type==='video'?'e.g. 2:15–2:40':'e.g. 42';
    document.querySelector('label[for="pageNumber"]').textContent=type==='video'?'Timestamp / Time Range':'Page Number / Page Range';
    pageNumberHelp.textContent='Enter the page containing the information you used. This locator is not included in the bibliography.';
    if(type==='video')pageNumberHelp.textContent='Enter the time of the passage you used, such as 2:15 or 2:15–2:40. Leave blank when citing the whole video.';
}
FORMATTERS.mla9.journal=formatMLAJournal;
FORMATTERS.mla9.video=formatMLAVideo;
FORMATTERS.chicago18.journal=s=>formatChicagoJournal(s);
FORMATTERS.chicago18.video=s=>formatChicagoVideo(s);

buildSourceTypeOptions();

renderSourceForm();

updateStyleInterface();
