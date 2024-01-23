import React from "react";
// import auth from "./auth";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import * as CSV from "csv-string"
import { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Sources:
// [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
// [2] https://stackoverflow.com/questions/5296268/fastest-way-to-check-a-string-contain-another-substring-in-javascript
// [3]https://www.tutorialspoint.com/How-to-format-a-float-in-JavaScript

// [4] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// [5] https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs

// - could not figure out how to so global variables to the rescue

import "./FormStyle.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

function isASubstrCaseSensitive(str: string, subStr: string) {
  return str.indexOf(subStr) !== -1;
}

function isASubstr(str: string, subStr: string) {
  return isASubstrCaseSensitive(str.toLowerCase(), subStr.toLowerCase());
}

function onlyBlanks(theLine: string) {
  let i = 0;
  let isABlank = true;

  while (i < theLine.length && isABlank) {
    isABlank = theLine.charAt(i) === " ";
    ++i;
  }

  return isABlank;
}

function createNewText(anArrayOfLines: string[]) {
  // onlyBlanks();

  let numBlankLines = 0;
  let numContentLines = 0;
  let numCommentLines = 0;
  let numFunctions = 0;

  // const listOfFunctions: any[] = [];

  // issues with line: Argument of type '(string | number)[]'
  // is not assignable to parameter of type 'string | number'.
  // const listOfFunctions: [number, string] = [0, ""];

  // why is listOfFunctions a const? I will try let
  // because this
  // 'listOfFunctions' is never reassigned. Use 'const' instead.eslint(prefer-const)

  // follow line is bad
  // let listOfFunctions = [];
  // because
  // Variable 'listOfFunctions' implicitly has type 'any[]' in some locations where its type cannot be determined.typescript(7034)

  // Unexpected any. Specify a different type.eslint(@typescript-eslint/no-explicit-any)
  // const listOfFunctions: any[] = [];

  // Unexpected any. Specify a different type.eslint(@typescript-eslint/no-explicit-any)
  // eslint-disable-next-line
  // const listOfFunctions: Array<any> = [];

  // issue goes away with an eslint disable next line
  // eslint-disable-next-line
  const listOfFunctions: Array<any> = [];

  const newArrayOfLines: string[] = [];

  const newArrayOfBlanks: string[] = [];
  anArrayOfLines.forEach((line: string) => {
    if (!onlyBlanks(line)) {
      const tmpStr = line.trim();
      // tmpStr.trim
 
      if (tmpStr[0] === "/" || tmpStr[0] === "*") {
        ++numCommentLines;
      } else {
        const isPotentialFunction =
          isASubstr(tmpStr, "var") && isASubstr(tmpStr, "function");

        if (isPotentialFunction) {
          const posVarKeyword = tmpStr.indexOf("var");
          const posFunctionKeyword = tmpStr.indexOf(" = function");

          const isVerifiedFunction = posVarKeyword < posFunctionKeyword;

          if (isVerifiedFunction) {
            const functionName = tmpStr.substring(
              posVarKeyword + 3,
              posFunctionKeyword,
            );
            listOfFunctions.push([numFunctions, functionName]);
            ++numFunctions;
          }
        }
        ++numContentLines;
      }
      newArrayOfLines.push(line);
    } else {
      newArrayOfBlanks.push(line);
      ++numBlankLines;
    }
  });

  console.log("content line is");
  console.log(newArrayOfLines);
  console.log("and here are the stats for the input");

  const programScanResults =
    "content lines: " +
    String(numContentLines) +
    " | comment lines: " +
    String(numCommentLines) +
    " | blank lines: " +
    String(numBlankLines);

  return [newArrayOfLines, programScanResults, listOfFunctions];
}

function isAlphanumeric(str: string) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

function isAlpha(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}

function isNumeric(str: string) {
  // following fails: allows '1a11b3' to be considered a number
  return isAlphanumeric(str) && !isAlpha(str);
}

// CHQ: yes the time complexity for this function
// is O(n), but that's okay
function isAnInteger(str: string) {
  let isANum = true;
  let i = 0;
  while (isANum && i < str.length) {
    const isCharANum = isNumeric(str[i]);

    // CHQ: as long as isCharANum is a number, then isANum is true;

    isANum = isCharANum;

    ++i;
  }

  // if i === str.length, we know it is true. In all circumstances,
  // isANum should equal (i === str.length)
  return isANum;
}

function isAFloatingPoint(str: string) {
  let isFloatingPt = false;

  // let pos1 = str.search("."); //nope
  // let pos1 = str.indexOf("."); // want 1.7 to become 7, not .7
  const pos1 = str.indexOf(".") + 1;

  if (pos1 !== -1 && pos1 < str.length) {
    const str2 = str.substring(pos1);

    // let pos2 = str2.search(".");
    const pos2 = str2.indexOf(".");

    if (pos2 === -1 && isNumeric(str2)) {
      isFloatingPt = true;
    }
  }

  return isFloatingPt;
}

function isANumber(str: string) {
  return isAnInteger(str) || isAFloatingPoint(str);
}

const ScanProcessingJS: React.FC = () => {
  // const [list, setList] = useState<any[]>([]); // source: https://www.telerik.com/blogs/getting-started-typescript-react
  // const [selected, setSelected] = useState({ x: {}, y: {} });

  // const [text, setText] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const classes = useStyles();
  // eslint-disable-next-line
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { csv } = event.target.elements;

    // source: https://stackoverflow.com/questions/9196954/how-to-read-line-by-line-of-a-text-area-html-tag
    const arrayOfLines = csv.value.split("\n");

    // arrayOfLines is array where every element is string of one line

    const thetmp1 = createNewText(arrayOfLines);
    // let brobro = thetmp1[0];
    // console.log("THIS IS THE BRO")
    // console.log(brobro);

    // let organizedData = produceOrganizedData(arrayOfLines);

    const listAsText = "List of functions in the program:\n\n\n";

    let textForDrawFunctions = "List of draw functions in the program:\n\n";
    let textForRecipeFunctions = "List of recipe functions in the program:\n\n";
    let textForOtherFunctions = "List of other functions in the program:\n\n";

    const fullFunctionList = thetmp1[2];

    const drawFunctions = [];
    const recipeFunctions = [];
    const otherFunctions = [];

    for (let m = 0; m < fullFunctionList.length; ++m) {
      const curFunction = fullFunctionList[m];
      // listAsText += (String(curFunction[0]) + "." + curFunction[1]);
      // listAsText += "\n";

      const functionName = curFunction[1];

      if (isASubstr(functionName, "draw")) {
        drawFunctions.push(functionName);
      } else if (isASubstr(functionName, "recipe")) {
        recipeFunctions.push(functionName);
      } else {
        otherFunctions.push(functionName);
      }
    }

    for (let n = 0; n < drawFunctions.length; ++n) {
      const curFunction = drawFunctions[n];
      textForDrawFunctions += curFunction;
      textForDrawFunctions += "\n";
    }
    for (let n = 0; n < recipeFunctions.length; ++n) {
      const curFunction = recipeFunctions[n];
      textForRecipeFunctions += curFunction;
      textForRecipeFunctions += "\n";
    }
    for (let n = 0; n < otherFunctions.length; ++n) {
      const curFunction = otherFunctions[n];
      textForOtherFunctions += curFunction;
      textForOtherFunctions += "\n";
    }

    let outputMessage =
      "Overall Scan:\n\n" +
      thetmp1[1] +
      "\n\n------------------------------------------------------------\n\n";
    outputMessage += listAsText;
    outputMessage += textForDrawFunctions;
    outputMessage += "\n\n\n";
    outputMessage += textForRecipeFunctions;
    outputMessage += "\n\n\n";
    outputMessage += textForOtherFunctions;

    setText(outputMessage);
  };

  // const [dropdownOpen, setOpen] = useState(false);

  // const [modalOpen3, setModalOpen3] = useState(false);

  // const toggle = () => setOpen(!dropdownOpen);

  // const toggleModal3 = () => setModalOpen3(!modalOpen3);

  // const randomList = [
  //   { name: "test", values: ["d", "e", "f"] },
  //   { name: "test2", values: ["a", "b", "c"] },
  // ];

  const testInput = "3";
  console.log(
    "Calling this function to keep these helper functions in the code. Is ",
    testInput,
    "an integer?\n",
    String(isANumber("3")),
  );

  return (
    <section className="line-page">
      <h1>Count Lines of Code</h1>

      <p>
        Counts the lines of code in any given program written in the Khan
        Academy variant of Processing
      </p>
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          
          {[0, 1, 2, 3].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
          {
            <Grid item>
              <Paper className={classes.paper} />
            </Grid>
          } 
        </Grid>
      </Grid>
    </Grid>
      <form onSubmit={handleSubmit}>
        <textarea
          name="csv"
          placeholder="Paste the code here...."
          rows={10}
          required
        ></textarea>
        <br/>
        <button type="submit">Process</button>
      </form>
      <textarea
        name="resultField"
        placeholder="Program analysis comes here"
        value={text}
        rows={10}
        required
      ></textarea>
    </section>
  );
};

export default ScanProcessingJS;
