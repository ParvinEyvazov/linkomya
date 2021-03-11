import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[DragAndDrop]',
})
export class DragAndDropDirective {
  constructor() {}

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(dragEvent) {
    console.log('1 - dragover');
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragLeave', ['$event']) onDragLeave(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) ondrop(dropEvent) {
    console.log('3 - drop');
    dropEvent.preventDefault();
    dropEvent.stopPropagation();
    this.fileOver = false;
    let files = dropEvent.dataTransfer.files;
    if (files.length > 0) {
      console.log('4 uploaded file:', files);
      this.fileDropped.emit(files);
    }
  }
}
