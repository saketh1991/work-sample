import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-instance-selector',
  templateUrl: './instance-selector.component.html',
  styleUrls: ['./instance-selector.component.scss']
})
export class InstanceSelectorComponent implements OnInit{

  // bind to the instance type
  @Input() type;
  @Output() typeChange = new EventEmitter();

  // bind to the node count
  @Input() nodes;
  @Output() nodesChange = new EventEmitter();

  // instance options
  @Input() instanceOptions;

  constructor() { }

  ngOnInit() {
  }

  preventHigherInputArrow(e): void {
    console.log(e); 
    if ( this.nodes >= 4) {
         this.nodes = 4;
    }
    else if (this.nodes <= 1) {
     this.nodes = 1; 
    }
  }

  updateType(type) {
    this.type = type;
    this.typeChange.emit(type);
  }

  updateNodes(nodes) {
    this.nodes = nodes;
    this.nodesChange.emit(nodes);
  }
}
