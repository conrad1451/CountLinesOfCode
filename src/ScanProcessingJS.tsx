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
// import AutohideSnackbar from "./AutohideSnackbar";

// import sampleText from "./sampleText" // did not work
// import { palette } from '@mui/system';

// Sources:
// [1]: https://mui.com/system/palette/   
// [2]: https://stackoverflow.com/questions/63353297/material-ui-how-to-stretch-grid-container-to-parent-height-and-width
// [3]: https://stackoverflow.com/questions/2906582/how-do-i-create-an-html-button-that-acts-like-a-link
// [4]: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard?page=1&tab=scoredesc#tab-top

// [5]: https://javascript.info/popup-windows

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
  // const [sample, setSample] = useState<string>("");
  const [text, setText] = useState<string>("");


  const classes = useStyles();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { csv } = event.target.elements;

    const arrayOfLines = csv.value.split("\n"); 

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


  const handleSampleCodeOpen = (event: any) => {
    event.preventDefault(); 

    window.open('https://javascript.info');  // [5] 
  };

  const handleSampleCodeGrab = (event: any) => {
    event.preventDefault(); 

    window.open('https://raw.githubusercontent.com/conrad1451/CountLinesOfCode/main/src/sampleText.txt');  // [5]
  };

  // const handleSampleInput = (event: any) => {
  //   event.preventDefault();
  //   setSample("outputMessage");
  // };
  
  // const testInput = "3";
  // console.log(
  //   "Calling this function to keep these helper functions in the code. Is ",
  //   testInput,
  //   "an integer?\n",
  //   String(isANumber("3")),
  // );

  // console.log(sample);

  return (
    <section className="line-page">
      <h1>Count Lines of Code</h1>

      <p>
        Counts the lines of code in any given program written in the Khan
        Academy variant of Processing.js.
      </p>
      {/* [1] */}
      {/* [2] */}
      {/* rgb(192, 239, 239) */}
      <Box display="flex" height="100vh" width="100vw">
      <Box flex={{ xs: 1, sm: 2 }} >
        <form onSubmit={handleSubmit}>
          <textarea
            name="csv"
            placeholder="Paste the code here...."
            // value={sample}
            required
            ></textarea>
          <br/>
          <button type="submit">Process</button>
        </form> 

        
        {/* <form onSubmit={handleSampleInput}>
          <button type="submit">Open sample code for use</button>
        </form>  */}

        {/* [3] */}
        {/* This was a test of clickable links. Commenting it out to opt for button instead */}
        {/* <a href="https://github.com/conrad1451/CountLinesOfCode/blob/main/src/sampleText.txt" className="button">Open Sample code (GitHub Page)</a>
        <br/> */}
        <button type="submit" onClick={handleSampleCodeOpen}>Open Sample code</button>
        <button type="submit" onClick={handleSampleCodeGrab}>Copy Sample code</button>
        {/* <a href="https://raw.githubusercontent.com/conrad1451/CountLinesOfCode/main/src/sampleText.txt" className="button">Open Sample code (Raw code Page)</a> */}
        {/* uncommented again because button wasn't working */}


        {/* [4] */}
        {/* <button onClick={() =>  navigator.clipboard.writeText('Copy this text to clipboard')}>
          Copy some text
        </button>/ */}
        {/* <AutohideSnackbar /> */}
      </Box>
      <Box
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
 
    <Grid container className={classes.root} spacing={2}>
      {/* <Grid item xs={12} lg={12}> */}
    </Grid>
 
    </section>
  );
};

export default ScanProcessingJS;
