
import {Component, NgModule,ViewChild} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {ContenteditableModelDirective} from '../textedtor/texteditor.directive'
import {ChartComponent} from '../chart/chart.component'


@Component({
  selector: 'app-home',
  template: `
    <table class="table" id="myTable" class="table">
        <thead>
          <tr>
            <th></th>
            <th *ngFor ="let header of items[0]; let i = index">Header_X{{i}}</th>                
          </tr>
        </thead>
        <tbody>
            <tr *ngFor="let row of items;let irow = index" >
                <td> 'Heder_Y{{irow}}</td>
                <td *ngFor="let item of row;let icol = index"> 
                 <h1 contenteditable="true" [(contenteditableModel)]="items[irow][icol]" (blur)="update(chart,irow,icol,items[irow][icol])"></h1>                                                              
                </td>                
            </tr>
        </tbody>
  </table>
  <div class="tabbutton" align="center">
    <span>Max columns:</span> <input class="input-numeric" type="number" [(ngModel)]="numColumns" min="1" max="100" />
    <span>Max rows:</span> <input class="input-numeric" type="number" [(ngModel)]="numRows" min="1" max="100000" />
  <br />
    <button (click)="add()" class="ctrl-button">Add</button>
    <button (click)="clear()" class="ctrl-button">Clear</button>
  </div>
  <br />
  <br />
  <p-chart #chart type="line" [data]="graphData"></p-chart>
  `,
})
export class HomeComponent {
    @ViewChild("chart") chart: ChartComponent
  graphData: any; 
  name:string;
 

  // Data set references
  private columns: Array<any>;
  private rows: Array<any>;
  private items: Array<any>;
  // Determine the size of the grid data
  private numColumns: number = 5;
  private numRows: number = 5;


constructor(){
  this.rows =[];
  this.items = [];
  this.columns = [];
}
getRandomColor(colcount:number) {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * colcount)];
    }
    return color;
}
 CreateChart (): void {  
  let dataset = [];
  let label = [];
  
  for (let i = 0; i < this.items.length ; i++){
    let data_ = [];
    let bordercolor : string;
    for (let j = 0; j < this.items[i].length; j++){      
      data_.push(this.items[i][j]);
      bordercolor = this.getRandomColor(this.items[i].length+5);
    }  
    dataset.push({data:data_,
      borderColor: bordercolor
    }); 
                 
   }
  
  for (let j = 0; j < this.items[0].length; j++){      
      label.push('Header X_'+ j);
  }
   this.graphData = {
            labels: [],
            datasets: []
        };
  this.graphData.datasets = dataset;
  this.graphData.labels = label; 
  }

  update (chart: ChartComponent,row:number,col:number,value:number): void {
    this.graphData.datasets[row].data[col] = value;
    chart.refresh();
  }


  buildArr(theArr: any[]){
    this.items = [];    
    for(var i = 0; i < this.numRows ; i++) {
        var row = [];
        for(var x = 0; x < this.numColumns; x++) {
          var value = Math.floor(Math.random() * (this.numColumns* this.numRows) + 10); //theArr[i].cells[x].text;
            if (!value) {
                break;
            }
            row.push(value);
        }
        this.items.push(row);
    }
      return this.items;
   }
 
 

ngAfterViewInit(){
  this.add();
}
 
addColumns(){
  for (let j = 1; j <= this.numColumns; j++){
    let column = {
      id: j,
      title: "Header " + j,
      footerText: "Footer " + j,
      width: 100
  }
 
  this.columns.push(column);
  }
}
 
addRows(){
  for (let i = 1; i <= this.numRows; i++){
    let row = {
      text : 'Row ' + i,
      id: i,
      cells: [],
      rows: []
    };
  
  for (let j = 0; j < this.columns.length; j++)
    row.cells.push({ text: "Item" + i + j });
  
    this.rows.push(row);
  }
}
 
// Called when button Add is clicked
add(){
  this.clear();
  this.addColumns();
  this.addRows();
  this.buildArr(this.rows);
  
  let timeid = setTimeout(()=>{
    this.CreateChart();
  },2000)
  
}
 
// Called when button Clear is clicked
  clear(){

  }
 }


