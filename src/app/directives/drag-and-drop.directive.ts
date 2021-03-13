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
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) ondrop(dropEvent) {
    dropEvent.preventDefault();
    dropEvent.stopPropagation();
    this.fileOver = false;
    let files = { target: { files: dropEvent.dataTransfer.files } };
    console.log('files: ', files);
    this.fileDropped.emit(files);
  }
}
