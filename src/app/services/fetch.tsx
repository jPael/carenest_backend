import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function fetchPersonByFirebaseUID(uid: string) {
	console.log(`uid: ${uid}`);
	const userDocRef = doc(firestore, "users", uid);

	const snapshot = await getDoc(userDocRef);

	if (snapshot.exists()) {
		const firebaseUserData = { id: uid, data: snapshot.data() };

		return firebaseUserData;
	}

	return { error: "Document not found" };
}
