import { fetchPersonByFirebaseUID } from "@/app/services/fetch";
import { firestore } from "@/lib/firebase";
import prisma from "@/lib/prisma";
import { doc, getDoc } from "firebase/firestore";

type ParamsType = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: ParamsType) {
	const urlParams = await params;

	const userDocRef = doc(firestore, "users", urlParams.id);

	try {
		const userSnapshot = await getDoc(userDocRef);

		if (userSnapshot.exists()) {
			const firebaseUserData = { id: urlParams.id, data: userSnapshot.data() };

			const user = await prisma.user.findFirst({
				where: {
					firebaseId: urlParams.id,
				},
			});

			const patientInformation = await prisma.patientInformation.findFirst({
				where: {
					user: {
						id: user?.id,
					},
				},
				include: {
					PrenatalRecord: {
						include: {
							ClinicVisits: {
								include: {
									Advice: true,
									Counseling: true,
									Imunization: true,
									IronSupplement: true,
									Services: true,
								},
							},
						},
					},

					IronSupplement: true,
					BloodDonors: true,
					accompanied_by: true,
					assigned_by: true,
					Imunization: true,
					user: true,
				},
			});

			const assignedById = patientInformation?.assigned_by.firebaseId;
			const accompaniedById = patientInformation?.accompanied_by.firebaseId;

			if (assignedById) {
				const assignedByInfo = await fetchPersonByFirebaseUID(assignedById!);

				// insert the data of assignedByInfo into  allPrenatalRecords.assigned_by
				patientInformation.assigned_by = {
					...patientInformation.assigned_by,
					...assignedByInfo,
				};
			}
			if (accompaniedById) {
				const accompaniedByInfo = await fetchPersonByFirebaseUID(accompaniedById!);

				patientInformation.accompanied_by = {
					...patientInformation.accompanied_by,
					...accompaniedByInfo,
				};
			}

			return Response.json({ firebaseUserData, patientInformation });
		} else {
			return Response.json({ error: "Document not found" }, { status: 404 });
		}
	} catch (error) {
		console.error("Error fetching document:", error);
		return Response.json({ error: "Failed to fetch document" }, { status: 500 });
	}
}
