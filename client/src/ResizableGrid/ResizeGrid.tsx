export {resizeGrid}

function resizeGrid() {
    let tables = document.getElementsByTagName('table');

for (let i=0; i<tables.length;i++){
    resizableGrid(tables[i]);
}

function resizableGrid(table :any) {
    var row = table.getElementsByTagName('tr')[0],
    cols = row ? row.children : undefined;
    if (!cols) return;    

    for (let i=0;i< cols.length;i++){
        var div = createDiv(table.offsetHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }
}

function createDiv(height : any){
    let div = document.createElement('div');
    div.style.top = '0';
    div.style.right = '0';
    div.style.width = '5px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    /* table height */
    div.style.height = height+'px';
    return div;
   }

   function setListeners(div : any){
    let pageX :any,curCol :any,nxtCol :any,curColWidth :any,nxtColWidth :any;
    div.addEventListener('mousedown', function (e :any) {
     curCol = e.target.parentElement;
     nxtCol = curCol.nextElementSibling;
     pageX = e.pageX;
     curColWidth = curCol.offsetWidth
     if (nxtCol)
      nxtColWidth = nxtCol.offsetWidth
    });
   
    document.addEventListener('mousemove', function (e) {
     if (curCol) {
      let diffX = e.pageX - pageX;
    
      if (nxtCol)
       nxtCol.style.width = (nxtColWidth - (diffX))+'px';
   
      curCol.style.width = (curColWidth + diffX)+'px';
     }
    });
   
   document.addEventListener('mouseup', function (e) { 
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
    });
   }
}

