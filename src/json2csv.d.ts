declare module 'json2csv' {
    function parse(data: object | object[], options?: object): string;

    export = parse;
}