const collors = ['red', 'yellow', 'white', 'black', 'green', 'blue', 'brown'];

export const imageEditOptions = {
    modules: ['Resize', 'DisplaySize'],
};

export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: collors }, { background: collors }], // dropdown with defaults from theme

    [{ align: ['right', 'center'] }],

    ['clean'], // remove formatting button
    ['formula'],
    ['image'],
];
