import { XMLParser,XMLValidator } from "fast-xml-parser";

const parser = new XMLParser();

const xmlData = `<expr>

<sum>

<elem>4</elem>

<elem>6</elem>

<elem>7</elem>

<elem>3</elem>

</sum>

</expr>`;

const result = XMLValidator.validate(xmlData);
if (result === true) {
  console.log(`XML file is valid`, result);
}

if (result.err) {
  console.log(`XML is invalid becuause of - ${result.err.msg}`, result);
}

const jsonObj = parser.parse(xmlData)

const jsonString = JSON.stringify(jsonObj,null,2);

console.log(jsonString);
// console.log(jsonObj.catalog);



