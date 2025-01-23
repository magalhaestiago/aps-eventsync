import { ActivitiesService } from "api/services/complementaryActivities/activities.service";
import { Request, Response } from "express";

const activitiesService = new ActivitiesService();

class ActivitiesController {
    async getActivities(req: Request, res: Response) {
        const response = await activitiesService.getActivities(req, res);

        return res.status(200).send({
            activities: response,
        });
    }

    async getActivitiesById(req: Request, res: Response) {
        const response = await activitiesService.getActivityById(req, res);

        return res.status(200).send({
            activities: response,
        });
    }

    async getTotalActivityHours(req: Request, res: Response) {
        const response = await activitiesService.getTotalActivityHours(req, res);

        return res.status(200).send({
            totalHours: response,
        });
    }
}

export { ActivitiesController };
