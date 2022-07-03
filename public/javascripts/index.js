const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const loadBtn = document.getElementById("loadBtn");




loadBtn.addEventListener('change', handleFileSelect, false);
const { PDFDocument, rgb, degrees } = PDFLib;

submitBtn.addEventListener("click", () => {
  textToPdf(XL_row_object.length, XL_row_object)

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

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    name,
    {
      type: "application/pdf;charset=utf-8",
    }
  );
  saveAs(file);
};

// init();


function handleFileSelect(evt) {

  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
  document.getElementById("submitBtn").disabled = false;

}



var ExcelToJSON = function () {

  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function (sheetName) {

        // Object
        XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object)
        


        columnNames = Object.keys(XL_row_object[1])


        addTable(columnNames.length, columnNames, XL_row_object.length, XL_row_object)

        document.getElementById('xlx_json').value = columnNames


      })
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };

};


function addTable(lengthTitle, titleObject, lengthObject, ogObject) {
  var tableDiv = document.getElementById('table-area')

  var table = document.createElement("table")
  var tableBody = document.createElement("tbody")
  table.border = 1
  table.appendChild(tableBody)

  //for row

  for (var i = 0; i < 1; i++) {
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)

    //for column

    for (var j = 0; j < lengthTitle; j++) {
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(titleObject[j]))
      tr.appendChild(td)
      
    }
  }

  //FOR ELEMENTS



  for (var i = 0; i < lengthObject; i++) {
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)


    for (var j = 0; j < lengthTitle; j++) {
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(ogObject[i][titleObject[j]]))
      tr.appendChild(td)
      // console.log(ogObject[i]['Name'])
    }
  }

  tableDiv.appendChild(table)

}





function textToPdf(lengthTitle, ogObject) {
  for (var i = 0; i < lengthTitle; i++) {
    // var td = document.createElement('td')
    // td.appendChild(document.createTextNode(ogObject[i][titleObject[j]]))
    // tr.appendChild(td)
    var name = ogObject[i]['Name']

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
