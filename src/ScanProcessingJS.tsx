import React from "react";
// import auth from "./auth";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import * as CSV from "csv-string"
import { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Grid, { GridSpacing } from "@material-ui/core/Grid";
// import { Box, CssBaseline, Grid } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import Paper from "@material-ui/core/Paper";

// Sources:
// [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
// [2] https://stackoverflow.com/questions/5296268/fastest-way-to-check-a-string-contain-another-substring-in-javascript
// [3]https://www.tutorialspoint.com/How-to-format-a-float-in-JavaScript

// [4] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// [5] https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs

//[A]

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




// ------------------------------ SECTION START : HELPER FUNCTIONS TO UNCOMMENT AND USE IF NEEDED ----------------//

// function isAlphanumeric(str: string) {
//   return /^[a-zA-Z0-9]+$/.test(str);
// }

// function isAlpha(str: string) {
//   return /^[a-zA-Z]+$/.test(str);
// }

// function isNumeric(str: string) {
//   // following fails: allows '1a11b3' to be considered a number
//   return isAlphanumeric(str) && !isAlpha(str);
// }

// // CHQ: yes the time complexity for this function
// // is O(n), but that's okay
// function isAnInteger(str: string) {
//   let isANum = true;
//   let i = 0;
//   while (isANum && i < str.length) {
//     const isCharANum = isNumeric(str[i]);

//     // CHQ: as long as isCharANum is a number, then isANum is true;

//     isANum = isCharANum;

//     ++i;
//   }

//   // if i === str.length, we know it is true. In all circumstances,
//   // isANum should equal (i === str.length)
//   return isANum;
// }

// function isAFloatingPoint(str: string) {
//   let isFloatingPt = false;

//   // let pos1 = str.search("."); //nope
//   // let pos1 = str.indexOf("."); // want 1.7 to become 7, not .7
//   const pos1 = str.indexOf(".") + 1;

//   if (pos1 !== -1 && pos1 < str.length) {
//     const str2 = str.substring(pos1);

//     // let pos2 = str2.search(".");
//     const pos2 = str2.indexOf(".");

//     if (pos2 === -1 && isNumeric(str2)) {
//       isFloatingPt = true;
//     }
//   }

//   return isFloatingPt;
// }

// function isANumber(str: string) {
//   return isAnInteger(str) || isAFloatingPoint(str);
// }



// ------------------------------ SECTION END : HELPER FUNCTIONS TO UNCOMMENT AND USE IF NEEDED ----------------//


const ScanProcessingJS: React.FC = () => {
  const [text, setText] = useState<string>("");
  // const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  // };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { csv } = event.target.elements;

    
    const arrayOfLines = csv.value.split("\n"); // [A]

    // arrayOfLines is array where every element is string of one line
    const thetmp1 = createNewText(arrayOfLines);
    // let teststring = thetmp1[0];
    // console.log("THIS IS THE TEST STRING")
    // console.log(teststring);

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
  
  // const testInput = "3";
  // console.log(
  //   "Calling this function to keep these helper functions in the code. Is ",
  //   testInput,
  //   "an integer?\n",
  //   String(isANumber("3")),
  // );

  return (
    <section className="line-page">
      <h1>Count Lines of Code</h1>

      <p>
        Counts the lines of code in any given program written in the Khan
        Academy variant of Processing
      </p>

      {/* Source: https://stackoverflow.com/questions/63353297/material-ui-how-to-stretch-grid-container-to-parent-height-and-width */}

      <Box bgcolor="white" display="flex" height="100vh" width="100vw">
      <Box bgcolor="white" flex={{ xs: 1, sm: 2 }} >
        <form onSubmit={handleSubmit}>
          <textarea
            name="csv"
            placeholder="Paste the code here...."
            required
            ></textarea>
          <br/>
          <button type="submit">Process</button>
        </form> 
      </Box>
      <Box
        bgcolor="white"
        display="flex"
        flex={3}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <textarea
          name="resultField"
          placeholder="Program analysis comes here"
          value={text}
          rows={10}
          required
          ></textarea> 
      </Box>
    </Box>

      {/* <>
      <CssBaseline />
      <div
        style={{
          background: "gray",
          display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ background: "yellow", flex: 1 }}>Sidebar</div>
          <div
            style={{
              display: "flex",
              background: "purple",
              flexDirection: "column",
              flex: 2,
            }}
          >
            <div style={{ background: "blue", flex: 2 }}>Header</div>
            <div style={{ background: "red", flex: 10 }}>Content</div>
          </div>
        </div>
      </div>
    </> */}

      <Grid container className={classes.root} spacing={2}>
        {/* <Grid item xs={12} lg={12}> */}
        {/* <Grid item className="col-4"> */}
        {/* <Grid item lg={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>

            // used to have form here but moved it
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item className="col-4">
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>

            // used to have form here but moved it

              </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} lg={12}> */}
        {/* <Grid item className="col-4"> */}
 
      </Grid>


    </section>
  );
};

export default ScanProcessingJS;
