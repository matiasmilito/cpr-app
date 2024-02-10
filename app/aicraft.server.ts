import { prisma } from "./db.server";
import bcrypt from "bcrypt";

export async function createAircraft(
  type: string,
  model: string,
  hours: number
) {
  return await prisma.aircraft.create({
    data: {
      type,
      model,
      hours,
    },
  });
}

export async function getAircrafts() {
  return await prisma.aircraft.findMany();
}

export async function getAircraft(id: number) {
  return await prisma.aircraft.findUnique({
    where: { id },
  });
}

export async function fuelCharge(
  id: number,
  type: string,
  provider: string,
  fuel: number
) {
  return await prisma.fuel.create({
    data: {
      type,
      provider,
      quantity: fuel,
      createdAt: new Date(),
      aircraftId: id,
    },
  });
}

export async function oilCharge(id: number, type: string, oil: number) {
  return await prisma.oil.create({
    data: {
      type,
      quantity: oil,
      createdAt: new Date(),
      aircraftId: id,
    },
  });
}

export async function createFlight(
  id: number,
  flightTime: number,
  initialTach: number,
  finalTach: number,
  fuelLoaded: number,
  pilot: number,
  oilLoaded: number
) {
  const fuelLoad = await fuelCharge(id, "100LL", "YPF", fuelLoaded);
  const oilLoad = await oilCharge(id, "W100", oilLoaded);

  return await prisma.flight.create({
    data: {
      flightTime,
      initialTach,
      finalTach,
      fuelLoadedId: fuelLoad.id,
      userId: pilot,
      oilLoadedId: oilLoad.id,
      aircraftId: id,
      date: new Date(),
    },
  });
}

export async function isExistingEmail(email: string) {
  return await prisma.user.findFirst({
    where: { email },
  });
}

export async function createPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function createUser(
  email: string,
  name: string,
  lastName: string,
  hours: 0,
  password: string,
  role: string
) {
  // I should encrypt the password here using bcrypt

  const hashedPassword = await createPassword(password);

  return await prisma.user.create({
    data: {
      email,
      name,
      lastName,
      hours,
      password: hashedPassword,
      userRole: role,
    },
  });
}
