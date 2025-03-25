import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

const createUser = asyncHandler(async (req, res) => {
  console.log("Creating User");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "user registered Successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already exists" });
});

const bookVisit = asyncHandler(async (req, res) => {
  const { email, date, time } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "This resindecy already book by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date, time } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    console.log(bookings);
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: {
            set: user.bookedVisits, // Use 'set' ao invés de aninhar 'bookedVisits'
          },
        },
      });
      res.send("Booking Cancelled Successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user.favResidenciesID.includes(rid)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favorites", user: updatedUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated Favorite", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (error) {
    throw new Error(error.message);
  }
});

export {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  toFav,
  getAllFav,
};
