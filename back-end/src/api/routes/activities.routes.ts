import { ActivitiesController } from "api/controllers/complementaryActivities/activities.controller";
import { Router } from "express";

const activitiesRoutes = Router();

const activitiesController = new ActivitiesController();

activitiesRoutes.get("/activities", activitiesController.getActivities);
activitiesRoutes.get("/activities/:id", activitiesController.getActivitiesById);
activitiesRoutes.get("/total-activities-hours", activitiesController.getTotalActivityHours);

export { activitiesRoutes };
