import { Request, Response } from "express";
import db from "../database/prisma.connection";

class SchedulesController {
  public async create(req: Request, res: Response) {
    const { email, phone, datatime } = req.body;
    try {
      if (!email || !phone || !datatime) {
        return res
          .status(400)
          .json({ success: false, msg: "Required fields missing" });
      }

      const schedule = await db.schedules.create({
        data: {
          email,
          phone,
          datatime,
        },
      });

      if (!schedule) {
        return res.status(400).json({ success: false, msg: "Schedule not created" })
      }
      return res.status(201).json({ success: true, msg: "Schedule created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error database" });
    }
  }

  public async list(req: Request, res: Response){
    try{
        const schedule = await db.schedules.findMany()
        if(!schedule){
            return res.status(400).json({ success: false, msg: "Shedules not listed" })
        }
        return res.status(200).json({ success: true, msg:"Schedules listing", data: schedule })
    } catch(err){
        return res.status(500).json({ success: false, msg: "Error database" })
    }
  }

  public async show(req: Request, res: Response){
    const { id } = req.params
    try{
        const schedule = await db.schedules.findUnique({
            where:{
                id
            }
        })

        if(!schedule){
            return res.status(404).json({ success: false, msg: "Schedule not found" })
        }

        return res.status(200).json({ sucess: true, msg: "Schedule showing", data: schedule })
    } catch(err){
        return res.status(500).json({ success: false, msg: "Error database" })
    }
  }
}

export default SchedulesController;
