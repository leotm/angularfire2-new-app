import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/items');
    const queryObservable = db.list('/items', {
      query: {
        orderByChild: 'text'
      }
    });
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);
    })
  }
  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }
}
