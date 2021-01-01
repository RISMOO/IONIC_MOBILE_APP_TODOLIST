import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';//import database firebase

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentDate:string;//je declare ma variable cuurent
  myTask:string;//variable 
  addTask:boolean;//cacher ou reveler des élements
  tasks=[];//mes taches

  constructor(public afDB: AngularFireDatabase) {//contructeur firebase sexecute au lancement de l'application
  
  

    const date = new Date();//on converti la date en francais
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  addTaskToFirebase(){

    //console.log("myTask:" + this.myTask);
    //on utisee le plugin angulafirebaseDatabase afDB
   this.afDB.list('Tasks/').push({
     //non de la 1ére table tasks pour ajouter nos info dans notre base de données
     text:this.myTask,
     date:new Date().toISOString(),
     checked:false //cocher ou non

  });
  this.showForm();//on cache notre formulmaire et on le reintialize

}

 showForm(){//fonction monter le formulaire,on va l'afficher et le cacher
 this.addTask=!this.addTask;
 this.myTask="";//on reinitailize a zero

 }
 getTasks() {//on recupere nos tasks dans la base de donné
  this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
    //on sabonne au evenments child added et chils removed avec snapshochange
    //subscribe ->renvoi lelement que lon a rencontrer dans notre base de données
    this.tasks = [];
    actions.forEach(action => {
      this.tasks.push({
        key: action.key,//onn recupere lid
        text: action.payload.exportVal().text,//on affiche le texte de notre tasks
        hour: action.payload.exportVal().date.substring(11, 16),
        checked: action.payload.exportVal().checked
      });
    });
  });
}

changeCheckState(task: any) {///cocher.ou pas on recupere le champ que lon veut modifier=checked
  console.log('checked: ' + task.checked);
  this.afDB.object('Tasks/' + task.key +'/checked').set(task.checked)//on fait appel au plugin angular firebase afdb//objet nous peremet de changer la valeur du champ checked
  //on re"cupere lidentifiant correspondant task.key 
  //.set(task.checked)nouvelle valeur
}
//fonction delete

deleteTask(task: any){
  this.afDB.list('Tasks/').remove(task.key);
}




}

//ensuite on se connecte avec firebase en installant "npm install firebase @angular/fire --save"
//Une fois le plugin installé, nous allons le configurer dans le fichier suivant:src/app/app.module.ts
//Commencez par importer le module de configuration AngularFireModule pour associer notre application Ionic à notre projet Firebase.

//Puis importer le module AngularFireDatabaseModule pour utiliser par la suite les fonctions associées aux bases de données:

//Dans app.module.ts
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
//IMPORT DE NOTRE CDN CONFIG FIREBASE



//Et importez le module AngularFireDatabase pour pouvoir utiliser les fonctions de gestion des bases de données:
//import { AngularFireDatabase } from '@angular/fire/database';

//Déclarez ensuite ce module dans le constructor() pour pouvoir l’utiliser dans le reste de votre page:
//constructor(
//	public afDB: AngularFireDatabase,
//  ) {}