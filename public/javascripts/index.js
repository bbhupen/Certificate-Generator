const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const loadBtn = document.getElementById("loadBtn");




loadBtn.addEventListener('change', handleFileSelect, false);
const { PDFDocument, rgb, degrees } = PDFLib;




submitBtn.addEventListener("click", () => {


  textToPdf(6, XL_row_object)


  // const val = capitalize(userName.value);

  // //check if the text is empty or not
  // if (val.trim() !== "" && userName.checkValidity()) {
  //   // console.log(val);
  //   generatePDF(val);
  // } else {
  //   userName.reportValidity();
  // }
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
    size: 58,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
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

        // Here is your object
        XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        // console.log(XL_row_object.length);      

        for (let i = 0; i < (Object.keys(XL_row_object).length); i++) {
          for (let j = 0; j < (Object.keys(XL_row_object).length); j++) {
            // console.log(XL_row_object)
          }
        }

        let columnNames = Object.keys(XL_row_object[1])

        // for printing key objects

        //   for (let i=0; i< XL_row_object.length; i++){

        //     for (var key in XL_row_object[i]) {
        //         console.log(XL_row_object[i][key]);
        //     }

        // }

        addTable(columnNames.length, columnNames, XL_row_object.length, XL_row_object)

        document.getElementById('xlx_json').value = columnNames




        // console.log(JSON.parse(json_object));
        // jQuery( '#xlx_json' ).val( json_object );
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
      // console.log(titleObject[j])
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
      var x = 220
      var y = 300
    }
    else if (template == 2){
      var x = 220
      var y = 300
    }
    else if (template == 1){
      var x = 220
      var y = 300
    }



    generatePDF(name, template, x, y)
  }
}
