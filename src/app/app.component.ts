import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   item: FirebaseObjectObservable<any>;
   constructor(db: AngularFireDatabase) {
     this.item = db.object('/item', { preserveSnapshot: true });
     this.item.subscribe(snapshot => {
       console.log(snapshot.key)
       console.log(snapshot.val())
     });
   }
   save(newName: string) {
     this.item.set({ name: newName });
   }
   update(newSize: string) {
     this.item.update({ size: newSize });
   }
   delete() {
     this.item.remove();
   }
}
