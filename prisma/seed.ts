import { Prisma, PrismaClient, Trimester } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
	const userArgs: Prisma.UserCreateArgs = {
		data: {
			firebaseId: "zyukCw10AOZMImki5ZsF6NJfakj1",
		},
	};

	return (await prisma.user.create(userArgs)).id;
}

async function createPatientInformation(user: string, assigned_by: string, accompanied_by: string) {
	const prenatalInformationArgs: Prisma.PatientInformationCreateArgs = {
		data: {
			philhealth: true,
			nhtsl: true,
			lmp: new Date(),
			birth_place: "Panabo City, Davao del Norte",
			assigned_by: {
				connect: {
					id: assigned_by,
				},
			},
			accompanied_by: {
				connect: {
					id: accompanied_by,
				},
			},
			ob_status: "normal",
			edc: new Date(),
			user: {
				connect: {
					id: user,
				},
			},
		},
	};

	return (await prisma.patientInformation.create(prenatalInformationArgs)).id;
}

async function createBloodDonors(patientInformation: string) {
	const bloodDonorsArgs: Prisma.BloodDonorsCreateArgs = {
		data: {
			fullname: "Juan Dela Cruz",
			blood_typed: true,
			contact_number: "09123425334",
			patient: {
				connect: {
					id: patientInformation,
				},
			},
		},
	};

	await prisma.bloodDonors.create(bloodDonorsArgs);
}

async function createPrenatalRecord(user: string, wht_personel: string) {
	const prenatalRecordArgs: Prisma.PrenatalRecordCreateArgs = {
		data: {
			wht_personel: {
				connect: {
					id: wht_personel,
				},
			},
			patient: {
				connect: {
					id: user,
				},
			},
		},
	};

	return (await prisma.prenatalRecord.create(prenatalRecordArgs)).id;
}

async function createClinicVisits(prenatalRecord: string) {
	const clinicVisitsArgs: Prisma.ClinicVisitsCreateArgs[] = [
		{
			data: {
				trimester: Trimester.FIRST,
				consult_wht: true,
				wht_introduced_birth_plan: true,
				fundic_height: "54",
				blood_pressure: "120",
				patient_record: {
					connect: {
						id: prenatalRecord,
					},
				},
			},
		},
		{
			data: {
				trimester: Trimester.SECOND,
				consult_wht: true,
				wht_introduced_birth_plan: true,
				fundic_height: "60",
				blood_pressure: "110",
				patient_record: {
					connect: {
						id: prenatalRecord,
					},
				},
			},
		},
		{
			data: {
				trimester: Trimester.THIRD,
				consult_wht: true,
				wht_introduced_birth_plan: true,
				fundic_height: "64",
				blood_pressure: "90",
				patient_record: {
					connect: {
						id: prenatalRecord,
					},
				},
			},
		},
	];

	return await Promise.all(clinicVisitsArgs.map(async (d) => (await prisma.clinicVisits.create(d)).id));
}

async function createAdvices(clinicVisits: string) {
	const advicesArg: Prisma.AdviceCreateArgs[] = [
		{
			data: {
				content: "Maintain a healthy diet with reduced salt intake",
				clinic_visit: {
					connect: {
						id: clinicVisits,
					},
				},
			},
		},
		{
			data: {
				content: "Monitor blood sugar levels daily",
				clinic_visit: {
					connect: {
						id: clinicVisits,
					},
				},
			},
		},
		{
			data: {
				content: "Increase physical activity with light exercises",
				clinic_visit: {
					connect: {
						id: clinicVisits,
					},
				},
			},
		},
	];

	await Promise.all(advicesArg.map(async (a) => (await prisma.advice.create(a)).id));
}

async function createServices(clinicVisit: string) {
	const createServicesArg: Prisma.ServicesCreateArgs[] = [
		{
			data: {
				content: "Routine ultrasound scan",
				clinic_visit: {
					connect: {
						id: clinicVisit,
					},
				},
			},
		},
		{
			data: {
				content: "Blood pressure monitoring",
				clinic_visit: {
					connect: {
						id: clinicVisit,
					},
				},
			},
		},
		{
			data: {
				content: "Iron and folic acid supplementation",
				clinic_visit: {
					connect: {
						id: clinicVisit,
					},
				},
			},
		},
	];

	await Promise.all(createServicesArg.map(async (c) => (await prisma.services.create(c)).id));
}

async function createImmunization(clinicVisit: string) {
	const termLength = 5;

	const terms: Prisma.ImunizationCreateArgs[] = Array.from(
		{ length: termLength },
		(_, i): Prisma.ImunizationCreateArgs => ({
			data: {
				term: i,
				clinic_visit: {
					connect: {
						id: clinicVisit,
					},
				},
			},
		})
	);

	await Promise.all(terms.map(async (i) => (await prisma.imunization.create(i)).id));
}

async function createSupplement(clinicVisit: string) {
	const supplementLength = 5;

	const supplement: Prisma.IronSupplementCreateArgs[] = Array.from(
		{ length: supplementLength },
		(): Prisma.IronSupplementCreateArgs => ({
			data: {
				tabs: Math.floor(Math.random() * (10 - 1) + 1),
				clinic_visit: {
					connect: {
						id: clinicVisit,
					},
				},
			},
		})
	);

	await Promise.all(supplement.map(async (s) => (await prisma.ironSupplement.create(s)).id));
}

async function createCounseling(clinicVisit: string) {
	const counselingArgs: Prisma.CounselingCreateArgs = {
		data: {
			breast_feeding: true,
			child_proper_nutrition: true,
			family_planning: true,
			self_proper_nutrition: true,
			clinic_visit: {
				connect: {
					id: clinicVisit,
				},
			},
		},
	};

	await prisma.counseling.create(counselingArgs);
}

async function main() {
	const user = await createUser();

	if (!user) {
		console.error(`No user: ${user}`);
		return;
	}

	const patientInformation = await createPatientInformation(user, user, user);

	if (!patientInformation) {
		console.error("No patient information");
		return;
	}

	await createBloodDonors(patientInformation);

	const prenatalRecord = await createPrenatalRecord(patientInformation, user);

	if (!prenatalRecord) {
		console.error(`No prenatal information ${prenatalRecord}`);
		return;
	}

	const cv = await createClinicVisits(prenatalRecord);

	if (!cv) {
		console.error(`No clinic visit ${cv}`);
		return;
	}

	if (cv.length === 0) {
		console.error(`Clinic visits are empty: ${cv.length} ${cv}`);
		return;
	}

	await createAdvices(cv[0]);
	await createAdvices(cv[1]);
	await createAdvices(cv[2]);

	await createServices(cv[0]);
	await createServices(cv[1]);
	await createServices(cv[2]);

	await createImmunization(cv[0]);
	await createImmunization(cv[1]);
	await createImmunization(cv[2]);

	await createSupplement(cv[0]);
	await createSupplement(cv[1]);
	await createSupplement(cv[2]);

	await createCounseling(cv[0]);
	await createCounseling(cv[1]);
	await createCounseling(cv[2]);
}

main();
