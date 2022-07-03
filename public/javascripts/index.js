const getCertificateBtn = document.getElementById("getCertificateBtn");
const loadBtn = document.getElementById("loadBtn");




loadBtn.addEventListener('change', handleFileSelect, false);
const { PDFDocument, rgb } = PDFLib;

getCertificateBtn.addEventListener("click", () => {
  textToPdf(sheetCells.length, sheetCells)

});



const generatePDF = async (name, template, x, y) => {
  const existingPdfBytes = await fetch(`pdfs/${template}.pdf`).then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("/fonts/Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: parseInt(x),
    y: parseInt(y),
    size: 50,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });

  //Saving the pdf using Filesaver.js

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  saveAs(pdfDataUri, name, { autoBom: true});
};



function handleFileSelect(event) {

  var files = event.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
  document.getElementById("getCertificateBtn").disabled = false;

}



var ExcelToJSON = function () {


  this.parseExcel = function (file) {

    //read the raw bytes of a file
    var reader = new FileReader();


    //when the file is loaded
    reader.onload = function (e) {

      //read the raw bytes of the file
      var data = e.target.result;

      //convert the raw bytes to a binary string
      var workbook = XLSX.read(data, {
        type: 'binary'
      });

      console.log(workbook)

      //get the first sheet of the workbook

      workbook.SheetNames.forEach(function (sheetName) {

        // Object

        sheetCells = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(sheetCells);
        console.log(json_object)
        
        
        
        columnNames = Object.keys(sheetCells[1])
        addTable(columnNames.length, columnNames, sheetCells.length, sheetCells)


      })
    };


    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };

};



//Function add Table

function addTable(lengthTitle, titleObject, noOfRows, xlObject) {
  var tableDiv = document.getElementById('table-area')

  var table = document.createElement("table")
  var tableBody = document.createElement("tbody")
  table.border = 1
  table.appendChild(tableBody)

    
    //Adding the title row
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)

    //add cells

    for (var j = 0; j < lengthTitle; j++) {
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(titleObject[j]))
      tr.appendChild(td)
      
    }

  //add elements



  for (var i = 0; i < noOfRows; i++) {
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)


    for (var j = 0; j < lengthTitle; j++) {
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(xlObject[i][titleObject[j]]))
      tr.appendChild(td)
      // console.log(xlObject[i]['Name'])
    }
  }

  tableDiv.appendChild(table)

}





function textToPdf(lengthTitle, xlObject) {
  for (var i = 0; i < lengthTitle; i++) {
    // var td = document.createElement('td')
    // td.appendChild(document.createTextNode(xlObject[i][titleObject[j]]))
    // tr.appendChild(td)
    var name = xlObject[i]['Name']

    const template = $('input[name=flexRadioDefault]:checked').attr('id');    

    if (template == 3){
      var x = 225
      var y = 300
    }
    else if (template == 2){
      var x = 225
      var y = 300
    }
    else if (template == 1){
      var x = 225
      var y = 300
    }

    generatePDF(name, template, x, y)
  }
}
