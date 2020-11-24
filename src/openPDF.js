
export const openPDF = (pdf, password) => {
  let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<html><head><title>" +
        "</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style><script type='text/javascript' src='//mozilla.github.io/pdf.js/build/pdf.js'></script></head>"
    );
    pdfWindow.document.write( 
      "<body><script> " + 
      `
      function openPDF() {
        console.log('sending');
        var pdfData = atob('${pdf}');
      
      var pdfjsLib = window['pdfjs-dist/build/pdf'];
      
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      
      var loadingTask = pdfjsLib.getDocument({data: pdfData, password: '${password}'});
      loadingTask.promise.then(function(pdf) {
        console.log('PDF loaded');
        
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
          console.log('Page loaded');
          document.getElementById("default-pdf").style.display = "none";
          
          var scale = 2.5;
          var viewport = page.getViewport({scale: scale});
      
          var canvas = document.getElementById('the-canvas');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
      
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log('Page rendered');
          });
        });
      }, function (reason) {
        document.getElementById("the-canvas").style.display = "none";
        console.error(reason);
      });
    }
    openPDF();
      `+ "</script><canvas id='the-canvas'></canvas><embed id='default-pdf' width='100%' height='100%' src='data:application/pdf;base64, " +
      encodeURI(pdf) +
      "#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>"
    );
};
