textArea = document.getElementById('xlx_json')

var ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object);
          console.log(XL_row_object.length);      
          
          for (let i = 0; i < (Object.keys(XL_row_object).length); i++){
            for (let j = 0; j < (Object.keys(XL_row_object).length); j++){
              console.log(XL_row_object)
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

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
};


function addTable(lengthTitle,titleObject,lengthObject, ogObject){
  var tableDiv = document.getElementById('table-area')

  var table = document.createElement("table")
  var tableBody = document.createElement("tbody")
  table.border = 1
  table.appendChild(tableBody)

  //for row

  for (var i = 0; i < 1; i ++){
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)
    
    //for column

    for (var j = 0; j < lengthTitle; j++){
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(titleObject[j]))
      tr.appendChild(td)
      console.log(titleObject[j])
    }
  }

  //FOR ELEMENTS

  for (var i = 0; i < lengthObject; i++){
    var tr = document.createElement('tr')
    tableBody.appendChild(tr)


    for (var j = 0; j < lengthTitle; j++){
      var td = document.createElement('td')
      td.appendChild(document.createTextNode(ogObject[i][titleObject[j]]))
      tr.appendChild(td)
      console.log(ogObject[i])
    }
  }



  tableDiv.appendChild(table)

}

function handleFileSelect(evt) {
  
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

