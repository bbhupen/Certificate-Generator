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

          for (let i=0; i< XL_row_object.length; i++){

            for (var key in XL_row_object[i]) {
                console.log(XL_row_object[i][key]);
            }
        
        }
        document.getElementById('xlx_json').value = json_object
        

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

function handleFileSelect(evt) {
  
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

