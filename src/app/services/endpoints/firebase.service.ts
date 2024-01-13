// import { Injectable } from '@angular/core';
// import { FirebaseApp } from '@angular/fire/app';
// import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
// import { addDoc, doc, DocumentReference, DocumentSnapshot, Firestore, getDoc, getDocFromCache, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
// import { initializeApp } from '@firebase/app';
// import { collection, DocumentData, getFirestore } from '@firebase/firestore';
// import { NotificationsModel } from 'src/app/shared/component/header/notification/notification.model';

// import { environment } from 'src/environments/environment';

// @Injectable({ providedIn: 'root' })
// export class FirebaseService<T> {

//   init: FirebaseApp = initializeApp(environment.firebase);
//   db: Firestore = getFirestore(this.init);

//   timestamp: Timestamp = Timestamp.fromDate(new Date());

//   constructor(
//     private auth: Auth,
//     private firestore: Firestore,
//   ) { }

//   authenticate(payload: any): Promise<UserCredential> {
//     return signInWithEmailAndPassword(this.auth, payload.email, payload.password);
//   }

//   createUser(email: string, password: string): Promise<UserCredential> {
//     return createUserWithEmailAndPassword(getAuth(this.init), email, password);
//   }

//   signOut(): Promise<void> {
//     return signOut(this.auth);
//   }

//   getCollection(path: string, id: string): Promise<DocumentSnapshot<DocumentData>> {
//     return getDoc(doc(this.db, path, id));
//   }

//   getCollections(path: string, ...queryConstraints: QueryConstraint[]): Promise<QuerySnapshot<DocumentData>> {
//     return getDocs(query(collection(this.db, path), ...queryConstraints));
//   }

//   addCollection(path: string, payload: T): Promise<DocumentData> {
//     return addDoc(collection(this.db, path), payload);
//   }

//   setCollection(path: string, payload: T, id: string): Promise<void> {
//     return setDoc(doc(this.db, path, id), payload);
//   }

//   updateCollection(path: string, payload: T, id: string): Promise<void> {
//     return updateDoc(doc(this.db, path, id), payload);
//   }

//   getReferenceDate(path: string, id: string): DocumentReference<DocumentData> {
//     return doc(this.db, path, id);
//   }

//   addNotification(memberID: string, payload: NotificationsModel): void {
//     addDoc(collection(this.db, 'notifications', 'list', memberID), payload);
//   }

//   // retrieveReferenceData(){

//   //   return getDo
//   //   firebase.firestore()
//   //  .collection('categories')
//   //  .doc('5gF5FqRPvdroRF8isOwd');

//   // }

// }
